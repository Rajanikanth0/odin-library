function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  
  this.info = function() {
    const read = boolToString(this.read);
    return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
  }
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function boolToString(read) {
  return (read) ? "already read": "not read yet";
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  bookLibrary.push(book);

  addBookToPage();
}

function addBookToPage() {
  const box = document.createDocumentFragment();

  for (const book of bookLibrary) {
    // first book is the template
    const clone = shelf.firstElementChild.cloneNode(true);
    clone.querySelector(".title").textContent = book.title;
    clone.querySelector(".author").textContent = book.author;
    clone.querySelector(".pages").textContent = book.pages;
    clone.querySelector(".read").textContent = boolToString(book.read);
    clone.querySelector(".toggle-read").textContent = boolToString(!book.read);

    clone.dataset.id = book.id;

    box.appendChild(clone);
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

let bookLibrary = [];
const newButton = document.querySelector(".new-button");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const closeButton = form.firstElementChild;
const shelf = document.querySelector(".shelf");

newButton.addEventListener("click", () => dialog.showModal());
closeButton.addEventListener("click", () => dialog.close());
shelf.addEventListener("click", function(e) {
  const book = e.target.parentElement.parentElement;

  if (e.target.className == "remove-book") {
    bookLibrary = bookLibrary.filter(item => item.id != book.dataset.id);
    shelf.removeChild(book);
  }

  if (e.target.className == "toggle-read") {
    const bookIndex = bookLibrary.findIndex(item => item.id == book.dataset.id);
    bookLibrary[bookIndex].toggleRead();

    e.target.textContent = book.querySelector(".read").textContent;
    book.querySelector(".read").textContent = boolToString(bookLibrary[bookIndex].read);
  }
});

form.addEventListener("submit", submitBook);

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Harry City", "P.S. Pray Silicon", 816, false);
addBookToLibrary("Songs of Road", "W.H.O My Self", 190, true);
addBookToLibrary("Many Returns Best", "Silver Liner S.S", 572, false);
addBookToLibrary("Solar Panel Rays", "Dr. John Wonder Lee", 356, true);