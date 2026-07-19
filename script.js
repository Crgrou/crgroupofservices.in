// Smooth scrolling for menu links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');

    if (targetId.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});

// Fade-in animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
});

document.querySelectorAll("section").forEach(section => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "all 0.6s ease";
  observer.observe(section);
});

// Floating WhatsApp Button
const whatsapp = document.createElement("a");
whatsapp.href = "https://wa.me/917860899678";
whatsapp.innerHTML = "💬";
whatsapp.target = "_blank";
whatsapp.style.cssText = `
position:fixed;
bottom:20px;
right:20px;
width:60px;
height:60px;
background:#25D366;
color:white;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
font-size:30px;
text-decoration:none;
box-shadow:0 4px 10px rgba(0,0,0,.3);
z-index:9999;
`;
document.body.appendChild(whatsapp);
