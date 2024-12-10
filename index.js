let cart = []
let stock = {
    "BingoOriginal": 10,
    "BingoNachos": 10,
    "Ruffles": 10,
    "Lays": 10,
    "Pringles": 10,
    "Bourbon": 10,
    "DarkFantasy": 10,
    "Hide&Seek": 10,
    "Oreo": 10,
    "KitKat": 10,
    "Feastables": 10,
    "Snickers": 10
};

const coupons = {
    "SAVE10": 10, 
    "SAVE20": 20, 
    "FLAT50": 50  
};

function additems(productName, productPrice,productKey) {
    if (stock[productKey] > 0) {
        stock[productKey] -= 1;
        updateStockDisplay(productKey);
    } else {
        alert(`Sorry, ${productName} is out of stock.`);
        return
    }
    const existingItem = cart.find(item => item.name === productName)
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const product = { name: productName, price: productPrice, quantity: 1 }
        cart.push(product)
    }
}
function updateStockDisplay(productKey) {
    const quantityElement = document.getElementById(`quantity-${productKey}`);
    if (quantityElement) {
        quantityElement.textContent = `Quantity: ${stock[productKey]}`;
    }
}

function applyCoupon(total, couponCode) {
    const discountPercentage = coupons[couponCode.toUpperCase()]
    if (discountPercentage) {
        if (discountPercentage <= 100) {
            return (total * discountPercentage) / 100
        } else {
            return discountPercentage
        }
    }
    return 0
}

function viewcart() {
    const modal = document.getElementById('cartModal')
    const cartItems = document.getElementById('cartItems')
    const totalPrice = document.getElementById('totalPrice')
    const discountElement = document.getElementById('discount')
    const couponInput = document.getElementById('couponCode')

    cartItems.innerHTML = ''

    if (cart.length === 0) {
        cartItems.innerHTML = '<li>Your cart is empty.</li>'
        totalPrice.textContent = ''
        discountElement.textContent = ''
    } else {
        let total = 0

        cart.forEach((item, index) => {
            const li = document.createElement('li')
            li.textContent = `${index + 1}. ${item.name} - ₹${item.price} (Quantity: ${item.quantity})`
            cartItems.appendChild(li)
            total += item.price * item.quantity;
        });

        const couponCode = couponInput.value.trim()
        const discount = applyCoupon(total, couponCode)
        const finalTotal = total - discount

        totalPrice.textContent = `Total: ₹${total}`
        if (discount > 0) {
            discountElement.textContent = `Discount (${couponCode}): ₹${discount.toFixed(2)} (Final Total: ₹${finalTotal.toFixed(2)})`
        } else if (couponCode) {
            discountElement.textContent = `Invalid Coupon Code! No discount applied.`
        } else {
            discountElement.textContent = ''
        }
    }

    modal.style.display = 'block'
}

let selectedPaymentMethod = ''

function selectPaymentMethod(method) {
    selectedPaymentMethod = method

    document.getElementById('upiSection').style.display = 'none'
    document.getElementById('cardSection').style.display = 'none'

    if (method === 'UPI') {
        document.getElementById('upiSection').style.display = 'block'
    } else if (method === 'Credit/Debit Card') {
        document.getElementById('cardSection').style.display = 'block'
    }
}

function checkout() {
    const cartItems = document.getElementById('cartItems')
    if(cartItems.innerHTML == '<li>Your cart is empty.</li>')
    {
        alert("Add Something to Cart")
        return
    }
    if (!selectedPaymentMethod) {
        alert("Please select a payment method before proceeding.")
        return
    }

    if (selectedPaymentMethod === 'UPI') {
        const upiId = document.getElementById('upiId').value
        if (!upiId) {
            alert("Please enter your UPI ID.")
            return
        }
        alert(`UPI ID: ${upiId} selected. Proceeding to payment.`)
    } else if (selectedPaymentMethod === 'Credit/Debit Card') {
        const cardInsert = document.getElementById('cardInsert').value
        if (!cardInsert) {
            alert("Please insert your card.")
            return
        }
        alert(`Card inserted: ${cardInsert}. Proceeding to payment.`)
    }

    cart = []
    document.getElementById('cartItems').innerHTML = '<li>Your cart is empty.</li>'
    document.getElementById('totalPrice').textContent = ''
    document.getElementById('discount').textContent = ''
    document.getElementById('upiId').value = ''
    document.getElementById('quantity').textcontent= 10
    document.getElementById('upiSection').style.display = 'none'
    document.getElementById('cardSection').style.display = 'none'
    closeCart();
}

function closeCart() {
    const modal = document.getElementById('cartModal')
    modal.style.display = 'none'
}

window.onclick = function(event) {
    const modal = document.getElementById('cartModal')
    if (event.target === modal) {
        modal.style.display = 'none'
    }
}
