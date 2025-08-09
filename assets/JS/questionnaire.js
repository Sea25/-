// questionnaire.js
document.addEventListener("DOMContentLoaded", () => {
  const moodBtns = document.querySelectorAll(".mood-btn");
  const roastText = document.getElementById("roast-text");
  const nextBtn = document.getElementById("next-btn");

  // Mood data (matches config.js)
  const moodData = {
    calm: {
      roast: "You're a 'Cozy Blanket Philosopher'... perfect for slow, deep reads.",
      bgClass: "calm-bg"
    },
    energetic: {
      roast: "You're a 'Hyperactive Idea Machine'... try not to read while jumping!",
      bgClass: "energetic-bg"
    },
    melancholy: {
      roast: "You're a 'Midnight Overthinker'... here's something to hug your soul.",
      bgClass: "melancholy-bg"
    },
    random: {
      roast: "You're a 'Chaotic Goblin'... the universe picked this for you. Good luck.",
      bgClass: "random-bg"
    }
  };

  // Handle mood selection
  moodBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const mood = btn.dataset.mood;
      
      // Save to localStorage for other pages
      localStorage.setItem("userMood", mood);
      
      // Update UI
      document.body.className = moodData[mood].bgClass;
      roastText.textContent = moodData[mood].roast;
      nextBtn.classList.remove("hidden");
    });
  });
});