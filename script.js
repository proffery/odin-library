const formTitle = document.getElementById('title');
const formAuthor = document.getElementById('author');
const formPages = document.getElementById('pages');
const formReaded = document.getElementById('readed');
const formAdd = document.getElementById('add');
const formRemove = document.getElementById('remove');

let myLibrarry = [];

function Book(title, authorName, pages, readed) {
    this.title = title;
    this.authorName = authorName;
    this.pages = pages;
    this.readed = readed;
}

function addBookToLibrary() {
    if (isCorrect(title.value) && isCorrect(author.value)) {
        const newBook = new Book(title.value, author.value, pages.value, getChecked());
        myLibrarry.push(newBook);
   }
    else {
        console.log('incorrect input');
    }
    console.log(myLibrarry);
}

function isCorrect(val) {
    if (val.length < 3 || string.startsWith(' ')) {
        return false; 
    }
    else {
        return true;
    }
}
function getChecked() {
    if (formReaded.checked === true) {
        return true;
    }
    else {
        return false;
    }
}

formAdd.addEventListener('click', addBookToLibrary);