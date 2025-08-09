document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const questions = document.querySelectorAll('.question');
    const options = document.querySelectorAll('.option');
    const nextBtn = document.querySelector('.next');
    const progressBar = document.querySelector('.progress-bar');
    const completionScreen = document.querySelector('.completion-screen');
    
    // Quiz state
    let currentQuestion = 0;
    const totalQuestions = questions.length;
    
    // Initialize quiz
    updateProgressBar();
    updateNavButton();
    
    // Option selection
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selection from other options in this question
            const optionsInQuestion = this.closest('.options-container').querySelectorAll('.option');
            optionsInQuestion.forEach(opt => opt.classList.remove('selected'));
            
            // Select this option
            this.classList.add('selected');
            
            // Enable next button
            nextBtn.disabled = false;
        });
    });
    
    // Next button
    nextBtn.addEventListener('click', function() {
        if (currentQuestion < totalQuestions - 1) {
            // Move to next question
            questions[currentQuestion].classList.remove('active');
            currentQuestion++;
            questions[currentQuestion].classList.add('active');
            
            // Update progress and button
            updateProgressBar();
            updateNavButton();
            
            // Disable next button until option is selected
            nextBtn.disabled = true;
        } else {
            // Quiz completed
            completeQuiz();
        }
    });
    
    // Helper functions
    function updateProgressBar() {
        const progress = ((currentQuestion + 1) / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    function updateNavButton() {
        if (currentQuestion === totalQuestions - 1) {
            nextBtn.textContent = 'See Results';
        } else {
            nextBtn.textContent = 'Next Question';
        }
    }
    
    function completeQuiz() {
        // Hide questions
        document.querySelector('.questionnaire-body').style.display = 'none';
        
        // Show completion screen
        completionScreen.style.display = 'block';
        
        // Create confetti effect
        createConfetti();
    }
    
    function createConfetti() {
        const container = document.querySelector('.questionnaire-container');
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = getRandomColor();
            container.appendChild(confetti);
            
            animateConfetti(confetti);
        }
    }
    
    function animateConfetti(confetti) {
        const duration = Math.random() * 3 + 2;
        confetti.style.transform = `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`;
        confetti.style.transition = `all ${duration}s ease-out`;
        setTimeout(() => confetti.remove(), duration * 1000);
    }
    
    function getRandomColor() {
        const colors = ['#6c5ce7', '#a29bfe', '#fd79a8', '#00cec9', '#55efc4'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});