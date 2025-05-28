document.addEventListener('DOMContentLoaded', () => {
    // Audio Player
    const audio = document.getElementById('background-music');
    const playPauseBtn = document.querySelector('.play-pause');
    const backwardBtn = document.querySelector('.backward');
    const forwardBtn = document.querySelector('.forward');
    const progressBar = document.querySelector('.progress');

    let isPlaying = false;

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = '▶';
        } else {
            audio.play();
            playPauseBtn.textContent = '||';
        }
        isPlaying = !isPlaying;
    });

    // Skip backward 10 seconds
    backwardBtn.addEventListener('click', () => {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    });

    // Skip forward 10 seconds
    forwardBtn.addEventListener('click', () => {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    });

    // Update progress bar
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.left = `${progress}%`;
    });

    // Navigation buttons
    const playBtn = document.querySelector('.nav-button.play');
    const resumeBtn = document.querySelector('.nav-button.resume');
    const exitBtn = document.querySelector('.nav-button.exit');

    // Restore main content reveal on any scroll or wheel event
    const mainContent = document.querySelector('.main-content');
    function revealMainContent() {
        mainContent.classList.add('revealed');
        mainContent.classList.remove('hide-on-load');
        window.removeEventListener('scroll', revealMainContent);
        window.removeEventListener('wheel', revealMainContent);
    }
    window.addEventListener('scroll', revealMainContent);
    window.addEventListener('wheel', revealMainContent);

    resumeBtn.addEventListener('click', () => {
        // Scroll to Education section
        document.querySelector('.education-section').scrollIntoView({ behavior: 'smooth' });
    });

    exitBtn.addEventListener('click', () => {
        // Add a fun exit animation
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = 'https://github.com/kamrynt';
        }, 500);
    });

    // Add hover sound effect to buttons (optional)
    const buttons = document.querySelectorAll('button');
    const hoverSound = new Audio('assets/hover.mp3');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.2;
            hoverSound.play();
        });
    });

    // Progress bar animation
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const progressText = document.querySelector('.progress-text');
    
    function updateProgress() {
        const sections = document.querySelectorAll('.section');
        const windowHeight = window.innerHeight;
        let visibleSections = 0;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom >= 0) {
                visibleSections++;
            }
        });

        const progress = (visibleSections / sections.length) * 100;
        progressBarFill.style.width = `${progress}%`;
        progressText.textContent = `Progress: ${Math.round(progress)}%`;
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call

    // Play button opens select-save.html
    playBtn.addEventListener('click', () => {
        window.location.href = 'select-save.html';
    });
});
