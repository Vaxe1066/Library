let myLibrary = [];




function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages=pages
    this.read=read
    readText = function() {
        if(read=="1"){
            return "read";
        }
        else{
            return "not read yet";
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
    
  }


  function displayT(myLibrary){
      for(let i=0; i<myLibrary.length; ++i){
           alert(myLibrary[i].title);
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
  

  myBut.addEventListener("click", () =>{
    myForm.style.display = "block";
  })

  span.addEventListener("click", () =>{
    myForm.style.display = "none";
  })




  submitBut.addEventListener("click", () => {
    addBookToLibrary(myLibrary);
    //alert(myLibrary[0].info());
    displayT(myLibrary);
    //let res = document.querySelector("form").reset();
    //myForm.style.display = "none";
  })




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