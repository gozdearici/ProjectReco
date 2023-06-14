const createProductCard = (productImg, productUrl, productName, price) => {
    const productCard = document.createElement('div');

    productCard.className = "product-card";
    productCard.style.scrollSnapAlign = "start";
    productCard.style.flex = "grid";
    productCard.style.objectFit = "cover";
    productCard.style.width = "250px";
    productCard.style.height = "450px";
    productCard.style.cursor = "pointer";
    productContainer.appendChild(productCard);

    const productFrame = document.createElement('div');
    productFrame.className = "product-frame";
    productFrame.style.position = "relative";
    productFrame.style.width = "100%";
    productCard.appendChild(productFrame);

    const productImage = document.createElement('img');
    
    productImage.className = "product-image";
    productImage.src = `${productImg}`;
    productImage.style.width = "100%";
    productImage.style.height = "100%";
    productImage.style.objectFit = "cover";
    productFrame.appendChild(productImage);
    
    const productInfo = document.createElement('div');

    productInfo.className = "product-info";
    productInfo.style.display = "flex";
    productInfo.style.flexDirection = "column";
    productInfo.style.gap = "10px";
    productInfo.style.width = "100%";
    productInfo.style.paddingTop = "10px";
    productCard.appendChild(productInfo);
    
    const productDescription = document.createElement('p');

    productDescription.className = "product-short-description";
    productDescription.innerText = productName;
    productDescription.style.width = "100%";
    productDescription.style.height = "20px";
    productDescription.style.lineHeight = "20px";
    productDescription.style.opacity = "0.5";
    productInfo.appendChild(productDescription);
    const productPrice = document.createElement('span');

    productPrice.className = "product-price";
    productPrice.innerText =  price ? `${price} TL` : "Bu ürün stokta yoktur";
    productPrice.style.fontWeight = "900";
    productPrice.style.fontSize = "20px";
    productInfo.appendChild(productPrice);

    productCard.addEventListener("click", () => {
        window.open(productUrl, '_blank');
    })

    return productCard;
}

const createProductList = () => {
    const productList = document.createElement('section');

    productList.className = "slider-wrapper";
    productList.style.position = "static";
    productList.style.width = "80%";
    productList.style.margin = "0 auto";
    return productList;
}

const createProductsTitle = () => {
    const productsTitle = document.createElement('h2')

    productsTitle.className = 'product-category';
    productsTitle.innerHTML = "You might also like";
    productsTitle.style.fontSize = "25px";
    productsTitle.style.fontWeight = "500";
    productsTitle.style.marginBottom = "40px";
    productsTitle.style.textTransform = "uppercase";
    return productsTitle;
}

const initializeJQuery = () => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-3.6.4.min.js";
    document.body.appendChild(jquery);
}

const createNavigationButton = (buttonDirection) => {
    const button = document.createElement("button");

    button.innerText = buttonDirection == "left" ? "<" : ">";
    button.style.background = "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 80%)";
    button.style.border = "none";
    button.style.fontSize = "50px";
    button.style.cursor = "pointer";
    button.style.position = "absolute";
    button.style.zIndex = "8";
    button.style.marginTop = "3em";

    if (buttonDirection == "left") button.style.left = "8%";
    else button.style.right = "8%";

    return button;
}

const createProductContainer = () => {
    const productContainer = document.createElement('div')

    productContainer.className = "product-container";
    productContainer.style.scrollSnapType = "x mandatory";
    productContainer.style.display = "grid";
    productContainer.style.gridAutoColumns = "20%";
    productContainer.style.alignItems = "center";
    productContainer.style.gridAutoFlow = "column";
    productContainer.style.marginLeft = "35px";
    productContainer.style.overflow = "hidden";
    productContainer.style.listStyle = "none";
    productContainer.style.scrollBehavior = "smooth";
    return productContainer;
}

const fetchProducts = async () => {
    const response = await fetch('https://opt-interview-projects.onrender.com/smart-recommender');
    let products = await response.json();
    return products;    
}

const handleResize = productContainer => {
    if (window.innerWidth > 1550) productContainer.style.gridAutoColumns = "20%";
    else if(window.innerWidth > 1250) productContainer.style.gridAutoColumns = "25%";
    else if(window.innerWidth > 800) productContainer.style.gridAutoColumns = "33%";
    else if(window.innerWidth > 670) productContainer.style.gridAutoColumns = "50%";
    else productContainer.style.gridAutoColumns = "100%"
}

initializeJQuery();

const productList = createProductList();

const productsTitle = createProductsTitle();
productList.appendChild(productsTitle);

const previousButton = createNavigationButton("left");
const nextButton = createNavigationButton("right");

productList.appendChild(previousButton);
productList.appendChild(nextButton);

const productContainer = createProductContainer();
productList.appendChild(productContainer);

const products = await fetchProducts();

products.forEach(product => {
    const item = createProductCard(product.img, product.url, product.name, product.price);
    productContainer.appendChild(item);
});

$(".footer-content")[0].appendChild(productList);

nextButton.addEventListener("click", () => {
    const slideWidth = $(".product-card")[0].clientWidth;
        productContainer.scrollLeft += slideWidth;
    });

previousButton.addEventListener("click", () => {
    const slideWidth = $(".product-card")[0].clientWidth;
        productContainer.scrollLeft -= slideWidth;
    });

window.addEventListener('resize', () => handleResize(productContainer));
