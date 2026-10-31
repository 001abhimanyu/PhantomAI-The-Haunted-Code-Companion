const API = "http://localhost:11434/api/chat";
const MODEL = "qwen2.5:3b";
const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const messages = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");
const statusText = document.getElementById("statusText");
const statusDot = document.querySelector(".pulse");

const systemPrompt = `You are PhantomAI, a mysterious but friendly ghostly coding companion for Halloween.
Your personality is atmospheric, playful, eerie-but-safe, and helpful. You are excellent at programming, explaining concepts to beginners, debugging, and creative spooky storytelling.
Keep answers clear and useful. For code, use fenced code blocks. Never claim to be a real supernatural entity.`;

function addMessage(role, text, isLoading=false){
  const wrap=document.createElement("div");
  wrap.className=`message ${role}`;
  const avatar=document.createElement("div"); avatar.className="avatar"; avatar.textContent=role==="user"?"🕯️":"👻";
  const bubble=document.createElement("div"); bubble.className="bubble";
  if(isLoading){bubble.innerHTML="<i>The phantom is listening to the static…</i>";}
  else bubble.textContent=text;
  wrap.append(avatar,bubble);messages.appendChild(wrap);messages.scrollTop=messages.scrollHeight;
  return bubble;
}
function setStatus(online){
  statusText.textContent=online?`LOCAL SPIRIT ONLINE · ${MODEL}`:"Spirit offline · Start Ollama";
  statusDot.style.background=online?"#b8f28b":"#e5a85b";
  statusDot.style.boxShadow=online?"0 0 12px #b8f28b":"0 0 12px #e5a85b";
}
async function checkOllama(){
  try{const r=await fetch("http://localhost:11434/api/tags");setStatus(r.ok);}
  catch{setStatus(false);}
}
async function sendMessage(text){
  if(!text.trim())return;
  addMessage("user",text);input.value="";sendBtn.disabled=true;sendBtn.innerHTML="CHANNELING…";
  const loading=addMessage("assistant","",true);
  const history=[...messages.querySelectorAll(".message")].slice(-12).map(el=>{
    const role=el.classList.contains("user")?"user":"assistant";
    const content=el.querySelector(".bubble").textContent;
    return {role,content};
  }).filter(m=>m.content && !m.content.includes("The phantom is listening"));
  try{
    const response=await fetch(API,{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:MODEL,stream:false,messages:[{role:"system",content:systemPrompt},...history]})});
    if(!response.ok)throw new Error(`Ollama returned ${response.status}. Is the model downloaded?`);
    const data=await response.json();
    loading.textContent=data.message?.content||"The phantom returned without a message.";
    setStatus(true);
  }catch(err){
    loading.textContent=`The veil is closed… ${err.message}\n\nMake sure Ollama is running and you have downloaded ${MODEL}.\n\nTry in your terminal: ollama run ${MODEL}`;
    setStatus(false);
  }finally{sendBtn.disabled=false;sendBtn.innerHTML='SUMMON <span>↗</span>';messages.scrollTop=messages.scrollHeight;}
}
form.addEventListener("submit",e=>{e.preventDefault();sendMessage(input.value);});
input.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();form.requestSubmit();}});
document.querySelectorAll("[data-prompt]").forEach(btn=>btn.addEventListener("click",()=>sendMessage(btn.dataset.prompt)));
checkOllama();
