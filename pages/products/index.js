import Link from "next/link";

const URL = "http://localhost:4000/products";

function ProductList({ products }) {
  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <Link href={`products/${product.id}`} passHref>
              <h3>
                {product.title}- {product.price}{" "}
              </h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;

export async function getStaticProps() {
  console.log("Generating product list");
  const res = await fetch(URL);
  const data = await res.json();

  console.log("calling data");
  return {
    props: {
      products: data,
    },
    revalidate: 30,
  };
}
