var likeButtons = document.querySelectorAll(".like-btn");
var cartButtons = document.querySelectorAll(".add-to-cart");

var shoppingCart = (function() {

  cart = [];
  
  // Constructor
  function Item(name, price, count, image) {
    this.name = name;
    this.price = price;
    this.count = count;
    this.image  = image;
  }

  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  
  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(name, price, count, image) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count, image);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

   // Remove all items from cart
   obj.removeItemFromCartAll = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  return obj;
})();


function displayCart() {
  var cartArray = shoppingCart.listCart();
  console.log(cartArray);
  var output = "";
  for(var i in cartArray) {
    output += "<div class='item'> <div class='buttons'>"
      + "<span class='delete-btn'  data-name=" + cartArray[i].name + "><img src='delete-icn.svg' /></span>"
      + "</div>"

      + "<div class='image'>"
      + "<img src='./image/"+ cartArray[i].image + "' id='photo' />"
      + "</div>"
      + "<div class='description'>"
      + "<span><strong>"+ cartArray[i].name +"</strong></span>"
      + "</div>"
      + "<div class='quantity'>"
      + "<button class='plus-btn' type='button' name='button' data-name=" + cartArray[i].name + ">"
      + "<img src='plus.svg' />"
      + "</button>"
      + "<input type='text' name='name' class='qte' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'/>"
      + "<button class='minus-btn' type='button' name='button' data-name=" + cartArray[i].name + ">"
      + "<img src='minus.svg' />"
      + "</button>"
      + "</div>"

      +"<div class='total-price'>"+ cartArray[i].total +" €</div>"
      + "</div>"

  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-btn", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


// // -1
$('.show-cart').on("click", ".minus-btn", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// // +1
$('.show-cart').on("click", ".plus-btn", function(event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// // Item count input
$('.show-cart').on("change", ".qte", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();


for (var i = 0; i < cartButtons.length; i++) {
  cartButtons[i].addEventListener("click", function () {
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    var image = $(this).data('image');
    shoppingCart.addItemToCart(name, price, 1, image);
    displayCart();
  });
}

//like items
for (var i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener("click", function () {
    this.classList.toggle("is-active");
  });
}


