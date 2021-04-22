import { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "./componets/Products/index";
import NavBar from "./componets/NavBar";
import Footer from './componets/Footer';

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

  return <Router>
    <div>
      <NavBar basketItems={basketData.total_items} />
      <Switch>
        <Route exact path="/">
          <Products products={products} addProduct={addProduct} />
        </Route>
      </Switch>
      <Footer />
    </div>
  </Router>;
}

export default App;
