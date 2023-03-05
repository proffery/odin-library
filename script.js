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
    function removeBook() {
    }
    
}

function addBookToLibrary() {
    const newBook = new Book(formTitle.value, formAuthor.value, formPages.value, getChecked())
    myLibrarry.push(newBook);
    console.log(myLibrarry);
}

function getChecked() {
    if(formReaded.checked === true) {
        return true;
    }
    else {
        return false;
    }
}


formAdd.addEventListener('click', addBookToLibrary);