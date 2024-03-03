// Creamos el método get para obtener los usuarios
$.get("https://jsonplaceholder.typicode.com/users/1", (data) => {
    console.log(data)
})

// Creamos una clase para agregar los usuarios:
/* 
"id": 1,
"name": "Leanne Graham",
"username": "Bret",
"email": "Sincere@april.biz",
"phone": "1-770-736-8031 x56442",
"website": "hildegard.org" 
*/
class Users {
    constructor(id, name, userName, email, phone, website) {
        this.id = id
        this.name = name
        this.userName = userName
        this.email = email
        this.phone = phone
        this.website = website
    }
}

// Creamos una clase para el repositorio
class Repository {
    constructor() {
        this.users = []
    }

    // Creamos una instancia para crear el usuario
    createUser({id, name, userName, email, phone, website}) {
        const newUser = new Users(id, name, userName, email, phone, website);
        this.users.push(newUser);
    }
}

const repository = new Repository();

// Creamos una función para renderizar los usuarios
const rendersUsers = () => {
    const usersContainer = document.getElementById("usersContainer");
    usersContainer.innerHTML = "";

    const users = repository.users;

    const htmlUser = users.map((user) => {
        const id = document.createElement("p");
        const name = document.createElement("h3");
        const userName = document.createElement("p");
        const email = document.createElement("p");
        const phone = document.createElement("p");
        const website = document.createElement("p");

        id.innerHTML = `ID: ${user.id}`;
        name.innerHTML = `Name: ${user.name}`;
        userName.innerHTML = `Username: ${user.userName}`;
        email.innerHTML = `Email: ${user.email}`;
        phone.innerHTML = `Phone: ${user.phone}`;
        website.innerHTML = `Website: ${user.website}`;

        const card = document.createElement("div");
        card.appendChild(id);
        card.appendChild(name);
        card.appendChild(userName);
        card.appendChild(email);
        card.appendChild(phone);
        card.appendChild(website);

        return card;
        
    });

    htmlUser.forEach((card) => {
        usersContainer.append(card);
    });

};

// Creamos una función para manejar el método get, con un condicional
let i = 1;
const addUser = () => {
    if (i > 10) return alert("Ya no hay más usuarios");
    $.get(`https://jsonplaceholder.typicode.com/users/${i}`, (data) => {
        i++;
        repository.createUser(data)
        rendersUsers()
    })
}

// Agregamos un evento al botón
const addUserBtn = document.getElementById("usersAddBtn");
addUserBtn.addEventListener("click", addUser)