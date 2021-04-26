import { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "./componets/Products/index";
import NavBar from "./componets/NavBar";
import Footer from './componets/Footer';
import Basket from "./componets/Basket";
import Checkout from './componets/Checkout';
import ProductView from "./componets/ProductView";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [basketData, setBasketData] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [orderError, setOrderError] = useState('');

  const fetchProducts = async () => {
    const { data: products } = await commerce.products.list({ limit: 200 });
    const { data: categoriesData } = await commerce.categories.list();

    const productsPerCategory = categoriesData.reduce((acc, category) => {
      return [
        ...acc,
        {
          ...category,
          productsData: products.filter((product) => 
            product.categories.find((cat) => cat.id === category.id)
          ),
        },
      ];
    }, []);

    setCategories(productsPerCategory);
  };

  const fetchBasketData = async () => {
    const response = await commerce.cart.retrieve();
    setBasketData(response);
  };

  useEffect(() => {
    fetchProducts();
    fetchBasketData();
  }, []);

  const addProduct = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setBasketData(response.cart);
  };

  const updateProduct = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setBasketData(response.cart);
  };

  const handleEmptyBasket = async () => {
    const response = await commerce.cart.empty();
    setBasketData(response.cart);
  };

  const RemoveItemFromBasket = async (itemId) => {
    const response = await commerce.cart.remove(itemId);
    setBasketData(response.cart);
  };

  const refreshBasket = async () => {
    const newBasketData = await commerce.cart.refresh();
    setBasketData(newBasketData);
  }

  const handleCheckout = async (checkoutId, orderData) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutId,
        orderData
      );
      setOrderInfo(incomingOrder);

      refreshBasket();
    } catch (error) {
      setOrderError(
        (error.data && error.data.error && error.data.error.message) ||
        'An error has occurred'
      );
    }
  };

  return <Router>
    <div>
      <NavBar 
      basketItems={basketData.total_items} 
      totalCost={(basketData.subtotal && basketData.subtotal.formatted_with_symbol) || '0.00'} 
      />
      <Switch>
        <Route exact path="/">
          <Products categories={categories} addProduct={addProduct} />
        </Route>
        <Route exact path='/basket'>
          <Basket
            basketData={basketData}
            updateProduct={updateProduct}
            handleEmptyBasket={handleEmptyBasket}
            RemoveItemFromBasket={RemoveItemFromBasket}
          />
        </Route>
        <Route exact path='/checkout'>
          <Checkout 
            basketData={basketData} 
            handleCheckout={handleCheckout}
            orderInfo={orderInfo}
            orderError={orderError}
          />
        </Route>
        <Route exact path='/product-view/:id'>
          <ProductView addProduct={addProduct} />
        </Route>
      </Switch>
      <Footer />
    </div>
  </Router>;
}

export default App;
