const carts = document.querySelectorAll('.add-cart');

let products = [
{
    name: 'Calathea Orbifolia',
    price: 25,
    inCart: 0
}, 
]
for (let i = 0; 1 < carts.length; i++) {
    carts[i].addEventListener('click', () => { 
        cartNumbs();
    })
}

function cartNumbs() {
    let productNumbs = localStorage.getItem('cartNumbs');
    //console.log(productNumbs);

    productNumbs = parseInt(productNumbs);
    
    if(productNumbs){
        localStorage.setItem('cartNumbs', productNumbs + 1);
    } else {
        localStorage.setItem('cartNumbs', 1);
    }
}