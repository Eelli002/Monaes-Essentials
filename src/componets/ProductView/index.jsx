import { Grid, Button, Container, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { ShoppingCart } from '@material-ui/icons';
import { commerce } from '../../lib/commerce'
import Spinner from '../Spinner';
import './style.css';

const createMarkup = (text) => {
    return { __html: text };
};
  
const ProductView = ({ addProduct }) => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const fetchProduct = async (id) => {
      const response = await commerce.products.retrieve(id);
      const { name, price, media, quantity, description } = response;
      setProduct({
        id,
        name,
        quantity,
        description,
        src: media.source,
        price: price.formatted_with_symbol,
      });
  };
  
  useEffect(() => {
    const id = window.location.pathname.split("/");
    fetchProduct(id[2]);
  }, []);

  const handleQuantity = (param) => {
    if (param === "decries" && quantity > 1) {
      setQuantity(quantity - 1);
    }
    if (param === "increase" && quantity < 10) {
      setQuantity(quantity + 1);
    }
  };
  // return (
  return (
    /* <------------------ This is the main container ------------------->*/
    <Container className="product-view">
    {/* <----------------------------------------------------------------> */}


    {/* <--------- This is the product container, the yellow one --------> */}
      <Grid container spacing={4} className='product-container'>
    {/* <----------------------------------------------------------------> */}


    {/* <------------ This is the Image Container (blue ) ---------------> */}
        <Grid item xs={12} md={8} className="image-wrapper">
          <img
            className='image'
            onLoad={() => {
              setLoading(false);
            }}
            src={product.src}
            alt={product.name}
          />
        </Grid>
    {/* <----------------------------------------------------------------> */}


    {/* <------------ This is the Main Text Container (Green) -----------> */}
        <Grid item xs={12} md={4} className="text">
    {/* <----------------------------------------------------------------> */}


    {/* <----- This is a container containing an H2 element with the product name -----> */}
          <Typography variant="h2" className='products-title'>{product.name}</Typography>
    {/* <----------------------------------------------------------------> */}


        <Grid className='description-and-price'>
    {/* <----- This is a container contain a p elemtent with the product description -----> */}
          <Typography
            variant="p"
            className='products-description'
            dangerouslySetInnerHTML={createMarkup(product.description)}
          />
    {/* <----------------------------------------------------------------> */}


    {/* <----- This is a containter containing an H3 tag of the product price -----> */}
          <Typography variant="h3" className='products-price'>Price: {product.price}</Typography>
    {/* <----------------------------------------------------------------> */}
        </Grid>

    {/* <----- This is container containing the +, -, add-to-cart buttons and quantity ----> */}
          <Grid className='quantity-change'>
    {/* <----------------------------------------------------------------> */}


    {/* <----- This is a container that holds the decrease quantity button -----> */}
            <Grid>
              <Button
                // size="small"
                // variant="contained"
                className="decrease-product-quantity"
                onClick={() => {
                  handleQuantity("decries");
                }}
              >
                -
              </Button>
            </Grid>
    {/* <----------------------------------------------------------------> */}


    {/* <----- This is a container that holds a h3 elemetns with the product quantity -----> */}
            <Grid>
              <Typography className="quantity" variant="h3">
                Quantity: {quantity}
              </Typography>
            </Grid>
    {/* <----------------------------------------------------------------> */}


    {/* <----- This is a container that hold the increase quantity button -----> */}
            <Grid>
              <Button
                // size="small"
                // variant="contained"
                className="increase-product-quantity"
                onClick={() => {
                  handleQuantity("increase");
                }}
              >
                +
              </Button>
            </Grid>
    {/* <----------------------------------------------------------------> */}


          </Grid>


          {/* <----- This is a container that holds the add to cart button -----> */}
          <Grid>
              <Button
                size="large"
                className="add-to-cart"
                onClick={() => {
                  addProduct(product.id, quantity);
                }}
              >
                <ShoppingCart /> Add to Cart
              </Button>
          </Grid>
    {/* <----------------------------------------------------------------> */}
        </Grid>
      </Grid>
      {loading && <Spinner />}
    </Container>

  //       <container className='product-view'>
  //         <section className='product-container'>
  //           <div className='image-wrapper'>
  //             <img 
  //               className='image'
  //               onLoad={() => {
  //                 setLoading(false);
  //               }}
  //               src={product.src}
  //               alt={product.name}
  //             />
  //           </div>
  //           <section className='text'>
  //               <h2 className='product-title'>{product.name}</h2>
  //               <p className='product-description'>{createMarkup(product.description)}</p>
  //               <h3 className='product-price'>Price: {product.price}</h3>
  //               <section className='quantity-change'>
  //                 <div>
  //                   <button
  //                     className='increase-product-quantity'
  //                     onClick={() => {
  //                       handleQuantity('increase');
  //                     }}
  //                   >
  //                     +
  //                   </button>
  //                 </div>

  //                 <div>
  //                   <h3 className='quantity'>Quantity: {quantity}</h3>
  //                 </div>

  //                 <div>
  //                   <button
  //                     className='decrease-product-quantity'
  //                     onClick={() => {
  //                       handleQuantity('decries');
  //                     }}
  //                   >
  //                     -
  //                   </button>
  //                 </div>
  //                 <div>
  //                   <button
  //                     className='custom-button'
  //                     onClick={() => {
  //                       addProduct(product.id, quantity);
  //                     }}
  //                   >
  //                     <ShoppingCart /> Add to basket
  //                   </button>
  //                 </div>
  //               </section>
  //           </section>
  //         </section>
  //         {loading && <Spinner />}
  //       </container>
  // );

  );
};
  
  export default ProductView;

