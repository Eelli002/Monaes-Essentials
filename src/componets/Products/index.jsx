import Product from '../Product';
import { Grid, Container } from '@material-ui/core';

const Products = ({ products }) => {

    return (
        <div>
            <Container id='products'>
                <Grid container spacing={4}>
                    {products.map((product) => {
                        return (
                        <Grid key={product.id} item xs={12} sm={6} md ={4}>
                            <Product product={product}/>;
                        </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
};

export default Products;