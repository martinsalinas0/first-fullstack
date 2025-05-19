'use client'
import "bootstrap/dist/css/bootstrap.min.css";
import ProductPage from "./components/productPage";


export default function Home() {
  return (
    <div className="">
      <div className="m-4">
        <ProductPage /> 
      </div>
    </div>
  );
}
