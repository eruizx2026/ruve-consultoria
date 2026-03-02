const sections = document.querySelectorAll('.seccion');
let currentSection = 0;

document.getElementById('scrollDownBtn').addEventListener('click', () => {
  currentSection = (currentSection + 1) % sections.length;
  sections[currentSection].scrollIntoView({ behavior: 'smooth' });
});


document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    // Quitar la clase active de todos
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    // Agregar la clase active al clicado
    this.classList.add('active');
  });
});

