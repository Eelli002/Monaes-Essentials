import { Button } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_live_51IjGVoGloPMioQ2mQ9D9WfrwSMdMf61StG9OGQb9VtvIQBe8MURCHRAqs5KBnbctm5L3wAGz8IgA5hhFwNCcoTgg00Dc1oHcTG');
const Payment = ({
  user,
  checkoutData,
  handleBackStep,
  handleNextStep,
  handleCheckout,
  totalPriceWithCurrency,
  totalPrice,
}) => {
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if (!stripe || !elements || !totalPrice) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("Error ======>>>>", error);
    } else {
      const orderData = {
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
        shipping: {
          name: "stander",
          street: user.address,
          town_city: user.city,
          county_state: user.shippingSubdivision,
          postal_zip_code: user.postcode,
          country: user.shippingCountry,
        },
        customer: {
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.email,
        },
        line_items: checkoutData.live.line_items,
        fulfillment: { shipping_method: user.shippingOptions },
        pay_what_you_want: totalPrice,
      };

      handleCheckout(checkoutData.id, orderData);
      handleNextStep(e, "confirmation");
    }
  };

  return (
    <>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <div className="actions payment-actions">
                <Button
                  variant="outlined"
                  onClick={(e) => handleBackStep(e, "order-details")}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay {totalPriceWithCurrency}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default Payment;