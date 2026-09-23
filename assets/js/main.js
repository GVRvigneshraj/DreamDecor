/* ---------- Splash ---------- */
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('splash').classList.add('hide'),1400));

/* ---------- Mobile menu ---------- */
const ham=document.getElementById('hamburger'),mm=document.getElementById('mobileMenu');
ham.addEventListener('click',()=>{ham.classList.toggle('open');mm.classList.toggle('show')});
mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ham.classList.remove('open');mm.classList.remove('show')}));

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

/* ---------- Scroll spy (nav highlight) ---------- */
const secs=[...document.querySelectorAll('section[id]')];
const links=[...document.querySelectorAll('.nav-links a')];
window.addEventListener('scroll',()=>{
  const y=scrollY+120;
  let cur=secs[0]?.id;
  secs.forEach(s=>{if(s.offsetTop<=y)cur=s.id});
  links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+cur));
},{passive:true});
