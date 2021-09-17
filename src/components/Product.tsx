import React, { } from 'react';
import { withRouter, RouteComponentProps, Link } from "react-router-dom";

interface Props {
  products: any[];
};

interface State {
  product?: IProduct | null;
};

interface IProduct {
  id?: string;
  title?: string;
  image?: string;
  description?: string;
  price?: string;
}

interface RouteParams { id: string, param2?: string }

class Product extends React.Component<Props & RouteComponentProps<RouteParams>, State> {
  initialProduct = { product: { id: '', image: '', description: '', price: '' } };
  state = this.initialProduct;

  // constructor(props: Props) {
  //   super(props);
  // }

  getProductData = () => {
    const { id } = this.props.match.params;
    let { products } = this.props;
    products = products.length ? products : [];
    console.log('products', this.props, products);
    let product = products.find((itm: any) => itm.id === parseInt(id));
    product = product || this.initialProduct;
    this.setState({ product: product });
  }

  componentDidMount() {
    this.getProductData();
  }

  render() {
    return (
      <div className="product-container">
        {this.state.product.id ? (
          <div className="product-item">
            <div className="product-image">
              <img src={this.state.product.image} alt="product" />
            </div>
            <div className="product-detail">
              <div className="product-desc">{this.state.product.description}</div>
              <div className="product-price">₹ {this.state.product.price}</div>
            </div>
          </div>
        ) : <div className="product-empty">There is not product available, Please go back <Link to="/">Home</Link> to get the product.</div>}
      </div>
    );
  }
}

export default withRouter(Product)
