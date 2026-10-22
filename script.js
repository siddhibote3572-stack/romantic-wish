

const surpriseBtn = document.getElementById("surpriseBtn");
const secret = document.getElementById("secret");
const musicBtn = document.getElementById("musicBtn");

let audioContext = null;
let masterVolume = null;
let melodyTimer = null;
let musicPlaying = false;

// Secret message reveal
surpriseBtn.addEventListener("click", () => {
  secret.classList.remove("hidden");
  surpriseBtn.textContent = "अहो, हे फक्त तुमच्यासाठी! ❤️";
  surpriseBtn.disabled = true;

secret.scrollIntoView({
  behavior: "smooth",
  block: "start"
});

  createHearts();
createFloatingHearts();
});

// Soft romantic piano-style melody
const notes = [
  261.63, 329.63, 392.00, 329.63,
  293.66, 349.23, 440.00, 392.00,
  261.63, 329.63, 392.00, 523.25,
  440.00, 392.00, 329.63, 293.66
];

function playSoftNote(frequency, startTime, duration) {
  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  volume.gain.setValueAtTime(0.001, startTime);
  volume.gain.exponentialRampToValueAtTime(
    0.12, startTime + 0.06
  );
  volume.gain.exponentialRampToValueAtTime(
    0.001, startTime + duration
  );

  oscillator.connect(volume);
  volume.connect(masterVolume);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.03);
}

function playMelody() {
  if (!musicPlaying || !audioContext) return;

  const start = audioContext.currentTime + 0.05;

  notes.forEach((frequency, index) => {
    playSoftNote(
      frequency,
      start + index * 0.34,
      0.65
    );
  });
}

musicBtn.addEventListener("click", async () => {
  try {
    if (!musicPlaying) {
      if (!audioContext || audioContext.state === "closed") {
        audioContext = new (
          window.AudioContext || window.webkitAudioContext
        )();

        masterVolume = audioContext.createGain();
        masterVolume.gain.value = 0.22;
        masterVolume.connect(audioContext.destination);
      }

      await audioContext.resume();

      musicPlaying = true;
      musicBtn.textContent = "⏸ संगीत थांबवा, अहो ❤️";

      playMelody();

      melodyTimer = setInterval(() => {
        playMelody();
      }, notes.length * 340);

    } else {
      musicPlaying = false;
      clearInterval(melodyTimer);
      melodyTimer = null;

      if (audioContext && audioContext.state !== "closed") {
        await audioContext.suspend();
      }

      musicBtn.textContent = "🎵 Play Romantic Music";
    }
  } catch (error) {
    musicBtn.textContent = "संगीत सुरू झाले नाही — पुन्हा प्रयत्न करा";
  }
});

// Floating hearts
function createHearts() {
  for (let i = 0; i < 24; i++) {
    const heart = document.createElement("span");
    const emojis = ["❤️", "💗", "💕", "🌹", "💖"];

    heart.textContent =
      emojis[Math.floor(Math.random() * emojis.length)];

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-40px";
    heart.style.fontSize = 20 + Math.random() * 20 + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";
    heart.style.transition =
      "transform 3s ease, opacity 3s ease";

    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform =
        `translateY(-${window.innerHeight + 100}px) rotate(360deg)`;
      heart.style.opacity = "0";
    });

    setTimeout(() => heart.remove(), 3200);
  }
}

/* Floating romantic hearts */
function createFloatingHearts() {
  const emojis = ["❤️", "💖", "💕", "💗", "🌹"];
const isMobile = window.innerWidth <= 600;
const totalHearts = isMobile ? 10 : 20;

for (let i = 0; i < totalHearts; i++) {
    const heart = document.createElement("span");

    heart.textContent =
      emojis[Math.floor(Math.random() * emojis.length)];

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-40px";
    heart.style.fontSize = 18 + Math.random() * 22 + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";

    document.body.appendChild(heart);

    heart.animate(
      [
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: 1
        },
        {
          transform:
            `translateY(-${window.innerHeight + 100}px) rotate(360deg)`,
          opacity: 0
        }
      ],
      {
        duration: 4000 + Math.random() * 2000,
        easing: "ease-out"
      }
    );

    setTimeout(() => heart.remove(), 6500);
  }
}

const noteBtn = document.getElementById("noteBtn");
const noteMessage = document.getElementById("noteMessage");

if (noteBtn && noteMessage) {
  noteBtn.addEventListener("click", () => {
    noteMessage.classList.remove("hidden");
    noteMessage.classList.add("note-reveal");
    noteBtn.textContent = "आता गुपित सांगितलं! 🙈❤️";
    noteBtn.disabled = true;
  });
}
