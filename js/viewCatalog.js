// Функція виводу товарів у каталог
function viewCatalog(){
   fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(catalog => {

         catalog = catalog.slice(0, 30);

         const viewCatalog = $('.js-view-catalog');

         catalog.forEach(product => {
            
            // Заглядаємо з чого складається наш товар
            console.log(product);

            viewCatalog.append(`
               <div class="card position-relative">
                  <img class="cart__img w-100" src="img/catalog/${product.id}.jpg" alt="">
                  <div class="content w-100 position-absolute">
                     <div class="content__row">
                        <div class="details">
                           <h2 class="details__title">${product.title}</h2>
                           <p class="details__text">${product.body}</p>
                        </div>
                        <div class="price">$1100</div>
                     </div>
                     <div class="content__button">
                        <button
                           data-img="${product.id}.jpg"
                           data-title="${product.title}"
                           data-id="${product.id}"
                           data-text="!!kkjhjhkhkj)"
                           data-count="1"
                           data-price="1100"
                           data-price-summ="1100"
                           class="cart-btn w-100 js-card-add">Додати в корзину</button>
                     </div>
                  </div>
               </div>
            `)
         });
      })
}

// Викликаємо функцію для виводу товарів у каталог
if(params.page == 'page-catalog') {
   viewCatalog();
}