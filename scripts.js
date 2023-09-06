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

const fragment = document.createDocumentFragment()

let start = 0; // The index at which to begin extraction (inclusive).
let end = 36; // The index at which to end extraction (exclusive).

/* Extract elements from the books array starting at index 0 (inclusive) and
ending at index 36 (exclusive). i.e. extract elements from index 0 up to, but
not including, index 36.

This code extracts a subarray from the books array, starting from index 0 and
ending just before index 36, and stores the extracted elements in the extracted
array. The extracted portion of the array will have a length of 36 elements (if
there are enough elements in the books array). 
 */
const extracted = books.slice(start, end) 

// 'for' loop to view books-imported data from data.js
for (let i = 0; i < extracted.length; i++) {
    const preview = document.createElement('dl');
    preview.className = 'preview';

    preview.dataset.id = extracted[i].id;
    preview.dataset.title = extracted[i].title;
    preview.dataset.image = extracted[i].image;
    preview.dataset.subtitle = `${authors[extracted[i].author]} (${(new Date(extracted[i].published)).getFullYear()})`;
    preview.dataset.description = extracted[i].description;
    preview.dataset.genre = extracted[i].genres;

    // Append 'preview' to the document or a parent element as needed
    document.body.appendChild(preview);

    preview.innerHTML = `
        <div>
            <img class='preview__image' src="${extracted[i].image}" alt="book pic">
        </div>
        <div class='preview__info'>
            <dt class='preview__title'>${extracted[i].title}</dt>
            <dt class='preview__author'>By ${authors[extracted[i].author]}</dt>
        </div>
    `;

    // Append 'preview' to the document or a parent element as needed
    document.body.appendChild(preview);
}

const bookList1 = document.querySelector("[data-list-items]");
bookList1.appendChild(preview);

// Create a search button with data stored in 'data-header-search' (imported from data.js)
const searchButton1 = document.querySelector("[data-header-search]");
searchButton1.addEventListener('click', () => {
    document.querySelector("[data-search-overlay]").style.display = "block";
});

// Create a cancel button with data stored in 'data-search-cancel' (imported from data.js)
const cancelSearch = document.querySelector("[data-search-cancel]");
cancelSearch.addEventListener('click', () => {
    document.querySelector("[data-search-overlay]").style.display = "none";
});

// Create a settings button with data stored in 'data-header-settings' (imported from data.js)
const settingButton = document.querySelector("[data-header-settings]");
settingButton.addEventListener('click', () => {
    document.querySelector("[data-settings-overlay]").style.display = "block";
});

// Create a cancel settings button with data stored in 'data-settings-cancel' (imported from data.js)
const cancelSettings = document.querySelector("[data-settings-cancel]");
cancelSettings.addEventListener('click', () => {
    document.querySelector("[data-settings-overlay]").style.display = "none";
});

// Create a variable to import specific data from HTML
const selectAuthor = document.querySelector("[data-search-authors]");
const selectGenre = document.querySelector("[data-search-genres]");

// 'Object.entries()' is used to iterate over the authors and genres in an arrow fucntion 
Object.entries(authors).forEach(([authorId, authorName]) => {
    const optionElement = createOptionalElement(authorId, authorName);
    authorSelect.appendChild(optionElement);
});

Object.entries(genres).forEach(([genreId, genreName]) => {
    const optionElement = createOptionalElement(genreId, genreName);
    genreSelect.appendChild(optionElement); // Append the option to the genreSelect element
});

// A function with parameters to create an option element
function createOptionElement(value, text) {
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = text;
    return optionElement;
}

// Create event function for details to display
const detailsToggle = (event) => {
    // Create the variables to call 'data-key' in HTML
    const overlay = document.querySelector('[data-list-active]');
    const title = document.querySelector('[data-list-title]');
    const subtitle = document.querySelector('[data-list-subtitle]');
    const description = document.querySelector('[data-list-description]');
    const image = document.querySelector('[data-list-image]');
    const imageblur = document.querySelector('[data-list-blur]');

    // Use the event object to access dataset properties
    if (event.dataset.id) overlay.style.display = "block";
    if (event.dataset.title) title.innerHTML = event.dataset.title;
    if (event.dataset.subtitle) subtitle.innerHTML = event.dataset.subtitle;
    if (event.dataset.description) description.innerHTML = event.dataset.description;
    if (event.dataset.image) image.setAttribute('src', event.dataset.image);
    if (event.dataset.imageblur) imageblur.setAttribute('src', event.dataset.image);
}