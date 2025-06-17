const loginOverlay = document.getElementById("login-overlay");
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");

const donateBtn = document.getElementById("donateBtn");
const donationOverlay = document.getElementById("donation-overlay");
const closeOverlay = document.getElementById("closeOverlay");
const moreInfoBtn = document.getElementById("moreInfoBtn");
const moreInfoText = document.getElementById("moreInfoText");
const pixKeySpan = document.getElementById("pix-key");

const pokedexBtn = document.getElementById("pokedexBtn");
const pokemonDiaSection = document.getElementById("pokemon-dia");

const PIX_KEY = "5a3c5f30-501e-4e72-bd5b-1488f25d7fca";

// login
loginBtn.onclick = () => {
  const name = usernameInput.value.trim();
  if (!name) return;
  localStorage.setItem("user_name", name);
  loginOverlay.classList.add("hidden");
  initHome();
};

if (localStorage.getItem("user_name")) {
  loginOverlay.classList.add("hidden");
  initHome();
}

// inicialização após login
function initHome() {
  // Pokémon do dia
  carregarPokemonDoDia();

  // redirecionar botão da Pokédex
  pokedexBtn.onclick = () => {
    window.location.href = "https://cornunu.github.io/POKE-DOX/";
  };

  // donation overlay
  pixKeySpan.innerText = PIX_KEY;
  donateBtn.onclick = () => donationOverlay.classList.remove("hidden");
  closeOverlay.onclick = () => donationOverlay.classList.add("hidden");
  moreInfoBtn.onclick = () => moreInfoText.classList.toggle("hidden");

  // gerar QR Code
  QRCode.toCanvas(
    document.getElementById("qrcode"),
    PIX_KEY,
    { width: 180 }
  );
}

// calcular ID baseado na data
function getDailyId() {
  const today = new Date().toISOString().split("T")[0];
  let hash = 0;
  for (let c of today) hash = (hash + c.charCodeAt(0)) % 10000;
  return (hash % 898) + 1;
}

// chamar API e mostrar Pokémon
async function carregarPokemonDoDia() {
  const id = getDailyId();
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    pokemonDiaSection.innerHTML = `
      <h2>Pokémon do Dia</h2>
      <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}" />
      <p><strong>${data.name.toUpperCase()}</strong> • #${String(data.id).padStart(3, "0")}</p>
    `;
  } catch {
    pokemonDiaSection.innerHTML = "Erro ao carregar Pokémon.";
  }
}
