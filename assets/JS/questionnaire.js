// Small Book Dataset (Replace with 50+ books for real use)
const books = [
    { title: "The Hobbit", genre: "fantasy", mood: "adventurous", keyword: "epic" },
    { title: "Pride and Prejudice", genre: "romance", mood: "whimsical", keyword: "classic" },
    { title: "The Martian", genre: "sci-fi", mood: "curious", keyword: "scientific" },
    { title: "The Silent Patient", genre: "mystery", mood: "suspenseful", keyword: "thriller" },
];

let userAnswers = {};

async function recommendBook() {
    // 1. Save user answers
    userAnswers = {
        mood: document.getElementById("mood").value,
        genre: document.getElementById("genre").value,
        keyword: document.getElementById("keyword").value
    };

    // 2. Use AI to find closest book match
    const recommendedBook = await findBestBook(userAnswers);
    
    // 3. Display result
    document.getElementById("result").innerHTML = `
        <h2>${recommendedBook.title}</h2>
        <p><b>Why?</b> Matches your ${userAnswers.mood} mood, ${userAnswers.genre} taste, and love for ${userAnswers.keyword} stories!</p>
    `;
}

// AI Magic: Compare user input with books using NLP
async function fetchWorstBook(genre) {
    // Map user's genre to its OPPOSITE (for uselessness)
    const antiGenres = {
        "romance": "horror",
        "fantasy": "biography",
        "sci-fi": "historical",
        "happy": "tragedy"
    };
    const antiGenre = antiGenres[genre] || "technical"; // Fallback: boring books

    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${antiGenre}&maxResults=20`
    );
    const data = await response.json();
    const randomBook = data.items[Math.floor(Math.random() * data.items.length)];
    
    return {
        title: randomBook.volumeInfo.title,
        author: randomBook.volumeInfo.authors?.[0] || "Unknown",
        reason: `Opposite of ${genre} (${antiGenre})`
    };
}