export default function handler(req, res) {
  console.log(req.query);
  const params = req.query.params;

  res.status(200).json(params);
}
