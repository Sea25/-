document.getElementById("moodForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const selectedMood = document.querySelector('input[name="mood"]:checked').value;

    let choice = confirm("Do you want a SONG recommendation? (Cancel for BOOK)");

    // Opposite mood logic
    let oppositeMoods = {
        happy: "sad",
        sad: "happy",
        angry: "calm"
    };

    let finalMood = oppositeMoods[selectedMood] || selectedMood;

    if (choice) {
        // Song → Spotify search
        window.location.href = `https://open.spotify.com/search/${finalMood} song`;
    } else {
        // Book → Amazon search
        window.location.href = `https://www.amazon.in/s?k=${finalMood}+book`;
    }
});
