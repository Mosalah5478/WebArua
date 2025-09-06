// Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Magnetic hover for buttons
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width/2) / (r.width/2);
        const y = (e.clientY - r.top - r.height/2) / (r.height/2);
        btn.style.transform = `translate(${x*4}px, ${y*3}px)`;
        btn.style.boxShadow = `0 10px 30px rgba(246,171,60, ${0.25 + Math.abs(x)*.2})`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform=''; btn.style.boxShadow=''; });
    });
    
    // Magnetic hover and glow effect for social icons
    document.querySelectorAll('.social-icon').forEach(icon => {
      icon.addEventListener('mousemove', e => {
        const r = icon.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width/2) / (r.width/2);
        const y = (e.clientY - r.top - r.height/2) / (r.height/2);
        icon.style.transform = `translate(${x*2}px, ${y*2}px) translateY(-3px) scale(1.05)`;
        icon.style.boxShadow = `0 8px 20px rgba(246,171,60, ${0.3 + Math.abs(x)*.3})`;
        icon.querySelector('i').style.transform = `scale(${1.1 + Math.abs(x)*.1})`;
      });
      icon.addEventListener('mouseleave', () => { 
        icon.style.transform = ''; 
        icon.style.boxShadow = ''; 
        icon.querySelector('i').style.transform = '';
      });
    });

    // Tilt & glow cards
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width; // 0..1
        const y = (e.clientY - r.top) / r.height;
        const rx = (y - 0.5) * -6; // rotate X
        const ry = (x - 0.5) * 8;  // rotate Y
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        card.style.setProperty('--mx', `${x*100}%`);
        card.style.setProperty('--my', `${y*100}%`);
      });
      card.addEventListener('mouseleave', () => { card.style.transform = 'rotateX(0deg) rotateY(0deg)'; });
    });

    // Reveal on scroll
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(el=>{
        if(el.isIntersecting){
          el.target.animate([{opacity:0, transform:'translateY(20px)'},{opacity:1, transform:'translateY(0)'}],{duration:700, easing:'cubic-bezier(.2,.6,.2,1)', fill:'forwards'});
          io.unobserve(el.target);
        }
      })
    },{threshold:.15});
    document.querySelectorAll('.section .wrap, .hero .wrap').forEach(el=>io.observe(el));

    // Parallax emblem
    const emblem = document.querySelector('.emblem');
    if(emblem){
      window.addEventListener('mousemove', e => {
        const { innerWidth:w, innerHeight:h } = window;
        const rx = (e.clientY/h - .5) * 10;
        const ry = (e.clientX/w - .5) * -14;
        emblem.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    }

    // Gold particles canvas
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let w, h, dpr;
    const particles = [];
    function resize(){
      dpr = window.devicePixelRatio || 1; w = canvas.width = innerWidth * dpr; h = canvas.height = innerHeight * dpr; canvas.style.width = innerWidth+'px'; canvas.style.height = innerHeight+'px';
    }
    window.addEventListener('resize', resize); resize();

    const GOLD = ['#ffdba1','#ffcc7a','#ffb957','#f5a623'];

    function spawn(n){
      for(let i=0;i<n;i++){
        particles.push({
          x: Math.random()*w, y: Math.random()*h, z: Math.random()*1+0.2,
          r: Math.random()*2+0.4, vx:(Math.random()-.5)*.15, vy:(Math.random()-.5)*.15,
          a: Math.random()*Math.PI*2, c: GOLD[Math.floor(Math.random() * GOLD.length)]
        });
      }
    }
    function step(){
      ctx.clearRect(0,0,w,h);
      for(const p of particles){
        p.x += p.vx; p.y += p.vy; p.vx += (Math.random()-.5)*.02; p.vy += (Math.random()-.5)*.02;
        if(p.x<0) p.x=w; if(p.x>w) p.x=0; if(p.y<0) p.y=h; if(p.y>h) p.y=0;
        const r = p.r * dpr * p.z;
        const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r*3);
        g.addColorStop(0,'rgba(255, 195, 113, .9)');
        g.addColorStop(.4,'rgba(246, 171, 60, .35)');
        g.addColorStop(1,'transparent');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x,p.y,r,0,Math.PI*2); ctx.fill();
      }
      requestAnimationFrame(step);
    }
    spawn(160); step();