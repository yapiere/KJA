// Wait for the document to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

  // --- Password Protection Logic ---
  const correctPassword = "and upwards";
  const overlay = document.getElementById('password-overlay');
  const submitButton = document.getElementById('password-submit');
  const passwordInput = document.getElementById('password-input');
  const mainContent = document.getElementById('main-content');
  const errorMessage = document.getElementById('error-message');

  function checkPassword() {
    if (passwordInput.value === correctPassword) {
      overlay.style.transition = 'opacity 0.5s ease';
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 500);
      mainContent.style.display = 'block';
    } else {
      errorMessage.style.display = 'block';
      passwordInput.value = '';
      passwordInput.focus();
    }
  }

  submitButton.addEventListener('click', checkPassword);
  passwordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      checkPassword();
    }
  });

  // --- Original Page Logic ---

  // Smooth scroll from landing to cards
  document.getElementById('seeMore').addEventListener('click', () => {
    document.getElementById('cards').scrollIntoView({ behavior: 'smooth' });
  });

  // Word of the Day system
  async function loadWordOfTheDay() {
    try {
      const response = await fetch("words.json"); // ensure words.json is in same folder
      const words = await response.json();

      const today = new Date();
      const start = new Date(today.getFullYear(), 0, 0);
      const diff = today - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);

      const index = dayOfYear % words.length;
      const wotd = words[index];

      document.getElementById("wotd-word").textContent = wotd.word;
      document.getElementById("wotd-definition").textContent = wotd.definition;
    } catch (err) {
      console.error("Failed to load word of the day:", err);
    }
  }

  loadWordOfTheDay();

});