document.getElementById("ideaForm").addEventListener("submit", async(e) => {
  e.preventDefault
  const title = document.getElementById("title").value;
  const description = document.getElementById('description').value;

  const response = await fetch('http://localhost:3000/create', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      title: title,
      description: description,
    })
  })
  if(!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  else{
    window.location.href = "http://127.0.0.1:5500/client/index.html";
    console.log("Idea submitted successfully!");
  }
});
