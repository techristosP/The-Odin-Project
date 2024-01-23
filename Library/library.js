let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype._toggleRead = function() {
    this.read = !this.read;
    displayBooks();
}

function toggleRead(index) {
    myLibrary[index]._toggleRead();
    displayBooks();
}

function displayBooks() {
    let library = document.querySelector('#library');
    library.style.display = 'flex';
    library.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];

        let bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        library.appendChild(bookCard);

        let title = document.createElement('div');
        title.classList.add('title');
        title.textContent = book.title;
        bookCard.appendChild(title);

        let author = document.createElement('div');
        author.classList.add('author');
        author.textContent ='by ' + book.author;
        bookCard.appendChild(author);

        let pages = document.createElement('div');
        pages.classList.add('pages');
        pages.textContent = book.pages + ' pages';
        bookCard.appendChild(pages);

        let read = document.createElement('div');
        read.textContent = book.read ? `Read` : `Not Read`;
        bookCard.appendChild(read);

        let removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            removeBookFromLibrary(i);
        });
        bookCard.appendChild(removeBtn);

        let readBtn = document.createElement('button');
        readBtn.classList.add('read-btn');
        readBtn.textContent = 'Toggle Read';
        readBtn.addEventListener('click', () => {
            toggleRead(i);
        });
        bookCard.appendChild(readBtn);
    }
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayBooks();

}

function addBookToLibrary() {
    // do stuff here
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

let bookBtn = document.querySelector('#book-btn');
bookBtn.addEventListener('click', () => {
    let newBookForm = document.querySelector('#book-form');
    newBookForm.style.display = 'flex';
});

document.querySelector('#submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary();
    // document.querySelector('#book-form').style.display = 'none';
});