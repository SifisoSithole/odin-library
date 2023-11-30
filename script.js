let myLibrary = [];

function generateUniqueId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
}  

function Book(author, title, pages, read) {
    this.id = generateUniqueId();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function openNav() {
    document.getElementById("sidebar").style.width = "300px";
    document.getElementById("main-content").style.marginLeft = "300px";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main-content").style.marginLeft= "0";
}

function addBook() {
    let author = document.getElementById('author').value;
    let title = document.getElementById('title').value;
    let noPages = document.getElementById('pages').value;
    let read = document.getElementById("read").checked;
    let book = new Book(author, title, noPages, read);
    myLibrary.push(book);
    displayBook(book, myLibrary.length - 1);
    clearForm();
    closeNav();
}

function displayBook(book) {
    let booksContainer = document.querySelector('.book-list');
    let bookCard = document.querySelector('.book-container').cloneNode(true);
    let buttons = bookCard.childNodes[7].childNodes;
    bookCard.id = book.id;
    buttons[1].id = book.id;
    buttons[3].id = book.id;
    if (book.read){
        buttons[3].classList.add('read-button');
        buttons[3].classList.remove('not-read-button');
        buttons[3].innerHTML = 'Read';
    }
    bookCard.childNodes.forEach((cardDetails) => {
        let details = cardDetails.childNodes[1];
        if (details) {
            if (details.id === 'title-name')
                details.innerHTML = book.title;
            else if (details.id === 'author-name')
                details.innerHTML = book.author;
            else if (details.id === 'page-number')
                details.innerHTML = book.pages;
            
        }  
    })
    buttons[1].addEventListener('click', (e) => {
        let booksContainer = document.querySelector('.book-list');
        let books = booksContainer.childNodes;
        for (let i = 1; i < books.length; i++){
            if (books[i].id === e.target.id){
                booksContainer.removeChild(books[i]);
                break;
            }
        };

        myLibrary = myLibrary.filter(book => book.id !== e.target.id)
    });
    buttons[3].addEventListener('click', (e) => {
        if (e.target.innerHTML === 'Read') {
            e.target.innerHTML = 'Not read';
            e.target.classList.remove('read-button');
            e.target.classList.add('not-read-button');
        } else {
            e.target.innerHTML = 'Read';
            e.target.classList.remove('not-read-button');
            e.target.classList.add('read-button');
        }
    })
    bookCard.style.display = 'block';
    booksContainer.append(bookCard);
}

function clearForm() {
    document.getElementById("bookForm").reset();
}
