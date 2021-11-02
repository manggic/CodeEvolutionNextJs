import Link from "next/link";

function ProductList() {
  return (
    <div>
      <h1>Product-1</h1>
      <h1>Product-2</h1>
      <h1>Product-3</h1>

      <Link href="./" replace>
        <a>Home Page</a>
      </Link>
    </div>
  );
}

export default ProductList;
