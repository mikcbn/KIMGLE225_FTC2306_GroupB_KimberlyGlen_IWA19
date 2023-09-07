// ------------------------------------------- Importing variables from the data.js ----------------------------------------------------- //
import { BOOKS_PER_PAGE, authors, genres, books } from './data.js';

// ------------------------------------------- Retrieved elements from the DOM using query Selectors ------------------------------------ //
const settings_Button = document.querySelector('[data-header-settings]')
const settings_Overlay = document.querySelector('[data-settings-overlay]')
const settings_Form = document.querySelector('[data-settings-form]')
const settings_Theme = document.querySelector('[data-settings-theme]')
const settings_Cancel = document.querySelector('[data-settings-cancel]')

// ------------------------------------------- Day & Night Option ----------------------------------------------------------------------- //
// ------------------------------------------- Event listner allowing you to click option to show theme --------------------------------- //
settings_Button.addEventListener('click', () => {
    settings_Overlay.showModal()
})

// ------------------------------------------- Event listener to click cancel -----------------------------------=----------------------- //
settings_Cancel.addEventListener('click', () => { 
    settings_Overlay.close()
})

// ------------------------------------------- The css object defines two themes, 'day' and 'night' ------------------------------------- //
const css = {
    day : ['255, 255, 255', '10, 10, 20'],
    night: ['10, 10, 20', '255, 255, 255']
}

/**
 * The Window interface's matchMedia() method returns a new MediaQueryList object that can then be used to determine if the document
 * matches the media query string, as well as to monitor the document to detect when it matches (or stops matching) that media query.
 */

// --- The value of the settingsTheme input is determined based on whether the user's preferred color scheme is dark or not. ------------ //
settings_Theme.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'

// --- When the form is submitted, the selected object is created by converting the form data to an object using Object.fromEntries(). -- //
settings_Form.addEventListener('submit', (event) => { 
    event.preventDefault()
    const form_Submit = new FormData(event.target)
    const selected = Object.fromEntries(form_Submit)

/**
 * Depending on the theme selected, the --color-light and --color-dark CSS variables are updated with the corresponding light and dark 
 * color values from the css object -- root --- //
 */ 
if (selected.theme === 'night') {  
        document.documentElement.style.setProperty('--color-light', css[selected.theme][0])
        document.documentElement.style.setProperty('--color-dark', css[selected.theme][1])     
    } else if (selected.theme === 'day') {
        document.documentElement.style.setProperty('--color-light', css[selected.theme][0])
        document.documentElement.style.setProperty('--color-dark', css[selected.theme][1])
    }
    settings_Overlay.close()
})
// ------------------------------------------- End of color theme ----------------------------------------------------------------------- //

// ------------------------------------------- Create let for pages -- as it changes further in the code -------------------------------- //
let page = 1;

// add curly brackets --- replace range with page
if (!books && !Array.isArray(books)) {throw new Error('Source required')} 
if (!page && page.length < 2) {
    throw new Error('Page must be an array with two numbers')
}

const fragment = document.createDocumentFragment()
// create let variable for startIndex and endIndex 
let start_Index = 0;                                  
let end_Index = 36;                                
// conclude let variable to extracted   
const extracted = books.slice(start_Index, end_Index)

// for loop to view books - imported data from data.js
for (let i = 0; i < extracted.length; i++) {          
    const preview = document.createElement('dl')      
    preview.className = 'preview'                     

    preview.dataset.id = books[i].id
    preview.dataset.title = books[i].title
    preview.dataset.image = books[i].image
    preview.dataset.subtitle = `${authors[books[i].author]} (${(new Date(books[i].published)).getFullYear()})`
    preview.dataset.description = books[i].description
    preview.dataset.genre = books[i].genres

    preview.innerHTML= // ------------------------------------------ HTML structure ------------------------------------------------- //
    `<div>
     <image class='preview__image' src="${books[i].image}" alt="book pic"}/>
     </div>
     <div class='preview__info'>
     <dt class='preview__title'>${books[i].title}<dt>
     <dt class='preview__author'> By ${authors[books[i].author]}</dt>
     </div>`

    fragment.appendChild(preview)
}

// ------------------------------------------- Display fragment in data-list-items -------------------------------------------------- //
const book_list_1 = document.querySelector('[data-list-items]') 
book_list_1.appendChild(fragment)

// ------------------------------------------- Create search button with data stored in data-header-search = imported from data.js -- //
const search_button = document.querySelector("[data-header-search]");
    search_button.addEventListener('click', () => {
    document.querySelector("[data-search-overlay]").style.display = "block";
})


// ------------------------------------------- Create cancel button with data stored in data-search-cancel = imported from data.js -- //
const search_cancel = document.querySelector("[data-search-cancel]");
    search_cancel.addEventListener('click', () => {
    document.querySelector("[data-search-overlay]").style.display = "none";
})

// ------------------------------------------- Create settings button with data stored in data-header-settings = imported from data.js - //
const setting_button = document.querySelector("[data-header-settings]")
    setting_button.addEventListener('click', () => {
    document.querySelector("[data-settings-overlay]").style.display = "block";
})

// ------------------------------------------- Create cancel settings button with data stored in data-setting-cancel = imported from data.js - //
const setting_cancel = document.querySelector('[data-settings-cancel]')
    setting_cancel.addEventListener('click', () => {
    document.querySelector("[data-settings-overlay]").style.display = "none";
})

// ------------------------------------------- Create variable to collect data from html to place them specifically ------------------------- // 
const authorSelect = document.querySelector("[data-search-authors]");
const genreSelect = document.querySelector("[data-search-genres]");

/**
 * The Object.entries() static method returns an array of a given object's 
 * own enumerable string-keyed property key-value pairs.
 * 
 * Object.entries() returns an array whose elements are arrays corresponding 
 * to the enumerable string-keyed property key-value pairs found directly upon object.
 */



// ------------------------------------------- Object.entries() is used to iterate over the authors and genre in an arrow function ---------- //
Object.entries(authors).forEach(([authorId, authorName]) => {
    const optionElement = createOptionElement(authorId, authorName);
    authorSelect.appendChild(optionElement);
});

Object.entries(genres).forEach(([genreId, genreName]) => {
    const optionElement = createOptionElement(genreId, genreName);
    genreSelect.appendChild(optionElement);
});



// ------------------------------------------- Function with paramaters - creating an empty selector for user to direct what the user wants - // 
function createOptionElement(value, text) {
    // creating option in html
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = text;
    return optionElement;
}

// Event function for details to display
const detailsToggle = (event) => {
    const target = event.target;
    if (target && target.dataset) {
        const overlay = document.querySelector('[data-list-active]');
        const title = document.querySelector('[data-list-title]');
        const subtitle = document.querySelector('[data-list-subtitle]');
        const description = document.querySelector('[data-list-description]');
        const image = document.querySelector('[data-list-image]');
        const imageblur = document.querySelector('[data-list-blur]');

        if (target.dataset.id) overlay.style.display = 'block';
        if (target.dataset.title) title.innerHTML = target.dataset.title;
        if (target.dataset.subtitle) subtitle.innerHTML = target.dataset.subtitle;
        if (target.dataset.description) description.innerHTML = target.dataset.description;
        if (target.dataset.image) image.setAttribute('src', target.dataset.image);
        if (target.dataset.imageblur) imageblur.setAttribute('src', target.dataset.image);
    }
};

// ------------------------------------------- Click function to close details -------------------------------------------------------------- //
const details_Close = document.querySelector('[data-list-close]')    
    details_Close.addEventListener('click', () => {
    document.querySelector("[data-list-active]").style.display = "none";
});

// ------------------------------------------- Add event lisnter to click on specific data-list --------------------------------------------- //
const book_click = document.querySelector('[data-list-items]')
book_click.addEventListener('click', detailsToggle)

// ------------------------------------------- Show more books - selecting button in html --------------------------------------------------- //
const show_More_Button = document.querySelector('[data-list-button]')

// ------------------------------------------- Variable structure of books when clicking more ----------------------------------------------- //
const num_Items_To_Show = Math.min(books.length - end_Index,)

// ------------------------------------------- Variable structure to display amount of books when clicking more ----------------------------- //
const show_More_Button_Text = `Show More (${num_Items_To_Show})`

// ------------------------------------------- .textContent placing variable in HTML -------------------------------------------------------- //
show_More_Button.textContent = show_More_Button_Text

// ------------------------------------------- Event lisener to click the more button and display more books -------------------------------- //
// Variable to keep track of the number of pages
let currentPage = 1;

// Event listener for the "Show More" button
show_More_Button.addEventListener('click', () => {
  // Increment the current page
  currentPage++;

  // Calculate the start and end indices based on the current page and BOOKS_PER_PAGE
  const start_Index_1 = (currentPage - 1) * BOOKS_PER_PAGE;
  const end_Index_1 = Math.min(currentPage * BOOKS_PER_PAGE, books.length);
  
  const extracted = books.slice(start_Index_1, end_Index_1);

  // Create and append previews for the new batch of books
  for (const { author, image, title, id, description, published, genres } of extracted) {
    // Create a preview element
    const preview = document.createElement('dl');
    preview.className = 'preview';
    preview.dataset.id = id;
    preview.dataset.title = title;
    preview.dataset.image = image;
    preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`;
    preview.dataset.description = description;
    preview.dataset.genre = genres;

    preview.innerHTML = `
      <div>
        <image class='preview__image' src="${image}" alt="book pic"/>
      </div>
      <div class='preview__info'>
        <dt class='preview__title'>${title}</dt>
        <dt class='preview__author'>By ${authors[author]}</dt>
      </div>
    `;

    fragment.appendChild(preview);
  }

  // Append the new previews to the book list
  const bookList = document.querySelector('[data-list-items]');
  bookList.innerHTML = ''; // Clear existing list
  bookList.appendChild(fragment);
});

// Update the author and genre dropdowns to trigger filtering
authorSelect.addEventListener('change', (event) => {
  selectedAuthor = event.target.value === 'any' ? '' : event.target.value;
  displayBooks();
});

genreSelect.addEventListener('change', (event) => {
  selectedGenre = event.target.value === 'any' ? '' : event.target.value;
  displayBooks();
});

// Set the default "any" option for the genre and author dropdowns
authorSelect.value = 'any';
genreSelect.value = 'any';

// Update the search button to clear filters and display all books
search_button.addEventListener('click', () => {
  document.querySelector("[data-search-overlay]").style.display = "block";
  // Clear filters
  selectedAuthor = '';
  selectedGenre = '';
  authorSelect.value = 'any';
  genreSelect.value = 'any';
  displayBooks();
});
// Update the author and genre dropdowns to trigger filtering
authorSelect.addEventListener('change', (event) => {
  selectedAuthor = event.target.value;
  displayBooks(); // Add this line to trigger filtering
});

genreSelect.addEventListener('change', (event) => {
  selectedGenre = event.target.value;
  displayBooks(); // Add this line to trigger filtering
});

// -------------------------------------------------- End of show more button ---------------------------------------------------------------- //



// -------------------------------------------------- Handle preview click ------------------------------------------------------------------- //
Module.dataListItem.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath)

    let active;
    for (const node of pathArray) {

        if (active) break;
        const previewId = node.dataset?.preview;

        for (const singleBook of books) {
            if(singleBook.id === previewId) {
                active =  singleBook;

                break;
            }
        }
    }

    if (!active) return

    Module.listActive.open = true;
    Module.listImg.setAttribute('src', active.image);
    Module
})

