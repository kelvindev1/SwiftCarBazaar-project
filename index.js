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
const registerInputPass = document.getElementById('Register-pass')
const confirmRegPass = document.getElementById('confirmPassword')
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
const formsSection = document.getElementById('accountsForms-section');
const loginForm = document.getElementById('Login-form');
const registerForm = document.getElementById('Register-form');
loginTab.addEventListener('click', (event) => {
    formsSection.style.display = 'block';
    event.preventDefault();
    showForm(loginForm, registerForm);
});
registerTab.addEventListener('click', (event) => {
    formsSection.style.display = 'block';
    event.preventDefault();
    showForm(registerForm, loginForm);
});
showForm(loginForm, registerForm);

function showForm(formToShow, formToHide) {
    formToShow.style.display = 'block';
    formToHide.style.display = 'none';
    formsSection.innerHTML = '';
    formsSection.appendChild(formToShow);
}

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (loginInputPass.value === registerInputPass.value) {
        if (loginForm.checkValidity()) {
            alert('You have successfully logged in!');
        } else {
            loginForm.reportValidity();
        }
    } else {
        alert('You don\'t have an existing account with us. Please register first.');
    }
});

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (registerInputPass.value === confirmRegPass.value) {
        if (registerForm.checkValidity()) {
            alert('You have successfully registered with us!');
        } else {
            registerForm.reportValidity();
        }
    } else {
        alert('Passwords do not match!');
    }
});


const carsList = document.getElementById('carslist');
const wishlist = [];


const wishlistContainer = document.createElement('div');
wishlistContainer.id = 'wisheslist';


const buyersWishlistButton = document.createElement('button');
buyersWishlistButton.textContent = 'Buyers wishlist';
buyersWishlistButton.addEventListener('click', () => {
    displayWishlist();
});


fetch("http://localhost:3000/swiftCars")
    .then(Response => Response.json())
    .then(data => {
        data.forEach(car => {
            const li = document.createElement('li');

            const addtoWishlistButton = document.createElement('button');
            addtoWishlistButton.textContent = 'Add to wishlist';
            addtoWishlistButton.addEventListener('click', () => {
                const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                if (wishlist.some(car => car.id === car.id)) {
                    alert(`${car.make} ${car.model} already exists in your wishlist !`);
                } else {
                    wishlist.push(car);
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    alert(`You have added ${car.make} ${car.model} to your wishlist.`);
                }
            });


            const bidButton = document.createElement('button');
            bidButton.textContent = 'Place  bid';
            let formShown = false;

            bidButton.addEventListener('click', () => {
                const bidFormContainer = document.createElement('div');
                bidFormContainer.className = "bid-form-Container";

                if (!formShown) {
                    bidFormContainer.style.display = "block";
                    formShown = true;

                    const bidForm = document.createElement('form');
                    bidForm.id = "bid-form";
                    bidForm.innerHTML = `
                    <label for="bid-amount">Bid Amount:</label><br>
                    <input type="number" id="bid-amount" name="bid-amount" required><br>
                    <label for="bidder-name">Bidder Name:</label><br>
                    <input type="text" id="bidder-name" name="bidder-name" placeholder="Enter your name" required><br>
                    <label for="bidder-Email">bidder-Email:</label><br>
                    <input type="email" id="bidder-Email" name="bidder-Email" placeholder="abcd@gmail.com" required> <br>
                    
                    <input type="submit" value="Place Bid">
                    `;

                    bidFormContainer.appendChild(bidForm);
                    bidButton.parentNode.insertBefore(bidForm, bidButton.nextSibling);
                    bidButton.style.display = 'block';

                    bidForm.addEventListener('submit', (event) => {
                        event.preventDefault();

                        const formData = new FormData(bidForm);
                        const bidAmount = formData.get('bid-amount');
                        const bidderName = formData.get('bidder-name');
                        const bidderEmail = formData.get('bidder-Email');

                        alert(`You have successfully placed a bid with us for $${bidAmount}. Please wait for confirmation via email at ${bidderEmail}.`);

                        bidForm.reset();
                    });
                } else {
                    bidFormContainer.style.display = "none";
                    formShown = false;
                    bidButton.style.display = 'none';
                }

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
            li.appendChild(buyersWishlistButton);
            li.appendChild(wishlistContainer);

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
    if (wishlist.length > 0) {
        wishlistContainer.classList.remove('hidden');
    }
    wishlistContainer.appendChild(ul);
}



document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    var emailContent = 'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Subject: ' + subject + '\n\n' +
        message;

    var mailtoLink = 'mailto:kelvinmutugi336@gmail.com?subject=' + subject + '&body=' + encodeURIComponent(emailContent);

    alert('Email client opened with pre-filled message. Hit OK to Proceed.');
    window.location.href = mailtoLink;
});