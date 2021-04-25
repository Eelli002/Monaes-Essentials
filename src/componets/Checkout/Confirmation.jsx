import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Confirmation = ({ orderInfo, orderError }) => {
    if (orderError) {
        return (
            <div className='confirmation'>
                <Typography variant='h5'>Error: {orderError}</Typography>
                <Button component={Link} variant='outlined' type='button' to='/'>
                    Home
                </Button>
            </div>
        )
    }
    return (
        <div className='confirmation'>
            <Typography variant='h5'>
                Thank You {orderInfo.customer.firstname} {orderInfo.customer.lastname}{''}
                For Your Purchase!
            </Typography>
            <Button component={Link} variant='contained' type='button' to='/'>
                Continue Shopping
            </Button>
        </div>
    );
};

export default Confirmation;