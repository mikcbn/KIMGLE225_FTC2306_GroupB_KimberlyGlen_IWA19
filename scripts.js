/* Import varables from 'data.js' file */
import {BOOKS_PER_PAGE, authors, genres, books } from "./data";

/* Access elements from the DOM with 'document.querySelector' */
const searchButton = document.querySelector('[data-header-search]')
const settingsButton = document.querySelector('[data-header-settings]')
const settingsOverlay = document.querySelector('[data-settings-overlay]')
const settingsForm = document.querySelector('[data-settings-form]')
const settingsTheme = document.querySelector('[data-settings-theme]')
const settingsCancel = document.querySelector('[daya-settings-cancel]')

/* Dark and light mode */
// Event listener for clicking on theme
settingsTheme.addEventListener('click', ()=> {
    overlay.showModal();
})

// Event listener for clicking cancel
settingsCancel.addEventListener('click', ()=> {
    overlay.showModal();
})

// Theme for dark/light mode
const css = {
    light: ['255, 255, 255', '10, 10, 20'],
    dark: ['10, 10, 20', '255, 255, 255']
};

/*  This line checks whether the user's preferred color scheme is dark by using
    the 'window.matchMedia' method. It creates a media query that checks if the
    preferred color scheme is dark. The result of this check is stored in the
    'prefersDarkMode' variable as a boolean value (true if the user prefers dark
    mode, false otherwise). 
*/
// Determine the preferred color scheme (e.g., dark or light)
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Select root element in the <html> of the HTML document
const root =document.documentElement;

// Set the CSS custom properties based on the preferred color scheme
if (prefersDarkMode) {
    root.style.setProperty('--color-dark', `rgb(${css.dark[0]})`);
    root.style.setProperty('--color-light', `rgb(${css.dark[1]})`);
} else {
    root.style.setProperty('--color-dark', `rgb(${css.light[0]})`);
    root.style.setProperty('--color-light', `rgb(${css.light[1]})`);
}

/* The value of settingsTheme input is determined based on whether the user's
   preferred theme is dark or light
*/
settingsTheme.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';


/* When the form is submitted, the code converts the form data into an object
   called 'selected' using 'Object.fromEntries'
*/
settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Create a new FormData object from the form
    const submitForm = new FormData(event.target);
    // Convert FormData to an object
    const selected = Object.fromEntries(submitForm);
});

/* Depending on the theme selected, the '--color-light' and '--color-dark'
   CSS variables are updated with the corresponding light and dark color
   values from the CSS 'object--root--'
 */

if (selected.theme === 'dark') {
    document.documentElement.style.setProperty('--color-light', css.dark[0]);
    document.documentElement.style.setProperty('--color-dark', css.dark[1]);
} else if (selected.theme === 'light') {
    document.documentElement.style.setProperty('--color-light', css.light[0]);
    document.documentElement.style.setProperty('--color-dark', css.light[1]);
}

// Use 'let' for pages to allow it to change further in the code
let page = 1;

/* Check if variable 'books' is not defined or is not an array and throws an
   error message if true, this check ensures that the books variable exists and
   is an array before proceeding with the code.
*/
if (!books && !Array.isArray(books)) {throw new Error('Source Required')};
if (!page && page.length < 2) {throw new Error('Page must be an array with two numbers')};