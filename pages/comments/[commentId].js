import { comments } from "../../data/comments";

function singleComment({ comment }) {
  return (
    <div>
      <h2>
        {comment.id} - {comment.text}
      </h2>
    </div>
  );
}

export default singleComment;

export async function getStaticPaths() {
  const path = [
    { params: { commentId: "1" } },
    { params: { commentId: "2" } },
    { params: { commentId: "3" } },
  ];

  return {
    paths: path,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  console.log("inside getStaticProps");

  const { commentId } = params;

  const comment = comments.find(
    (comment) => comment.id === parseInt(commentId)
  );

  return {
    props: { comment },
  };
}
