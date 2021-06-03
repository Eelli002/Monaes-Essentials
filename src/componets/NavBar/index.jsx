import { AppBar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../img/MonaesEssentialsLogo.png';
import Hamburger from '../../img/hamburger-menu.png';
import DropMenu from '../DropMenu';
import { useState } from 'react';
import './style.css';
import React from 'react';

const NavBar = ({ basketItems, totalCost, categories }) => {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    return (
        <>
            <AppBar className='custom-navbar'>
                {/* <Container>
                    <Toolbar className='main-container'> */}
                    {/* <div className='dd-and-logo'> */}
                        <div className='dd-menu'>
                            <button onClick={() => setOpen(!open)}>
                                <img 
                                    src={Hamburger} 
                                    alt='Dropdown menu'
                                    className='hamburger-menu'
                                />
                            </button>
                            {open 
                                ? <DropMenu 
                                    categories={categories} 
                                    setOpen={setOpen} 
                                    open={open}
                                /> 
                                : null
                            }
                        </div>

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
                            className='logo'
                            />
                        </Typography>
                    {/* </div> */}

                        <div className='nav-div'>
                        <nav>
                            <ul className='nav'>
                                {categories.map((category, index) => {
                                    return (
                                    <li className={category.name}>
                                        <a href={`/#${category.name}`}>
                                            {category.name}
                                        </a>
                                    </li>
                                    )
                                })}
                                <li>
                                    <a href='/about'>
                                            About
                                    </a>
                                </li>
                            </ul>
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
                    {/* </Toolbar>
                </Container> */}
            </AppBar>
        </>
    );
};

export default NavBar;