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
    clone.querySelector(".read").textContent = book.read;

    clone.querySelector(".remove-book").dataset.id = book.id;

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
  const target = e.target;

  if (target.className == "remove-book") {
    bookLibrary = bookLibrary.filter(item => item.id != target.dataset.id);
    shelf.removeChild(target.parentElement);
  }
});

form.addEventListener("submit", submitBook);

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Harry City", "P.S. Pray Silicon", 816, false);
addBookToLibrary("Songs of Road", "W.H.O My Self", 190, true);
addBookToLibrary("Many Returns Best", "Silver Liner S.S", 572, false);
addBookToLibrary("Solar Panel Rays", "Dr. John Wonder Lee", 356, true);