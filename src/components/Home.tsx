import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  setProducts: any;
};

interface State {
  response: ResponseData[];
};

interface ResponseData {
  id: number;
  price: number;
  description: string;
  image: string;
}
export default class Home extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      response: []
    }
  }

  getProductsData = async () => {
    const apiResponse = await fetch('https://fakestoreapi.com/products');
    const response = await apiResponse.json();
    this.setState({ response: response });
    this.props.setProducts(response);
    console.log('responseData', response);
  }

  componentDidMount() {
    this.getProductsData();
  }

  render() {
    const { response } = this.state;
    if (response.length === 0) {
      return <div>Loading....</div>;
    }

    return (
      <>
        <div className="product-list">
          {response.map((resp) => {
            return (
              <Link to={`/${resp.id}`} key={resp.id} className="product-item">
                <img src={resp.image} alt="product"/>
                <div className="product-desc">{resp.description.slice(0, 100) + '...'}</div>
                <div className="product-price">₹ {resp.price}</div>
              </Link>);
          })}
        </div>
      </>
    );
  }
}