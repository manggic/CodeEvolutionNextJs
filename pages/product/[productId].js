import { useRouter } from "next/router";

function ProductDetail() {
  const route = useRouter();

  console.log("route", route);
  const id = route.query.productId;
  return <h1>Product {id}</h1>;
}

export default ProductDetail;
