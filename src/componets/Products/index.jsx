import Product from '../Product';
import { Grid, Container, Typography } from '@material-ui/core';
import Banner from '../Banner';
import Spinner from '../Spinner';
import './style.css';

const Products = ({ categories, addProduct }) => {
    if (!categories.length) return <Spinner />
    return (
        <div>
            <Banner />
            <div id='products'>
                {categories.map((category, index) => {
                    return (
                        <div 
                            className='contents'
                            style={{
                                backgroundImage:
                                index % 2 !== 0
                                ? 'linear-gradient(to bottom right, #3d4a5d, #3d4a5d, #bb86fc)'
                                : '',
                            }}
                        >
                            <Container>
                                <Typography className='headline' variant='h3' component='h2'>
                                    {category.name}
                                </Typography>
                                <Grid container spacing={4}>
                                    {category.productsData.map((product) => (
                                        <Grid key={product.id} item xs={12} sm={6} md={4}>
                                            <Product categoryName={category.name} product={product} addProduct={addProduct} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Container>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Products;