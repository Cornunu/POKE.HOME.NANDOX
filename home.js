function saveUsername() {
  const input = document.getElementById("username").value.trim();
  if (input.length > 0) {
    localStorage.setItem("pokenandox_user", input);
    document.getElementById("login-overlay").style.display = "none";
    location.reload();
  }
}

const username = localStorage.getItem("pokenandox_user");
if (!username) {
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login-overlay").style.display = "flex";
  });
} else {
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login-overlay").style.display = "none";
    document.getElementById("user-welcome").textContent = `Conectado como: ${username}`;
    gerarPokemonDoDia();
  });
}

function gerarPokemonDoDia() {
  const dia = new Date().toDateString();
  let hash = 0;
  for (let i = 0; i < dia.length; i++) {
    hash += dia.charCodeAt(i);
  }
  const pokeId = (hash % 898) + 1;
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
    .then(res => res.json())
    .then(pokemon => {
      document.getElementById("pokemon-info").innerHTML = `
        <h3><img src="sr2a947c8f967b8.png" class="poke-icon" /> ${pokemon.name.toUpperCase()}</h3>
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" />
      `;
    });
}

const doadores = [
  { name: "NandoX", amount: 50 },
  { name: "PlayerMaster", amount: 20 },
  { name: "KakarotoBR", amount: 10 },
];

const ul = document.getElementById("donator-list");
doadores.forEach(d => {
  const li = document.createElement("li");
  li.innerHTML = `${d.name === username ? "🫡 <b>" + d.name + "</b>" : d.name} - R$${d.amount}`;
  ul.appendChild(li);
});

document.getElementById("donate-btn").onclick = () => {
  document.getElementById("donate-menu").classList.toggle("hidden");
};
