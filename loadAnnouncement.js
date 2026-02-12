// loadAnnouncement.js
window.onload = function() {
  fetch('announcement.html')  // Load announcement.html
    .then(response => response.text())  // Convert the response to text
    .then(data => {
      document.getElementById('announcement-container').innerHTML = data;  // Insert the data into the container
    })
    .catch(error => console.error('Error loading announcement:', error));  // Handle errors
};
