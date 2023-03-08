const formTitle = document.getElementById('title');
const formAuthor = document.getElementById('author');
const formPages = document.getElementById('pages');
const formReaded = document.getElementById('readed');
const formAdd = document.getElementById('add');
const library = document.querySelector('.library');
let removeButtons = document.querySelectorAll('.remove');
const info = document.querySelector('.info');

let myLibrarry = [
    {
        title: 'Solaris',
        authorName: 'Stanislaw Lem',
        pages: 204,
        readed: true,
    },
    {
        title: '2001: A Space Odyssey',
        authorName: 'Arthur C. Clarke',
        pages: 221,
        readed: true,
    },

    {
        title: 'Ender\'s Game',
        authorName: 'Orson Scott Card',
        pages: 324,
        readed: true,
    },
];

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
    e.preventDefault();
    if (formTitle.value.length < 3) {
        const msg = 'Title must be longer than 2';
        checkInput(formTitle, msg);
    }
    else if (formAuthor.value.length < 3) {
        
        checkInput(formAuthor, 'Authot name must be longer than 2');
    }
    else if (formPages.value % 1 != 0 || formPages.value < 1 || formPages.value > 3000) {
        
        checkInput(formPages, '1-3000');
    }
    else {
        const newBook = new Book(formTitle.value, formAuthor.value, formPages.value, formReaded.checked);
        myLibrarry.push(newBook);
        renderLibrary();
    }

    removeButtons = document.querySelectorAll('.remove');
}

function checkInput(input, msg) {
    const warningBox = document.createElement("div");
    warningBox.className = "warning";
    warningBox.innerHTML = msg;
    
    if (document.body.contains(warningBox)) {
        clearTimeout(warningTimeout);
    }
    else {
        input.parentNode.insertBefore(warningBox, input.nextSibling);
    }
    warningTimeout = setTimeout(() => {
        warningBox.parentNode.removeChild(warningBox);
        warningTimeout = -1;
    }, 2000);
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
        title.textContent = `${myLibrarry[i].title}`;
        bookCard.appendChild(title);

        let authorName = document.createElement('div');
        authorName.textContent = `${myLibrarry[i].authorName}`;
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
        bookCard.appendChild(remove);

        remove.addEventListener('click', removeBook);
        renderInfo();
    }
}

function renderInfo() {
    while (info.firstChild) {
        info.removeChild(info.firstChild);
    }
    let infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');
    info.appendChild(infoContainer);


    let booksTotal = document.createElement('p');
    booksTotal.textContent = `Books: ${myLibrarry.length}`;
    infoContainer.appendChild(booksTotal);

    let booksReadedCount = 0;
    let booksUnreadedCount = 0;
    for (let i = 0; i < myLibrarry.length; i++) {
        if (myLibrarry[i].readed) {
            booksReadedCount++;
        }
        else {
            booksUnreadedCount++;
        }
    }
    let booksReaded = document.createElement('p');
    booksReaded.textContent = `Books readed: ${booksReadedCount}`;
    infoContainer.appendChild(booksReaded);
    let booksUnreaded = document.createElement('p');
    booksUnreaded.textContent = `Books unreaded: ${booksUnreadedCount}`;
    infoContainer.appendChild(booksUnreaded);
    
    let pagesCount = 0;
    let pagesReadedCount = 0;
    let pagesUnreadedCount = 0;
    for (let i = 0; i < myLibrarry.length; i++) {
        if (myLibrarry[i].readed) {
            pagesReadedCount += parseInt(myLibrarry[i].pages);
        }
        else {
            pagesUnreadedCount += parseInt(myLibrarry[i].pages);
        }
        pagesCount += parseInt(myLibrarry[i].pages);
    }

    let pagesTotal = document.createElement('p');
    pagesTotal.textContent = `Pages: ${pagesCount}`;
    infoContainer.appendChild(pagesTotal);
    let pagesReaded = document.createElement('p');
    pagesReaded.textContent = `Pages readed: ${pagesReadedCount}`;
    infoContainer.appendChild(pagesReaded);
    let pagesUnreaded = document.createElement('p');
    pagesUnreaded.textContent = `Pages unreaded: ${pagesUnreadedCount}`;
    infoContainer.appendChild(pagesUnreaded);
}

function changeStatus(e) {
    myLibrarry[e.target.id].readed = !myLibrarry[e.target.id].readed;
    renderLibrary();
}

function removeBook(e) {
    myLibrarry.splice(e.target.id, 1);
    renderLibrary();
    renderInfo();
    removeButtons = document.querySelectorAll('.remove');
}
renderLibrary();
renderInfo();
formAdd.addEventListener('click', addBookToLibrary);