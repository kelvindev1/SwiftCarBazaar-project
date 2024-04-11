const btn = document.querySelector('.btn-toogle');
btn.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
    const theme = document.getElementById('theme-link');
    if (document.body.classList.contains('dark-theme')) {
        theme.href = "dark-theme.css";
    } else {
        theme.href = "light-theme.css";
    }
});


const loginInputPass = document.getElementById('pass');
const registerInputPass = document.getElementById('Register-pass');
const confirmRegPass = document.getElementById('confirmPassword');
const showPasswordCheckbox = document.getElementById('show-password');
const showPasswordCheckbox2 = document.getElementById('show-password2');
showPasswordCheckbox.addEventListener('change', () => {
    if (showPasswordCheckbox.checked) {
        loginInputPass.type = 'text';
    } else {
        loginInputPass.type = 'password';
    }
});
showPasswordCheckbox2.addEventListener('change', () => {
    if (showPasswordCheckbox2.checked) {
        registerInputPass.type = 'text';
        confirmRegPass.type = 'text';
    } else {
        registerInputPass.type = 'password';
        confirmRegPass.type = 'password';
    }
});

const loginTab = document.getElementById('Login-tab');
const registerTab = document.getElementById('Register');
const formsSection = document.getElementById('forms-section');
const loginForm = document.getElementById('Login-form');
const registerForm = document.getElementById('Register-form');
loginTab.addEventListener('click', () => {
    showForm(loginForm, registerForm);
});
registerTab.addEventListener('click', () => {
    showForm(registerForm, loginForm);
});
showForm(loginForm, registerForm);

function showForm(formToShow, formToHide) {
    formToShow.style.display = 'block';
    formToHide.style.display = 'none';
    formsSection.innerHTML = '';
    formsSection.appendChild(formToShow);
}


const carsList = document.getElementById('carslist');
const wishlist = [];

const wishlistContainer = document.createElement('div');
wishlistContainer.id = 'wisheslist';
document.body.appendChild(wishlistContainer);

const showWishlistButton = document.createElement('button');
showWishlistButton.textContent = 'My wishlist';
showWishlistButton.addEventListener('click', () => {
    displayWishlist();
});

document.body.appendChild(showWishlistButton);

fetch("http://localhost:3000/swiftCars")
    .then(Response => Response.json())
    .then(data => {
        data.forEach(car => {
            const li = document.createElement('li');

            const addtoWishlistButton = document.createElement('button');
            addtoWishlistButton.textContent = 'Add to wishlist';
            addtoWishlistButton.addEventListener('click', () => {
                const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                wishlist.push(car);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                displayWishlist();
            });

            const bidButton = document.createElement('button');
            bidButton.textContent = 'Place  bid';
            bidButton.addEventListener('click', () => {

            });


            const imgAnchor = document.createElement('a');
            imgAnchor.href = car.image;

            const img = document.createElement('img');
            img.id = 'car-image';
            img.src = car.image;
            img.alt = `${car.make}${car.model}`;
            img.width = 260;
            img.height = 180;

            imgAnchor.appendChild(img);

            const detailsDiv = document.createElement('div');
            const makeHeading = document.createElement('h3');
            makeHeading.textContent = car.make;
            const modelHeading = document.createElement('h4');
            modelHeading.textContent = car.model;
            const priceParagraph = document.createElement('p');
            priceParagraph.textContent = `Price: ${car.price}`;
            const mileageParagraph = document.createElement('p');
            mileageParagraph.textContent = `Mileage: ${car.mileage} Kms`;
            const transmissionParagraph = document.createElement('p');
            transmissionParagraph.textContent = `Transmission: ${car.transmissiontype}`;

            detailsDiv.appendChild(makeHeading);
            detailsDiv.appendChild(modelHeading);
            detailsDiv.appendChild(priceParagraph);
            detailsDiv.appendChild(mileageParagraph);
            detailsDiv.appendChild(transmissionParagraph);

            li.appendChild(imgAnchor);
            li.appendChild(detailsDiv);
            li.appendChild(addtoWishlistButton);
            li.appendChild(bidButton);

            carsList.appendChild(li);
        });
    })
    .catch(error => {
        console.log('Error fetching cars data', error);
    });

function displayWishlist() {
    const wishlistContainer = document.getElementById('wisheslist');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistContainer.innerHTML = '';
    const ul = document.createElement('ul');
    wishlist.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.make}${item.model}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'DELETE';
        deleteButton.addEventListener('click', () => {
            wishlist.splice(index, 1);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            displayWishlist();
        });
        li.appendChild(deleteButton);

        ul.appendChild(li);
    });
    wishlistContainer.appendChild(ul);
}