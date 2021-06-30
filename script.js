
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
const addItem = document.querySelector(".js-add-item-img");
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
  deleteImg.classList.add("delete_img")
  const deleteAnchor = document.createElement("a");
  deleteAnchor.setAttribute("title", "Delete Entry");
  deleteAnchor.setAttribute("href", "#");
  deleteAnchor.classList.add("delete_btn");
  deleteAnchor.appendChild(deleteImg);
  return deleteAnchor;
}

function editButtonBuild(){
  const editButton = document.createElement("input");
  editButton.setAttribute("type", "button");
  editButton.setAttribute("title", "Click This To Change Read Status");
  editButton.classList.add("edit_button");
  return editButton;

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
      //newtd.textContent = item.read;
      editButton = editButtonBuild();
      editButton.setAttribute("value",`${item.read}` )
      newtd.appendChild(editButton);
      trElement.appendChild(newtd);
    }

    else if(i==4){
      deleteAnchor = deleteButtonBuild();
      newtd.appendChild(deleteAnchor);
      trElement.appendChild(newtd);
    }

    tableBody.appendChild(trElement);
  }
}



/* remove all child nodes for table body - fresh for display */
function removeAllChildNodes(parent) {
  if(parent.firstChild){
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
   }
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
  removeEntry();
  editButtonFnc();
  

})




/*** Add event listner to delete entry***/

function removeEntry(){
  const deleteItems = document.querySelectorAll(".delete_btn");
  deleteItems.forEach(element => {
    element.addEventListener("click", ()=>{
      let tdCheck = element.parentElement;
      let idx = Number(tdCheck.className.replace(/\D+/g, ''));
      let conf = confirm("Are you sure you want to PERMANENTLY delete this entry?");
      if(conf){
        tdCheck.remove();
        myLibrary.splice(idx, 1);
        localStorage.setItem("library", JSON.stringify(myLibrary));
        displayTable();
        editButtonFnc();
        removeEntry();
      }

    })

});

}



/* add event listner for delete all button */
const deleteAll = document.querySelector(".js-delete-btn-all");
deleteAll.addEventListener("click", ()=> {
  let conf = confirm("Are you sure you want to permanently delete all entries?");
  if(conf){
    myLibrary=[];
    localStorage.setItem("library", JSON.stringify(myLibrary));
    displayTable();
  }

})



/* add event listner for edit button */

// function to change read status

function changeRead(newItem){
  if(newItem.read=="Read"){
    newItem.read = "Not Read Yet";
  }
  else if(newItem.read=="Not Read Yet"){
    newItem.read="Read";
  }

  return newItem;

}

function editButtonFnc(){
  const editAll = document.querySelectorAll(".edit_button");
  editAll.forEach(element =>{
    element.addEventListener("click", () => {
      let tdCheck = element.parentElement;
      let idx = Number(tdCheck.parentElement.className.replace(/\D+/g, ''));
      console.log(idx);
      myLibrary = JSON.parse(localStorage.getItem("library"));
      let newItem = myLibrary[idx];
      newItem = changeRead(newItem);
      myLibrary[idx]=newItem;
      element.setAttribute("value",`${newItem.read}`)
      localStorage.setItem("library", JSON.stringify(myLibrary));
    })
  })
}




//localStorage.setItem("library", JSON.stringify(myLibrary));


/**** on load of page display local storage if exists */
window.onload = function() {
  if(JSON.parse(localStorage.getItem("library"))) {
    displayTable();
    removeEntry();
    editButtonFnc();
    
  } 
};








