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
let hideNavigationId;
let buttonClicked = false;

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

    navbarList.addEventListener('click', clickNavButton);
    const firstButton = document.querySelector('.navbar__button');
    firstButton.classList.add('navbar__button-active');
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
    const button = e.target;
    if (!button.tagName || button.tagName != 'BUTTON') 
        return;
    
   /* const buttons = document.getElementsByClassName('navbar__button');
    for (button of buttons) {
        button.classList.remove('navbar__button-active');
    }
    button.classList.add('navbar__button-active');*/
    buttonclicked = true;
    setActiveSection(button.dataset.section, true);

  /*  const sections = document.getElementsByTagName('section');
    for (section of sections) {
        section.classList.remove('your-active-class');
    }
    const sectionActive = document.getElementById(button.dataset.section);
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
      /*  setTimeout(function() {
            buttonClicked = false;
        }, 1000);*/
    }

    const activeButton = document.querySelector(`.navbar__button[data-section=${sectionId}]`);
    const buttons = document.getElementsByClassName('navbar__button');
    for (button of buttons) {
        button.classList.remove('navbar__button-active');
    }
    activeButton.classList.add('navbar__button-active');
}

function setNavigationVisibility(visible) {
    const navbarList = document.getElementById('navbar__list');
    if (visible) {
        navbarList.style.display = '';
    } else {
        if (navbarList.matches(':hover')) {
            clearTimeout(hideNavigationId);
            setTimeout(setNavigationVisibility, 2000, false);
        } else {
            hideNavigationId = navbarList.style.display = 'none';
        }
    }
}

function checkCurrentSection() {
    if (buttonClicked) {
        return;
    }

    setNavigationVisibility(true);
    clearTimeout(hideNavigationId);

    let viewLine = window.scrollY + document.documentElement.clientHeight / 4;
    for (borderlines of sectionsBorderlines) {
        if (borderlines.top < viewLine && borderlines.bottom > viewLine) {
            if (activeSectionId != borderlines.id) {
                setActiveSection(borderlines.id);
            }
            break;
        }
    }

    if (window.scrollY > 0) {
        hideNavigationId = setTimeout(setNavigationVisibility, 2000, false);
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
document.addEventListener('DOMContentLoaded', buildNavigation);
document.addEventListener('DOMContentLoaded', getSectionsBorderlines);

// Scroll to section on link click

// Set sections as active
document.addEventListener('scroll', checkCurrentSection);

