import { Container, Typography, Button, Grid } from '@material-ui/core';
import Logo from '../../img/BannerProduct.png';
import './style.css';

const Banner = () => {
    return (
        <div className='banner'>
            <Container>
                <Grid container spacing={4} className='banner-grid'>
                    <Grid item xs={12} sm={6} className='title-button'>
                        <Typography className='title' variants='h1'>
                            Welcome to Monae's Essentials
                        </Typography>
                        <Button className='shopping-button' href='#products'>
                            Shop Now
                        </Button>
                    </Grid>
                    <Grid className='brand' item sm={6}>
                        <img src={Logo} alt="Monae's Essentials Logo" />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Banner;