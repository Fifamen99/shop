/**
 * Функція виводу html коду продукту на сторінці корзини
 */
function viewOrderProducts()
{
	//Наповнення товарами HTML
	let listItems = '';

	//Формуємо цифру тварів
	cartNum = cart.length;

	// Щось робимо коли товарів немає
	if(cartNum != 0) {

		//Перебераються товари
		$.each(cart, function(index, product) {
			// console.log("index", index, product);

			//Наповнюємо списком товарам
			listItems += `<div class="cartItem-order-product">
	        		<input type="hidden" name="product[0][id]" value="${index}">
	        		<input type="hidden" name="product[0][title]" value="${product.title}">
	        		<input type="hidden" name="product[0][price]" value="${product.price}">
	        		<input type="hidden" name="product[0][count]" value="${product.count}">

	        		<div class="cartItem-order-product__text">
		        		<img src="${product.img}" alt="" class="cartItem-order-product__img">
		        		<h3 class="cartItem-order-product__title">${product.title}</h3>
	        		</div>
	        		<div class="cartItem-order-product__numbers">
	        			<div class="cartItem-order-product__number">
	        				<div class="cartItem-order-product__number-label">Ціна:</div>
	        				<div class="price cartItem-order-product__number-value">${product.price}</div>
	        			</div>
	        			<div class="cartItem-order-product__number">
	        				<div class="cartItem-order-product__number-label">Кількість:</div>
	        				<div class="button-count">
							    <button class="button-count__btn button-count__btn-add js-cart-input-count" data-for-input="#cart-count-1" data-type="plus">+</button>
							    <input type="text" min="1" class="button-count__input js-set-count" value="${product.count}" id="cart-count-1" />
							    <button class="button-count__btn button-count__btn-minus js-cart-input-count" data-for-input="#cart-count-1" data-type="minus">-</button>
							</div>
	        			</div>
	        			<div class="cartItem-order-product__number">
	        				<div class="cartItem-order-product__number-label">Сума:</div>
	        				<div class="cartItem-order-product__number-value"><span id="amount" class="amount">${product.priceSumm}</span></div>
	        			</div>
	        		</div>
	        	</div>`;

		});
	}

	// Виводимо в HTML товари
	$('.js-list-order-products').html(listItems);
}

// Вивід товарів 
viewOrderProducts();