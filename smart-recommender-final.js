const createProductList = () => {
    const productList = document.createElement('section')

    productList.className = "slider-wrapper"
    return productList
}

const createProductsTitle = () => {
    const productsTitle = document.createElement('h2')

    productsTitle.className = 'products-title'
    productsTitle.innerHTML = "You might also like"
    return productsTitle
}

const createNavigationButton = (buttonDirection) => {
    const button = document.createElement("button");

    button.innerText = buttonDirection == "left" ? "<" : ">"


    if (buttonDirection == "left") button.style.left = "8%";
    else button.style.right = "5%"

    return button;
}

const createProductContainer = () => {
    const productContainer = document.createElement('div')

    productContainer.className = "product-container"
    
    return productContainer;
}

const createProductCard = (productImg, productUrl, productName, price) => {
    const productCard = document.createElement('div');
    const productFrame = document.createElement('div');
    const productImage = document.createElement('img');
    const productInfo = document.createElement('div');
    const productDescription = document.createElement('p');
    const productPrice = document.createElement('span');

    productCard.className = "product-card"
    productFrame.className = "product-frame"
    productImage.className = "product-image"
    productInfo.className = "product-info"
    productDescription.className = "product-short-description"
    productPrice.className = "product-price"

    productImage.src = `${productImg}`;

    productDescription.innerText = productName;
    productPrice.innerText =  price ? `${price} TL` : "Bu ürün stokta yoktur";

    productContainer.appendChild(productCard)
    productCard.appendChild(productFrame)
    productFrame.appendChild(productImage)
    productCard.appendChild(productInfo);
    productInfo.appendChild(productDescription);
    productInfo.appendChild(productPrice)

    productCard.addEventListener("click", () => {
        window.open(productUrl, '_blank');
    })

    return productCard;
}

const initializeJQuery = () => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-3.6.4.min.js";
    document.body.appendChild(jquery);
}

const fetchProducts = async () => {
    const response = await fetch('https://opt-interview-projects.onrender.com/smart-recommender')
    let products = await response.json()
    return products;    
}

initializeJQuery();

const productList = createProductList();

const productsTitle = createProductsTitle();
productList.appendChild(productsTitle)

const previousButton = createNavigationButton("left");
productList.appendChild(previousButton)

const nextButton = createNavigationButton("right");
productList.appendChild(nextButton)

const productContainer = createProductContainer();
productList.appendChild(productContainer)

const products = await fetchProducts();

products.forEach(product => {
    const item = createProductCard(product.img, product.url, product.name, product.price)
    productContainer.appendChild(item)
});

$(".footer-content")[0].appendChild(productList)

nextButton.addEventListener("click", () => {
        productContainer.scrollLeft += $(".product-card")[0].clientWidth;
    });

previousButton.addEventListener("click", () => {
        productContainer.scrollLeft -= $(".product-card")[0].clientWidth;
    });

const style = document.createElement("style")
style.innerText = `
    .slider-wrapper {
        position : static;
        width : 80%;
        margin : 0 auto;
    }

    .products-title {
        font-size : 25px;
        font-weight : 500;
        margin-bottom : 40px;
        text-transform : uppercase;
    }

    .product-container {
        scroll-snap-type : x mandatory;
        display : grid;
        grid-auto-columns : 20%;
        align-items : center;
        grid-auto-flow : column;
        margin-left : 35px;
        overflow :  hidden;
        list-style : none;
        scroll-behavior : smooth;
    }

    .button {
        background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 80%);
        border : none;
        font-size: 50px;
        cursor : pointer;
        position : absolute;
        z-index: 8;
        margin-top: 3em;
    }

    .product-card {
        scroll-snap-align : start;
        flex : grid;
        object-fit : cover;
        width : 250px;
        height : 450px;
        cursor : pointer;
    }

    .product-frame {
        position : relative;
        width : 100%;
    }

    .product-image {
        width : 100%;
        height : 100%;
        object-fit : cover;
    }

    .product-info {
        display : flex;
        flex-direction : column;
        gap : 10px;
        width : 100%;
        padding-top : 10px;
    }

    .product-short-description {
        width : 100%;
        height : 20px;
        line-height : 20px;
        opacity : 0.5;
    }

    .product-price {
        font-weight : 700;
        font-size : 20px;
    }

    @media (max-width: 1024px) and (min-width: 768px) {
        .product-container {
            grid-auto-columns : 33%;
        }

    }
    
    @media screen and (max-width: 768px) {
        .product-container {
            grid-auto-columns : 100%;
        }  
    }
`
document.head.appendChild(style);