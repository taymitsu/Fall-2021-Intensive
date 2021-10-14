const carts = document.querySelectorAll('.add-cart');

for (let i = 0; 1 < carts.length; i++) {
    carts[i].addEventListener('click', () => { 
        cartNumbs();
    })
}

function cartNumbs() {
    let productNumbers = localStorage.getItem('cartNumbs');
    //console.log(productNumbs);

    productNumbs = parseInt(productNumbs);

    localStorage.setItem('cartNumbs', 1);
}