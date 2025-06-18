document.addEventListener("DOMContentLoaded", () => {
  const pokemonDay = Math.floor(Math.random() * 151) + 1;

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonDay}`)
    .then((res) => res.json())
    .then((data) => {
      const box = document.getElementById("poke-of-day");
      box.innerHTML = `
        <h3>🎲 Pokémon Aleatório:</h3>
        <img src="${data.sprites.other['official-artwork'].front_default}" width="120" />
        <p><strong>${data.name.toUpperCase()}</strong></p>
      `;
    });

  const pokedexBtn = document.getElementById("pokedex-btn");
  pokedexBtn.onclick = () => {
    window.location.href = "https://cornunu.github.io/POKE-DOX/";
  };

  const pixKey = crypto.randomUUID();
  document.getElementById("pixkey").innerText = pixKey;

  // QRCode usando api externa (grátis)
  const qr = document.getElementById("qrcode");
  qr.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?data=${pixKey}&size=150x150" alt="QR Pix" />`;

  document.getElementById("leaderboard-btn").onclick = () => {
    alert("Sistema de doadores em breve! 💲");
  };
});
