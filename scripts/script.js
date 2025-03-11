// Canvas Size Adjustment
const canvas = document.querySelector('.canvas');
const canvasWidthInput = document.getElementById('canvas-width');
const canvasHeightInput = document.getElementById('canvas-height');
const canvasWidthValue = document.getElementById('canvas-width-value');
const canvasHeightValue = document.getElementById('canvas-height-value');

// Update canvas width
canvasWidthInput.addEventListener('input', () => {
    const width = canvasWidthInput.value;
    canvas.style.width = `${width}px`;
    canvasWidthValue.textContent = `${width}px`;
});

// Update canvas height
canvasHeightInput.addEventListener('input', () => {
    const height = canvasHeightInput.value;
    canvas.style.height = `${height}px`;
    canvasHeightValue.textContent = `${height}px`;
});
// Tab Switching
const tabButtons = document.querySelectorAll('.tab-button');
const projectGrids = document.querySelectorAll('.project-grid');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Hide all project grids
        projectGrids.forEach(grid => grid.style.display = 'none');
        // Add active class to clicked button
        button.classList.add('active');
        // Show the corresponding project grid
        document.getElementById(button.getAttribute('data-tab')).style.display = 'grid';
    });
});

// Video Hover and Popup
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const closeModal = document.querySelector('.close-modal');

projectCards.forEach(card => {
    const videoPreview = card.querySelector('.video-preview iframe');
    const thumbnail = card.querySelector('.video-preview .thumbnail');
    const videoId = card.getAttribute('data-video-id');

    // Set video source on hover
    card.addEventListener('mouseenter', () => {
        thumbnail.style.display = 'none'; // Hide thumbnail
        videoPreview.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0`;
    });

    // Show thumbnail on mouse leave
    card.addEventListener('mouseleave', () => {
        videoPreview.src = ''; // Stop video
        thumbnail.style.display = 'block'; // Show thumbnail
    });

    // Open modal on click
    card.addEventListener('click', () => {
        modal.style.display = 'flex'; // Show modal
        modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&showinfo=0&rel=0`;
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none'; // Hide modal
    modalVideo.src = ''; // Stop video
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none'; // Hide modal
        modalVideo.src = ''; // Stop video
    }
});