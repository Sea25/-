document.addEventListener('DOMContentLoaded', function() {
    // Mood selection
    const moodOptions = document.querySelectorAll('.mood-option');
    
    moodOptions.forEach(option => {
        option.addEventListener('click', function() {
            const mood = this.getAttribute('data-mood');
            alert(`You selected ${mood} mood! Recommendation coming soon...`);
            // Here you would typically redirect or show the recommendation
        });
    });
    
    // Surprise me button
    const surpriseBtn = document.querySelector('.surprise-btn');
    surpriseBtn.addEventListener('click', function() {
        const moods = ['calm', 'happy', 'energetic', 'melancholy'];
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        alert(`Surprise! You got ${randomMood} mood!`);
    }); 
    // Mobile menu toggle would go here
});