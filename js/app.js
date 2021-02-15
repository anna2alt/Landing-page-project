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
let activeSectionId;
let sectionsBorderlines = [];

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

 /*   const firstButton = document.querySelector('.navbar__button');
    firstButton.classList.add('navbar__button-active');*/

    navbarList.addEventListener('click', clickNavButton);
}

function getSectionsBorderlines() {
    const sections = document.querySelectorAll('section');

    for (section of sections) {
        const borderlines = {
            'id': section.id,
            'top': section.offsetTop,
            'bottom': section.offsetTop + section.offsetHeight
        };

        sectionsBorderlines.push(borderlines);
    }
}

function clickNavButton(e) {
    const buttonClicked = e.target;
    if (!buttonClicked.tagName || buttonClicked.tagName != 'BUTTON') 
        return;
    
    const buttons = document.getElementsByClassName('navbar__button');
    for (button of buttons) {
        button.classList.remove('navbar__button-active');
    }
    buttonClicked.classList.add('navbar__button-active');
    setActiveSection(buttonClicked.dataset.section, true);
  /*  const sections = document.getElementsByTagName('section');
    for (section of sections) {
        section.classList.remove('your-active-class');
    }
    const sectionActive = document.getElementById(buttonClicked.dataset.section);
    sectionActive.scrollIntoView({behavior: "smooth"});
    sectionActive.classList.add('your-active-class');*/
}

function setActiveSection(sectionId, scrollTo = false) {
    const sections = document.getElementsByTagName('section');
    for (section of sections) {
        section.classList.remove('your-active-class');
    }
    const sectionActive = document.getElementById(sectionId);
    sectionActive.classList.add('your-active-class');
    activeSectionId = sectionId;
    if (scrollTo) {
        sectionActive.scrollIntoView({behavior: "smooth"});
    }
}

function checkCurrentSection() {
    //window.scrollY
    let centerLine = window.scrollY + document.documentElement.clientHeight / 2;
    for (borderlines of sectionsBorderlines) {
        if (borderlines.top < centerLine && borderlines.bottom > centerLine) {
            if (activeSectionId != borderlines.id) {
                setActiveSection(borderlines.id);
            }
            break;
        }
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
getSectionsBorderlines();

// Scroll to section on link click

// Set sections as active
document.addEventListener('scroll', checkCurrentSection);

