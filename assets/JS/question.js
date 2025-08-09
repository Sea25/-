const songLinks = {
  happy: "https://open.spotify.com/track/3dptXKED8B3B13y2v3LJXJ",
  sad: "https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC",
  romantic: "https://open.spotify.com/track/5E30LdtzQTGqRvNd7l6kG5",
  energetic: "https://open.spotify.com/track/6habFhsOp2NvshLv26DqMb",
  relaxed: "https://open.spotify.com/track/1e7fw1KDoKhZYpG7B8zrcQ",
  angry: "https://open.spotify.com/track/0m9zHqhzjvZo6fV1ijL7xk",
  lonely: "https://open.spotify.com/track/3ZffCQKLFLUvYM59XKLbVm",
  motivated: "https://open.spotify.com/track/2YlZnw2ikdb837oKMKjBkW",
  nostalgic: "https://open.spotify.com/track/4bJxkBj2Y8sZ9w2PP2pR0L",
  bored: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b"
};

const bookLinks = {
  happy: "https://www.amazon.com/dp/198482015X",
  sad: "https://www.amazon.com/dp/0143127748",
  romantic: "https://www.amazon.com/dp/1501139156",
  energetic: "https://www.amazon.com/dp/0593237453",
  relaxed: "https://www.amazon.com/dp/0525566156",
  angry: "https://www.amazon.com/dp/0345472322",
  lonely: "https://www.amazon.com/dp/1501110365",
  motivated: "https://www.amazon.com/dp/0066620996",
  nostalgic: "https://www.amazon.com/dp/0143127748",
  bored: "https://www.amazon.com/dp/0593189647"
};

const moodButtons = document.querySelectorAll(".mood-btn");
const choiceSection = document.getElementById("choiceSection");
let selectedMood = null;

moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    moodButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedMood = btn.dataset.mood;
    choiceSection.classList.remove("hidden");
  });
});

function saveRecommendation(mood, type) {
  const saved = JSON.parse(localStorage.getItem("recommendations") || "{}");
  if (!saved[mood]) saved[mood] = {};
  saved[mood][type] = type === "song" ? songLinks[mood] : bookLinks[mood];
  localStorage.setItem("recommendations", JSON.stringify(saved));
  renderSaved();  // Update saved list instantly
}

document.getElementById("songBtn").addEventListener("click", () => {
  if (!selectedMood) return alert("Select a mood first!");
  saveRecommendation(selectedMood, "song");
  window.open(songLinks[selectedMood], "_blank", "noopener,noreferrer");
});

document.getElementById("bookBtn").addEventListener("click", () => {
  if (!selectedMood) return alert("Select a mood first!");
  saveRecommendation(selectedMood, "book");
  window.open(bookLinks[selectedMood], "_blank", "noopener,noreferrer");
});

const savedList = document.getElementById("savedList");
const clearBtn = document.getElementById("clearStorage");

function renderSaved() {
  const saved = JSON.parse(localStorage.getItem("recommendations") || "{}");
  savedList.innerHTML = "";

  if (Object.keys(saved).length === 0) {
    savedList.innerHTML = "<p>No recommendations saved yet.</p>";
    return;
  }

  for (const mood in saved) {
    const rec = saved[mood];
    const div = document.createElement("div");
    div.classList.add("saved-item");
    div.innerHTML = `
      <h3>${mood.charAt(0).toUpperCase() + mood.slice(1)}</h3>
      ${rec.song ? `<p>🎵 <a href="${rec.song}" target="_blank" rel="noopener noreferrer">Song</a></p>` : ""}
      ${rec.book ? `<p>📚 <a href="${rec.book}" target="_blank" rel="noopener noreferrer">Book</a></p>` : ""}
    `;
    savedList.appendChild(div);
  }
}

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("recommendations");
  renderSaved();
});

// Initial render of saved recommendations
renderSaved();
