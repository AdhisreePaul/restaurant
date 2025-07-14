document.addEventListener('DOMContentLoaded', () => {
    const reviewsGrid = document.getElementById('reviews-grid');
    const reviewForm = document.getElementById('review-form');

    // Default reviews if localStorage is empty
    const defaultReviews = [
        {
            name: 'Priya Sharma',
            rating: 5,
            image: 'https://i.pravatar.cc/150?img=1',
            comment: 'Absolutely authentic flavors! The Butter Chicken was creamy and delicious. Felt like I was back in Delhi. Highly recommend this place for a genuine Indian food experience.'
        },
        {
            name: 'David Miller',
            rating: 4,
            image: 'https://i.pravatar.cc/150?img=2',
            comment: 'Great atmosphere and friendly staff. The Naan was soft and fresh. The main course was a bit spicier than I expected, but still very tasty. I\'ll be back to try more dishes.'
        },
        {
            name: 'Chen Wang',
            rating: 5,
            image: 'https://i.pravatar.cc/150?img=3',
            comment: 'The best Hyderabadi Biryani I have had in a long time. The rice was perfectly cooked and the spices were balanced. A must-try for all biryani lovers!'
        }
    ];

    // Load reviews from localStorage or use defaults
    let reviews = JSON.parse(localStorage.getItem('reviews')) || defaultReviews;

    const saveReviews = () => {
        localStorage.setItem('reviews', JSON.stringify(reviews));
    };

    const renderStars = (rating) => {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<span class="star ${i <= rating ? 'filled' : ''}">★</span>`;
        }
        return stars;
    };

    const renderReviews = () => {
        reviewsGrid.innerHTML = '';
        reviews.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';
            reviewCard.innerHTML = `
                <div class="review-header">
                    ${review.image ? `<img src="${review.image}" alt="${review.name}" class="reviewer-img">` : ''}
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <div class="review-rating">${renderStars(review.rating)}</div>
                    </div>
                </div>
                <p class="review-comment">"${review.comment}"</p>
            `;
            reviewsGrid.appendChild(reviewCard);
        });
    };

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('reviewer-name').value;
        const rating = document.querySelector('input[name="rating"]:checked').value;
        const comment = document.getElementById('review-text').value;

        const newReview = {
            name,
            rating: parseInt(rating),
            // Using a random placeholder image for new reviews
            image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
            comment
        };

        // Add to the beginning of the array
        reviews.unshift(newReview);
        saveReviews();
        renderReviews();
        reviewForm.reset();
    });

    // Initial render
    renderReviews();
}); 