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
}

function addBookToPage() {
  const shelf = document.querySelector(".shelf");

  for (const temp of bookLibrary) {
    const book = document.createElement("div");
    book.className = "book";

    book.innerHTML = `<div class="top"><h2 class="title">${temp.title}</h2><p>by <span class="author">${temp.author}</span></p></div><code><span class="pages">${temp.pages}</span> pages, <span class="read">${temp.read}</span></code>`;

    shelf.appendChild(book);
  }

}

function newButtonClicked(e) {
  e.preventDefault();

  const dialog = document.querySelector("dialog");
  dialog.showModal();
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Harry City", "P.S. Pray Silicon", 816, false);
addBookToLibrary("Songs of Road", "W.H.O My Self", 190, true);
addBookToLibrary("Many Returns Of the Day", "Silver Liner S.S", 572, false);
addBookToLibrary("Solar Panel Rays", "Dr. John Wonder Lee", 356, true);

addBookToPage();

const newButton = document.querySelector(".new-button");

newButton.addEventListener("click", newButtonClicked);