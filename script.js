document.addEventListener('DOMContentLoaded', () => {
    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('#navbarMenuHeroC');

    if (navbarBurger && navbarMenu) {
      navbarBurger.addEventListener('click', () => {
        // Toggle the is-active class on both the burger and the menu
        navbarBurger.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');
      });
    }

    const openModalButton = document.getElementById('cardOpener');
    const modal = document.getElementById('cardModal');
    const closeModalButtons = modal.querySelectorAll('.modal-background');

    // Open the modal
    openModalButton.addEventListener('click', () => {
      modal.classList.add('is-active');
    });

    // Close the modal when any close button or background is clicked
    closeModalButtons.forEach((button) => {
      button.addEventListener('click', () => {
        modal.classList.remove('is-active');
      });
    });
  });

class Ant {
    constructor() {
        console.log(total);
        this.antDiv = document.createElement('div');
        this.antDiv.classList.add('ant');
    
        // Create child divs for head, thorax, and abdomen
        const headDiv = document.createElement('div');
        headDiv.classList.add('head');
        this.antDiv.appendChild(headDiv);
    
        const thoraxDiv = document.createElement('div');
        thoraxDiv.classList.add('thorax');
        this.antDiv.appendChild(thoraxDiv);
    
        const abdomenDiv = document.createElement('div');
        abdomenDiv.classList.add('abdomen');
        this.antDiv.appendChild(abdomenDiv);
    
        // Append the ant's div to the body
        document.getElementById('page').appendChild(this.antDiv);
    
        // Initialize ant's position just outside of view
        const startPoint = Math.random() < 0.5 ? 'left' : 'right';
    
        if (startPoint === 'left' || startPoint === 'right') {
            this.currentX = startPoint === 'left' ? -50 : window.innerWidth + 50;
            this.currentY = Math.random() * window.innerHeight;
        } else { // Starting from top or bottom
            this.currentX = Math.random() * window.innerWidth;
            this.currentY = startPoint === 'top' ? -50 : window.innerHeight + 50;
        }
    
        // Generate endpoint within the viewable part of the screen
        this.generateEndpoint();
    
        // Generate movement steps
        this.steps = [];
        this.generateMovementSteps();
    
        // Create overlay div for click detection
        this.overlayDiv = document.createElement('div');
        this.overlayDiv.classList.add('overlay');
        this.overlayDiv.addEventListener('click', () => {this.removeAnt(); total--;});
        document.getElementById('page').appendChild(this.overlayDiv);
    
        // Start moving the ant
        this.move();
    
        // Update overlay position
        this.updateOverlayPosition();
    }
    

    generateMovementSteps() {
        const deltaX = this.endX - this.currentX;
        const deltaY = this.endY - this.currentY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const numSteps = Math.ceil(distance);
    
        // Clear existing movement steps
        this.steps = [];
    
        // Add movement steps to reach the endpoint
        for (let i = 0; i < numSteps; i++) {
            const stepX = this.currentX + (deltaX / distance) * i;
            const stepY = this.currentY + (deltaY / distance) * i;
            this.steps.push({ x: stepX, y: stepY, angle: Math.atan2(deltaY, deltaX) });
        }
    }
    
    

    move() {
        if (this.steps.length > 0) {
            const step = this.steps.shift();
            this.currentX = step.x;
            this.currentY = step.y;
    
            // Update the position of the ant's div
            this.antDiv.style.left = `${this.currentX}px`;
            this.antDiv.style.top = `${this.currentY}px`;
    
            // Rotate the ant's div to face the direction of movement
            const angleDegrees = (step.angle + Math.PI / 2) * (180 / Math.PI); // Convert radians to degrees and rotate 90 degrees clockwise
            this.antDiv.style.transform = `translate(-50%, -50%) rotate(${angleDegrees}deg)`; // Translate the Ant back to its original position and rotate
    
            // Update overlay position
            this.updateOverlayPosition();
    
            requestAnimationFrame(() => this.move());
        } else {
            // Generate new endpoint and movement steps
            this.generateEndpoint();
            this.generateMovementSteps();
    
            // Start moving the ant again
            this.move();
        }
    }
    
    generateEndpoint() {
        const endPointX = Math.random() * window.innerWidth;
        const endPointY = Math.random() * window.innerHeight;
    
        // Ensure endpoint is within the viewable part of the screen
        this.endX = Math.max(0, Math.min(window.innerWidth, endPointX));
        this.endY = Math.max(0, Math.min(window.innerHeight, endPointY));
    }

    updateOverlayPosition() {
        const antRect = this.antDiv.getBoundingClientRect();
        const overlaySize = 48; // Size of the circular overlay
        const overlayX = antRect.left + antRect.width / 2 - overlaySize / 2;
        const overlayY = antRect.top + antRect.height / 2 - overlaySize / 2;

        // Set overlay position and size
        this.overlayDiv.style.left = `${overlayX}px`;
        this.overlayDiv.style.top = `${overlayY}px`;
        this.overlayDiv.style.width = `${overlaySize}px`;
        this.overlayDiv.style.height = `${overlaySize}px`;
        this.overlayDiv.style.borderRadius = '50%'; // Make it circular
    }

    removeAnt() {
        this.antDiv.remove(); // Remove the ant's div from the DOM
        this.overlayDiv.remove(); // Remove the overlay from the DOM
    }
}

var total = 0;

function addRandomAnt() {
    total++;
    new Ant(); // Create a new ant
    setTimeout(addRandomAnt, Math.random() * 2000); // Add another ant after a random interval (up to 5 seconds)
}

// Start adding ants
addRandomAnt();
