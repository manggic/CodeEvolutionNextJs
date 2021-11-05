import { useRouter } from "next/router";

function Post({ post }) {
  const router = useRouter();

  // fallback UI if page is not found and fallback = true
  // if (router.isFallback) {
  //   return <h1>loading................</h1>;
  // }
  return (
    <>
      <h2>
        {post?.id} - {post?.title}
      </h2>
      <div>{post?.body}</div>
    </>
  );
}

export default Post;

export async function getStaticPaths() {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const res = await fetch(URL);
  const data = await res.json();

  const paths = data.slice(0, 3).map((post) => {
    return {
      params: {
        postId: `${post.id}`,
      },
    };
  });

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  console.log("params", params);
  const URL = `https://jsonplaceholder.typicode.com/posts/${params.postId}`;

  const res = await fetch(URL);

  const data = await res.json();

  console.log(`Generating pages   /posts/${params.postId}`);

  return {
    props: {
      post: data,
    },
  };
}
