const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const mainContent = document.getElementById("mainContent");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

// 🎁 Show main content
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  mainContent.style.display = "block";
  window.scrollTo(0, 0);
  createBalloons();
  createHearts();
});

// 🎵 Play/Pause audio
musicBtn.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {
      alert("Please tap once to allow music 🎶");
    });
    musicBtn.textContent = "⏸ Pause Romantic Song";
  } else {
    bgMusic.pause();
    musicBtn.textContent = "🎶 Play Romantic Song";
  }
});

// 🌠 Image slider
let slideIndex = 0;
const slides = document.querySelectorAll('.slider img');
function showSlides() {
  slides.forEach(img => img.classList.remove('active'));
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active');
}
setInterval(showSlides, 3000);

// ❤️ Floating hearts
function createHearts() {
  const heartContainer = document.getElementById("heart-container");
  setInterval(() => {
    const heart = document.createElement("div");
    heart.textContent = "💖";
    heart.style.position = "absolute";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 30 + 20 + "px";
    heart.style.animation = `float ${Math.random() * 4 + 3}s linear`;
    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }, 300);
}

const style = document.createElement('style');
style.textContent = `
@keyframes float {
  from { transform: translateY(100vh); opacity: 1; }
  to { transform: translateY(-10vh); opacity: 0; }
}`;
document.head.appendChild(style);

// 🎈 Balloons floating
function createBalloons() {
  const container = document.getElementById('balloon-container');
  for (let i = 0; i < 10; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = Math.random() * 100 + 'vw';
    balloon.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
    balloon.style.animationDuration = Math.random() * 5 + 6 + 's';
    container.appendChild(balloon);
    setTimeout(() => balloon.remove(), 8000);
  }
  setInterval(createBalloons, 4000);
}
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const startScreen = document.getElementById("startScreen");
  const birthdayCard = document.getElementById("birthdayCard");
  const mainContent = document.getElementById("mainContent");
  const musicBtn = document.getElementById("musicBtn");
  const bgMusic = document.getElementById("bgMusic");
  let musicPlaying = false;

  // 🎵 FIX: Attempt to play music immediately upon the first user click (startBtn)
  startBtn.addEventListener("click", () => {
    // 1. ATTEMPT TO PLAY: Use the click as the user's consent to start the music
    bgMusic.play()
      .then(() => {
        musicPlaying = true;
        // The browser allowed the music! Update the button text right away.
        musicBtn.textContent = "⏸ Pause Music"; 
        console.log("Music started successfully on initial click.");
      })
      .catch(err => {
        // If it fails (e.g., file not found), log the error but DON'T show a disruptive alert
        console.warn("Initial music play failed. User can use dedicated button later. Error:", err);
        musicPlaying = false;
        musicBtn.textContent = "🎶 Play Romantic Song";
      });

    // 2. Start the visual sequence (unchanged)
    startScreen.style.display = "none";
    birthdayCard.style.display = "block";

    // 3. Set a timeout for the main surprise (unchanged)
    setTimeout(() => {
      birthdayCard.style.display = "none";
      mainContent.style.display = "block";
      releaseBalloons();
      createHearts();
    }, 4000);
  });

  // 🎵 Play / Pause music on click (Simplified, removed disruptive alert)
  musicBtn.addEventListener("click", () => {
    if (!musicPlaying) {
      // Re-attempt play if it failed initially or if it was paused
      bgMusic.play()
        .then(() => {
          musicPlaying = true;
          musicBtn.textContent = "⏸ Pause Music";
        })
        .catch(err => {
          // If a manual click still fails, it's a file issue, not autoplay.
          console.error("Manual music play failed. Check the 'song.mp3' file path. Error:", err);
          musicBtn.textContent = "🎶 Play Romantic Song";
        });
    } else {
      bgMusic.pause();
      musicPlaying = false;
      musicBtn.textContent = "🎶 Play Romantic Song";
    }
  });

  // 🎈 Balloons (UNCHANGED)
  function releaseBalloons() {
    const container = document.getElementById("balloon-container");
    for (let i = 0; i < 25; i++) {
      const balloon = document.createElement("div");
      balloon.classList.add("balloon");
      balloon.style.left = `${Math.random() * 100}%`;
      balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
      balloon.style.animation = `floatUp ${6 + Math.random() * 6}s linear infinite`;
      container.appendChild(balloon);
    }
  }

  // 💖 Floating hearts (UNCHANGED)
  function createHearts() {
    const container = document.getElementById("romantic-hearts");
    setInterval(() => {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.textContent = "💖";
      heart.style.left = `${Math.random() * 100}%`;
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    }, 500);
  }
});