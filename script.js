// Estado global da aplicação
const gameState = {
  coins: 0,
  currentReason: 0,
  currentMemory: 0,
  isPlaying: false,
  currentVerse: 0,
}

// Dados dos motivos
const reasons = [
  {
    icon: "💕",
    title: "Porque eu te amo de verdade",
    description:
      "Não é só paixão, é amor genuíno que cresce a cada dia. Você é minha pessoa favorita no mundo inteiro!",
  },
  {
    icon: "🌟",
    title: "Você me faz ser uma pessoa melhor",
    description: "Com você eu aprendo, cresço e me torno a melhor versão de mim mesmo. Você traz o melhor de mim.",
  },
  {
    icon: "🎮",
    title: "Somos o combo perfeito",
    description: "Como Mario e Peach, como Link e Zelda... juntos somos imbatíveis! Nossa química é única.",
  },
  {
    icon: "🌈",
    title: "Você colore minha vida",
    description: "Antes de você, minha vida era em preto e branco. Você trouxe todas as cores do arco-íris!",
  },
  {
    icon: "🚀",
    title: "Temos sonhos para realizar juntos",
    description: "Ainda temos tantos lugares para conhecer, aventuras para viver e sonhos para conquistar!",
  },
  {
    icon: "🔥",
    title: "Nossa conexão é especial",
    description: "O que temos é raro e precioso. Não é todo dia que duas almas se conectam assim.",
  },
]

// Dados das memórias
const memories = [
  {
    title: "Nosso Primeiro Encontro",
    date: "O dia que mudou tudo",
    location: "Naquele lugar especial",
    description:
      "Lembro como se fosse ontem... seus olhos brilhando, seu sorriso tímido. Foi quando soube que você era especial.",
    emoji: "💕",
    color: "from-pink-400 to-red-400",
  },
  {
    title: "Nossa Primeira Viagem",
    date: "Aventura inesquecível",
    location: "Longe de casa, perto do coração",
    description:
      "Descobrimos juntos lugares novos, criamos memórias únicas. Cada foto, cada risada, cada momento foi mágico.",
    emoji: "✈️",
    color: "from-blue-400 to-purple-400",
  },
  {
    title: "Aquela Noite Especial",
    date: "Sob as estrelas",
    location: "Só nós dois no mundo",
    description:
      "Conversamos até o amanhecer, dividimos sonhos e medos. Foi quando percebi que queria você para sempre.",
    emoji: "🌟",
    color: "from-purple-400 to-indigo-400",
  },
  {
    title: "Nossos Momentos Bobos",
    date: "Risadas infinitas",
    location: "Em qualquer lugar",
    description: "Dançando na cozinha, cantando no carro, fazendo piadas internas. Você torna tudo mais divertido.",
    emoji: "😂",
    color: "from-yellow-400 to-orange-400",
  },
  {
    title: "Quando Você Me Cuidou",
    date: "Nos momentos difíceis",
    location: "Ao meu lado sempre",
    description: "Você esteve lá quando eu mais precisei. Seu carinho, sua paciência, seu amor me curaram.",
    emoji: "🤗",
    color: "from-green-400 to-teal-400",
  },
  {
    title: "Nossos Planos e Sonhos",
    date: "Olhando para o futuro",
    location: "Em nossos corações",
    description:
      "Falávamos sobre nossa casa, nossos pets, nossas aventuras futuras. Ainda quero realizar tudo isso com você.",
    emoji: "🏠",
    color: "from-teal-400 to-cyan-400",
  },
]

// Letras da música
const lyrics = [
  "🎵 Esta pode ser nossa última dança...",
  "💔 Mas eu ainda acredito no nosso amor",
  "🌟 Lembra quando dançávamos na cozinha?",
  "💕 Seus olhos brilhavam como estrelas",
  "🎭 Talvez eu tenha errado, eu sei...",
  "🙏 Mas meu coração ainda é seu",
  "💃 Me dê uma chance para essa última dança",
  "🕺 E talvez possamos recomeçar",
  "✨ Porque você ainda é minha música favorita",
  "💖 E eu quero dançar com você para sempre",
]

// Navegação entre páginas
function navigateTo(pageId) {
  // Esconder todas as páginas
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active")
  })

  // Mostrar a página desejada
  document.getElementById(pageId).classList.add("active")

  // Inicializar a página específica
  initializePage(pageId)
}

// Inicializar página específica
function initializePage(pageId) {
  switch (pageId) {
    case "home":
      initializeHome()
      break
    case "motivos":
      initializeMotivos()
      break
    case "lembrancas":
      initializeLembrancas()
      break
    case "last-dance":
      initializeLastDance()
      break
    case "final":
      initializeFinal()
      break
  }
}

// Inicializar página home
function initializeHome() {
  // Mostrar mensagem após 1 segundo
  setTimeout(() => {
    const messageBox = document.getElementById("messageBox")
    if (messageBox) {
      messageBox.style.opacity = "1"
      messageBox.style.transform = "translateY(0)"
    }
  }, 1000)

  // Criar corações flutuantes
  createFloatingHearts()
}

// Coletar moedas
function collectCoin() {
  gameState.coins++
  document.getElementById("coinCount").textContent = gameState.coins.toString().padStart(3, "0")

  // Efeito visual
  const coin = event.target
  coin.style.transform = "scale(1.5)"
  coin.style.opacity = "0.5"

  setTimeout(() => {
    coin.style.transform = "scale(1)"
    coin.style.opacity = "1"
  }, 300)
}

// Inicializar página motivos
function initializeMotivos() {
  createFloatingHearts()
  createReasonsGrid()
  startReasonRotation()
}

// Criar grid de motivos
function createReasonsGrid() {
  const grid = document.getElementById("reasonsGrid")
  if (!grid) return

  grid.innerHTML = ""

  reasons.forEach((reason, index) => {
    const card = document.createElement("div")
    card.className = `reason-card ${index === gameState.currentReason ? "active" : ""}`
    card.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 1rem;">${reason.icon}</div>
            <h3 style="margin-bottom: 1rem;">${reason.title}</h3>
            <p style="font-size: 0.875rem; opacity: 0.9;">${reason.description}</p>
        `
    card.onclick = () => setCurrentReason(index)
    grid.appendChild(card)
  })
}

// Definir motivo atual
function setCurrentReason(index) {
  gameState.currentReason = index
  updateReasonDisplay()
  updateReasonsGrid()
}

// Atualizar display do motivo
function updateReasonDisplay() {
  const display = document.getElementById("reasonDisplay")
  if (!display) return

  const reason = reasons[gameState.currentReason]
  display.innerHTML = `
        <div class="reason-icon">${reason.icon}</div>
        <h2 class="reason-title">${reason.title}</h2>
        <p class="reason-description">${reason.description}</p>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${((gameState.currentReason + 1) / reasons.length) * 100}%"></div>
        </div>
        <p class="progress-text">Motivo ${gameState.currentReason + 1} de ${reasons.length}</p>
    `
}

// Atualizar grid de motivos
function updateReasonsGrid() {
  const cards = document.querySelectorAll(".reason-card")
  cards.forEach((card, index) => {
    card.classList.toggle("active", index === gameState.currentReason)
  })
}

// Iniciar rotação automática dos motivos
function startReasonRotation() {
  setInterval(() => {
    gameState.currentReason = (gameState.currentReason + 1) % reasons.length
    updateReasonDisplay()
    updateReasonsGrid()
  }, 4000)
}

// Inicializar página lembranças
function initializeLembrancas() {
  createStarsBackground()
  createMemoryThumbnails()
  updateMemoryViewer()
}

// Criar fundo de estrelas
function createStarsBackground() {
  const starsContainer = document.querySelector(".stars-background")
  if (!starsContainer) return

  starsContainer.innerHTML = ""

  for (let i = 0; i < 20; i++) {
    const star = document.createElement("div")
    star.textContent = "⭐"
    star.style.position = "absolute"
    star.style.left = Math.random() * 100 + "%"
    star.style.top = Math.random() * 100 + "%"
    star.style.color = "white"
    star.style.opacity = "0.3"
    star.style.fontSize = Math.random() * 10 + 8 + "px"
    star.style.animation = `pulse ${Math.random() * 3 + 2}s infinite`
    star.style.animationDelay = Math.random() * 3 + "s"
    starsContainer.appendChild(star)
  }
}

// Criar miniaturas das memórias
function createMemoryThumbnails() {
  const container = document.getElementById("memoryThumbnails")
  if (!container) return

  container.innerHTML = ""

  memories.forEach((memory, index) => {
    const thumb = document.createElement("div")
    thumb.className = `memory-thumb ${index === gameState.currentMemory ? "active" : ""}`
    thumb.textContent = memory.emoji
    thumb.onclick = () => setCurrentMemory(index)
    container.appendChild(thumb)
  })
}

// Definir memória atual
function setCurrentMemory(index) {
  gameState.currentMemory = index
  updateMemoryViewer()
  updateMemoryThumbnails()
}

// Atualizar visualizador de memórias
function updateMemoryViewer() {
  const viewer = document.getElementById("memoryViewer")
  if (!viewer) return

  const memory = memories[gameState.currentMemory]
  viewer.innerHTML = `
        <div class="polaroid">
            <div class="photo">${memory.emoji}</div>
            <div class="photo-caption">${memory.title}</div>
        </div>
        
        <div class="memory-info">
            <div class="memory-date">📅 ${memory.date}</div>
            <div class="memory-location">📍 ${memory.location}</div>
            <p class="memory-description">${memory.description}</p>
        </div>

        <button class="nav-arrow left" onclick="previousMemory()">←</button>
        <button class="nav-arrow right" onclick="nextMemory()">→</button>
    `
}

// Atualizar miniaturas das memórias
function updateMemoryThumbnails() {
  const thumbs = document.querySelectorAll(".memory-thumb")
  thumbs.forEach((thumb, index) => {
    thumb.classList.toggle("active", index === gameState.currentMemory)
  })
}

// Memória anterior
function previousMemory() {
  gameState.currentMemory = (gameState.currentMemory - 1 + memories.length) % memories.length
  updateMemoryViewer()
  updateMemoryThumbnails()
}

// Próxima memória
function nextMemory() {
  gameState.currentMemory = (gameState.currentMemory + 1) % memories.length
  updateMemoryViewer()
  updateMemoryThumbnails()
}

// Inicializar página Last Dance
function initializeLastDance() {
  createFloorLights()
}

// Alternar música
function toggleMusic() {
  gameState.isPlaying = !gameState.isPlaying

  const playIcon = document.getElementById("playIcon")
  const playerStatus = document.getElementById("playerStatus")
  const discoBall = document.querySelector(".disco-ball")
  const spotlights = document.querySelectorAll(".spotlight")
  const danceFloor = document.getElementById("danceFloor")

  if (gameState.isPlaying) {
    playIcon.textContent = "⏸️"
    playerStatus.textContent = "Tocando nossa canção..."
    discoBall.classList.add("spinning")
    spotlights.forEach((spotlight) => spotlight.classList.add("active"))
    danceFloor.classList.add("dancing")

    startLyricsRotation()
    createDancingParticles()
    activateFloorLights()
  } else {
    playIcon.textContent = "▶️"
    playerStatus.textContent = "Clique para tocar"
    discoBall.classList.remove("spinning")
    spotlights.forEach((spotlight) => spotlight.classList.remove("active"))
    danceFloor.classList.remove("dancing")

    stopLyricsRotation()
    clearDancingParticles()
    deactivateFloorLights()
  }
}

// Iniciar rotação das letras
function startLyricsRotation() {
  const lyricsDisplay = document.getElementById("lyricsDisplay")
  const verseCounter = document.getElementById("verseCounter")

  gameState.lyricsInterval = setInterval(() => {
    gameState.currentVerse = (gameState.currentVerse + 1) % lyrics.length

    if (lyricsDisplay) {
      lyricsDisplay.innerHTML = `
                <div class="current-lyric">${lyrics[gameState.currentVerse]}</div>
                <div class="verse-counter">Verso ${gameState.currentVerse + 1} de ${lyrics.length}</div>
            `
    }
  }, 3000)
}

// Parar rotação das letras
function stopLyricsRotation() {
  if (gameState.lyricsInterval) {
    clearInterval(gameState.lyricsInterval)
  }

  const lyricsDisplay = document.getElementById("lyricsDisplay")
  if (lyricsDisplay) {
    lyricsDisplay.innerHTML = `
            <div class="current-lyric">🎵 Pronto para nossa última dança? 🎵</div>
            <div class="verse-counter"></div>
        `
  }
}

// Criar partículas dançantes
function createDancingParticles() {
  const container = document.getElementById("dancingParticles")
  if (!container) return

  container.innerHTML = ""

  const particles = ["💫", "✨", "🎵", "💖", "🌟"]

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div")
    particle.textContent = particles[Math.floor(Math.random() * particles.length)]
    particle.style.position = "absolute"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.fontSize = "1.5rem"
    particle.style.opacity = "0.6"
    particle.style.animation = `bounce ${Math.random() * 2 + 1}s infinite`
    particle.style.animationDelay = Math.random() * 2 + "s"
    container.appendChild(particle)
  }
}

// Limpar partículas dançantes
function clearDancingParticles() {
  const container = document.getElementById("dancingParticles")
  if (container) {
    container.innerHTML = ""
  }
}

// Criar luzes do chão
function createFloorLights() {
  const container = document.getElementById("floorLights")
  if (!container) return

  container.innerHTML = ""

  for (let i = 0; i < 64; i++) {
    const light = document.createElement("div")
    light.className = "light"
    light.style.animationDelay = i * 0.1 + "s"
    container.appendChild(light)
  }
}

// Ativar luzes do chão
function activateFloorLights() {
  const lights = document.querySelectorAll(".light")
  lights.forEach((light) => light.classList.add("active"))
}

// Desativar luzes do chão
function deactivateFloorLights() {
  const lights = document.querySelectorAll(".light")
  lights.forEach((light) => light.classList.remove("active"))
}

// Inicializar página final
function initializeFinal() {
  createFloatingHeartsForFinal()

  // Mostrar elementos com delay
  setTimeout(() => {
    const finalMessage = document.getElementById("finalMessage")
    if (finalMessage) {
      finalMessage.style.opacity = "1"
    }
  }, 1000)

  setTimeout(() => {
    const promiseSection = document.getElementById("promiseSection")
    if (promiseSection) {
      promiseSection.style.opacity = "1"
    }
  }, 3000)

  setTimeout(() => {
    const finalQuestion = document.getElementById("finalQuestion")
    if (finalQuestion) {
      finalQuestion.style.opacity = "1"
    }
  }, 5000)
}

// Criar corações flutuantes para a página final
function createFloatingHeartsForFinal() {
  const container = document.querySelector(".floating-hearts-final")
  if (!container) return

  container.innerHTML = ""

  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("div")
    heart.textContent = "💖"
    heart.style.position = "absolute"
    heart.style.left = Math.random() * 100 + "%"
    heart.style.top = Math.random() * 100 + "%"
    heart.style.color = "white"
    heart.style.opacity = "0.2"
    heart.style.fontSize = Math.random() * 30 + 15 + "px"
    heart.style.animation = `bounce ${Math.random() * 3 + 2}s infinite`
    heart.style.animationDelay = Math.random() * 3 + "s"
    container.appendChild(heart)
  }
}

// Lidar com resposta "Sim"
function handleYes() {
  const celebration = document.getElementById("celebration")
  const fireworks = document.getElementById("fireworks")

  if (celebration) {
    celebration.style.display = "block"
  }

  // Criar fogos de artifício
  if (fireworks) {
    createFireworks()
  }
}

// Lidar com resposta "Não"
function handleNo() {
  alert("Ops! Esse botão não funciona! 😉 Só o SIM está disponível porque eu acredito no nosso amor! 💕")
}

// Criar fogos de artifício
function createFireworks() {
  const container = document.getElementById("fireworks")
  if (!container) return

  container.innerHTML = ""

  const fireworksEmojis = ["🎆", "🎇", "✨", "💖", "🌟", "💫"]

  for (let i = 0; i < 50; i++) {
    const firework = document.createElement("div")
    firework.textContent = fireworksEmojis[Math.floor(Math.random() * fireworksEmojis.length)]
    firework.style.position = "absolute"
    firework.style.left = Math.random() * 100 + "%"
    firework.style.top = Math.random() * 100 + "%"
    firework.style.fontSize = Math.random() * 20 + 15 + "px"
    firework.style.animation = `ping ${Math.random() * 2 + 1}s infinite`
    firework.style.animationDelay = Math.random() * 2 + "s"
    container.appendChild(firework)
  }
}

// Criar corações flutuantes genéricos
function createFloatingHearts() {
  const container = document.querySelector(".floating-hearts")
  if (!container) return

  container.innerHTML = ""

  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div")
    heart.textContent = "💖"
    heart.style.position = "absolute"
    heart.style.left = Math.random() * 100 + "%"
    heart.style.top = Math.random() * 100 + "%"
    heart.style.color = "white"
    heart.style.opacity = "0.2"
    heart.style.fontSize = Math.random() * 20 + 10 + "px"
    heart.style.animation = `bounce ${Math.random() * 3 + 2}s infinite`
    heart.style.animationDelay = Math.random() * 3 + "s"
    container.appendChild(heart)
  }
}

// Navegação por teclado
document.addEventListener("keydown", (e) => {
  const currentPage = document.querySelector(".page.active").id

  switch (e.key) {
    case "ArrowLeft":
      if (currentPage === "lembrancas") {
        previousMemory()
      }
      break
    case "ArrowRight":
      if (currentPage === "lembrancas") {
        nextMemory()
      }
      break
    case " ":
      if (currentPage === "last-dance") {
        e.preventDefault()
        toggleMusic()
      }
      break
    case "Enter":
      if (currentPage === "final") {
        handleYes()
      }
      break
  }
})

// Inicializar aplicação
document.addEventListener("DOMContentLoaded", () => {
  initializeHome()
})

// Adicionar animação de ping para fogos de artifício
const style = document.createElement("style")
style.textContent = `
    @keyframes ping {
        75%, 100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)
