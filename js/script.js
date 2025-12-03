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

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Harry Potter", "P.S. Dumbole Dore", 816, false);

console.log(bookLibrary);