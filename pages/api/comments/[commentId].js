import { comments } from "../../../data/comments";
export default function handler(req, res) {
  const { commentId } = req.query;

  const comment = comments.find(
    (comment) => comment.id === parseInt(commentId)
  );

  res.status(201).json(comment);
}
