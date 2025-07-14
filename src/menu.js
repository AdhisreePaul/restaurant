document.addEventListener('DOMContentLoaded', () => {
    const menuData = {
        Breads: {
            path: 'breads',
            items: [
                { file: 'naan.jpg', name: 'Butter Naan', price: 3.00, veg: true },
                { file: 'paratha.jpg', name: 'Lachha Paratha', price: 3.50, veg: true },
            ]
        },
        'Main-Course': {
            path: 'main_course',
            items: [
                { file: 'dal-makhani-restaurant-style-veg-recipes-21.webp', name: 'Dal Makhani', price: 12.00, veg: true },
                { file: 'paneer-butter-masala-1a.jpg', name: 'Paneer Butter Masala', price: 14.00, veg: true },
                { file: 'punjabi-chole-masala-recipe-2.webp', name: 'Punjabi Chole', price: 11.00, veg: true },
                { file: 'rajma-masala-veg-recipes-7.webp', name: 'Rajma Masala', price: 11.00, veg: true },
                { file: 'Shahi-Paneer_FI-640x853.jpg', name: 'Shahi Paneer', price: 14.50, veg: true },
                { file: 'chicken_tikka.jpg', name: 'Chicken Tikka Masala', price: 15.00, veg: false },
            ]
        },
        Desserts: {
            path: 'desserts',
            items: [
                { file: 'Air-Fried-Pumpkin-Shakarparas_EXPS_RC21_259957_B05_13_6b.jpg', name: 'Shakarpara', price: 6.00, veg: true },
                { file: 'Gulab-Jamun_EXPS_FT24_275769_EC_031924_2.jpg', name: 'Gulab Jamun', price: 5.00, veg: true },
                { file: 'Indian-Kulfi-Ice-Cream_EXPS_FT23_242404_ST_0824_6.jpg', name: 'Kulfi', price: 5.50, veg: true },
                { file: 'Indian-Rice-and-Carrot-Pudding_EXPS_TOHEDSCODR21_133550_E04_28_1b.jpg', name: 'Gajar ka Halwa', price: 6.50, veg: true },
                { file: 'rasmalai-indian-dessert.jpg', name: 'Rasmalai', price: 7.00, veg: true },
            ]
        },
        'Cold-Drinks': {
            path: 'drinks',
            items: [
                { file: 'cucumber.jpg', name: 'Cucumber Cooler', price: 4.00, veg: true },
                { file: 'falooda-1024x576.jpg', name: 'Falooda', price: 6.00, veg: true },
                { file: 'mojito_mocktail-1024x576.jpg', name: 'Mint Mojito', price: 5.00, veg: true },
                { file: 'raw_green_mango_drink-1024x576.jpg', name: 'Aam Panna', price: 4.50, veg: true },
            ]
        },
    };

    function createCard(item, categoryPath) {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.dataset.veg = item.veg;

        card.innerHTML = `
            <img src="/images/${categoryPath}/${item.file}" alt="${item.name}" class="menu-card-img">
            <div class="menu-card-info">
                <h4>${item.name}</h4>
                <p class="price">$${item.price.toFixed(2)}</p>
                <button class="add-to-order-btn">Add to Order</button>
            </div>
        `;
        return card;
    }

    const grids = {
        Breads: document.getElementById('breads-grid'),
        'Main-Course': document.getElementById('main-course-grid'),
        Desserts: document.getElementById('desserts-grid'),
        'Cold-Drinks': document.getElementById('cold-drinks-grid'),
    };

    for (const category in menuData) {
        const { path, items } = menuData[category];
        items.forEach(item => {
            const card = createCard(item, path);
            grids[category].appendChild(card);
        });
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const categories = document.querySelectorAll('.menu-category');
    const vegOnlyToggle = document.getElementById('veg-only-toggle');

    function filterMenu() {
        const selectedCategory = document.querySelector('.filter-btn.active').dataset.category;
        const vegOnly = vegOnlyToggle.checked;

        categories.forEach(category => {
            const categoryId = category.id.replace('-section', '');
            const categoryName = Object.keys(menuData).find(key => key.toLowerCase() === categoryId.replace('-', ''));
            
            if (selectedCategory === 'all' || menuData[categoryName].path.replace('_', '-') === selectedCategory.toLowerCase()) {
                category.style.display = 'block';
            } else {
                category.style.display = 'none';
            }

            const cards = category.querySelectorAll('.menu-card');
            let hasVisibleCards = false;
            cards.forEach(card => {
                const isVeg = card.dataset.veg === 'true';
                if (!vegOnly || isVeg) {
                    card.style.display = 'block';
                    hasVisibleCards = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            if (!hasVisibleCards) {
                category.style.display = 'none';
            }
        });
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterMenu();
        });
    });

    vegOnlyToggle.addEventListener('change', filterMenu);

    filterMenu();
}); 