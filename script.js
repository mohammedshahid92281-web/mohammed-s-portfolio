document.addEventListener('DOMContentLoaded', () => {
    // 0. Disable Scroll for Enter Screen
    document.body.classList.add('no-scroll');
    // 0. Smooth Scrolling (Lenis)
    // ==========================================
    let lenis;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Sync Lenis with ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }

    // 1. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = navLinks.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        if(navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

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

    // 3. Cinematic Particle Background
    // ==========================================
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
            }
            draw() {
                ctx.fillStyle = 'rgba(0, 206, 255, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }
        }

        function initParticles() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', initParticles);
        initParticles();
        animateParticles();
    }

    // 4. Interactive Card Tilt Effect
    // ==========================================
    if (typeof gsap !== 'undefined') {
        const interactiveCards = document.querySelectorAll('.interactive-card');
        interactiveCards.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                gsap.to(el, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    }

    // 4.5 GSAP Scroll Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        const fadeElements = gsap.utils.toArray('.fade-in-section, .project-card, .skill-category');
        fadeElements.forEach(el => {
            gsap.fromTo(el, 
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

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
            if (!('speechSynthesis' in window)) return;
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
                    if(lenis) lenis.scrollTo('#projects');
                    else document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                } else if (command.includes('about') || command.includes('who are you')) {
                    speak("Scrolling to about section.");
                    if(lenis) lenis.scrollTo('#about');
                    else document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                } else if (command.includes('download') || command.includes('resume') || command.includes('cv')) {
                    speak("Downloading resume.");
                    const link = document.createElement('a');
                    link.href = 'Mohammed shahid Resume.pdf';
                    link.download = 'Mohammed shahid Resume.pdf';
                    link.click();
                } else if (command.includes('contact') || command.includes('hire') || command.includes('email')) {
                    speak("Scrolling to contact section.");
                    if(lenis) lenis.scrollTo('#contact');
                    else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
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
            if(event.error === 'not-allowed') showToast("Microphone access denied.");
            else showToast("Sorry, couldn't hear that.");
        };

        // Enter Screen Logic
        const enterScreen = document.getElementById('enter-screen');
        const enterBtn = document.getElementById('enter-btn');
        let hasWelcomed = false;

        if (enterBtn && enterScreen) {
            enterBtn.addEventListener('click', () => {
                enterScreen.classList.add('hidden');
                document.body.classList.remove('no-scroll');
                const header = document.querySelector('header');
                if (header) header.classList.add('visible');
                setTimeout(() => {
                    enterScreen.style.display = 'none';
                }, 800);

                if (!hasWelcomed) {
                    hasWelcomed = true;
                    window.speechSynthesis.resume();
                    speak("Welcome to Mohammed Shahid's portfolio. I am his artificial intelligence voice assistant. Feel free to explore his work!");
                }
            });
        }
    } else if (voiceBtn) {
        voiceBtn.style.display = 'none';
    }
});
