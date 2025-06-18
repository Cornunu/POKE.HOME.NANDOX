// Tela de login
const loginOverlay = document.getElementById('loginOverlay');
const enterBtn = document.getElementById('enterBtn');

if (!localStorage.getItem('pokeUser')) {
  loginOverlay.style.display = 'flex';
}

enterBtn.onclick = () => {
  const user = document.getElementById('userNameInput').value.trim();
  if (user) {
    localStorage.setItem('pokeUser', user);
    loginOverlay.style.display = 'none';
    showWelcomeNotification(user);
  }
};

// Notificação inicial
function showWelcomeNotification(name) {
  const alerta = document.createElement('div');
  alerta.innerText = `Bem-vindo(a), ${name}!`;
  alerta.style = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #222;
    padding: 20px;
    border: 2px solid #ffcb05;
    border-radius: 15px;
    z-index: 99999;
    font-size: 1.2em;
  `;
  document.body.appendChild(alerta);
  setTimeout(() => {
    alerta.remove();
  }, 3000);
}

// Pokémon do Dia
function getPokemonOfTheDay() {
  const today = new Date().toISOString().split('T')[0];
  let stored = JSON.parse(localStorage.getItem('pokeDay')) || {};
  if (stored.date !== today) {
    stored = {
      date: today,
      id: Math.floor(Math.random() * 898) + 1
    };
    localStorage.setItem('pokeDay', JSON.stringify(stored));
  }
  fetch(`https://pokeapi.co/api/v2/pokemon/${stored.id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('pokeDayBox').innerHTML = `
        <h3>${data.name.toUpperCase()}</h3>
        <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}" />
      `;
    });
}
getPokemonOfTheDay();

// Modal doação
const donateBtn = document.getElementById('donateBtn');
const donateModal = document.getElementById('donateModal');
const closeDonate = document.getElementById('closeDonate');

donateBtn.onclick = () => {
  donateModal.style.display = 'flex';
  if (!document.getElementById('qrReady')) {
    new QRCode(document.getElementById('qrcode'), {
      text: "5a3c5f30-501e-4e72-bd5b-1488f25d7fca",
      width: 200,
      height: 200
    });
    document.getElementById('qrcode').id = 'qrReady';
  }
};

closeDonate.onclick = () => donateModal.style.display = 'none';
