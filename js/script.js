function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  
  this.info = function() {
    read = read ? "already read": "not read yet";
    const text = `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;

    return text;
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

    book.innerHTML = `<h2 class="title">${temp.title}</h2><p>by <span class="author">${temp.author}</span></p><code><span class="pages">${temp.pages}</span> pages, <span class="read">${temp.read}</span></code>`;

    shelf.appendChild(book);
  }

}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Harry Potter", "P.S. Dumbole Dore", 816, false);

addBookToPage();