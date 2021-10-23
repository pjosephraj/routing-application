import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


interface ResponseData {
  id: number;
  price: number;
  description: string;
  image: string;
}

export default function Home(props: any) {

  const [response, setResponse] = useState<ResponseData[]>([]);

  const getProductsData = async () => {
    const apiResponse = await fetch("https://fakestoreapi.com/products");
    const resp = await apiResponse.json();
    setResponse((prev: any) => prev = resp);
    props.setProducts(resp);
  };

  useEffect(() => {
    if(!response.length) {
      getProductsData();
    }
  });

  return (
    <>
      <div className="product-list">
        {response.map((resp: ResponseData) => {
          return (
            <Link to={`/${resp.id}`} key={resp.id} className="product-item">
              <img src={resp.image} alt="product" />
              <div className="product-desc">
                {resp.description.slice(0, 100) + "..."}
              </div>
              <div className="product-price">₹ {resp.price}</div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
