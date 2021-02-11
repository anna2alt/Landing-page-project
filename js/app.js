/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function buildNavigation() {
    const navbarList = document.getElementById('navbar__list');
    const sections = document.querySelectorAll('section');

    for (section of sections) {
        let selector = `#${section.id} h2`;
        let title = document.querySelector(selector).textContent;

        const newItem = document.createElement('li');
      /*  const newLink = document.createElement('a');
        newLink.href = `#${section.id}`;*/
        const newLink = document.createElement('button');
        newLink.classList.add('navbar__button');
        newLink.setAttribute('data-section', section.id);
        newLink.textContent = title;
        
        newItem.appendChild(newLink);
        navbarList.appendChild(newItem);
    }

    navbarList.addEventListener('click', scrollToSection);
}

function scrollToSection(e) {
    if (e.target.tagName && e.target.tagName == 'BUTTON') {
        const sectionId = e.target.dataset.section;
        document.getElementById(sectionId).scrollIntoView({behavior: "smooth"});
    }
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNavigation();

// Scroll to section on link click

// Set sections as active


