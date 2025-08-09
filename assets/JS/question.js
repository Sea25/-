const moods = document.querySelectorAll('.mood-card');
const recommendationSection = document.getElementById('recommendation-section');
let selectedMood = null;

// Opposite mood mapping
const oppositeMoods = {
    happy: "sad",
    sad: "😄happy",
    excited: "lazy",
    angry: "romantic",
    romantic: "angry",
    bored: "motivated",
    stressed: "nostalgic",
    motivated: "lazy",
    nostalgic: "excited",
    lazy: "motivated"
};

// Mood click
moods.forEach(card => {
    card.addEventListener('click', () => {
        selectedMood = card.dataset.mood;
        recommendationSection.classList.remove('hidden');
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
});

// Buttons
document.getElementById('book-btn').addEventListener('click', () => {
    const opposite = oppositeMoods[selectedMood];
    window.open(`https://www.amazon.in/s?k=${opposite}+books`, '_blank');
});

document.getElementById('song-btn').addEventListener('click', () => {
    const opposite = oppositeMoods[selectedMood];
    window.open(`https://open.spotify.com/search/${opposite}%20songs`, '_blank');
});
