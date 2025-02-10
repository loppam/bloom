import fetch from "node-fetch";

export default async function handler(req, res) {
  const { imageUrl } = req.query;

  if (!imageUrl) {
    return res.status(400).json({ error: "Image URL is required" });
  }

  try {
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.send(buffer);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch image", err });
  }
}
