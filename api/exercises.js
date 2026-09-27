export default async function handler(req, res) {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST || "exercisedb.p.rapidapi.com";

  if (!apiKey) {
    return res.status(500).json({ error: "RAPIDAPI_KEY is not configured on Vercel." });
  }

  try {
    const upstream = await fetch("https://exercisedb.p.rapidapi.com/exercises", {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": apiHost
      }
    });

    const body = await upstream.text();
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.status(upstream.status).send(body);
  } catch (error) {
    res.status(502).json({ error: "Exercise service unavailable." });
  }
}