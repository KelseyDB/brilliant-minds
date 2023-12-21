document.getElementById("ideaForm").addEventListener("submit", async(e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById('description').value;
  const response = await fetch('http://localhost:3000/create', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      title: title,
      description: description
    })
  });
  if (response.ok) {
    window.location.href = "./index.html";
    console.log("success");
  }
  else{
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
});

