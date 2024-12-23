// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('Service Worker registered successfully:', registration);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

// Install prompt handling
let deferredPrompt;

// Listen for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default install prompt
  event.preventDefault();
  // Save the event for later use
  deferredPrompt = event;

  // Show the install button
  const installButton = document.getElementById('install-btn');
  installButton.style.display = 'block';

  // Handle the install button click
  installButton.addEventListener('click', () => {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user's response
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the PWA install prompt');
      } else {
        console.log('User dismissed the PWA install prompt');
      }
      // Clear the saved prompt
      deferredPrompt = null;
    });
  });
});

// Optional: Listen for the appinstalled event
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed successfully!');
  alert('Thank you for installing StudyFreinds Pro!');
});

// Hide the install button if the app is already installed
if (window.matchMedia('(display-mode: standalone)').matches) {
  const installButton = document.getElementById('install-btn');
  installButton.style.display = 'none';
}
