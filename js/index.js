// ---- Deliverables ---- // 

// 1) When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${currentPage}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(monsters) {
        showMonsters(monsters)
    })
});

const monsterContainer = document.querySelector("#monster-container")

function showMonsters(monsters) {
    monsters.forEach(monster => {
        let monsterDiv = document.createElement("div");
        let h2 = document.createElement("h2");
            h2.textContent = monster.name
        let h4 = document.createElement("h4");
            h4.textContent = monster.age
        let p = document.createElement("p");
            p.textContent = monster.description
        
        monsterDiv.append(h2, h4, p);
        monsterContainer.append(monsterDiv);
    })
};

// 2) Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description and a "Create Monster Button". When you click the button, the monster should be added to the list and saved in the API.
function newMonster() {
    let form = document.createElement("form");
        form.id = "monster-form"
    let inputName = document.createElement("input");
        inputName.id = "name"
        inputName.placeholder = "name..."
    let inputAge = document.createElement("input");
        inputAge.id = "age"
        inputAge.placeholder = "age..."
    let inputDescription = document.createElement("input");
        inputDescription.id = "description"
        inputDescription.placeholder = "description..."
    let button = document.createElement("button")
        button.textContent = "Create Monster Button"

    let createMonster = document.querySelector("#create-monster");
        createMonster.append(form);
    
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        let name = e.target.name.value
        let age = e.target.age.value
        let description = e.target.description.value

        let newMonst = {
            name: name,
            age: age,
            description: description
        }

        // POST request
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newMonst)
        })
    })

    form.append(inputName, inputAge, inputDescription, button);
};
newMonster();

// 3) At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.
function nextMonsters() {
    let forward = document.querySelector("#forward");
    forward.addEventListener("click", (e) => {
        monsterContainer.innerText = ""
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${++currentPage}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(monsters) {
            return showMonsters(monsters)
        })
    })
};
nextMonsters();

function backMonsters() {
    let backward = document.querySelector("#back");
        backward.textContent = "<="
    backward.addEventListener("click", (e) => {
        monsterContainer.innerText = ""
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${--currentPage}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(monsters) {
            return showMonsters(monsters)
        })
    })
};
backMonsters();