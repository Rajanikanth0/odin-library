function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read ? "already read": "not read yet";
  this.id = crypto.randomUUID();
  
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }
}

const bookLibrary = [];

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  bookLibrary.push(book);

  addBookToPage();
}

function addBookToPage() {
  const shelf = document.querySelector(".shelf");
  const box = document.createDocumentFragment();

  for (const book of bookLibrary) {
    const div = document.createElement("div");
    div.className = "book";
    div.innerHTML = `<div class="top"><h2 class="title">${book.title}</h2><p>by <span class="author">${book.author}</span></p></div><code><span class="pages">${book.pages}</span> pages, <span class="read">${book.read}</span></code>`;

    box.appendChild(div);
  }

  // re-structure the shelf
  shelf.textContent = "";
  shelf.appendChild(box);
}

/* handle form submission */
function submitBook(e) {
  const data = new FormData(document.querySelector("form"));
  const input = Array.from( data.values() );

  addBookToLibrary(...input);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Harry City", "P.S. Pray Silicon", 816, false);
addBookToLibrary("Songs of Road", "W.H.O My Self", 190, true);
addBookToLibrary("Many Returns Of the Day", "Silver Liner S.S", 572, false);
addBookToLibrary("Solar Panel Rays", "Dr. John Wonder Lee", 356, true);

const newButton = document.querySelector(".new-button");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const closeButton = form.firstElementChild;

newButton.addEventListener("click", () => dialog.showModal());
closeButton.addEventListener("click", () => dialog.close());

form.addEventListener("submit", submitBook);