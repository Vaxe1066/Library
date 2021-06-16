let myLibrary = [];


/* Storgae Functions */

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}


if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
    console.log("Yes");
  }
  else {
    // Too bad, no localStorage for us
    console.log("no");
  }


function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages=pages
    this.read=read
    readText = function() {
        if(read=="1"){
            return "Read";
        }
        else{
            return "Not Read Yet";
        }
    }
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, ${readText()}`;
    }
}





function addBookToLibrary(myLibrary) {
    let title= document.querySelector(".title").value;
    let author = document.querySelector(".author").value;
    let pages = document.querySelector(".pages").value;
    let read = document.querySelector(".read").value;
    let item = new Book(title, author, pages, read);
    myLibrary.push(item);
    return item;
    
  }


  function displayT(myLibrary){
      for(let i=0; i<myLibrary.length; ++i){
           console.log((myLibrary[i].info()));
      }

  }



  const displayBut = document.querySelector('.disp');
  displayBut.addEventListener("click", () => {
    displayT(myLibrary);

  });


  /*
  const addItemBut = document.querySelector('.addItem');
  addItemBut.addEventListener("click", () =>{
    addBookToLibrary(myLibrary);
  })  */




  const myForm = document.querySelector(".myForm");
  const myBut = document.querySelector(".addItem");
  const span = document.querySelector(".close");
  const submitBut = document.querySelector(".subbtn")
  
  
  const EmyForm = document.querySelector(".EmyForm");
  const EsubmitBut = document.querySelector(".Esubbtn");
  const Espan = document.querySelector(".Eclose");

  myBut.addEventListener("click", () =>{
    myForm.style.display = "block";
  })

  span.addEventListener("click", () =>{
    myForm.style.display = "none";
  })





  function remove() {
    const checkboxes = document.querySelectorAll('.checkbox:checked');
    Array.prototype.forEach.call(checkboxes, function(checkbox) {
     let tdCheck = checkbox.parentElement;
     tdCheck.parentElement.remove();
    });
 }

 const removeBut = document.querySelector('.rem');

function addRemButton(){
  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((checkbox) =>{
    checkbox.addEventListener("change", ()=>{
     if(checkbox.checked){
       removeBut.style.display = "block";

      }
    })
    
 
  })
}







 
 let tbodyEl = document.querySelector('.tableBody')
 removeBut.addEventListener("click", () => {
    remove();
    const trEl = document.createElement('tr');
    if(tbodyEl.contains(trEl)){
      removeBut.style.display = 'block';
    }
    else{
      removeBut.style.display = "none";
    }

  })

  function addRow(item){

    const bodyEl = document.querySelector('.tableBody');
    const trEl = document.createElement('tr');

    if(!myLibrary.length){
        trEl.classList.add("td_0");
      }
      else {
        trEl.classList.add("td_" + myLibrary.length)
      }
    

    for(let i=0; i<6; ++i){
      //const trEl = document.querySelector('.tRow');
      const newtd = document.createElement('td');
      

      if(i==0){
        const inputEl = document.createElement('input');
        inputEl.setAttribute("type", "checkbox");
        inputEl.classList.add('checkbox');
        newtd.appendChild(inputEl);
        trEl.appendChild(newtd);
      }
      else if(i==1){
        newtd.textContent = item.title;
        trEl.appendChild(newtd);
      }
      else if(i==2){
        newtd.textContent = item.author;
        trEl.appendChild(newtd);
      }
      else if(i==3){
        newtd.textContent = item.pages;
        trEl.appendChild(newtd);
      }
      else if(i==4){
        newtd.textContent = readText(item.read);
        //newtd.textContent = item.read;
        trEl.appendChild(newtd);
      }
      else if(i==5){
        const editBut = document.createElement('input');
        editBut.setAttribute("type", "button");
        editBut.setAttribute("value", "edit");
        if (!myLibrary.length){
          editBut.classList.add('_0');
        }
        else{
          editBut.classList.add("_" + myLibrary.length);
        }
        trEl.appendChild(editBut);
      }

      bodyEl.appendChild(trEl);

    }


  }



  submitBut.addEventListener("click", () => {
    item = addBookToLibrary(myLibrary);
    addRow(item);

    let res = document.querySelector("form").reset();
    myForm.style.display = "none";
    addRemButton();
    editRow();

  
  })

function editRow(){
    const editButtonEl = document.querySelector("._1");
    editButtonEl.addEventListener("click", ()=>{
      EmyForm.style.display = "block";
    
      let par = editButtonEl.parentElement;
      let idx = Number(par.className.replace(/\D+/g, ''));
      console.log(idx);
      
  
      let Etitle = document.querySelector(".Etitle");
      let Eauthor = document.querySelector(".Eauthor");
      let Epages  = document.querySelector(".Epages");
      let Eread = document.querySelector(".Eread");

      Etitle.value = myLibrary[idx-1].title;
      Eauthor.value =  myLibrary[idx-1].author;
      Epages.value  =  myLibrary[idx-1].pages;
      Eread.value = myLibrary[idx-1].read;
  
      const Espan = document.querySelector(".Eclose");
      Espan.addEventListener("click", () =>{
        EmyForm.style.display = "none";
      })
    })
}









//const window=document.querySelector("body");


// When the user clicks anywhere outside of the modal, close it
/*window.addEventListener("click", function(event) {
  if (event.target == myForm) {
    myForm.style.display = "none";
  }
})*/



/*item = new Book('The Hobbit', 'Tolkein', 295, 0);
const item1 = new Book('LOTR', 'Tolkein', 1000, 0);
const item2 = new Book('Brave New World', 'Huxley', 372, 1);

myLibrary.push(item, item1, item2);*/


//console.log(item.info());

//addBookToLibrary(myLibrary);