import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Header from './components/common/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Product from './components/Product';

interface Props {};

interface State {
  products: any;
};
export default class App extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);
    this.state = {
      products: {}
    }
  }

  render() {
    const updateProducts = (products: any) => {
      this.setState({products: products});
    }
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" exact render={(props) => <Home setProducts={updateProducts} {...props}/>}/>
          <Route component={About} path="/about-us" />
          <Route component={Contact} path="/contact-us" />
          <Route path="/:id" render={(props) => <Product products={this.state.products} {...props}/>}/>
        </Switch>
      </React.Fragment>
    );
  }
}