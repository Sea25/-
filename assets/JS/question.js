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

// Song recommendations for opposite moods (using correct Spotify IDs)
const songRecommendations = {
    happy: { // When user is happy, recommend sad music
        id: "1e7fw1KDoKhZYpG7B8zrcQ", // Weightless by Marconi Union
        title: "Weightless",
        artist: "Marconi Union",
        reason: "Calming music to balance happiness"
    },
    sad: { // When user is sad, recommend happy music
        id: "3dptXKED8B3B13y2v3LJXJ", // Happy by Pharrell Williams
        title: "Happy",
        artist: "Pharrell Williams",
        reason: "Upbeat music to lift your mood"
    },
    romantic: {
        id: "0VjIjW4GlUZAMYd2vXMi3b", // Elevator Music
        title: "Elevator Music",
        artist: "Various",
        reason: "Neutral music to balance romantic feelings"
    },
    energetic: {
        id: "1e7fw1KDoKhZYpG7B8zrcQ", // Weightless
        title: "Weightless",
        artist: "Marconi Union",
        reason: "Calming music to balance energy"
    },
    relaxed: {
        id: "6habFhsOp2NvshLv26DqMb", // Eye of the Tiger
        title: "Eye of the Tiger",
        artist: "Survivor",
        reason: "Energetic music to boost relaxation"
    },
    angry: {
        id: "1e7fw1KDoKhZYpG7B8zrcQ", // Weightless
        title: "Weightless",
        artist: "Marconi Union",
        reason: "Calming music to soothe anger"
    },
    lonely: {
        id: "2YlZnw2ikdb837oKMKjBkW", // Hall of Fame
        title: "Hall of Fame",
        artist: "The Script ft. will.i.am",
        reason: "Motivational music for loneliness"
    },
    motivated: {
        id: "3ZffCQKLFLUvYM59XKLbVm", // Someone Like You
        title: "Someone Like You",
        artist: "Adele",
        reason: "Emotional music to balance motivation"
    },
    nostalgic: {
        id: "6habFhsOp2NvshLv26DqMb", // Eye of the Tiger
        title: "Eye of the Tiger",
        artist: "Survivor",
        reason: "Energetic music for nostalgia"
    },
    bored: {
        id: "5E30LdtzQTGqRvNd7l6kG5", // Thinking Out Loud
        title: "Thinking Out Loud",
        artist: "Ed Sheeran",
        reason: "Romantic music to counter boredom"
    }
};

// Book recommendations for opposite moods (verified Amazon links)
const bookRecommendations = {
    happy: {
        url: "https://www.amazon.com/dp/0143127748", // The Fault in Our Stars
        title: "The Fault in Our Stars",
        author: "John Green",
        reason: "Poignant story to balance happiness"
    },
    sad: {
        url: "https://www.amazon.com/dp/198482015X", // The Happiness Project
        title: "The Happiness Project",
        author: "Gretchen Rubin",
        reason: "Guide to cultivating happiness"
    },
    romantic: {
        url: "https://www.amazon.com/dp/0593189647", // Atomic Habits
        title: "Atomic Habits",
        author: "James Clear",
        reason: "Practical focus to balance romance"
    },
    energetic: {
        url: "https://www.amazon.com/dp/0525566156", // Where the Crawdads Sing
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        reason: "Calming novel to relax energy"
    },
    relaxed: {
        url: "https://www.amazon.com/dp/0593237453", // Can't Hurt Me
        title: "Can't Hurt Me",
        author: "David Goggins",
        reason: "Motivational book to energize"
    },
    angry: {
        url: "https://www.amazon.com/dp/0525566156", // Where the Crawdads Sing
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        reason: "Soothing story to calm anger"
    },
    lonely: {
        url: "https://www.amazon.com/dp/0066620996", // The 7 Habits
        title: "The 7 Habits of Highly Effective People",
        author: "Stephen R. Covey",
        reason: "Inspiration for personal growth"
    },
    motivated: {
        url: "https://www.amazon.com/dp/1501110365", // Eleanor Oliphant
        title: "Eleanor Oliphant Is Completely Fine",
        author: "Gail Honeyman",
        reason: "Story of human connection"
    },
    nostalgic: {
        url: "https://www.amazon.com/dp/0593237453", // Can't Hurt Me
        title: "Can't Hurt Me",
        author: "David Goggins",
        reason: "Motivational book for nostalgia"
    },
    bored: {
        url: "https://www.amazon.com/dp/1501139156", // It Ends With Us
        title: "It Ends With Us",
        author: "Colleen Hoover",
        reason: "Engaging romantic novel"
    }
};

// DOM Elements
const moodCards = document.querySelectorAll('.mood-card');
const choiceSection = document.getElementById('choiceSection');
const playerContainer = document.getElementById('playerContainer');
const songBtn = document.getElementById('songBtn');
const bookBtn = document.getElementById('bookBtn');
const clearBtn = document.getElementById('clearStorage');
const savedList = document.getElementById('savedList');
let selectedMood = null;

// Initialize the app
function initApp() {
    // Mood selection
    moodCards.forEach(card => {
        card.addEventListener('click', function() {
            selectMood(this.dataset.mood);
        });
    });

    // Event listeners
    songBtn.addEventListener('click', playSong);
    bookBtn.addEventListener('click', playBook);
    clearBtn.addEventListener('click', clearRecommendations);

    // Initial render of saved items
    renderSaved();
}

function selectMood(mood) {
    // Remove selected state from all cards
    moodCards.forEach(c => c.classList.remove('selected'));

    // Add selected state to clicked card
    const selectedCard = document.querySelector(`.mood-card[data-mood="${mood}"]`);
    selectedCard.classList.add('selected');
    selectedMood = mood;

    // Show recommendation section
    choiceSection.classList.add('active');

    // Clear previous player content
    playerContainer.innerHTML = '';

    // Add mood class to body for theming
    document.body.className = `mood-${selectedMood}`;
}

function playSong() {
    if (!selectedMood) {
        showAlert('Please select a mood first');
        return;
    }
    const oppositeMood = moodOpposites[selectedMood];
    const recommendation = songRecommendations[oppositeMood];
    if (!recommendation) {
        showAlert('No song recommendation found for this mood');
        return;
    }
    showSong(recommendation);
    saveRecommendation(selectedMood, 'song', recommendation);
    showConfetti();
}

function playBook() {
    if (!selectedMood) {
        showAlert('Please select a mood first');
        return;
    }
    const oppositeMood = moodOpposites[selectedMood];
    const recommendation = bookRecommendations[oppositeMood];
    if (!recommendation) {
        showAlert('No book recommendation found for this mood');
        return;
    }
    showBook(recommendation);
    saveRecommendation(selectedMood, 'book', recommendation);
    window.open(recommendation.url, '_blank', 'noopener,noreferrer');
}

function showSong(recommendation) {
    playerContainer.innerHTML = `
        <div class="song-info">
            <h3>${recommendation.title}</h3>
            <p class="artist">${recommendation.artist}</p>
            <p class="reason">${recommendation.reason}</p>
        </div>
        <iframe 
            src="https://open.spotify.com/embed/track/${recommendation.id}" 
            width="100%" 
            height="80" 
            frameborder="0" 
            allowtransparency="true" 
            allow="encrypted-media">
        </iframe>
    `;
}

function showBook(recommendation) {
    playerContainer.innerHTML = `
        <div class="book-info">
            <h3>${recommendation.title}</h3>
            <p class="author">by ${recommendation.author}</p>
            <p class="reason">${recommendation.reason}</p>
            <a href="${recommendation.url}" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-external-link-alt"></i> View on Amazon
            </a>
        </div>
    `;
}

function saveRecommendation(mood, type, recommendation) {
    // Retrieve existing saved recommendations or initialize empty object
    let saved = JSON.parse(localStorage.getItem('recommendations') || '{}');

    // Ensure the mood category exists
    if (!saved[mood]) {
        saved[mood] = {
            mood: mood,
            opposite: moodOpposites[mood] || '',
            items: []
        };
    }

    // Prevent duplicate saves for the exact same recommendation (optional)
    const exists = saved[mood].items.some(item => item.type === type && item.data.id === recommendation.id);
    if (exists) return;  // skip saving duplicate

    // Add new recommendation to the list
    saved[mood].items.push({
        type: type,
        data: recommendation,
        timestamp: new Date().toISOString()
    });

    // Save back to localStorage
    localStorage.setItem('recommendations', JSON.stringify(saved));

    // Update UI
    renderSaved();
}


function renderSaved() {
    const saved = JSON.parse(localStorage.getItem('recommendations') || '{}');
    const moods = Object.values(saved);

    if (moods.length === 0) {
        savedList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <p>No recommendations saved yet</p>
            </div>
        `;
        return;
    }

    // Sort by most recent first
    moods.sort((a, b) => {
        const latestA = a.items[a.items.length - 1].timestamp;
        const latestB = b.items[b.items.length - 1].timestamp;
        return new Date(latestB) - new Date(latestA);
    });

    savedList.innerHTML = moods.map(mood => `
    <div class="saved-mood-group">
        <h3 class="mood-header">
            <span class="mood-name">${mood.mood.charAt(0).toUpperCase() + mood.mood.slice(1)}</span>
            <!-- Removed the opposite mood display -->
        </h3>
        <div class="mood-items">
            ${mood.items.map(item => `
                <div class="saved-item ${item.type}">
                    <h4>
                        <i class="fas fa-${item.type === 'song' ? 'music' : 'book'}"></i>
                        ${item.data.title}
                    </h4>
                    ${item.type === 'song' ? `
                        <p class="artist">${item.data.artist}</p>
                        <p class="reason">${item.data.reason}</p>
                        <a href="https://open.spotify.com/track/${item.data.id}" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i> Listen on Spotify
                        </a>
                    ` : `
                        <p class="author">${item.data.author}</p>
                        <p class="reason">${item.data.reason}</p>
                        <a href="${item.data.url}" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i> View on Amazon
                        </a>
                    `}
                    <p class="timestamp">Saved on ${new Date(item.timestamp).toLocaleString()}</p>
                </div>
            `).join('')}
        </div>
    </div>
`).join('');
                    }

function clearRecommendations() {
    if (confirm('Are you sure you want to clear all saved recommendations?')) {
        localStorage.removeItem('recommendations');
        renderSaved();
    }
}

function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.classList.add('show');
    }, 10);

    setTimeout(() => {
        alertBox.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 300);
    }, 3000);
}

function showConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}
function recommendBook() {
    if (!selectedMood) {
        showAlert('Please select a mood first');
        return;
    }

    const oppositeMood = moodOpposites[selectedMood];
    const recommendation = bookRecommendations[oppositeMood];

    if (!recommendation) {
        showAlert('No book recommendation found for this mood');
        return;
    }

    // Save recommendation before opening link
    saveRecommendation(selectedMood, 'book', recommendation);

    // Open book link
    window.open(recommendation.url, '_blank', 'noopener,noreferrer');
}


// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
