document.getElementById('askBtn').addEventListener('click', async function() {
  const question = document.getElementById('question').value.trim();
  const responseDiv = document.getElementById('response');
  if (!question) {
    responseDiv.textContent = "Please enter a question.";
    return;
  }
  responseDiv.textContent = "Loading...";

  // Your Streamlit API endpoint
  const apiUrl = "https://corsproxy.io/?" + encodeURIComponent("https://agri-rag-system-ry65qtqwszaamageffreuw.streamlit.app/?input=" + encodeURIComponent(question));

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });
    if (!res.ok) {
      responseDiv.textContent = "Error: " + res.statusText;
      return;
    }
    const data = await res.json();
    // Display the main answer (customize as needed)
    responseDiv.innerHTML = `<strong>Answer:</strong> ${data.reply ? data.reply : "No answer found."}`;
    // Optionally, show more details:
    // responseDiv.innerHTML += `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (err) {
    responseDiv.textContent = "Error: " + err.message;
  }
});

// Optional: allow pressing Enter+Ctrl to submit
document.getElementById('question').addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 'Enter') {
    document.getElementById('askBtn').click();
  }
});