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
    const voiceBtn = document.getElementById('voice-btn');
    const voiceStatus = document.getElementById('voice-status');
    const voiceAssistant = document.getElementById('voice-assistant');

    if (voiceBtn && voiceStatus && voiceAssistant) {
        // Check if browser supports Web Speech API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            const synth = window.speechSynthesis;

            function speak(text) {
                if (synth.speaking) {
                    synth.cancel(); // Stop current speech before starting new one
                }
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 1;
                utterance.pitch = 1;
                synth.speak(utterance);
            }

            function showStatus(text, duration = 3000) {
                voiceStatus.textContent = text;
                voiceStatus.classList.add('show');
                setTimeout(() => {
                    voiceStatus.classList.remove('show');
                }, duration);
            }

            voiceBtn.addEventListener('click', () => {
                if (voiceBtn.classList.contains('listening')) {
                    recognition.stop();
                    return;
                }
                recognition.start();
                voiceBtn.classList.add('listening');
                voiceAssistant.classList.add('is-active');
                showStatus("Listening...");
            });

            recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase().trim();
                showStatus('You said: "' + command + '"');
                processCommand(command);
            };

            recognition.onspeechend = () => {
                recognition.stop();
                voiceBtn.classList.remove('listening');
                voiceAssistant.classList.remove('is-active');
            };

            recognition.onerror = (event) => {
                showStatus("Error occurred in recognition: " + event.error);
                voiceBtn.classList.remove('listening');
                voiceAssistant.classList.remove('is-active');
            };

            function processCommand(command) {
                if (command.includes('home') || command.includes('top')) {
                    speak("Navigating to home.");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } 
                else if (command.includes('about') || command.includes('who are you')) {
                    speak("Navigating to about me.");
                    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                } 
                else if (command.includes('project') || command.includes('work')) {
                    speak("Showing featured projects.");
                    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                } 
                else if (command.includes('download') || command.includes('resume')) {
                    speak("Downloading resume.");
                    document.getElementById('downloads').scrollIntoView({ behavior: 'smooth' });
                    // Automatically click the download link
                    const downloadLink = document.querySelector('a[download]');
                    if(downloadLink) downloadLink.click();
                } 
                else if (command.includes('contact') || command.includes('touch')) {
                    speak("Navigating to contact section.");
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                } 
                else if (command.includes('hello') || command.includes('hi')) {
                    speak("Hello! I am the portfolio voice assistant. You can ask me to show projects or go to contact.");
                } 
                else {
                    speak("Sorry, I didn't understand that command. Try saying 'show projects'.");
                    showStatus("Command not recognized.");
                }
            }
        } else {
            // Hide voice assistant if API is not supported
            voiceAssistant.style.display = 'none';
            console.warn("Speech Recognition API is not supported in this browser.");
        }
    }
});
