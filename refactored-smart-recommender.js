((self) => {
    'use strict';

    const config = {
        leftArrow: '<',
        rightArrow: '>',
    };

    const classes = {
        sliderWrapper: 'ins-slider-wrapper',
        productsTitle: 'ins-products-title',
        productContainer: 'ins-product-container',
        leftArrowButton: 'ins-left-arrow-button',
        rightArrowButton: 'ins-right-arrow-button',
        productCard: 'ins-product-card',
        productFrame: 'ins-product-frame',
        productImage: 'ins-product-image',
        productInfo: 'ins-product-info',
        productShortDescription: 'ins-product-short-description',
        productPrice: 'ins-product-price',
        style: 'ins-custom-style'
    };

    const selectors = Object.keys(classes).reduce((createdSelector, key) => {
        createdSelector[key] = `.${ classes[key] }`;
        return createdSelector;
    }, {});

    self.init = async () => {
        initializeJQuery();
        self.reset();
        self.buildHTML();
        const products = await fetchProducts();
        products.forEach(product => {
            const productPrice = product.price === undefined ? 'Out Of Stock' : product.price + ' TL'
            console.log()
            self.buildInnerHTML(product.img, product.url, product.name, productPrice);
        });
        self.buildCss();
        self.buildEventListeners();
    };

    self.reset = () => {
        Insider.dom(`${ selectors.sliderWrapper }, ${ selectors.style }`).remove();
    };

    const initializeJQuery = () => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-3.6.4.min.js";
        document.body.appendChild(jquery);
    }
     
    const fetchProducts = async() => {
        const response = await fetch('https://opt-interview-projects.onrender.com/smart-recommender')
        let products = await response.json();
        return products;    
    };

    self.buildCss = () => {
        const { sliderWrapper, productsTitle , productContainer, rightArrowButton, leftArrowButton, productCard,
            productFrame, productImage, productInfo, productShortDescription, productPrice} = selectors;

        const style =
        `${sliderWrapper} {
            position : static;
            width : 80%;
            margin : 0 auto;
        }
        ${productsTitle} {
            font-size : 25px;
            font-weight : 500;
            margin-bottom : 40px;
            text-transform : uppercase;
        }

        ${productContainer} {
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
        ${rightArrowButton} {
            background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 80%);
            border : none;
            font-size: 50px;
            cursor : pointer;
            position : absolute;
            z-index: 8;
            margin-top: 3em;
            right: 5%;
        }
        ${leftArrowButton} {
            background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 80%);
            border : none;
            font-size: 50px;
            cursor : pointer;
            position : absolute;
            z-index: 8;
            margin-top: 3em;
            left: 8%;
        }
        ${productCard} {
            scroll-snap-align : start;
            flex : grid;
            object-fit : cover;
            width : 250px;
            height : 450px;
            cursor : pointer;
        }
        ${productFrame} {
            position : relative;
            width : 100%;
        }
        ${productImage} {
            width : 100%;
            height : 100%;
            object-fit : cover;
        }
        ${productInfo} {
            display : flex;
            flex-direction : column;
            gap : 10px;
            width : 100%;
            padding-top : 10px;
        }
        ${productShortDescription} {
            width : 100%;
            height : 20px;
            line-height : 20px;
            opacity : 0.5;
        }
        ${productPrice} {
            font-weight : 700;
            font-size : 20px;
        }
        @media (max-width: 1024px) and (min-width: 768px) {
            ${productContainer} {
                grid-auto-columns : 33%;
            }

        }
        @media screen and (max-width: 768px) {
            ${productContainer} {
                grid-auto-columns : 100%;
            }  
        }
    `;

        Insider.dom('<style>').addClass(classes.style).html(style).appendTo('head');
    };

    self.buildHTML = () => {
        const { sliderWrapper, productsTitle ,productContainer, leftArrowButton, rightArrowButton} = classes;
        const { leftArrow, rightArrow } = config;

        const outerHtml =
        `<section class=${sliderWrapper}>
            <h2 class=${productsTitle}>You might also like</h2>
            <button class=${leftArrowButton}>${leftArrow}</button>
            <button class=${rightArrowButton}>${rightArrow}</button>
            <div class=${productContainer}></div>
        </section>`;

        Insider.dom('.footer-content').append(outerHtml);
    };

    self.buildInnerHTML = (productImg, productUrl, productName, price) => {
        const {productContainer, productCard, productFrame, productImage, productInfo, productShortDescription, productPrice} = classes;
        let innerHtml = '';

        innerHtml += `
            <div class=${productCard}>
                <div class=${productFrame}>
                    <a class=${productImage} href =${productUrl}>
                        <img class=${productImage} src=${productImg}></img>
                    </a>
                </div>
                <div class=${productInfo}>
                    <p class=${productShortDescription}>${productName}</p>
                    <span class=${productPrice}>${price}</span>
                </div>              
            </div>`;

        Insider.dom(`.${productContainer}`).append(innerHtml);
    };

    self.buildEventListeners = () => {
        const { productCard, productContainer, rightArrowButton, leftArrowButton } = selectors;

        const card = Insider.dom(productCard).nodes[0];
        const container = Insider.dom(productContainer).nodes[0];
        const nextButton = Insider.dom(rightArrowButton)
        const prevButton = Insider.dom(leftArrowButton)

        Insider.eventManager.once('click.left:arrow:button', nextButton.selector, () => {
            container.scrollLeft += card.clientWidth;
        });

        Insider.eventManager.once('click.right:arrow:button', prevButton.selector, () => {
            container.scrollLeft -= card.clientWidth
        });

        Insider.eventManager.once('click.product:card', card, () => {
            window.open(products.url, '_blank');
        });
    };

    self.init();
})({});