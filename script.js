const myLibrary = [];

function Book(author, title, pages, read) {
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

function displayBook(book, index) {
    let booksContainer = document.querySelector('.book-list');
    let bookCard = document.querySelector('.book-container').cloneNode(true);
    let buttons = bookCard.childNodes[7].childNodes;
    buttons[1].id = index;
    buttons[3].id = index;
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
    bookCard.style.display = 'block';
    booksContainer.append(bookCard);
}

function clearForm() {
    document.getElementById("bookForm").reset();
}