// Mood to OPPOSITE mapping
const moodOpposites = {
  happy: "sad",
  sad: "happy",
  romantic: "bored",
  energetic: "relaxed",
  relaxed: "energetic",
  angry: "relaxed",
  lonely: "motivated",
  motivated: "lonely",
  nostalgic: "energetic",
  bored: "romantic"
};

// Songs for OPPOSITE moods (to balance user's current mood)
const songLinks = {
  happy: "3dptXKED8B3B13y2v3LJXJ", // Happy song → shown when user is SAD
  sad: "1e7fw1KDoKhZYpG7B8zrcQ",   // Calm song → shown when user is HAPPY
  romantic: "0VjIjW4GlUZAMYd2vXMi3b", // Boring song → shown when user is ROMANTIC
  energetic: "1e7fw1KDoKhZYpG7B8zrcQ", // Relaxing song → shown when user is ENERGETIC
  relaxed: "6habFhsOp2NvshLv26DqMb",   // Energetic song → shown when user is RELAXED
  angry: "1e7fw1KDoKhZYpG7B8zrcQ",     // Calm song → shown when user is ANGRY
  lonely: "2YlZnw2ikdb837oKMKjBkW",    // Motivating song → shown when user is LONELY
  motivated: "3ZffCQKLFLUvYM59XKLbVm",  // Lonely song → shown when user is MOTIVATED
  nostalgic: "6habFhsOp2NvshLv26DqMb",  // Energetic song → shown when user is NOSTALGIC
  bored: "5E30LdtzQTGqRvNd7l6kG5"       // Romantic song → shown when user is BORED
};

// Books for OPPOSITE moods
const bookLinks = {
  happy: "https://www.amazon.com/dp/0143127748", // Sad book ("The Fault in Our Stars") → shown when user is HAPPY
  sad: "https://www.amazon.com/dp/198482015X",   // Happy book ("The Happiness Project") → shown when user is SAD
  romantic: "https://www.amazon.com/dp/0593189647", // Boring book ("Atomic Habits") → shown when user is ROMANTIC
  energetic: "https://www.amazon.com/dp/0525566156", // Relaxing book ("Where the Crawdads Sing") → shown when user is ENERGETIC
  relaxed: "https://www.amazon.com/dp/0593237453",   // Energetic book ("Can't Hurt Me") → shown when user is RELAXED
  angry: "https://www.amazon.com/dp/0525566156",     // Calm book → shown when user is ANGRY
  lonely: "https://www.amazon.com/dp/0066620996",    // Motivating book ("The 7 Habits") → shown when user is LONELY
  motivated: "https://www.amazon.com/dp/1501110365", // Lonely book ("Eleanor Oliphant") → shown when user is MOTIVATED
  nostalgic: "https://www.amazon.com/dp/0593237453", // Energetic book → shown when user is NOSTALGIC
  bored: "https://www.amazon.com/dp/1501139156"      // Romantic book ("It Ends With Us") → shown when user is BORED
};

// Rest of the JS remains the same, but update the recommendation logic:
function showSong(mood) {
  const oppositeMood = moodOpposites[mood];
  playerContainer.innerHTML = `
    <iframe 
      src="https://open.spotify.com/embed/track/${songLinks[oppositeMood]}" 
      width="100%" 
      height="80" 
      frameborder="0" 
      allowtransparency="true" 
      allow="encrypted-media"
    ></iframe>
  `;
}

document.getElementById("songBtn").addEventListener("click", () => {
  if (!selectedMood) return alert("Select a mood first!");
  const oppositeMood = moodOpposites[selectedMood];
  showSong(oppositeMood);
  saveRecommendation(selectedMood, "song");
  confetti({ particleCount: 100, spread: 70 });
});

document.getElementById("bookBtn").addEventListener("click", () => {
  if (!selectedMood) return alert("Select a mood first!");
  const oppositeMood = moodOpposites[selectedMood];
  window.open(bookLinks[oppositeMood], "_blank", "noopener,noreferrer");
  saveRecommendation(selectedMood, "book");
});