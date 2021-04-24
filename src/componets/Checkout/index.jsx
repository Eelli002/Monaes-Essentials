import { useState, useEffect, useRef } from "react";
import {
  Paper,
  Container,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { commerce } from "../../lib/commerce";
import CheckoutForm from './CheckoutForm';
import "./style.css";

const convertObjectToArray = (countries) =>
  Object.entries(countries || {}).map(([code, name]) => ({ code, name }));

const usePreviousState = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Checkout = ({ basketData, orderInfo, orderError, handleCheckout }) => {
  const [user, setUser] = useState({
    city: "",
    email: "",
    address: "",
    postCode: "",
    lastName: "",
    firstName: "",
    shippingOption: {},
    shippingOptions: [],
    shippingCountry: {},
    shippingCountries: [],
    shippingSubdivision: {},
    shippingSubdivisions: [],
  });

  const [checkoutData, setCheckoutData] = useState("");
  const previousShippingCountry = usePreviousState(user.shippingCountry);
  const previousShippingSubdivision = usePreviousState(
    user.shippingSubdivision
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // setBookingStep("order-details");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSelectChange = (e, state) => {
    const { name, value } = e.target;
    if (state === "shippingOptions") {
      setUser({
        ...user,
        [name]: {
          id: value,
        },
      });
    } else {
      setUser({
        ...user,
        [name]: {
          name: user[state].find((country) => country.code === value).name,
          code: value,
        },
      });
    }
  };

  useEffect(() => {
    if (basketData.id) {
      const generateToken = async () => {
        try {
          const response = await commerce.checkout.generateToken(
            basketData.id,
            {
              type: "cart",
            }
          );
          setCheckoutData(response);
        } catch (error) {
          console.error("Checkout error: ", error);
        }
      };
      generateToken();
    }
  }, [basketData]);

  useEffect(() => {
    const fetchShippingCountries = async () => {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutData.id
      );
      const FormattedCountries = convertObjectToArray(countries);
      setUser({
        ...user,
        shippingCountries: FormattedCountries,
        shippingCountry: FormattedCountries[FormattedCountries.length - 1],
      });
    };
    if (!user.shippingCountries.length && checkoutData.id) {
      fetchShippingCountries();
    }
  }, [user, checkoutData]);

  useEffect(() => {
    const fetchSubdivisions = async (countryCode) => {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        countryCode
      );

      const shippingSubdivisions = convertObjectToArray(subdivisions);
      setUser({
        ...user,
        shippingSubdivisions,
        shippingSubdivision: shippingSubdivisions[0],
      });
    };

    if (
      (user.shippingCountry.code && !user.shippingSubdivisions.length) ||
      (previousShippingCountry &&
        previousShippingCountry.code !== user.shippingCountry.code)
    )
      fetchSubdivisions(user.shippingCountry.code);
  }, [user, previousShippingCountry]);

  useEffect(() => {
    const fetchShippingOptions = async (
      checkoutDataId,
      country,
      stateProvince = null
    ) => {
      const options = await commerce.checkout.getShippingOptions(
        checkoutDataId,
        {
          country,
          region: stateProvince,
        }
      );

      setUser({
        ...user,
        shippingOptions: options,
        shippingOption: { id: options[0].id },
      });
    };

    if (
      (user.shippingSubdivision.code && !user.shippingOptions.length) ||
      (previousShippingSubdivision &&
        previousShippingSubdivision.code !== user.shippingSubdivision.code)
    )
      fetchShippingOptions(
        checkoutData.id,
        user.shippingCountry.code,
        user.shippingSubdivision.code
      );
  }, [
    user,
    checkoutData.id,
    user.shippingCountry.code,
    user.shippingSubdivision,
    previousShippingSubdivision,
  ]);

  if (
      !user.shippingSubdivisions.length ||
      !user.shippingCountries.length ||
      !user.shippingOptions.length ||
      !checkoutData.live
  ) {
      return (
          <div className='checkout'>
              <Container>
                  <Paper className='paper' elevation={3}>
                      <div className='products-spinner'>
                          <CircularProgress />
                      </div>
                  </Paper>
              </Container>
          </div>
      )
  }

  return (
    <div className="checkout">
      <Container>
        <Paper className="paper" elevation={3}>
          <Typography align="center" variant="h5" gutterBottom>
            Checkout
          </Typography>
          <CheckoutForm 
                user={user} 
                handleSubmit={handleSubmit}
                handleChange={handleChange} 
                handleSelectChange={handleSelectChange}
            />
        </Paper>
      </Container>
    </div>
  );
};

export default Checkout;
