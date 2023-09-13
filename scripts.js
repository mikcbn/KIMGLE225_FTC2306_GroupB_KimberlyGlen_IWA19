// Import necessary constants and data
import { BOOKS_PER_PAGE, authors, genres, books } from './data.js';

// Constants for selectors and classes
const SELECTORS = {
  settingsButton: '[data-header-settings]',
  settingsOverlay: '[data-settings-overlay]',
  settingsForm: '[data-settings-form]',
  settingsTheme: '[data-settings-theme]',
  settingsCancel: '[data-settings-cancel]',
  searchButton: '[data-header-search]', // Example search button selector
  searchOverlay: '[data-search-overlay]', // Example search overlay selector
  bookPreviews: '[data-list-items]', // Selector for book previews container
  bookSummary: '[data-book-summary]', // Selector for book summary element
};

const CLASSES = {
  preview: 'preview',
  bookList: 'book-list', // Example class for the book list container
  settingButton: 'settings-button', // Class for settings button
  settingOverlay: 'settings-overlay', // Class for settings overlay
  searchButton: 'search-button', // Class for search button
  searchOverlay: 'search-overlay', // Class for search overlay
  bookSummary: 'book-summary', // Class for book summary
  genreSelect: 'genre-select', // Class for genre dropdown
  authorSelect: 'author-select', // Class for author dropdown
  showMoreButton: 'show-more-button', // Class for "Show More" button
  detailsOverlay: 'details-overlay', // Class for book details overlay
  settingsForm: 'settings-form', // Class for settings form
  themeSelect: 'theme-select', // Class for theme selection in settings
  cancelButton: 'cancel-button', // Class for cancel button in settings
  searchInput: 'search-input', // Class for search input field
  bookImage: 'book-image', // Class for book image
  closeDetailsButton: 'close-details-button', // Class for close button in book details
  listItems: 'list-items', // Class for the list of book previews
  listActive: 'list-active', // Class for active book details container
  listTitle: 'list-title', // Class for book title in details
  listSubtitle: 'list-subtitle', // Class for book subtitle in details
  listDescription: 'list-description', // Class for book description in details
  listImage: 'list-image', // Class for book image in details
  listBlur: 'list-blur', // Class for blurred book image in details
};


// Retrieve elements from the DOM using query selectors
const settingButton = document.querySelector(SELECTORS.settingsButton);
const settingsOverlay = document.querySelector(SELECTORS.settingsOverlay);
const settingsForm = document.querySelector(SELECTORS.settingsForm);
const settingsTheme = document.querySelector(SELECTORS.settingsTheme);
const settingCancel = document.querySelector(SELECTORS.settingsCancel);
const searchButton = document.querySelector(SELECTORS.searchButton);
const searchOverlay = document.querySelector(SELECTORS.searchOverlay);
const bookPreviews = document.querySelector(SELECTORS.bookPreviews);

// Define CSS themes
const themes = {
  day: ['255, 255, 255', '10, 10, 20'],
  night: ['10, 10, 20', '255, 255, 255'],
};

// Set the theme based on the user's preferred color scheme
settingsTheme.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';

// Event listener for settings form submission
settingsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const selectedTheme = formData.get('theme');

  // Update CSS variables based on the selected theme
  document.documentElement.style.setProperty('--color-light', themes[selectedTheme][0]);
  document.documentElement.style.setProperty('--color-dark', themes[selectedTheme][1]);

  settingsOverlay.style.display = 'none';
});

// Event listener to open the search overlay
searchButton.addEventListener('click', () => {
  searchOverlay.style.display = 'block';
  console.log("Search button clicked")
});

// Event listener to close the search overlay
const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener('click', () => {
  searchOverlay.style.display = 'none';
  console.log("search cancel clicked")
});

// Event listener to open the settings overlay
settingButton.addEventListener('click', () => {
  settingsOverlay.style.display = 'block';
  console.log("settingButton clicked")
});

// Get the select elements by their data attributes
const genreSelect = document.querySelector('[data-search-genres]');
const authorSelect = document.querySelector('[data-search-authors]');

// Event listener to close the settings overlay
settingCancel.addEventListener('click', () => {
  settingsOverlay.style.display = 'none';
  console.log("setting cancel clicked")
});


// Populate author and genre dropdowns
// Add the "any" option as the first option
authorSelect.appendChild(createOptionElement('any', 'Any Author'));
genreSelect.appendChild(createOptionElement('any', 'Any Genre'));

Object.entries(authors).forEach(([authorId, authorName]) => {
  const optionElement = createOptionElement(authorId, authorName);
  authorSelect.appendChild(optionElement);
});

Object.entries(genres).forEach(([genreId, genreName]) => {
  const optionElement = createOptionElement(genreId, genreName);
  genreSelect.appendChild(optionElement);
});

// Function to create option elements for dropdowns
function createOptionElement(value, text) {
  const optionElement = document.createElement('option');
  optionElement.value = value;
  optionElement.textContent = text;
  return optionElement;
}

// Display a subset of books
let startIndex = 0;
let endIndex = 36;
const displayedBooks = books.slice(startIndex, endIndex);

// Create a document fragment to improve performance when adding multiple elements to the DOM
const fragment = document.createDocumentFragment();

// Function to create book previews
function createBookPreview(book) {
  const preview = document.createElement('dl');
  preview.className = CLASSES.preview;

  preview.dataset.id = book.id;
  preview.dataset.title = book.title;
  preview.dataset.image = book.image;
  preview.dataset.subtitle = `${authors[book.author]} (${(new Date(book.published)).getFullYear()})`;
  preview.dataset.description = book.description;
  preview.dataset.genre = book.genres;

  preview.innerHTML = `
    <div>
      <img class='preview__image' src="${book.image}" alt="book pic"/>
    </div>
    <div class='preview__info'>
      <dt class='preview__title'>${book.title}</dt>
      <dt class='preview__author'>By ${authors[book.author]}</dt>
    </div>
  `;

  fragment.appendChild(preview);
}

// Iterate through displayed books and create previews
for (const book of displayedBooks) {
  createBookPreview(book);
}

// Append the previews to the book list
const bookList = document.querySelector('[data-list-items]');
bookList.appendChild(fragment);

// Event listener to handle preview clicks and display book preview
bookPreviews.addEventListener('click', (event) => {
  const target = event.target.closest(`.${CLASSES.preview}`);
  if (target) {
    const bookPreview = {
      id: target.dataset.id,
      title: target.dataset.title,
      image: target.dataset.image,
      subtitle: target.dataset.subtitle,
      description: target.dataset.description,
    };

    // Display the book preview
    displayBookPreview(bookPreview);
  }
});

// Function to display the book preview
function displayBookPreview(book) {
  const overlay = document.querySelector('[data-list-active]');
  const title = document.querySelector('[data-list-title]');
  const subtitle = document.querySelector('[data-list-subtitle]');
  const description = document.querySelector('[data-list-description]');
  const image = document.querySelector('[data-list-image]');
  const imageBlur = document.querySelector('[data-list-blur]');

  overlay.style.display = 'block';
  title.innerHTML = book.title || '';
  subtitle.innerHTML = book.subtitle || '';
  description.innerHTML = book.description || '';
  image.setAttribute('src', book.image || '');
  imageBlur.setAttribute('src', book.image || '');
}

// Event listener to close details overlay
const detailsClose = document.querySelector('[data-list-close]');
detailsClose.addEventListener('click', () => {
  document.querySelector("[data-list-active]").style.display = "none";
  console.log("details close clicked")
});

// Show more books
let currentPage = 1; // Initialize currentPage
const showMoreButton = document.querySelector('[data-list-button]');
showMoreButton.textContent = 'Show More'; // Add text to the button

showMoreButton.addEventListener('click', () => {
  currentPage++;
  const startIdx = (currentPage - 1) * BOOKS_PER_PAGE;
  const endIdx = Math.min(currentPage * BOOKS_PER_PAGE, books.length);
  const moreBooks = books.slice(startIdx, endIdx);

  // Create and append previews for the new batch of books
  for (const book of moreBooks) {
    createBookPreview(book);
  }

  // Append the new previews to the book list
  bookList.innerHTML = ''; // Clear existing list
  bookList.appendChild(fragment);
});

// Filtering books by author and genre
let selectedAuthor = 'any'; // Set the default to 'any'
let selectedGenre = 'any'; // Set the default to 'any'

// Function to display books based on filters
function displayBooks() {
  // Filter books based on selected author and genre
  const filteredBooks = books.filter((book) => {
    const authorMatch = selectedAuthor === 'any' || book.author === selectedAuthor;
    const genreMatch = selectedGenre === 'any' || book.genres.includes(selectedGenre);
    return authorMatch && genreMatch;
  });

  // Display a subset of the filtered books
  startIndex = 0;
  endIndex = BOOKS_PER_PAGE;
  const displayedBooks = filteredBooks.slice(startIndex, endIndex);

  // Clear the current book list
  bookList.innerHTML = '';

  // Iterate through displayed books and create previews
  for (const book of displayedBooks) {
    createBookPreview(book);
  }

  // Append the previews to the book list
  bookList.appendChild(fragment);
}

// Event listener to update displayed books when author or genre changes
authorSelect.addEventListener('change', () => {
  selectedAuthor = authorSelect.value;
  displayBooks();
});

genreSelect.addEventListener('change', () => {
  selectedGenre = genreSelect.value;
  displayBooks();
});

// Update the search criteria and trigger book display
const searchInput = document.querySelector("[data-search-input]");
searchInput.addEventListener('input', () => {
  titleMatch = searchInput.value.trim().toLowerCase();
  displayBooks();
});
// Handle preview click
const Module = {
  listActive: document.querySelector('[data-list-active]'),
  listTitle: document.querySelector('[data-list-title]'),
  listSubtitle: document.querySelector('[data-list-subtitle]'),
  listDescription: document.querySelector('[data-list-description]'),
  listImage: document.querySelector('[data-list-image]'),
  listBlur: document.querySelector('[data-list-blur]'),
};

document.querySelector('[data-list-items]').addEventListener('click', (event) => {
  const pathArray = Array.from(event.path || event.composedPath());

  let active;
  for (const node of pathArray) {
    if (active) break;
    const previewId = node.dataset?.id;

    for (const singleBook of books) {
      if (singleBook.id === previewId) {
        active = singleBook;
        break;
      }
    }
  }

  if (!active) return;

  Module.listActive.style.display = 'block';
  Module.listImage.setAttribute('src', active.image);
  Module.listTitle.innerHTML = active.title;
  Module.listSubtitle.innerHTML = `${authors[active.author]} (${(new Date(active.published)).getFullYear()})`;
  Module.listDescription.innerHTML = active.description;
  Module.listBlur.setAttribute('src', active.image);
});

// End of the code