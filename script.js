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

function addBookToLibrary(e) {
    if (formTitle.value.length < 3 || formAuthor.value.length < 3) {
        console.log('INPUT ERROR');
    }
    else {
        const newBook = new Book(formTitle.value, formAuthor.value, formPages.value, formReaded.checked);
        myLibrarry.push(newBook);

        let bookCard = document.createElement('div');
        bookCard.id = (`${myLibrarry.length - 1}`);
        if (myLibrarry[myLibrarry.length - 1].readed) {
            bookCard.classList.add('book-card-readed');
        }
        else {
            bookCard.classList.add('book-card-unreaded');
        }
        library.appendChild(bookCard);
        let title = document.createElement('div');
        title.textContent = `${myLibrarry[myLibrarry.length - 1].title}`;
        bookCard.appendChild(title);
        let authorName = document.createElement('div');
        authorName.textContent = `${myLibrarry[myLibrarry.length - 1].authorName}`;
        bookCard.appendChild(authorName);
        let pages = document.createElement('div');
        pages.textContent = `${myLibrarry[myLibrarry.length - 1].pages}`;
        bookCard.appendChild(pages);
        let remove = document.createElement('button');
        remove.classList.add('remove');
        remove.id = (`${myLibrarry.length - 1}`);
        remove.textContent = '-';
        bookCard.appendChild(remove);
        remove.addEventListener('click', removeBook);
    }
    console.log(myLibrarry);
    removeButtons = document.querySelectorAll('.remove');
    console.log(removeButtons);
    e.preventDefault();
}

function removeBook(e) {
    const removeDiv = document.querySelector(`div[id="${e.target.id}"]`);
    library.removeChild(removeDiv);
    // myLibrarry.splice(e.target.id, 1);
    console.log(myLibrarry);
}

formAdd.addEventListener('click', addBookToLibrary);