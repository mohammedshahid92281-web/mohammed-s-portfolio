import React from 'react';
import { Mail, Github, Linkedin, MapPin, Download } from 'lucide-react';

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-center space-y-16 selection:bg-neutral-800 selection:text-white">
      {/* Header / Intro */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance text-neutral-900 dark:text-neutral-100">
              Blending Creativity and Code to Shape a Better Tomorrow.
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              Hi, I&apos;m <strong>Mohammed Shahid</strong>, a software developer passionate about blending innovation with impact. I thrive on solving real-world problems through clean code and minimal design. Let&apos;s innovate together!
            </p>
          </div>
          <div className="flex-shrink-0">
            <img 
              src="/Shahid img.jpeg" 
              alt="Mohammed Shahid" 
              className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-2xl border border-neutral-200 dark:border-neutral-800"
            />
          </div>
        </div>
        
        {/* Navigation / Links */}
        <div className="flex flex-wrap gap-6 pt-4 text-sm font-medium">
          <a href="#projects" className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            Projects <span className="text-neutral-300 dark:text-neutral-700">↗</span>
          </a>
          <a href="/Mohammed shahid Resume.pdf" target="_blank" className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            Resume <span className="text-neutral-300 dark:text-neutral-700">↗</span>
          </a>
          <a href="#contact" className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            Hire Me <span className="text-neutral-300 dark:text-neutral-700">↗</span>
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="space-y-8 pt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Featured Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <a href="/smart on line quiz management system.pdf" target="_blank" className="block group">
            <div className="p-6 h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
              <h3 className="font-medium text-lg mb-2 text-neutral-900 dark:text-neutral-100 group-hover:underline underline-offset-4">Smart Online Quiz System</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">A comprehensive platform for creating, taking, and evaluating quizzes with an intuitive UI.</p>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">Node.js</span>
                <span className="text-xs px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">React</span>
              </div>
            </div>
          </a>

          <a href="/personal portfolio.pdf" target="_blank" className="block group">
            <div className="p-6 h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
              <h3 className="font-medium text-lg mb-2 text-neutral-900 dark:text-neutral-100 group-hover:underline underline-offset-4">Personal Portfolio</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">A high-end, minimalistic portfolio blending clean aesthetics with seamless performance.</p>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">Next.js</span>
                <span className="text-xs px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">Tailwind</span>
              </div>
            </div>
          </a>

        </div>
      </section>

      {/* Footer / Contact */}
      <section id="contact" className="pt-20 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Let&apos;s talk</h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm max-w-sm">Currently available for freelance opportunities and full-time roles.</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <a href="mailto:mohammedshahid92281@gmail.com" className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <Mail className="w-4 h-4" />
            <span className="text-sm">mohammedshahid92281@gmail.com</span>
          </a>
          <a href="https://github.com/mohammedshahid92281-web" target="_blank" className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <Github className="w-4 h-4" />
            <span className="text-sm">mohammedshahid92281-web</span>
          </a>
          <a href="https://www.linkedin.com/in/mohammed-shahid-b2296a3b6/" target="_blank" className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <Linkedin className="w-4 h-4" />
            <span className="text-sm">LinkedIn Profile</span>
          </a>
          <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Tumkur, India</span>
          </div>
        </div>
      </section>
    </main>
  );
}
