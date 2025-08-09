document.getElementById("moodForm").addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("choiceSection").classList.remove("hidden");
});

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

document.getElementById("songBtn").addEventListener("click", function() {
    const mood = document.getElementById("mood").value;
    if (mood && songLinks[mood]) {
        window.open(songLinks[mood], "_blank");
    }
});

document.getElementById("bookBtn").addEventListener("click", function() {
    const mood = document.getElementById("mood").value;
    if (mood && bookLinks[mood]) {
        window.open(bookLinks[mood], "_blank");
    }
});
