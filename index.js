const carsList = document.getElementById('carslist');
const wishlist = [];

const wishlistContainer = document.createElement('div');
wishlistContainer.id = 'wisheslist';
document.body.appendChild(wishlistContainer);

const showWishlistButton = document.createElement('button');
showWishlistButton.textContent = 'Show Wishlist';
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
            addtoWishlistButton.textContent = 'Add to Wishlist';
            addtoWishlistButton.addEventListener('click', () => {
                const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                wishlist.push(car);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                displayWishlist();
            });

            const imgAnchor = document.createElement('a');
            imgAnchor.href = car.image;

            const img = document.createElement('img');
            img.src = car.image;
            img.alt = `${car.make}${car.model}`;
            img.width = 200;
            img.height = 140;

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