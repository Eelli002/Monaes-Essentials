import CheckoutForm from './CheckoutForm';
import BookingDetails from './BookingDetails';
import Confirmation from './Confirmation';
import Payment from './Payment';

export const renderRelatedComponent = ({
    user,
    orderInfo,
    orderError,
    bookingStep,
    handleChange,
    handleSubmit,
    checkoutData,
    handleBackStep,
    handleNextStep,
    handleCheckout,
    handleSelectChange,
    totalPriceWithCurrency,
    setTotalPriceWithCurrency,
    totalPrice,
    setTotalPrice,
}) => {
    switch (bookingStep) {
        case 'order-address':
            return (
                <CheckoutForm
                    user={user}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleSelectChange={handleSelectChange}
                />
            );
        case 'order-details':
            return (
                <BookingDetails
                    user={user}
                    checkoutData={checkoutData}
                    handleBackStep={handleBackStep}
                    handleNextStep={handleNextStep}
                    handleCheckout={handleCheckout}
                    setTotalPriceWithCurrency={setTotalPriceWithCurrency}
                    setTotalPrice={setTotalPrice}
                />
            );
        case 'order-payment':
            return (
                <Payment
                    user={user}
                    checkoutData={checkoutData}
                    handleBackStep={handleBackStep}
                    handleNextStep={handleNextStep}
                    handleCheckout={handleCheckout}
                    totalPrice={totalPrice}
                    totalPriceWithCurrency={totalPriceWithCurrency}
                />
            );
        case 'confirmation':
            return <Confirmation orderInfo={orderInfo} orderError={orderError} />;
        default:
            return null;
    }
};