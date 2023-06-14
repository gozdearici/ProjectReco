# ProjectReco
## Contents

#### There are two files of the Smart Reco project. It does the same for both files.

- In one of the files, css style properties were created with string and appended to the head element.
- In the other, the css is generated with the javascript style function.

## What has been done?

1) After getting the json output of the products with Fetch Api, the products were added to the created html div elements and parsed with forEach.

2) The products appear 5 by 5 in Desktop size. It has a responsive feature. As the screen gets smaller, the number of products is shown decreasing by one. They appear 1 by 1 in the latest Mobile view.

3) It has been made so that the number of product-cards in the product-container remains constant when the right or left button is pressed.

4) In addition, some parsed products did not have price information. This was handled by giving the information that the product is not in stock.
