import { useRouter } from "next/router";

function Product({ product }) {
  const router = useRouter();

  // fallback UI if page is not found and fallback = true
  // if (router.isFallback) {
  //   return <h1>loading................</h1>;
  // }
  return (
    <>
      <h2>
        {product?.id} - {product?.title} - {product?.price}
      </h2>
      <div>{product?.body}</div>
    </>
  );
}

export default Product;

export async function getStaticPaths() {
  // const URL = "http://localhost:4000/products";
  // const res = await fetch(URL);
  // const data = await res.json();

  // const paths = data.slice(0, 3).map((product) => {
  //   return {
  //     params: {
  //       productId: `${product.id}`,
  //     },
  //   };
  // });

  return {
    paths: [{ params: { productId: "1" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  console.log("Regenerating params", params.productId);
  const URL = `http://localhost:4000/products/${params.productId}`;

  const res = await fetch(URL);

  const data = await res.json();

  // console.log(`Generating pages   /posts/${params.postId}`);

  return {
    props: {
      product: data,
    },
    revalidate: 10,
  };
}
