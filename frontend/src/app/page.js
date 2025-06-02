'use client'
import "bootstrap/dist/css/bootstrap.min.css";
import ProductPage from "./components/productPage";
import ProductsList from "./components/productsList";


export default function Home() {
  return (
    <div className="">
      <div className="m-4">
        {/* <ProductPage /> */}
        <ProductsList /> 
      </div>
    </div>
  );
}
