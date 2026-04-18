// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------
    // 1. PRELOADER & INTRO SEQUENCE (GSAP Timeline)
    // --------------------------------------------------------
    const tl = gsap.timeline();
    const counterElement = document.getElementById('counter');
    let counterValue = { val: 0 };

    tl.to(counterValue, {
        val: 100,
        duration: 2,
        roundProps: "val",
        onUpdate: function() {
            if(counterElement) {
                counterElement.innerHTML = counterValue.val + "%";
            }
        },
        ease: "power2.inOut"
    })
    .to("#preloader-text", {
        y: "0%",
        duration: 0.8,
        ease: "power3.out"
    }, "-=1.5")
    .to(".preloader", {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut",
        delay: 0.5
    })
    .to("#preloader", {
        display: "none"
    })
    // --------------------------------------------------------
    // 2. HERO ANIMATIONS
    // --------------------------------------------------------
    .fromTo(".hero-img", 
        { scale: 1.2, opacity: 0 }, 
        { scale: 1, opacity: 0.8, duration: 1.5, ease: "power3.out" }, 
        "-=0.5"
    )
    .fromTo(".hero-text-content h1", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 
        "-=1"
    )
    .fromTo(".hero-text-content p", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 
        "-=0.8"
    )
    .fromTo(".hero-text-content .hero-actions", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 
        "-=0.6"
    )
    .set(".fade-in-section, .fade-in-item, .bento-item", { autoAlpha: 1 }); // Prep for scroll triggers

    // --------------------------------------------------------
    // 3. GSAP SCROLLTRIGGERS (Parallax & Reveals)
    // --------------------------------------------------------
    
    // Parallax Image
    gsap.to(".hero-img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-split",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Animate Bento Items Staggered
    gsap.from(".bento-item", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // Animate Info Section
    gsap.from(".split-container > div", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".info-section",
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });

    // --------------------------------------------------------
    // 4. CUSTOM CURSOR
    // --------------------------------------------------------
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    // Is mobile check
    const isMobile = window.innerWidth <= 768;

    if (!isMobile && cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Core cursor snaps instantly
            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0.1
            });
        });

        // Follower has a slight drag/easing
        gsap.ticker.add(() => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            gsap.set(follower, {
                x: followerX,
                y: followerY
            });
        });

        // Add hover effect to all links and buttons
        const hoverElements = document.querySelectorAll('a, button, .bento-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                follower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                follower.classList.remove('hover');
            });
        });
    }

    // --------------------------------------------------------
    // 5. MAGNETIC BUTTONS
    // --------------------------------------------------------
    if (!isMobile) {
        const magnets = document.querySelectorAll('.magnetic');
        magnets.forEach(magnet => {
            magnet.addEventListener('mousemove', function(e) {
                const position = magnet.getBoundingClientRect();
                const x = e.pageX - position.left - position.width / 2;
                const y = e.pageY - position.top - position.height / 2;
                
                // Pull button towards cursor
                gsap.to(magnet, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.5,
                    ease: "power3.out"
                });
            });

            magnet.addEventListener('mouseleave', function() {
                // Snap back to original position
                gsap.to(magnet, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    }

    // --------------------------------------------------------
    // 6. MOBILE NAVIGATION TOGGLE
    // --------------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = navLinks.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
        
        let current = '';
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

    // --------------------------------------------------------
    // 7. VOICE ASSISTANT (Web Speech API)
    // --------------------------------------------------------
    const voiceBtn = document.getElementById('voice-btn');
    const voiceStatus = document.getElementById('voice-status');
    const voiceAssistant = document.getElementById('voice-assistant');

    if (voiceBtn && voiceStatus && voiceAssistant) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            const synth = window.speechSynthesis;

            function speak(text) {
                if (synth.speaking) synth.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 1; utterance.pitch = 1;
                synth.speak(utterance);
            }

            function showStatus(text, duration = 3000) {
                voiceStatus.textContent = text;
                voiceStatus.classList.add('show');
                setTimeout(() => voiceStatus.classList.remove('show'), duration);
            }

            voiceBtn.addEventListener('click', () => {
                if (voiceBtn.classList.contains('listening')) {
                    recognition.stop(); return;
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
                showStatus("Error: " + event.error);
                voiceBtn.classList.remove('listening');
                voiceAssistant.classList.remove('is-active');
            };

            function processCommand(command) {
                if (command.includes('home') || command.includes('top')) {
                    speak("Navigating to home.");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } 
                else if (command.includes('about')) {
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
                    const dl = document.querySelector('a[download]');
                    if(dl) dl.click();
                } 
                else if (command.includes('contact') || command.includes('touch')) {
                    speak("Navigating to contact section.");
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }
                else if (command.includes('hire')) {
                    speak("Excellent choice! Opening the contact form now.");
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                    const nameInput = document.getElementById('name');
                    if(nameInput) {
                        setTimeout(() => nameInput.focus(), 1000);
                    }
                }
                else if (command.includes('joke')) {
                    speak("Why do programmers prefer dark mode? Because light attracts bugs!");
                }
                else if (command.includes('who are you') || command.includes('who is mohammed')) {
                    speak("Mohammed Shahid is a passionate software developer and B C A student from India, specializing in web development and crafting beautiful digital experiences.");
                }
                else if (command.includes('hello') || command.includes('hi')) {
                    speak("Hello! I am the portfolio voice assistant. You can ask me to tell a joke, or say 'Hire Mohammed'.");
                } 
                else {
                    speak("Sorry, I didn't understand that command. Try saying 'tell me a joke'.");
                    showStatus("Command not recognized.");
                }
            }
        } else {
            voiceAssistant.style.display = 'none';
            console.warn("Speech Recognition API is not supported in this browser.");
        }
    }
});
