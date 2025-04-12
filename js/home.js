const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');


navToggle.addEventListener('click',()=>{
    navMenu.classList.add('show-menu')
});

navClose.addEventListener('click',()=>{
    navMenu.classList.remove('show-menu')
});


const slider = document.getElementById('slider');

 function activate(e) {
    const items= document.querySelectorAll('.slider-item');
    e.target.matches(`.next`) && slider.append (items[0]);
    e.target.matches(`.prev`) && slider.prepend (items[items.length - 1]);
 }
 document.addEventListener('click' , activate);


 let navLinks = document.querySelectorAll(".carosel .nav-links .nav-link");
 let slides = document.querySelectorAll(".carosel .slides img");
 let overlays = document.querySelectorAll(".carosel .bar");
 let overlayBg = document.querySelector(".overlay-bg");
 let maxZindex = navLinks.length;
 let easeInOutQuart = "cubic-bezier(0.77 , 0 , 0.175 , 1)";
 
 
 slides[0].classList.add("active");
 slides[0].style.display ="block";
 navLinks[0].classList.add("active");
   
 const getBarColor = (bar) =>{
    return bar.style.getPropertyValue("--bar-color") || "#ffffff";
 };

   

 navLinks.forEach((navLink , activeIndex) => {
   
    (overlays[activeIndex]).style.zIndex =`${navLinks.length - activeIndex}`;
    
    navLink.addEventListener("click" , ()=>{
       
        let newBgColor = getBarColor(overlays[activeIndex]);
        overlayBg.style.backgroundColor = newBgColor;


        navLinks.forEach(navLink => navLink.classList.remove("active"));
        slides.forEach(slide => slide.classList.remove("active"));
       slides.forEach (slide => slide.display ="none");

       navLink.classList.add("active");
       let activeSlide = slides[activeIndex];
       activeSlide.classList.add("active") ;
          let currentSlide =document.querySelectorAll(".carosel .slides img.active");
         activeSlide.animate(
            [
                {transform : "translateX(0) , opacity:  1"},
                {transform : "translateX(5%) , opacity:  0"}
            ],
            {
                duration: 600,
                easing: "ease-in",
                fill:"forwards"
            }
        );
       
   
        maxZindex += 1;
        let activeOverlay = overlays[activeIndex];
        (activeOverlay).style.zIndex =`${maxZindex}`;
        activeOverlay.animate(
            [{ transform:"scaleX(0)"},{ transform:"scaleX(1)"} ],
            {duration:1200, fill:"forwards" , easing:easeInOutQuart}
        );
    
    });

 }) ;

   

const closeCart=document.querySelector('.close')
const iconCart=document.querySelector('.icon-card')
const body=document.querySelector('body')


const slidesWrapper =document.querySelector('.slides-wrapper');
const listCartHtml = document.querySelector('.listCart');
const iconCartSpan = document.querySelector('icon-card span');



let cart =[];
let products=[];
let currentSlide=0;


iconCart.addEventListener('click' ,()=>{
    body.classList.toggle('showCart');
});
 closeCart.addEventListener('click', ()=> {

    body.classList.toggle('showCart');
 } );




 const fetchproducts = async ()=> {
     try{
        const response = await fetch("https://fakestoreapi.com/products");
        if(!response.ok) throw new Error("NetWork resposne was not ok");
            products = await response.json(); 
            addDataToHtml();
        
     }
   catch(error){
    console.log('error fetching products ' , error);
   }
    }

     const addDataToHtml=() =>{
        slidesWrapper.innerHTML='';
        if(products.length>0){
            let slideItem;
            products.forEach((product,index)=>{
                if (index %6 ===0){
                    slideItem=document.createElement('DIV');
                    slideItem.classList.add('slide-item');
                    slidesWrapper.appendChild(slideItem);
                }
                let newProduct=document.createElement('div');
                newProduct.dataset.id=product.id;
                newProduct.classList.add('product-item');
                newProduct.innerHTML= ` <a href="product.html?id=${product.id}">
              <img src="$(product.image)" alt="product-image" />
              <h2>${product.title}</h2>
            <div class="price">$ ${product.price}</div>
             </a>
          <button class="addCart">Add to cart</button>
                `;
                slideItem.appendChild(newProduct)
            });
        }
     };
      
     document.querySelector('.slide-next').addEventListener('click', () =>{
        const totalSlides = document.querySelectorAll('.slide-item').length;
        if(currentSlide < totalSlides - 1){
            currentSlide++;
            slidesWrapper.style.transform =`translateX(-${currentSlide * 100}%)`;
        }
     });
     document.querySelector('.slide-prev').addEventListener('click', () =>{
    
        if(currentSlide > 0){
            currentSlide--;
            slidesWrapper.style.transform =`translateX(-${currentSlide * 100}%)`;
        }
     });
     fetchproducts();

     slidesWrapper.addEventListener('click', (event)=>{
        let positionClick=event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
     });

     const addToCart= (product_id)=>{
        let positionThisProductInCart = cart.findIndex((value)=>value.product_id == product_id);
        if(cart.length <=0){
            cart =[{
                product_id:product_id,
                quantity:1
            }];
        }else if (positionThisProductInCart < 0){
            cart.push({
                product_id:product_id,
                quantity:1
            });
        } else{
            cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity +1;
        }
        addCartToHTML();
        addCartToMemory();
     };
     const addCartToMemory =() => {
        localStorage.setItem('cart', JSON.stringify(cart));
     };

     const addCartToHTML =() => {
        listCartHtml.innerHTML ='';
        let totalQuantity = 0;
        let totalPrice = 0;
        if(cart.length > 0) {
            cart.forEach(item => {
                totalQuantity += item.quantity;
                let positionProduct = products.findIndex((value) => value.id == item.product_id);
                let info = products[positionProduct];

                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.dataset.id = item.product_id;
                newItem.innerHTML =`<div class="image">
             <img src="${info.image}">
              </div>
              <div class="name">
             ${info.title}
            </div>
           <div class="totalPrice">$${info.price * item.quantity}</div>
           <div class="quantity">
            <span class="minus"></span>
           <span>${item.quantity}</span>
           <span class="plus"></span>
            </div>
                `;
                listCartHtml.appendChild(newItem);
                totalPrice += info.price * item.quantity;
            });
        }
        iconCartSpan.innerText = totalQuantity;

        let totalPriceDiv = document.createElement('div');
        totalPriceDiv.classList.add('total-price');
        totalPriceDiv.innerHTML =`<strong>TotalPrice: $${totalPrice.toFixed(2)}</strong>`;
        listCartHtml.appendChild(totalPriceDiv);
     };
     listCartHtml.addEventListener('click', (event) =>{
        let positionClick = event.target;
        if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
            let product_id=positionClick.parentElement.dataset.id;
            let typr=positionClick.contains('plus')?
            'plus':'minus';
            changeQuntityCart(product_id,type);
        }
     });
     const changeQuntityCart =(product_id,type) => {
        let pospositionItemInCart = cart.findIndex((value) => value.product_id ==product_id);
        if(pospositionItemInCart >= 0){
            switch (type){
                case 'plus':
                    cart[pospositionItemInCart].quantity = cart[pospositionItemInCart].quantity + 1;
                    break;
                    default:
                        let changeQuntity = cart[pospositionItemInCart].quantity - 1;
                        if(changeQuntity > 0){
                            cart[pospositionItemInCart].quantity = changeQuntity;
                        }else{
                            cart.splice(pospositionItemInCart,1);
                        }
                        break;
            }
        }
        addCartToHTML();
        addCartToMemory();
     };

     const initApp = ()=>{
        fetchproducts();

        if(localStorage.getItem('cart')){
            cart =JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
     };
     initApp();