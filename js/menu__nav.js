//Добавляєм клас active при кліку на кнопку навігації
const menuItems = document.querySelectorAll('.js-menu__nav-link');

menuItems.forEach(item => {
  item.addEventListener('click', function() {
    // Видаляємо клас "active" з усіх елементів меню
    menuItems.forEach(item => {
      item.classList.remove('active');
    });

    // Додаємо клас "active" до натиснутого елементу меню
    this.classList.add('active');
  });
});