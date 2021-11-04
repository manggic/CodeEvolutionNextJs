import Link from "next/link";

import { useRouter } from "next/router";

function Home() {
  return (
    <div>
      <Link href="/posts">
        <a>Posts</a>
      </Link>
    </div>
  );
}

// function Home() {
//   const router = useRouter();

//   const handleClick = () => {
//     console.log("order placed");
//     router.push("/product");
//   };

//   return (
//     <div>
//       <h1>Home Page</h1>
//       <Link href="./blog">
//         <a>Blog Page</a>
//       </Link>
//       <br />
//       <Link href="./product">
//         <a>Product Page</a>
//       </Link>

//       <button onClick={handleClick}>Place order</button>
//     </div>
//   );
// }

export default Home;
