export default function ProductCard({
  productName,
  category,
  stockNumber,
  imageUrl,
}) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h6 className="card-title mt-2">
            Category: <strong>{category}</strong>
          </h6>
          <h3 className="card-title m-1">{stockNumber}</h3>
        </div>

        <div className="d-flex justify-content-center">
          <img
            src={imageUrl}
            className="img-fluid"
            alt="Product"
            style={{ maxHeight: "22rem", maxWidth: "17rem" }}
          />
        </div>

        <h5 className="card-text m-3 ">{productName}</h5>
      </div>
    </div>
  );
}
