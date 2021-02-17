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
let hideNavigationId; // id of hiding navbar timer
let buttonClicked = false;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function setActiveSection(sectionId) {
    if (activeSectionId == sectionId)
        return;
    
    const sections = document.getElementsByTagName('section');
    for (section of sections) {
        section.classList.remove('your-active-class');
    }
    const sectionActive = document.getElementById(sectionId);
    sectionActive.classList.add('your-active-class');
    activeSectionId = sectionId;

    // if active section was set by clicking a button, we should scroll page to this section
    if (buttonClicked) {
        sectionActive.scrollIntoView({behavior: "smooth"});
        setTimeout(function() {
            buttonClicked = false;
        }, 1000);
    }

    // set corresponding active button
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
        // if cursor is over navbar we should not hide navbar
        if (navbarList.matches(':hover')) {
            clearTimeout(hideNavigationId);
            setTimeout(setNavigationVisibility, 2000, false);
        } else {
            hideNavigationId = navbarList.style.display = 'none';
        }
    }
}

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
        let title = section.dataset.nav;

        const newItem = document.createElement('li');
        const newLink = document.createElement('button');
        newLink.classList.add('navbar__button');
        newLink.setAttribute('data-section', section.id);
        newLink.textContent = title;
        
        newItem.appendChild(newLink);
        navbarList.appendChild(newItem);
    }

    // Scroll to section on link click
    navbarList.addEventListener('click', clickNavButton);
    // Set first button active by default
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

// Add class 'active' to section when near top of viewport
function checkCurrentSection() {
    // we should not check what section is in viewport if it is automatic scroll when clicking a button
    if (buttonClicked)
        return;

    setNavigationVisibility(true);
    clearTimeout(hideNavigationId);

    const viewLine = window.scrollY + document.documentElement.clientHeight / 4;
    for (borderlines of sectionsBorderlines) {
        if (borderlines.top < viewLine && borderlines.bottom > viewLine) {
            setActiveSection(borderlines.id);
            break;
        }
    }

    if (window.scrollY > 0) {
        hideNavigationId = setTimeout(setNavigationVisibility, 2000, false);
    }
}

function clickNavButton(e) {
    const button = e.target;
    if (!button.tagName || button.tagName != 'BUTTON') 
        return;
    
    buttonClicked = true;
    setActiveSection(button.dataset.section);
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNavigation);
// Get sections' top and bottom borders to check what section is in viewport
document.addEventListener('DOMContentLoaded', getSectionsBorderlines);

// Set sections as active
document.addEventListener('scroll', checkCurrentSection);

