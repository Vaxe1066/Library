
let myLibrary = [];
 
/*Create my book constructor here*/
function Book(title, author, pages, read){
  this.title = title
  this.author = author
  this.pages=pages
  this.read=read
}

/*use prototype to create a function which returns information */
Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}



/*create add event listner to add items button for the form to appear */
const myForm = document.querySelector(".js-my-form");
const addItem = document.querySelector(".js-add-item");
const closeBtn = document.querySelector(".close");

addItem.addEventListener("click", () =>{
  myForm.style.display = "block";
})

closeBtn.addEventListener("click", () =>{
  myForm.style.display = "none";
})


/*add book the library function */
function addBookToLibrary(myLibrary, title, author, pages, checkBox) {
  let read="";
  if (checkBox.checked){
    read = "Read"
  }
  else{
    read = "Not Read Yet"
  }
  //let read = document.querySelector(".read").value;
  let item = new Book(title, author, pages, read);
  myLibrary.push(item);
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

/* reset and close form after display function */
function formReset(){
  let res = document.querySelector(".js-the-form").reset();
  myForm.style.display = "none";
}

function deleteButtonBuild() {
  const deleteImg = document.createElement('img');
  deleteImg.setAttribute("src", "icons8-delete-bin-48.png");
  const deleteAnchor = document.createElement("a");
  deleteAnchor.setAttribute("title", "Delete Entry");
  deleteAnchor.setAttribute("href", "#");
  deleteAnchor.classList.add("delete-btn");
  deleteAnchor.appendChild(deleteImg);
  return deleteAnchor;
}


/* add row to the DOM function to be used in the display function */
function addRow(item, id){
  const tableBody = document.querySelector(".js-table-body");
  const trElement = document.createElement('tr');
  trElement.classList.add("td-" + id);

  for(let i=0; i<5; ++i){
    const newtd = document.createElement('td');
    if(i==0){
      newtd.textContent = item.title;
      trElement.appendChild(newtd);
    }
    else if(i==1){
      newtd.textContent = item.author;
      trElement.appendChild(newtd);
    }
    else if(i==2){
      newtd.textContent = item.pages;
      trElement.appendChild(newtd);
    }
    else if(i==3){
      newtd.textContent = item.read;
      trElement.appendChild(newtd);
    }

    else if(i==4){
      deleteAnchor = deleteButtonBuild();
      trElement.appendChild(deleteAnchor);
    }

    tableBody.appendChild(trElement);
  }
}



/* remove all child nodes for table body - fresh for display */
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function displayTable(){
  const containerRem = document.querySelector('.js-table-body');
  removeAllChildNodes(containerRem);

  myLibrary = JSON.parse(localStorage.getItem("library"));
  //let myLibrary = localStorage.getObj("library");
  for(let j=0; j<myLibrary.length; ++j){
    let itm = myLibrary[j];
    addRow(itm, j);
  }
}


/**** on load of page display local storage if exists */
window.onload = function() {
  if(JSON.parse(localStorage.getItem("library"))) {
    displayTable();
    
  } 
};

  
/* add event listener - on submit of form add to library */
const submitBut = document.querySelector(".js-submit-btn");
submitBut.addEventListener("click", () => {
  let title= document.querySelector(".title").value;
  let author = document.querySelector(".author").value;
  let pages = document.querySelector(".pages").value;
  /*Do checkbox for read */
  let checkBox = document.querySelector(".checkbox");

  addBookToLibrary(myLibrary, title, author, pages, checkBox);
  formReset();
  displayTable();
  

})







