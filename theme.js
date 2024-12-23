const themeToggle = document.getElementById('theme-toggle');

function setTheme() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.querySelector('meta[name="theme-color"]').setAttribute('content', isDarkMode ? '#000000' : '#ffffff');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  setTheme();
});

setTheme();
