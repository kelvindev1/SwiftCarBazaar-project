// select the button with class `.btn-toogle` .
const btn = document.querySelector('.btn-toogle');
// add event listener that executes the function when the button is clicked.
btn.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
    const theme = document.getElementById('theme-link');
    //execute the code if body element has the class ` dark-theme`.
    if (document.body.classList.contains('dark-theme')) {
        theme.href = "dark-theme.css";
    } else {
        theme.href = "light-theme.css";
    }
});

//select fields and assigns them a variable.
const loginInputPass = document.getElementById('pass');
const registerInputPass = document.getElementById('Register-pass')
const confirmRegPass = document.getElementById('confirmPassword')
const showPasswordCheckbox = document.getElementById('show-password');
const showPasswordCheckbox2 = document.getElementById('show-password2');
//Toogle password visibility 
showPasswordCheckbox.addEventListener('change', () => {
    // check if "show password" checkbox is checked
    if (showPasswordCheckbox.checked) {
        //change the input type to text for visibility
        loginInputPass.type = 'text';
    } else {
        //change input type to password hidding
        loginInputPass.type = 'password';
    }
});
showPasswordCheckbox2.addEventListener('change', () => {
    // change input type based on checkbox state
    if (showPasswordCheckbox2.checked) {
        registerInputPass.type = 'text'; //change to text for visible password 
        confirmRegPass.type = 'text'; // change to text for visible password confirmation
    } else {
        registerInputPass.type = 'password'; // change back to password for hidden input 
        confirmRegPass.type = 'password'; // change back to password for hidden confirmation
    }
});

//select fields and assigns them a variable
const loginTab = document.getElementById('Login-tab');
const registerTab = document.getElementById('Register');
const formsSection = document.getElementById('accountsForms-section');
const loginForm = document.getElementById('Login-form');
const registerForm = document.getElementById('Register-form');
// Display forms section and prevent default event behaviour
loginTab.addEventListener('click', (event) => {
    formsSection.style.display = 'block';
    event.preventDefault();
    showForm(loginForm, registerForm); //show login form and hide register form
});
//Displays forms section and prevent form submission
registerTab.addEventListener('click', (event) => {
    formsSection.style.display = 'block';
    event.preventDefault();
    showForm(registerForm, loginForm);
});
showForm(loginForm, registerForm); //show registration form

//Function to display a form and hide another
function showForm(formToShow, formToHide) {
    formToShow.style.display = 'block'; //set display property of formToShow to 'block'
    formToHide.style.display = 'none'; // set display property of formToHide to 'none'
    formsSection.innerHTML = ''; //Empty the formsSection element
    formsSection.appendChild(formToShow); //Append formToShow to formsSection
}

loginForm.addEventListener('submit', (event) => {
    // Prevent form from submitting normally
    event.preventDefault();
    // Check if passwords match
    if (loginInputPass.value === registerInputPass.value) {
        //Check if form is valid
        if (loginForm.checkValidity()) {
            alert('You have successfully logged in!'); //Alert successful login
        } else {
            loginForm.reportValidity(); //Display errors
        }
    } else {
        //Alert need to register
        alert('You don\'t have an existing account with us. Please register first.');
    }
});

registerForm.addEventListener('submit', (event) => {
    // Prevent default form submission
    event.preventDefault();
    //Check if passwords match
    if (registerInputPass.value === confirmRegPass.value) {
        //Check if form is valid
        if (registerForm.checkValidity()) {
            alert('You have successfully registered with us!');
        } else {
            registerForm.reportValidity(); //Display form errors
        }
    } else {
        //Alert user of password mismatch
        alert('Passwords do not match!');
    }
});

// Select the field with id'carslist' and assign it a variable 
const carsList = document.getElementById('carslist');
const wishlist = []; //initialize an empty array for the wishlist 

// Create a div element for the wishlist container and assign it a variable
const wishlistContainer = document.createElement('div');
wishlistContainer.id = 'wisheslist';

// Create buyers Wishlist button
const buyersWishlistButton = document.createElement('button');
buyersWishlistButton.textContent = 'Buyers wishlist';
//Function to display wishlist
buyersWishlistButton.addEventListener('click', () => { //add event listener to the buttton
    displayWishlist(); //Call the displayWishlist function
});

//Fetch data from API
fetch("http://localhost:3000/swiftCars")
    .then(Response => Response.json()) //Parse JSON response
    .then(data => {
        data.forEach(car => {
            // Create a list item elment for each car
            const li = document.createElement('li');

            //Create add to wishlist button
            const addtoWishlistButton = document.createElement('button');
            addtoWishlistButton.textContent = 'Add to wishlist';

            // Add an event listener to the add t wishlist button
            addtoWishlistButton.addEventListener('click', () => {
                // Get the wishlist from local storage
                const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                // Check if the car already exists inthe wishlist
                const existingCar = wishlist.find(item => item.make === car.make && item.model === car.model);
                if (existingCar) { // check if so and display the alert 
                    alert(`${car.make} ${car.model} already exists in your wishlist !`);
                } else {
                    // Add the car to the wishlist 
                    wishlist.push(car);
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    alert(`You have added ${car.make} ${car.model} to your wishlist.`);
                }
            });

            //Create bid button
            const bidButton = document.createElement('button');
            bidButton.textContent = 'Place  bid';
            let formShown = false;

            //Add event listener to  bid button
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

            // Create an anchor element for the car image 
            const imgAnchor = document.createElement('a');
            imgAnchor.href = car.image;

            // create an image element for the car image
            const img = document.createElement('img');
            img.id = 'car-image';
            img.src = car.image;
            img.alt = `${car.make}${car.model}`;
            img.width = 260;
            img.height = 180;

            // Append the image to the anchor element
            imgAnchor.appendChild(img);

            // Create a div element for the car details
            const detailsDiv = document.createElement('div');
            const makeHeading = document.createElement('h3');
            makeHeading.textContent = car.make;
            const modelHeading = document.createElement('h4');
            modelHeading.textContent = car.model;
            const yearParagraph = document.createElement('p');
            yearParagraph.textContent = `Year: ${car.year}`;
            const priceParagraph = document.createElement('p');
            priceParagraph.textContent = `Price: ${car.price}`;
            const mileageParagraph = document.createElement('p');
            mileageParagraph.textContent = `Mileage: ${car.mileage} Kms`;
            const transmissionParagraph = document.createElement('p');
            transmissionParagraph.textContent = `Transmission: ${car.transmissiontype}`;

            detailsDiv.appendChild(makeHeading);
            detailsDiv.appendChild(modelHeading);
            detailsDiv.appendChild(yearParagraph);
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
    // callback function for error handling
    .catch(error => {
        console.log('Error fetching cars data', error); //log error message and object 
    });

function displayWishlist() {
    //Get wishlist container and data
    const wishlistContainer = document.getElementById('wisheslist');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistContainer.innerHTML = '';
    const ul = document.createElement('ul');
    wishlist.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.make}${item.model}`;

        //Create delete button and add event listener
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
    //Show wishlist if not empty
    if (wishlist.length > 0) {
        wishlistContainer.classList.remove('hidden');
    }
    wishlistContainer.appendChild(ul);
}

// Prevent default form submission
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    //Create email content
    var emailContent = 'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Subject: ' + subject + '\n\n' +
        message;

    // Create mailto link
    var mailtoLink = 'mailto:kelvinmutugi336@gmail.com?subject=' + subject + '&body=' + encodeURIComponent(emailContent);

    //Aler user and open email
    alert('Email client opened with pre-filled message. Hit OK to Proceed.');
    window.location.href = mailtoLink;
});
