(async () => {
  const response = await fetch('http://localhost:3000/');
  const data = await response.json();
  console.log(data);
  data.reverse();
  
  data.forEach(idea => {
    //body elements
    const ideaList = document.getElementById('ideaList');
    
    //create elements with title, descr 
    const singleIdea = document.createElement('div');
    singleIdea.className = ('idea fold');
    ideaList.appendChild(singleIdea);

    const buttonTray = document.createElement('div');
    buttonTray.className = "buttonTray"
    singleIdea.append(buttonTray);
    //create edit button
    const editBtn = document.createElement('img');
    editBtn.src = "./img/svg/edit-svgrepo-com (1).svg"
    editBtn.className = "editBtn"
    buttonTray.append(editBtn);

    //create delete button
    const deleteBtn = document.createElement('img');
    deleteBtn.src = "./img/svg/close-svgrepo-com.svg"
    deleteBtn.className = "deleteBtn"
    buttonTray.append(deleteBtn);

    const ideaTitle = document.createElement('h4');
    ideaTitle.append(idea.title);
    singleIdea.append(ideaTitle);

    const ideaDescr = document.createElement('p');
    ideaDescr.append(idea.description);
    singleIdea.append(ideaDescr);

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

