class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();    
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }

  toggleRead() {
    this.read = !this.read;
  }

  static boolToString(read) {
    return (read) ? "already read" : "not read yet";
  }

  static bookLibrary = [];
  static addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    Book.bookLibrary.push(book);

    Book.addBookToPage();
  }

  static addBookToPage() {
    const box = document.createDocumentFragment();
    const shelf = document.querySelector(".shelf");

    for (const book of Book.bookLibrary) {
      // first book is the template
      const clone = shelf.firstElementChild.cloneNode(true);
      clone.querySelector(".title").textContent = book.title;
      clone.querySelector(".author").textContent = book.author;
      clone.querySelector(".pages").textContent = book.pages;
      clone.querySelector(".read").textContent = Book.boolToString(book.read);
      clone.querySelector(".toggle-read").textContent = Book.boolToString(!book.read);

      clone.dataset.id = book.id;

      box.appendChild(clone);
    }

    // re-structure the shelf
    shelf.textContent = "";
    shelf.appendChild(box);
  }
}

/* handle form submission */
function submitBook() {
  const form = document.querySelector("form");

  const data = new FormData(form);
  const input = Array.from( data.values() );

  Book.addBookToLibrary(...input);
}

function actionButtons(e) {
  const book = e.target.parentElement.parentElement;
  const shelf = document.querySelector(".shelf");

  if (e.target.className == "remove-book") {
    Book.bookLibrary = Book.bookLibrary.filter(item => item.id != book.dataset.id);
    shelf.removeChild(book);
  }

  if (e.target.className == "toggle-read") {
    const bookIndex = Book.bookLibrary.findIndex(item => item.id == book.dataset.id);
    Book.bookLibrary[bookIndex].toggleRead();

    e.target.textContent = book.querySelector(".read").textContent;
    book.querySelector(".read").textContent = Book.boolToString(Book.bookLibrary[bookIndex].read);
  }
}

const dialog = document.querySelector("dialog");
const shelf = document.querySelector(".shelf");
const form = document.querySelector("form");

const newButton = document.querySelector(".new-button");
const closeButton = form.firstElementChild;

newButton.addEventListener("click", () => dialog.showModal());
closeButton.addEventListener("click", () => dialog.close());

shelf.addEventListener("click", actionButtons);
form.addEventListener("submit", submitBook);

Book.addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
Book.addBookToLibrary("Harry City", "P.S. Pray Silicon", 816, false);
Book.addBookToLibrary("Songs of Road", "W.H.O My Self", 190, true);
Book.addBookToLibrary("Many Returns Best", "Silver Liner S.S", 572, false);
Book.addBookToLibrary("Solar Panel Rays", "Dr. John Wonder Lee", 356, true);