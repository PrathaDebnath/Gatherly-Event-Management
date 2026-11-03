const events = [
 {id:1,title:"The Indie Sound Fest",category:"Music",date:"2026-11-14",time:"5:30 PM",venue:"Riverside Grounds, Bhubaneswar",description:"An open-air celebration of independent music, fresh sounds and good company.",image:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=85",tag:"LIVE MUSIC"},
 {id:2,title:"Future Forward Summit",category:"Technology",date:"2026-11-20",time:"10:00 AM",venue:"Mayfair Convention, Bhubaneswar",description:"A day of bold ideas, practical insights and conversations shaping tomorrow.",image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=85",tag:"IDEAS & TECH"},
 {id:3,title:"Art After Hours",category:"Art",date:"2026-11-22",time:"6:00 PM",venue:"Gallery 27, Bhubaneswar",description:"Explore local artists, live installations and creative conversations after dark.",image:"https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=85",tag:"ART & CULTURE"},
 {id:4,title:"The Sunday Slowdown",category:"Lifestyle",date:"2026-11-29",time:"7:00 AM",venue:"Ekamra Kanan, Bhubaneswar",description:"A feel-good morning of mindful movement, coffee and community.",image:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=85",tag:"WELLNESS"},
 {id:5,title:"Jazz in the Garden",category:"Music",date:"2026-12-05",time:"7:00 PM",venue:"Botanical Courtyard, Bhubaneswar",description:"Smooth jazz, garden lights and a relaxed evening under the stars.",image:"https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=900&q=85",tag:"LIVE MUSIC"},
 {id:6,title:"Design Your Tomorrow",category:"Technology",date:"2026-12-12",time:"11:00 AM",venue:"Innovation Hub, Bhubaneswar",description:"Hands-on workshops and inspiring talks for the next generation of makers.",image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",tag:"WORKSHOP"}
];
const grid=document.getElementById("eventGrid"), search=document.getElementById("searchInput"), empty=document.getElementById("emptyState");
let activeCategory="All";
const formatDate=d=>new Date(d+"T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"short"});
function renderEvents(){
 const term=search.value.trim().toLowerCase();
 const shown=events.filter(e=>(activeCategory==="All"||e.category===activeCategory)&&[e.title,e.category,e.venue,e.description].join(" ").toLowerCase().includes(term));
 grid.innerHTML=shown.map(e=>{const d=new Date(e.date+"T00:00:00");return `<article class="event-card"><div class="event-photo" style="background-image:url('${e.image}')"><span class="event-date">${d.toLocaleDateString("en-IN",{month:"short"}).toUpperCase()}<strong>${String(d.getDate()).padStart(2,"0")}</strong></span></div><div class="event-info"><span class="event-category">${e.tag}</span><h3>${e.title}</h3><p>${e.description}</p><div class="event-meta"><span>⌖ ${e.venue.split(",")[0]}</span><button data-details="${e.id}">Explore event ↗</button></div></div></article>`}).join("");
 empty.hidden=shown.length!==0;
}
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderEvents()});
search.addEventListener("input",renderEvents);
const eventDialog=document.getElementById("eventDialog"),registerDialog=document.getElementById("registerDialog");
function openRegister(id){const ev=events.find(x=>x.id===Number(id));document.getElementById("selectedEvent").value=ev.id;document.getElementById("selectedEventLabel").textContent=`Registering for ${ev.title} · ${formatDate(ev.date)}`;document.getElementById("formMessage").textContent="";document.getElementById("registrationForm").reset();document.getElementById("selectedEvent").value=ev.id;eventDialog.close();registerDialog.showModal()}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-details]");if(!b)return;const ev=events.find(x=>x.id===Number(b.dataset.details));document.getElementById("dialogContent").innerHTML=`<div class="dialog-image" style="background-image:url('${ev.image}')"></div><span class="event-category">${ev.tag}</span><h2>${ev.title}</h2><p>${ev.description}</p><div class="dialog-details">◷ ${formatDate(ev.date)} · ${ev.time}<br><br>⌖ ${ev.venue}</div><button class="button button-dark" id="detailRegister">Register for this event <span>↗</span></button>`;eventDialog.showModal();document.getElementById("detailRegister").addEventListener("click",()=>openRegister(ev.id))});
document.getElementById("dialogClose").addEventListener("click",()=>eventDialog.close());
document.getElementById("registerClose").addEventListener("click",()=>registerDialog.close());
document.getElementById("registrationForm").addEventListener("submit",e=>{
 e.preventDefault();const name=document.getElementById("fullName").value.trim(),email=document.getElementById("email").value.trim(),phone=document.getElementById("phone").value.replace(/\D/g,""),id=document.getElementById("selectedEvent").value,msg=document.getElementById("formMessage");
 if(name.length<2){msg.className="form-message error";msg.textContent="Please enter your full name.";return}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){msg.className="form-message error";msg.textContent="Please enter a valid email address.";return}
 if(!/^\d{10}$/.test(phone)){msg.className="form-message error";msg.textContent="Please enter a valid 10-digit phone number.";return}
 const ev=events.find(x=>x.id===Number(id));const registration={name,email,phone,event:ev.title,eventDate:ev.date,registeredAt:new Date().toISOString()};
 const saved=JSON.parse(localStorage.getItem("gatherlyRegistrations")||"[]");saved.push(registration);localStorage.setItem("gatherlyRegistrations",JSON.stringify(saved));
 msg.className="form-message success";msg.textContent=`You're registered, ${name.split(" ")[0]}! Your spot for ${ev.title} is saved on this device.`;
 e.target.reset();document.getElementById("selectedEvent").value=id;
});
document.getElementById("themeToggle").addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("gatherlyTheme",document.body.classList.contains("dark")?"dark":"light")});
if(localStorage.getItem("gatherlyTheme")==="dark")document.body.classList.add("dark");
document.getElementById("menuToggle").addEventListener("click",()=>{const nav=document.getElementById("mainNav"),open=nav.classList.toggle("open");document.getElementById("menuToggle").setAttribute("aria-expanded",String(open))});
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();const email=document.getElementById("newsletterEmail");document.getElementById("newsletterMessage").textContent=`Thanks! ${email.value} is on the list.`;email.value=""});
document.getElementById("year").textContent=new Date().getFullYear();
renderEvents();
