import { Container, AppBar, Toolbar, IconButton, Badge, Typography, Button } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../img/MonaesEssentialsLogo.png';
import './style.css';

const NavBar = ({ basketItems, totalCost }) => {
    const location = useLocation();
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
                        <div className='nav-div'>
                        <nav className='nav'>
                            <Button href='/#Key Chains'>Key Chains</Button>
                            <Button href='/#Resin Products'>Resin Products</Button>
                            <Button href='/#Shirts'>Shirts</Button>
                            <Button href='/#Tumblers'>Tumblers</Button>
                        </nav>
                        </div>
                        {location.pathname === '/basket' ? (
                            <div className='basket-wrapper'>
                                <h2>
                                    Total: <strong>{totalCost}</strong>
                                </h2>
                            </div>
                        ) : (
                            <div className='basket-wrapper'>
                                <IconButton
                                    component={Link}
                                    to='/basket'
                                    aria-label='Show basket contents'
                                    color='inherit'
                                >
                                    <Badge badgeContent={basketItems} color='secondary'>
                                        <ShoppingCart className='custom-basket' />
                                    </Badge>
                                </IconButton>
                            </div>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default NavBar;