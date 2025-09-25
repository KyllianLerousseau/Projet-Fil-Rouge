const handleAccount = document.getElementById("handleAccount");
const usersList = document.getElementById("usersList");

handleAccount.addEventListener("click", () => {
    window.location.href = "/redirect";
})

fetch("http://localhost:3000/api/users")
    .then(response => response.json())
    .then(users => {

        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.name} | ${user.email} | (Role)`;
            usersList.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Erreur lors de la récupérations des utilisateurs :", error);
        usersList.textContent = "Impossible de charger les utilisateurs.";
    });

