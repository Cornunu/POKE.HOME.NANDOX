const pokeDia = document.getElementById("pokemon-dia");
const donateBtn = document.getElementById("donateBtn");
const overlay = document.getElementById("donation-overlay");
const closeOverlay = document.getElementById("closeOverlay");
const moreInfoBtn = document.getElementById("moreInfoBtn");
const moreInfoText = document.getElementById("moreInfoText");
const pokedexBtn = document.getElementById("pokedexBtn");
const pixKey = "5a3c5f30-501e-4e72-bd5b-1488f25d7fca";

pokedexBtn.addEventListener("click", () => {
  window.location.href = "https://cornunu.github.io/POKE-DOX/";
});

donateBtn.addEventListener("click", () => overlay.classList.remove("hidden"));
closeOverlay.addEventListener("click", () => overlay.classList.add("hidden"));

moreInfoBtn.addEventListener("click", () => {
  moreInfoText.classList.toggle("hidden");
});

window.onload = async () => {
  const seed = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const id = Math.floor((new Date(seed).getTime() / 86400000) % 898) + 1;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  pokeDia.innerHTML = `
    <h2>Pokémon do Dia</h2>
    <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
    <p><strong>${data.name.toUpperCase()}</strong> - #${data.id.toString().padStart(3, "0")}</p>
  `;

  // QR Code PIX
  QRCode.toCanvas(document.getElementById("qrcode"), pixKey, { width: 200 });
};
