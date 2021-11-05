const app = document.getElementById("app");
async function loadPost() {
    await fetch('/posts')
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        renderHTML(data);
    })
}

function renderHTML(data) {
    let strHTML = "";
    const items = data.data;
    console.log(items)
    for(let i = 0;i<items.length;i++){
        strHTML += `
        <div class="item">
            <img src="${items[i].imageUrl}">
            <div class="row"><b>${items[i].title}</b></div>
            <div class="row">${items[i].description}</div>
            <div class="row"><i>Create By: ${items[i].createdBy}</i></div>
        </div>`
    }
    app.innerHTML = strHTML;
}


loadPost();