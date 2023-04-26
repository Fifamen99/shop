// Ключ для localstorage
const cartKey = 'cartList';

//Масив який зберігає товари
let cart = getCart();


//Цифра кількості товарів
let cartNum = 0;


// Функція, яка буде зберігати товари
function saveCart(newCart = '')
{
	// Якщо ми не передали аргумент функції, тоді присвоюємо змінній глобальний масив cart
	newCart = (newCart) ? newCart : cart;

	// Зберігаємо додані товари
	localStorage.setItem(cartKey, JSON.stringify(cart));
}


// Функція, яка дістає дані з localStorage
function getCart()
{
	// Отримуємо дані з localStorage
	const data = JSON.parse( localStorage.getItem(cartKey) );

	// Повертаємо масив
	return (isNaN(data)) ? data : [];
}


// Перевірка на число
function isNumber(num) {
	return typeof num === 'number' && !isNaN(num);
}



/**
 * Функція виводу html коду продукту
 */
function viewProducts()
{
	//Наповнення товарами HTML
	let listItems = '';

	//Формуємо цифру тварів
	cartNum = cart.length;

	// Щось робимо коли товарів немає
	if(cartNum == 0) {

		// Ховаємо елемент цифри підрахунку товарів
		$('.js-card-button .js-order-num').addClass('hide');

		// Виводимо повідомлення про те, що товарів немає
		listItems += `<div class="product__contant">
							<ul class="product__cart">
								<li class="product__cart-list position-relative">
									<h2 class="title">У вашому кошику</h2>
									<p class="product__remove position-absolute js-product-remove">x</p>
									
								</li>
							</ul>
						</div>
					<li class="no-result">
						<img src="img/empty-cart.png" alt="" class="no-result__img">
						<h3	class="no-result__title">Корзина пуста</h3>
					</li>`;
	} else {

		// Якщо елемент цифри прихований показуємо цей елемент
		$('.js-card-button .js-order-num').removeClass('hide');

		listItems += `<div class="product__contant">
							<ul class="product__cart">
								<li class="product__cart-list position-relative">
									<h2 class="title">У вашому кошику</h2>
									<p class="product__remove position-absolute js-product-remove">x</p>
									
								</li>
							</ul>
						</div>`

		//Перебераються товари
		$.each(cart, function(index, product) {

			//Наповнюємо списком товарам
			listItems += `<li class="cartItem-product">
							<div class="product d-flex position-relative">
								<div class="product__img">
									<img src="img/catalog/${product.img}" alt="" class="product__img-card w-100">
								</div>
								<div class="product__info">
									<p class="product__info-text">${product.title}</p>
									<h2 class="product__info-title">${product.text}</h2>
									<div class="product__count d-flex">
										<div class="button-count">
											<button class="button-count__btn button-count__btn-add js-cart-input-count" data-for-input="#cart-count-1" data-type="plus">+</button>
											<input type="text" min="1" class="button-count__input js-set-count" value="${product.count}" id="cart-count-1" />
											<button class="button-count__btn button-count__btn-minus js-cart-input-count" data-for-input="#cart-count-1" data-type="minus">-</button>
										</div>
										<div class="product__price">
											<p class="product__price-info">${product.priceSumm}</p>
										</div>
									</div>
								</div>
								<p class="cartItem-product__remove d-flex justify-content-center align-items-center position-absolute js-cart-remove" data-premove-id="${index}">x</p>
							</div>
						</li>`;

		});

		listItems += `<a href="cart.html" class="cart__order-btn w-100 d-block text-center">Оформити замовлення</a>`;
	}

	//Виводимо цифру в html 
	$('.js-order-num').html(cartNum);

	// Виводимо в HTML товари
	$('.js-list-products').html(listItems);
}

// Вивід товарів 
viewProducts();



// Показуємо або приховуємо корзину
$(document).ready(function() {
  $(".js-card-button").click(function() {
    $(".js-list-products").removeClass('hide');
    $(".js-list-products").addClass('show');
  });

  $(".js-product-remove").click(function() {
  	$(".js-list-products").removeClass('show');
    $(".js-list-products").addClass('hide');
  });
});


/**
 * Кнопка добавлення в корзину
 */
$(".js-card-add").click(function()
{
	// Витягуємо елемент по якому був клік
	const card = $(this);

	// Інформація про товар
	const product = card.data();

	// Записуємо інформацію про товар до загального списку
	cart.push(product);

	// Зберігаємо товар
	saveCart();

	// Виводимо в HTML товари
	viewProducts();	
});



/**
 * Кнопка видаленя товару
 */
$(document).on( "click", ".js-cart-remove", function()
{
	// Витягуємо елемент кнопкі видалення товару
	const el = $(this);

	// Витягуємо ключ масиву
	const removeId = el.data('premoveId');

	// Видаляємо товар
	cart.splice(removeId, 1);

	// Зберігаємо товар
	saveCart();

	// Виводимо в HTML товари
	viewProducts();
});





/**
 * Слідкуємо за зміною кількості товарів
 */
$(".js-set-count").change(function()
{
	// Витягуємо елемент кнопкі видалення товару
	const input = $(this);

	// Витягуємо значення кількості з поля
	let inputValue = Number(input.val());
	
	// Перевіряємо чи значення є цифрою
	if(!isNumber(inputValue)) {
		inputValue = 1;
		input.val(inputValue);
	}

	// Отримуємо ключик масиву
	const key = input.data('countId');

	// Клонуємо наш масив, щоб потім йому оновити кість
	const cloneCart = cart;

	//Змінюємо кількість товару відносно цифри, яка прийшла з input
	cloneCart[key].count = Number(inputValue);

	// Змінювати сумму замовлення відносно кількості
	cart = cloneCart;

	// Зберігаємо товар
	saveCart(cart);
});



// Вішаємо клік на кнопку добавлення кількості товарів
$(document).on('click', '.js-cart-input-count', function(event) {
	
	// Витягуємо кнопку по якому був клік
	const el = $(this);

	// Витягуємо селектор input з яким будемо працювати
	const inputId = el.data('for-input');

	// Тип кнопки
	const type = el.data('type');	

	// Отримуємо input
	let input = $(inputId);

	// Отримуємо значення input
	const intupCount = Number(input.val());
	
	// Змінна призначена для цифри кількості
	let count = 0;

	// Збільшуємо кількість або зменшуємо кількість
	if(type == 'plus'){
		count = intupCount + 1;
	} else {

		if(intupCount > 0 ){
			count = intupCount - 1;
		}
	}

	

	// Збільшуємо кількість в input
	input.val(count);
});