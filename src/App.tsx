import { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Product from './components/Product';
import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';

export default function App() {
  const [products, setProducts] = useState<any>({ products: {} });

  const updateProducts = (newProducts: any) => {
    setProducts((prev: any) => prev.products = newProducts);
  }

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact render={(props) => <Home setProducts={updateProducts} {...props} />} />
        <Route component={About} path="/about-us" />
        <Route component={Contact} path="/contact-us" />
        <Route component={Login} path="/login" />
        <Route component={Register} path="/register" />
        <Route component={Users} path="/users" />
        <Route path="/:id" render={(props) => <Product products={products} {...props} />} />
      </Switch>
    </>
  );
}
