// Add a typewriter effect to the title element
function typewriterEffect() {
    const titleText = document.title;
    const titleElement = document.querySelector('title');
    const speed = 100; // Adjust the typing speed (lower value for faster typing)
  
    let i = 0;
    function type() {
      if (i < titleText.length) {
        titleElement.innerText += titleText.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
  
    type();
  }
  
  // Call the typewriterEffect function when the page loads
  window.addEventListener('load', typewriterEffect);

  let isClicked = true;

  function toggle() {
    if (isClicked) {
      document.body.style.background = "black";
      document.body.style.color = "red";
    } else {
      document.body.style.background = 'white';
      document.body.style.color = 'black';
    }
  
    isClicked = !isClicked;
    document.body.classList.toggle('dark');
  
    // Toggle the icons for dark mode and light mode
    const darkIcon = document.querySelector('#btn i.fa-moon');
    const lightIcon = document.querySelector('#btn i.fa-sun');
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');
  }
  
  let btn = document.querySelector('.dark-mode');
  btn.addEventListener('click', toggle);
  