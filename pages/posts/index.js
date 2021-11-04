import Link from "next/link";

const URL = "https://jsonplaceholder.typicode.com/posts";

function PostList({ posts }) {
  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`posts/${post.id}`}>
              <h3>{post.title}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default PostList;

export async function getStaticProps() {
  const res = await fetch(URL);
  const data = await res.json();

  console.log("calling data");
  return {
    props: {
      posts: data.slice(0, 3),
    },
  };
}
