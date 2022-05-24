

let cartItems = [];
let items = [];

var body = document.getElementsByTagName('body')[0];

var header = document.createElement('header');
header.classList.add('header-style');
body.appendChild(header);

var headerContainer = document.createElement('header-container');
headerContainer.classList.add('header-cont')
header.appendChild(headerContainer);

var anchor = document.createElement("a");
anchor.classList.add('a-style');
var textAnchor = document.createTextNode("BookShop")
anchor.setAttribute("href", "#");
anchor.appendChild(textAnchor);
headerContainer.appendChild(anchor);


var navBar = document.createElement('nav');
navBar.classList.add('nav-bar');
headerContainer.appendChild(navBar);

var listNavbar = document.createElement('ul');
listNavbar.classList.add('list-styles');
navBar.appendChild(listNavbar);


let listArr = ['Home', 'About', 'Contact'];
for( let i = 0; i < listArr.length; i++) {

    var listItems = document.createElement('li');
    var listAnchor = document.createElement('a');
    listAnchor.innerHTML = listArr[i];
    listAnchor.setAttribute("href", "#");
    listAnchor.classList.add('nav-anchor-class');
    // listItems.innerHTML = listArr[i];
    listNavbar.appendChild(listItems);
    listItems.appendChild(listAnchor);
}       

        var cartLI = document.createElement('li');
        var cart = document.createElement('i');
        cart.classList.add('fa-solid', 'fa-cart-arrow-down');
        cart.addEventListener('click',function(e){
            createCartContainer();
         });

        cart.addEventListener('drop',drop );
        cart.addEventListener("dragover", dragOver);
        cartLI.appendChild(cart);
        listNavbar.appendChild(cartLI);

var books = document.createElement('div');
books.classList.add("main-div");




function createCartContainer() {
    var cartBlock = document.createElement('div');
    cartBlock.classList.add('cart-block');

    var cart_header = document.createElement('div');
    var cart_content = document.createElement('div');
    cart_content.classList.add('cart_content');
    cartBlock.appendChild(cart_header);
    cartBlock.appendChild(cart_content);

    
    var cartTitle = document.createElement('h1');
    cartTitle.innerHTML = 'Cart';
    
    cart_header.appendChild(cartTitle);

    
    var priceEl = document.createElement('span');
    priceEl.classList.add('total-price');
    var totalPrice = 0;

    cartItems.forEach(element => {
        totalPrice += element.price;
    });


    cartItems.forEach( (book, index) => {

        priceEl.innerHTML = `Price: ${totalPrice} ₾`;
        
        var bookCont = document.createElement('div');
        bookCont.classList.add('book_container-cart');
        bookCont.id = index;
    
        bookCont.draggable = true;
        // bookCont.addEventListener('drag', drag); 
    
        var imageBlock = document.createElement('div');
        imageBlock.classList.add('image_container-cart');
        var infoBlock = document.createElement('div');
    
        var imageTag = document.createElement('img');
        imageTag.classList.add('cart-img');
        imageTag.draggable = false;
        imageTag.src = book.imageLink;
        imageTag.alt = book.title
        imageBlock.appendChild(imageTag);
        imageBlock.classList.add('cart-img');
    
        var author = document.createElement('span');
        author.innerHTML = book.author;
        infoBlock.appendChild(author);
    
        var title = document.createElement('h6');
        title.innerHTML = book.title;
        infoBlock.appendChild(title);        
    
        var price = document.createElement('span');
        price.classList.add('total-price-style');
        price.innerHTML = `Price: ${book.price}₾`;
    
        infoBlock.appendChild(price);

        
        var removeBat = document.createElement('button');
         removeBat.innerHTML = 'remove';
         removeBat.id = 'remove_button';
            
        removeBat.addEventListener('click', function(event) {
            var buttonClicked = event.target;
            cartItems.splice(index, 1);
            buttonClicked.parentElement.parentElement.remove();

            totalPrice -= book.price;

            priceEl.innerHTML = `Price: ${totalPrice} ₾`;

        } );


        infoBlock.appendChild(removeBat);        
    
        bookCont.appendChild(imageBlock);
        bookCont.appendChild(infoBlock);
        cart_content.appendChild(bookCont);    
       
    });
    
    var confirmBat = document.createElement('button');
    confirmBat.innerHTML = 'Confirm order';
    confirmBat.id = 'confirm_button';
    confirmBat.addEventListener('click', function(event) {
        window.open('./order.html');

    } );

    var closeCart = document.createElement('span');
    closeCart.classList.add('close-cart');
    closeCart.innerHTML = '&times;';

    closeCart.onclick = function() {
        cartBlock.style.display = "block";
    }
    window.onclick = function(event) {
        if (event.target == closeCart) {
            cartBlock.style.display = "none";
        }
    }

    cartBlock.appendChild(closeCart);
    cart_content.appendChild(priceEl);
    cart_content.appendChild(confirmBat);
    body.appendChild(cartBlock);
    
}





function openDescription(desc) {
    var modal = document.createElement('div');
    modal.classList.add('modal');
    modal.id = 'myModal';

    var cont = document.createElement('div');
    cont.classList.add('modal-content');

    var close = document.createElement('span');
    close.innerHTML = '&times;';
    close.classList.add('close');

    var description = document.createElement('p');
    // description.classList.add();
    description.innerHTML = desc;

    cont.appendChild(close);
    cont.appendChild(description);
    modal.appendChild(cont);

    close.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }

    return modal;
}

function showModal(modal) {
    body.appendChild(modal);
    modal.style.display = "block";
}

function addToCart(index) {
    cartItems.push(items[index]);
}

// function allowDrop(ev) {
//     ev.preventDefault();
//   }
  
//   function drag(ev) {
//     ev.dataTransfer.setData("book", ev.target.id);
//   }
  
//   function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("book");
//     console.warn(document.getElementById(data));
//   }
    dragBookTitle = "";
  function dragStart(e) {
    e.stopPropagation();
    let title = e.target.querySelector(".book_title").innerText;
    dragBookTitle = title;
    console.warn(dragBookTitle)
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function drop(e) {
      e.preventDefault();
      e.stopPropagation();
      cartItems = cartItems.concat(items.filter( book => book.title == dragBookTitle));
    console.warn(cartItems, items.filter( book => book.title == dragBookTitle));
    dragBookTitle = "";
  }

fetch('./books.json').then(response => {
    return response.json();
}).then(data => {
    items = data;
    data.forEach( (book, index) => {
        
        var bookCont = document.createElement('div');
        bookCont.classList.add('book_container');
        bookCont.id = index;

        bookCont.draggable = true;
        bookCont.addEventListener('dragstart', dragStart); 

        var imageBlock = document.createElement('div');
        imageBlock.classList.add('image_container');
        var infoBlock = document.createElement('div');

        var imageTag = document.createElement('img');
        imageTag.draggable = false;
        imageTag.src = book.imageLink;
        imageTag.alt = book.title
        imageBlock.appendChild(imageTag);

        var author = document.createElement('span');
        author.innerHTML = book.author;
        infoBlock.appendChild(author);

        var title = document.createElement('h4');
        title.classList.add('book_title');
        title.innerHTML = book.title;
        infoBlock.appendChild(title);        

        var price = document.createElement('span');
        price.innerHTML = `Price: ${book.price}₾`;

        infoBlock.appendChild(price);

        var showMore = document.createElement('button');
        showMore.innerHTML = 'Show More';
        showMore.id = 'show_more_button';
            
        var addToBag = document.createElement('button');
        addToBag.innerHTML = 'add to bag';
        addToBag.id = 'add_to_bag';
        // addToBag.addEventListener('click', addToCart,index);

        addToBag.addEventListener('click',function(e){
            addToCart(index);
         });
        // showMore.addEventListener('click', showModal(openDescription(book.description)));
        
        showMore.addEventListener('click',function(e){
            showModal(openDescription(book.description));
         });
        infoBlock.appendChild(showMore);
        infoBlock.appendChild(addToBag);

        bookCont.appendChild(imageBlock);
        bookCont.appendChild(infoBlock);
        books.appendChild(bookCont);

       
    });
    console.log(data);
    
});


body.appendChild(books);

