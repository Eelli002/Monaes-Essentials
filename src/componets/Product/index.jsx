import CustomCard from '../CustomCard';
import "./style.css";

const Product = ({ product, addProduct }) => (
    <CustomCard product={product} addProduct={addProduct} />
);

export default Product;