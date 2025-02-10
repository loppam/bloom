import fetch from "node-fetch";

export default async function handler(req, res) {
  const { imageUrl } = req.query;

  if (!imageUrl) {
    return res.status(400).json({ error: "Image URL is required" });
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    const buffer = await response.buffer();

    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Content-Type", contentType);

    return res.send(buffer);
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({
      error: "Failed to fetch image",
      details: err.message,
    });
  }
}
