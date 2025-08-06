const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { input } = event.queryStringParameters;
  if (!input) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing input parameter" }),
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
  }
  const apiUrl = `https://agri-rag-system-ry65qtqwszaamageffreuw.streamlit.app/?input=${encodeURIComponent(input)}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.text();
    return {
      statusCode: 200,
      body: data,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
  }
};