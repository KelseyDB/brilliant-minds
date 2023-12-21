(async () => {
  const response = await fetch('http://localhost:3000/');
  const data = await response.json();
  console.log(data);
  data.reverse();
  
  data.forEach(idea => {
    //body elements
    const ideaList = document.getElementById('ideaList');
    
    //create elements with title, descr 
    const li = document.createElement('li');
    li.className = ('idea');
    ideaList.appendChild(li);

    const ideaTitle = document.createElement('h4');
    ideaTitle.append(idea.title);
    li.append(ideaTitle);
    const ideaDescr = document.createElement('p');
    ideaDescr.append(idea.description);
    li.append(ideaDescr);

    //create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "x"
    li.append(deleteBtn);

    //eventlistener to remove idea
    //connect this with route and get IDea.id
    deleteBtn.addEventListener('click', async (e) => {
      const response = await fetch ("http://localhost:3000/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id:idea.id
        })
      });
      const data = await response.json();
      if(data.query) location.reload();
    })
  });

})();

