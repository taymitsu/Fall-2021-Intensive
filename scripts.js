import data from './data.js'

const itemsContainer = document.querySelector('#items');
const itemList = document.getElementById('item-list');
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');
const addForm = document.getElementById('add-form');
const itemName = document.getElementById('item-name');
const itemPrice = document.getElementById('item-price');

for (let i = 0; i < data.length; i += 1) {
  const newDiv = document.createElement('div');
  newDiv.className = 'item'
  const img = document.createElement('img');
  img.src = data[i].image;
  img.width = 300;
  img.height = 300;
  newDiv.appendChild(img);
  //console.log(img)
  itemsContainer.appendChild(newDiv);

  //NAME
  const name = document.createElement('P');
  name.innerText = data[i].name;
  newDiv.appendChild(name);

  ////////////////DESCRIPTION
  const desc = document.createElement('P');
  desc.innerText = data[i].desc;
  newDiv.appendChild(desc);
  ////////////////PRICE
  const price = document.createElement('P');
  price.innerText = data[i].price;
  newDiv.appendChild(price);

   ////////////////button
  const button = document.createElement('button');
  button.id = data[i].name;
  button.dataset.price = data[i].price;
  button.innerHTML = 'Add to Cart';
  newDiv.appendChild(button);
}

const all_items_button = Array.from(document.querySelectorAll('button'))

console.log(all_items_button)

all_items_button.forEach(elt => elt.addEventListener('click', () => {
  addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
  showItems()
}))

const cart = [];
///////////////////handle change event
itemList.onchange = function(e) {
  if (e.target && e.target.classList.contains('update')) {
    const name = e.target.dataset.name
    const qty = parseInt(e.target.value)
    updateCart(name, qty)
  }
}

//--------------handles clicks
itemList.onclick = function(e) {
  //console.log("clicked list!")
  //console.log(e.target)
  if (e.target && e.target.classList.contains('remove')) {
    const name = e.target.dataset.name
    removeItem(name)
  } else if (e.target && e.target.classList.contains('add-one')) {
    const name = e.target.dataset.name
    addItem(name)
  } else if (e.target && e.target.classList.contains('remove-one')) { 
    const name = e.target.dataset.name
    removeItem(name, 1)
  }
}

//ADD FORM-----------------------------------------------------------------------------------------
//addForm.onsubmit = function(e) {
  //e.preventDefault()
  //const name = itemName.value
  //const price = itemPrice.value
  //addItem(name, price)
//}

//ADD ITEM-----------------------------------------------------------------------------------------
function addItem(name, price) {
  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].name === name) { //updates exisiting item, to match quantity of duplicate item 
      cart[i].qty += 1
      showItems()
      return //stop code, incorrect duplicates 
    }
  }
   
  const item = {name, price, qty: 1} //qty must have a value
  cart.push(item)
}

//SHOW ITEMS----------------------------------------------------------------------------------------
function showItems() {
  const qty = getQty()
  cartQty.innerHTML = `You have ${qty} items in your cart`

  let itemStr = ''
  for (let i = 0; i < cart.length; i +=1) {
    const { name, price, qty } =  cart[i]
    itemStr += `<li>${name} $${price} x ${qty} = $${qty * price}
    <button class="remove" data-name="${name}">Remove</button>
    <button class="add-one" data-name="${name}">+</button>
    <button class="remove-one" data-name="${name}">-</button>
    <input class="update" type="number" data-name"${name}">
    </li>`
  }
  itemList.innerHTML = itemStr
  cartTotal.innerHTML = `Total in cart: $${getTotal()}`
}

//UPDATE CART-----------------------------------------------------------------
function updateCart(name, qty) {
  for (let i = 0; 1 < cart.length; i += 1) {
    if (cart[i].name === name) {
      if(qty < 1) {
        removeItem(name)
        return
      }
      cart[i].qty = qty
      showItems()
      return
    }
  }
}
//GET QUANTITY----------------------------------------------------------------------------------------
function getQty() {
  let qty = 0 //must be OUTSIDE  for loop, continues running total. inside = resets, BLOCK SCOPE
  for (let i = 0; i < cart.length; i += 1) {
      qty += cart[i].qty //corrects cart overall quantity 
  }
  return qty
}
//GET TOTAL---------------------------------------------------------------
function getTotal() {
  let total = 0
  for (let i = 0; i < cart.length; i += 1) {
      total += cart[i].price * cart[i].qty
  }
  return total.toFixed(2) //toFixed(desired amount of decimal places) LAST BEFORE DISPLAYING 
}

//REMOVE ITEM-------------------------------------------------------------
function removeItem(name, qty = 0) { //zero is default value
  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].name === name) { //comparing NAMES
      if (qty > 0) {
        cart[i].qty -= qty
      }
      if(cart[i].qty < 1 || qty === 0) {
        cart.splice(i, 1)
      }
      showItems()
      return 
    }
  }
}

