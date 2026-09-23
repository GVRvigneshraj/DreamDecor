/* ---------- Splash ---------- */
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('splash').classList.add('hide'),1400));

/* ---------- Mobile side menu ---------- */
const ham=document.getElementById('hamburger'),mm=document.getElementById('mobileMenu'),
      overlay=document.getElementById('sideOverlay'),sideClose=document.getElementById('sideClose');
function openMenu(){ham.classList.add('open');mm.classList.add('show');overlay.classList.add('show');mm.setAttribute('aria-hidden','false')}
function closeMenu(){ham.classList.remove('open');mm.classList.remove('show');overlay.classList.remove('show');mm.setAttribute('aria-hidden','true')}
ham.addEventListener('click',()=>{mm.classList.contains('show')?closeMenu():openMenu()});
sideClose.addEventListener('click',closeMenu);
overlay.addEventListener('click',closeMenu);
mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

/* ---------- Reveal on scroll ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ---------- Gallery filter ---------- */
document.getElementById('galFilters').addEventListener('click',e=>{
  const b=e.target.closest('.chip');if(!b)return;
  document.querySelectorAll('#galFilters .chip').forEach(c=>c.classList.remove('active'));
  b.classList.add('active');
  const f=b.dataset.f;
  document.querySelectorAll('#gal .ph').forEach(p=>{
    p.classList.toggle('hide-item',f!=='all'&&p.dataset.cat!==f);
  });
});

/* ---------- Contact / newsletter ---------- */
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();document.getElementById('formNote').textContent='✓ Thank you! We will contact you within 24 hours.';e.target.reset();
});
document.getElementById('newsForm').addEventListener('submit',e=>{
  e.preventDefault();document.getElementById('newsNote').textContent='✓ Subscribed successfully!';e.target.reset();
});

/* ---------- Scroll spy (nav highlight: header + side menu + bottom nav) ---------- */
const secs=[...document.querySelectorAll('section[id]')];
const links=[...document.querySelectorAll('.nav-links a, .side-links a, .bottom-nav a')];
function syncSpy(){
  const y=scrollY+140;
  let cur=secs[0]?.id;
  secs.forEach(s=>{if(s.offsetTop<=y)cur=s.id});
  links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+cur));
}
window.addEventListener('scroll',syncSpy,{passive:true});
syncSpy();
