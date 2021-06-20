let form = document.querySelector("#book-form");
let bookList = document.querySelector("#book-list");

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static addBookList(book) {
    let list = document.querySelector("#book-list");
    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a/></td>
        `;

    list.appendChild(row);
  }

  static clearField() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static showAlert(message, className) {
    let div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    let container = document.querySelector(".container");
    let form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2500);
  }
  static deleteFromBook(target) {
    if (target.hasAttribute("href")) {
      target.parentElement.parentElement.remove();
      Store.removeBooks(target.parentElement.previousElementSibling.textContent.trim())
      UI.showAlert("Book Removed", "success");
    }
  }
}

class Store {
  static getBook() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    let books = Store.getBook();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static displayBook() {
    let books = Store.getBook();

    books.forEach((book) => {
      UI.addBookList(book);
    });
  }

  static removeBooks(isbn) {
    let books = Store.getBook();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

form.addEventListener("submit", newBook);
bookList.addEventListener("click", removeBook);
document.addEventListener("DOMContentLoaded", Store.displayBook());

function newBook(e) {
  let title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("please fil this form", "error");
  } else {
    let book = new Book(title, author, isbn);

    UI.addBookList(book);

    UI.clearField();

    Store.addBook(book);
  }
  e.preventDefault();
}

function removeBook(e) {
  UI.deleteFromBook(e.target);

  e.preventDefault();
}
