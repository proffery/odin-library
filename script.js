const formTitle = document.getElementById('title');
const formAuthor = document.getElementById('author');
const formPages = document.getElementById('pages');
const formReaded = document.getElementById('readed');
const formAdd = document.getElementById('add');
const library = document.querySelector('.library');
let removeButtons = document.querySelectorAll('.remove');;

let myLibrarry = [];

function Book(title, authorName, pages, readed) {
    this.title = title;
    this.authorName = authorName;
    this.pages = pages;
    this.readed = readed;
}

// Book.prototype.changeStatus = function () {
//     this.readed = !this.readed;
// };

function addBookToLibrary(e) {
    if (formTitle.value.length < 3 || formAuthor.value.length < 3 || formPages.value % 1 != 0 || formPages.value < 1) {
        console.log('INPUT ERROR');
    }
    else {
        const newBook = new Book(formTitle.value, formAuthor.value, formPages.value, formReaded.checked);
        myLibrarry.push(newBook);
        renderLibrary();
    }
    console.log(myLibrarry);
    removeButtons = document.querySelectorAll('.remove');
    console.log(removeButtons);
    e.preventDefault();
}

function renderLibrary () {
    const allBooks = document.querySelectorAll('.card')
    allBooks.forEach(book => book.remove());

    for (let i = 0; i < myLibrarry.length; i++) {
        let bookCard = document.createElement('div');
        bookCard.id = (`${[i]}`);
        bookCard.classList.add('card');
        library.appendChild(bookCard);

        let title = document.createElement('div');
        title.textContent = `Book: ${myLibrarry[i].title}`;
        bookCard.appendChild(title);

        let authorName = document.createElement('div');
        authorName.textContent = `Author: ${myLibrarry[i].authorName}`;
        bookCard.appendChild(authorName);

        let pages = document.createElement('div');
        pages.textContent = `Pages: ${myLibrarry[i].pages}`;
        bookCard.appendChild(pages);

        let statusDiv = document.createElement('div');
        statusDiv.classList.add('status-container');
        bookCard.appendChild(statusDiv);

        let statusLabel = document.createElement('label');
        statusLabel.setAttribute('for', `readed${i}`);
        statusLabel.textContent = 'Readed:';
        statusDiv.appendChild(statusLabel);

        let status = document.createElement('input');
        status.id = (`${i}`)
        status.setAttribute('type', "checkbox");
        if (myLibrarry[i].readed) {
            bookCard.classList.add('book-card-readed');
            status.setAttribute('checked', '');
        }
        else {
            bookCard.classList.add('book-card-unreaded');
        }
        statusDiv.appendChild(status);
        status.addEventListener('change', changeStatus);

        let remove = document.createElement('button');
        remove.classList.add('remove');
        remove.id = (`${i}`);
        remove.textContent = 'Remove';
        bookCard.appendChild(remove);

        remove.addEventListener('click', removeBook);
    }
}

function changeStatus(e) {
    myLibrarry[e.target.id].readed = !myLibrarry[e.target.id].readed;
    renderLibrary();
}

function removeBook(e) {
    myLibrarry.splice(e.target.id, 1);
    renderLibrary();
    removeButtons = document.querySelectorAll('.remove');
}

formAdd.addEventListener('click', addBookToLibrary);