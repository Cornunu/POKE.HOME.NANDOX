const alerta = document.getElementById("alerta-central");
const pokeDay = document.getElementById("poke-day");
const button = document.getElementById("gotoPokedex");

// Função: Mostrar alerta e depois redirecionar
function mostrarBemVindoERedirecionar() {
  alerta.innerHTML = `<img src="sr2a947c8f967b8.png" style="width: 30px; vertical-align: middle;"> Bem-vindo(a) à Pokédex!`;
  alerta.style.display = "block";

  setTimeout(() => {
    window.location.href = "https://cornunu.github.io/POKE-DOX/";
  }, 2000);
}

// Se o botão for clicado, mostra alerta antes de ir
button.addEventListener("click", mostrarBemVindoERedirecionar);

// Pokémon do dia com base na data
const seed = new Date().getDate() + new Date().getMonth() + 1;
const pokeId = (seed % 898) + 1;

fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
  .then(res => res.json())
  .then(data => {
    pokeDay.innerHTML = `
      <strong>Pokémon do Dia:</strong><br>
      <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}" width="150"><br>
      <span style="font-size: 1.3em">${data.name.toUpperCase()}</span> (#${pokeId})
    `;
  })
  .catch(() => {
    pokeDay.innerHTML = "Erro ao carregar Pokémon do dia.";
  });