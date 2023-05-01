async function getList() {
    const response = await fetch("http://127.0.0.1:8000");
    const jsonData = await response.json();
    console.log(jsonData);
    addItem(jsonData)
}

function addItem(astro) {
    astro.forEach(item => {
        // Get reference to the unordered list element
        const myList = document.getElementById("list");

        // Create a new list item element
        const newItem = document.createElement("li");
        newItem.id = item.id

        // Create 3 span elements with classes
        const spanName = document.createElement("span");
        spanName.classList.add("stellar-body-name");
        spanName.textContent = item.name

        const spanDistance = document.createElement("span");
        spanDistance.classList.add("stellar-body-distance");
        spanDistance.textContent = item.distance

        const spanType = document.createElement("span");
        spanType.classList.add("stellar-body-type");
        spanType.textContent = item.type

        // Create a div element containing 2 buttons
        const div = document.createElement("div");

        const button2 = document.createElement("button");
        button2.classList.add("delete-btn");
        button2.textContent = "Delete";
        button2.addEventListener("click", deleteAstro)
        div.appendChild(button2);

        // Append the spans and div to the new list item
        newItem.appendChild(spanName);
        newItem.appendChild(spanDistance);
        newItem.appendChild(spanType);
        newItem.appendChild(div);

        // Append the new list item to the unordered list
        myList.appendChild(newItem);
    });



}

function postAstro() {
    const name = document.getElementById("name").value;
    const distance = document.getElementById("distance").value;
    const type = document.getElementById("type").value;


    data = {
        name: name.toString(),
        distance: distance,
        type: type.toString()
    }
    fetch('http://127.0.0.1:8000/astro/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.error(error)).then(() => window.location.reload());
}

async function deleteAstro(event) {
    const astroItem = event.target.parentNode.parentNode;
    const astroId = astroItem.getAttribute("id");

    response = await fetch(`http://127.0.0.1:8000/astro/${astroId}`, {
        method: "DELETE"
    }).then(response => response.json())
        .catch(error => console.error(error)).then(() => window.location.reload());
}