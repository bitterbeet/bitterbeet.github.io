
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const darkenButton = document.querySelector('.dark');


const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];


const altTexts = {
  'pic1.jpg': 'Closeup of a human eye',
  'pic2.jpg': 'A colorful sunset over the ocean',
  'pic3.jpg': 'A mountain view with snow',
  'pic4.jpg': 'A city skyline at night',
  'pic5.jpg': 'A serene forest path in the morning'
};


images.forEach(image => {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${image}`);
  newImage.setAttribute('alt', altTexts[image]);
  thumbBar.appendChild(newImage);

  
  newImage.addEventListener('click', () => {
    displayedImage.setAttribute('src', `images/${image}`);
    displayedImage.setAttribute('alt', altTexts[image]);
  });
});


let isDarkened = false;

darkenButton.addEventListener('click', () => {
  isDarkened = !isDarkened;
  const overlay = document.querySelector('.overlay');

  if (isDarkened) {
    displayedImage.style.filter = 'brightness(50%)';  // Darken the image
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';  // Show dark overlay
  } else {
    displayedImage.style.filter = 'brightness(100%)';  // Restore original brightness
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';  // Hide overlay
  }
});
