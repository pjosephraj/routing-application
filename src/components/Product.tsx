import { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

interface IProduct {
  id?: string;
  title?: string;
  image?: string;
  description?: string;
  price?: string;
}

function Product(props: any) {
  const [product, setProduct] = useState<IProduct>({ id: "", image: "", description: "", price: "" });

  const getProductData = () => {
    const { id } = props.match.params;
    console.log('id', id);
    let { products } = props;
    products = products.length ? products : [];
    console.log("products", props, products);
    let filteredProduct = products.find((itm: any) => itm.id === +id);
    filteredProduct = filteredProduct || product;
    setProduct((prev: any) => prev.product = filteredProduct)
  };

  useEffect(() => {
    getProductData();
  });

  return (
    <div className="product-container">
      {product.id ? (
        <div className="product-item">
          <div className="product-image">
            <img src={product.image} alt="product" />
          </div>
          <div className="product-detail">
            <div className="product-desc">
              {product.description}
            </div>
            <div className="product-price">₹ {product.price}</div>
          </div>
        </div>
      ) : (
        <div className="product-empty">
          There is not product available, Please go back{" "}
          <Link to="/">Home</Link> to get the product.
        </div>
      )}
    </div>
  );
}

export default withRouter(Product);
