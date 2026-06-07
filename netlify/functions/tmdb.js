const TMDB_BASE_URL = "https://api.themoviedb.org/3";

exports.handler = async function (event, context) {
  const apiKey = process.env.TMDB_API_KEY;
  const endpoint = event.queryStringParameters.endpoint;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "TMDB_API_KEY is not configured in Netlify environment variables." })
    };
  }

  if (!endpoint) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing endpoint parameter." })
    };
  }

  // Forward query parameters, overriding API key and language
  const params = { ...event.queryStringParameters };
  delete params.endpoint;
  params.api_key = apiKey;
  if (!params.language) {
    params.language = "en-US";
  }

  const tmdbUrl = new URL(`${TMDB_BASE_URL}${endpoint}`);
  tmdbUrl.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(tmdbUrl.toString());

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: await response.text()
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
