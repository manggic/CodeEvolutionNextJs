import { useState } from "react";

function CommentsPage() {
  const [comments, setComments] = useState([]);

  const [input, setInput] = useState("");

  const fetchComments = async () => {
    const response = await fetch("/api/comments");
    const data = await response.json();

    console.log("data", data);
    setComments(data);
  };

  const addComment = async () => {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment: input }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setInput("");
    console.log("POST data", data);
  };

  return (
    <div>
      <button onClick={fetchComments}>Load comment</button>
      <br />
      <div>
        <input
          type="text"
          placeholder="enter comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addComment}>Add</button>
      </div>

      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <p>{comment?.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default CommentsPage;
