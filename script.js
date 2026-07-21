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

// Service Request Form Handler
const serviceForm = document.getElementById('serviceForm');
const successMessage = document.getElementById('successMessage');

if (serviceForm) {
  serviceForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      service: document.getElementById('service').value,
      description: document.getElementById('description').value,
      timestamp: new Date().toLocaleString()
    };
    
    // Save to localStorage
    let requests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
    requests.push(formData);
    localStorage.setItem('serviceRequests', JSON.stringify(requests));
    
    // Show success message
    successMessage.style.display = 'block';
    serviceForm.reset();
    
    // Send to WhatsApp
    const message = `New Service Request:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nDescription: ${formData.description}`;
    const whatsappUrl = `https://wa.me/917860899678?text=${encodeURIComponent(message)}`;
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000);
    
    console.log('Service Request Saved:', formData);
  });
}

// Function to retrieve all service requests
function getAllServiceRequests() {
  return JSON.parse(localStorage.getItem('serviceRequests')) || [];
}

// Function to export service requests as CSV
function exportServiceRequests() {
  const requests = getAllServiceRequests();
  if (requests.length === 0) {
    alert('No service requests found!');
    return;
  }
  
  let csv = 'Name,Email,Phone,Service,Description,Timestamp\n';
  requests.forEach(req => {
    csv += `"${req.name}","${req.email}","${req.phone}","${req.service}","${req.description}","${req.timestamp}"\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'service_requests.csv';
  a.click();
}

// Make functions globally available
window.getAllServiceRequests = getAllServiceRequests;
window.exportServiceRequests = exportServiceRequests;
