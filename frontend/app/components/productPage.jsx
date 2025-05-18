import ProductCard from "./ProductCard";

export default function ProductPage() {
  return (
    <div className="container my-5">
      <div className="row mb-4">
        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Search" />
        </div>
        <div className="col-md-3">
          <select className="form-select">
            <option value="">Sort by Category</option>
            <option value="garden">Garden</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select">
            <option value="">Sort by Price</option>
            <option value="high-low">Highest to Lowest</option>
            <option value="low-high">Lowest to Highest</option>
          </select>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <ProductCard
            productName="Various Electronic Devices"
            category="Electronics"
            stockNumber="343"
            imageUrl="https://picsum.photos/id/26/367/267"
          />
        </div>
        <div className="col-md-4">
          <ProductCard
            productName="Laptop"
            category="Electronics"
            stockNumber="315"
            imageUrl="https://picsum.photos/id/6/367/267"
          />
        </div>
        <div className="col-md-4">
          <ProductCard
            productName="Silverware - Forks"
            category="Dishware"
            stockNumber="423"
            imageUrl="https://picsum.photos/id/23/367/267"
          />
        </div>
        <div className="col-md-4">
          <ProductCard
            productName="Camera Parts"
            category="Photograhpy"
            stockNumber="897"
            imageUrl="https://picsum.photos/id/36/367/267"
          />
        </div>
        <div className="col-md-4">
          <ProductCard
            productName="Desk"
            category="Office Furnitire"
            stockNumber="120"
            imageUrl="https://picsum.photos/id/60/367/267"
          />
        </div>
        <div className="col-md-4">
          <ProductCard
            productName="Video Game Controller"
            category="Video Game Accessories"
            stockNumber="761"
            imageUrl="https://picsum.photos/id/96/367/267"
          />
        </div>
      </div>
    </div>
  );
}
