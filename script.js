const loader=document.getElementById('loader');
const enter=document.getElementById('enterSite');
const nav=document.querySelector('.nav');
const toggle=document.querySelector('.nav-toggle');

window.addEventListener('load',()=>setTimeout(()=>enter?.focus(),350));
enter?.addEventListener('click',()=>{
  loader.classList.add('exit');
  document.body.classList.remove('locked');
  setTimeout(()=>loader.remove(),1050);
});

toggle?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const cursor=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'}});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%5)*60+'ms';observer.observe(el)});

document.querySelectorAll('[data-tilt]').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${y*-4}deg) rotateY(${x*5}deg) translateY(-3px)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
});

document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('pointermove',e=>{
    const r=btn.getBoundingClientRect();
    btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`;
  });
  btn.addEventListener('pointerleave',()=>btn.style.transform='');
});

document.getElementById('year').textContent=new Date().getFullYear();
