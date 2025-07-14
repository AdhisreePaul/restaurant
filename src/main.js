import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
// ... existing code ...
import '/src/style.css';

document.addEventListener('DOMContentLoaded', () => {
    // Reservation Modal Logic
    const modal = document.getElementById('reservation-modal');
    const openModalBtn = document.getElementById('open-reservation-modal');
    const closeModalBtn = document.querySelector('.close-button');
    const form = document.getElementById('reservation-form');

    if (modal && openModalBtn && closeModalBtn && form) {
        // Open modal
        openModalBtn.onclick = () => {
            modal.style.display = 'block';
        };

        // Close modal
        closeModalBtn.onclick = () => {
            modal.style.display = 'none';
        };

        // Close modal if user clicks outside of it
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
        
        // Form Validation
        const name = document.getElementById('res-name');
        const email = document.getElementById('res-email');
        const phone = document.getElementById('res-phone');
        const date = document.getElementById('res-date');
        const time = document.getElementById('res-time');
        const guests = document.getElementById('res-guests');

        const setError = (element, message) => {
            const formGroup = element.parentElement;
            const errorDisplay = formGroup.querySelector('.error-message');
            errorDisplay.innerText = message;
            formGroup.classList.add('error');
        };

        const setSuccess = (element) => {
            const formGroup = element.parentElement;
            const errorDisplay = formGroup.querySelector('.error-message');
            errorDisplay.innerText = '';
            formGroup.classList.remove('error');
        };
        
        const validateEmail = (email) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };
        
        const validatePhone = (phone) => {
            const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            return re.test(phone);
        };

        const validateForm = () => {
            let isValid = true;
            
            if(name.value.trim() === '') {
                setError(name, 'Name is required');
                isValid = false;
            } else {
                setSuccess(name);
            }

            if(email.value.trim() === '') {
                setError(email, 'Email is required');
                isValid = false;
            } else if (!validateEmail(email.value.trim())) {
                setError(email, 'Provide a valid email address');
                isValid = false;
            } else {
                setSuccess(email);
            }

            if(phone.value.trim() === '') {
                setError(phone, 'Phone number is required');
                isValid = false;
            } else if (!validatePhone(phone.value.trim())) {
                setError(phone, 'Provide a valid phone number (e.g., 123-456-7890)');
                isValid = false;
            } else {
                setSuccess(phone);
            }

            if(date.value === '') {
                setError(date, 'Date is required');
                isValid = false;
            } else {
                const today = new Date().toISOString().split('T')[0];
                if (date.value < today) {
                    setError(date, 'Date cannot be in the past');
                    isValid = false;
                } else {
                    setSuccess(date);
                }
            }

            if(time.value === '') {
                setError(time, 'Time is required');
                isValid = false;
            } else {
                setSuccess(time);
            }

            if(guests.value === '' || guests.value < 1) {
                setError(guests, 'Please enter a valid number of guests');
                isValid = false;
            } else {
                setSuccess(guests);
            }

            return isValid;
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm()) {
                alert('Reservation successful! We will contact you shortly to confirm.');
                form.reset();
                modal.style.display = 'none';
            }
        });
    }

    // Sticky Header Logic
    const header = document.getElementById('main-header');
    if (header) {
        const sticky = header.offsetTop;

        const stickyHeader = () => {
            if (window.pageYOffset > sticky) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        };

        window.addEventListener('scroll', stickyHeader);
    }
});

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
