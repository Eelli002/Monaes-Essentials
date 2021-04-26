import CustomCard from '../CustomCard';
import "./style.css";

const Product = ({ product, addProduct, basket, categoryName, RemoveItemFromBasket }) => (
    <CustomCard product={product} addProduct={addProduct} basket={basket} RemoveItemFromBasket={RemoveItemFromBasket} categoryName={categoryName}/>

);

export default Product;