document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = navLinks.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if(navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // 2. Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
    });

    // 3. Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    }

    // 4. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once element is visible
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => observer.observe(el));

    // 5. Voice Assistant
    // ==========================================
    const voiceBtn = document.getElementById('voice-btn');
    const voiceToast = document.getElementById('voice-toast');

    if (voiceBtn && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        function showToast(message, duration = 3000) {
            voiceToast.textContent = message;
            voiceToast.classList.add('show');
            setTimeout(() => { voiceToast.classList.remove('show'); }, duration);
        }

        function speak(text) {
            // Check if user requested silent mode or if speechSynthesis exists
            if (!('speechSynthesis' in window)) return;
            // Best effort voice synthesis
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            window.speechSynthesis.speak(utterance);
        }

        voiceBtn.addEventListener('click', () => {
            if (voiceBtn.classList.contains('listening')) {
                recognition.stop();
                return;
            }
            try {
                recognition.start();
                voiceBtn.classList.add('listening');
                showToast("Listening...");
            } catch (e) {
                console.error("Speech Recognition Error:", e);
            }
        });

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            voiceBtn.classList.remove('listening');
            showToast(`Heard: "${command}"`);

            setTimeout(() => {
                if (command.includes('project') || command.includes('work')) {
                    speak("Scrolling to projects.");
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                } else if (command.includes('about') || command.includes('who are you')) {
                    speak("Scrolling to about section.");
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                } else if (command.includes('download') || command.includes('resume') || command.includes('cv')) {
                    speak("Downloading resume.");
                    const link = document.createElement('a');
                    link.href = 'Mohammed shahid Resume.pdf';
                    link.download = 'Mohammed shahid Resume.pdf';
                    link.click();
                } else if (command.includes('contact') || command.includes('hire') || command.includes('email')) {
                    speak("Scrolling to contact form.");
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => document.getElementById('name')?.focus(), 800);
                } else if (command.includes('joke')) {
                    speak("Why do programmers prefer dark mode? Because light attracts bugs!");
                } else if (command.includes('hello') || command.includes('hi')) {
                    speak("Hello there! I am Mohammed's AI assistant. Try saying 'Go to projects'.");
                } else {
                    speak("I didn't catch that. Try saying 'Go to projects' or 'Download resume'.");
                }
            }, 500);
        };

        recognition.onspeechend = () => {
            recognition.stop();
            voiceBtn.classList.remove('listening');
        };

        recognition.onerror = (event) => {
            recognition.stop();
            voiceBtn.classList.remove('listening');
            if(event.error === 'not-allowed') {
                showToast("Microphone access denied.");
            } else {
                showToast("Sorry, couldn't hear that.");
            }
        };

        // Enter Screen Logic
        const enterScreen = document.getElementById('enter-screen');
        const enterBtn = document.getElementById('enter-btn');
        let hasWelcomed = false;

        if (enterBtn && enterScreen) {
            enterBtn.addEventListener('click', () => {
                enterScreen.classList.add('hidden');
                setTimeout(() => {
                    enterScreen.style.display = 'none';
                }, 800);

                if (!hasWelcomed) {
                    hasWelcomed = true;
                    // Fix iOS/Safari AudioContext requirement by ensuring it fires strictly on the click stack
                    window.speechSynthesis.resume();
                    speak("Welcome to Mohammed Shahid's portfolio. I am his artificial intelligence voice assistant. Feel free to explore his work!");
                }
            });
        }
    } else if (voiceBtn) {
        voiceBtn.style.display = 'none'; // Hide if unsupported by browser
    }
});
