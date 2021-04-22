import { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "./componets/Products/index";
import NavBar from "./componets/NavBar";
import Footer from './componets/Footer';
import Basket from "./componets/Basket";

const App = () => {
  const [products, setProducts] = useState([]);
  const [basketData, setBasketData] = useState({});

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    setProducts((response && response.data) || []);
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

  return <Router>
    <div>
      <NavBar basketItems={basketData.total_items} />
      <Switch>
        <Route exact path="/">
          <Products products={products} addProduct={addProduct} />
        </Route>
        <Route exact path='/basket'>
          <Basket
            basketData={basketData}
            updateProduct={updateProduct}
            handleEmptyBasket={handleEmptyBasket}
            RemoveItemFromBasket={RemoveItemFromBasket}
          />
        </Route>
      </Switch>
      <Footer />
    </div>
  </Router>;
}

export default App;
