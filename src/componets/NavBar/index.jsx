import { Container, AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Logo from '../../img/MonaesEssentialsLogo.jpg'
import './style.css';

const NavBar = ({ basketItems, totalCost }) => {
    return (
        <>
            <AppBar position='fixed' className='custom-navbar'>
                <Container>
                    <Toolbar>
                        <Typography
                            component={Link}
                            to="/"
                            variant='h6'
                            className='custom-title'
                            color='inherit'
                        >
                            <img
                            src={Logo}
                            alt="Monae's Essentials Logo"
                            height='25px'
                            className='logo'
                            />
                        </Typography>

                        <div className='basket-wrapper'>
                            <IconButton
                                component={Link}
                                to="/basket"
                                aria-label='Show basket contents'
                                color='inherit'
                            >
                                <Badge badgeContent={basketItems} color="secondary">
                                    <ShoppingCart className='custom-basket' />
                                </Badge>
                            </IconButton>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default NavBar;