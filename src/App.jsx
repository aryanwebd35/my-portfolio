import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Menu, X, Github, Mail, Linkedin, Code, Moon, Sun, ChevronRight, ExternalLink, Download, Phone, MapPin, Terminal, Cpu, Trophy, Globe, Instagram, Atom, Server, Database, FileCode, Layout, Zap, Settings, Box, GitBranch, Palette, Layers, Braces, HardDrive, Network, Monitor, Share2, Workflow, Award, Star, FileText, Briefcase, GraduationCap } from 'lucide-react';

/**
 * ARYAN SRIVASTAVA - PROFESSIONAL PORTFOLIO
 * -----------------------------------------
 * Features:
 * 1. Working Light/Dark Mode
 * 2. Restored Bluish-Dark Theme
 * 3. Scroll Reveal Animations
 * 4. 3D Parallax & Glassmorphism
 */

// --- 3D UTILS & COMPONENTS ---

// 1. 3D Background Component
const Scene3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Star {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = (Math.random() * 2 - 1) * canvas.width;
        this.y = (Math.random() * 2 - 1) * canvas.height;
        this.z = Math.random() * 2000;
        this.size = Math.random() * 2;

        // Dynamic Colors based on Theme
        // Dark Mode: Bluish White stars
        this.fill = `rgba(${150 + Math.random() * 100}, ${150 + Math.random() * 100}, 255, ${Math.random()})`;
      }
      update() {
        this.z -= 1.5;
        if (this.z <= 0) this.reset();
      }
      draw() {
        const scale = 1000 / (1000 + this.z);
        const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;

        if (x2d < 0 || x2d > canvas.width || y2d < 0 || y2d > canvas.height) return;

        ctx.beginPath();
        ctx.fillStyle = this.fill;
        ctx.globalAlpha = scale;
        ctx.arc(x2d, y2d, this.size * scale * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Re-initialize particles on theme change
    particles = [];
    for (let i = 0; i < 200; i++) particles.push(new Star());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dynamic Gradient Overlay
      const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0)'); // Slate-900 transparent
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.8)'); // Dark vignette

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Re-run when isDark changes

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 transition-colors duration-500" />;
};

// 2. Glass Tilt Card
const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.6 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-500 ease-out transform-style-3d ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
    >
      <div
        className="absolute inset-0 z-10 pointer-events-none rounded-3xl mix-blend-overlay"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4), transparent 70%)`,
          transition: 'opacity 0.3s ease'
        }}
      />
      {children}
    </div>
  );
};

// 3. Typewriter Component
const Typewriter = ({ words, delay = 3000 }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (index === words.length) return;

    const maxIndex = words[index].length;

    if (subIndex === maxIndex + 1 && !reverse) {
      const timeout = setTimeout(() => {
        setReverse(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, delay]);

  return (
    <span className="text-indigo-600 dark:text-indigo-400">
      {words[index].substring(0, subIndex)}
      <span className={`inline-block w-[3px] h-[1em] ml-1 align-middle bg-indigo-600 dark:bg-indigo-400 ${blink ? 'opacity-100' : 'opacity-0'}`}></span>
    </span>
  );
};

// 4. Scroll Reveal Component
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    const { current } = domRef;
    if (current) observer.observe(current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- CUSTOM ICONS ---
const LeetCodeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.173 5.798a1.375 1.375 0 0 0-.013 1.948l.917.916a1.375 1.375 0 0 0 1.948.014l4.21-4.21a.732.732 0 0 1 1.033 0 .732.732 0 0 1 0 1.033l-4.21 4.21a1.375 1.375 0 0 0 .014 1.948l.916.917a1.375 1.375 0 0 0 1.948-.013l5.36-5.349A1.375 1.375 0 0 0 20.358 6V1.375A1.375 1.375 0 0 0 18.983 0h-5.5zM6.674 10.326a1.375 1.375 0 0 0-1.948.013l-4.29 4.29a1.375 1.375 0 0 0 0 1.947l4.29 4.29c.536.536 1.41.538 1.947.002l.917-.917a1.375 1.375 0 0 0-.002-1.948l-3.178-3.178a.732.732 0 0 1 0-1.033l3.178-3.178a1.375 1.375 0 0 0 .002-1.948l-.917-.917a1.375 1.375 0 0 0-.002-.002zM16.966 17.84a1.375 1.375 0 0 0-1.948 0l-5.35 5.35a1.375 1.375 0 0 0 .013 1.948l.917.917a1.375 1.375 0 0 0 1.948-.013l4.42-4.42a.732.732 0 0 1 1.034 0 .732.732 0 0 1 0 1.034l-4.42 4.42a1.375 1.375 0 0 0-.013 1.948l.917.917a1.375 1.375 0 0 0 1.948.013l6.31-6.31a1.375 1.375 0 0 0 0-1.948l-.917-.917a1.375 1.375 0 0 0-1.948 0z" />
  </svg>
);

const CodeForcesIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect x="1.5" y="9" width="6" height="12" rx="1.5" className="text-yellow-500" fill="currentColor" />
    <rect x="9" y="1.5" width="6" height="19.5" rx="1.5" className="text-blue-500" fill="currentColor" />
    <rect x="16.5" y="6" width="6" height="15" rx="1.5" className="text-red-500" fill="currentColor" />
  </svg>
);

const CodeChefIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.025.02c-4.437.01-7.962 2.87-9.176 6.946-.17.575.253.97.77.78 1.554-.566 3.193-.574 4.887.218 1.13.53 1.48 1.83.673 2.723C7.456 12.59 7.02 15.11 8.27 17.15c2.316 3.8 7.373 4.49 10.655 1.517 1.03-.935 1.63-2.19 1.905-3.53.52-2.525-.33-4.71-2.262-6.29-.63-.513-.48-1.57.29-1.903 1.144-.492 2.146-.223 3.106.39.467.3.93.12.98-.42.23-2.486-.885-4.63-2.88-5.91C17.953.076 15.39-.01 12.026.02z" />
  </svg>
);

const GeeksForGeeksIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fillOpacity="0" />
    <path d="M8.2 6h2.2c.4 0 .7.3.7.7v7.6c0 .4-.3.7-.7.7H8.2c-.4 0-.7-.3-.7-.7V6.7c0-.4.3-.7.7-.7zm6.4 0h2.2c.4 0 .7.3.7.7v7.6c0 .4-.3.7-.7.7h-2.2c-.4 0-.7-.3-.7-.7V6.7c0-.4.3-.7.7-.7zM6 10.5c0-.8.7-1.5 1.5-1.5h9c.8 0 1.5.7 1.5 1.5v3c0 .8-.7 1.5-1.5 1.5h-9c-.8 0-1.5-.7-1.5-1.5v-3z" />
  </svg>
);

const Code360Icon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16.5 3H7.5A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-9A4.5 4.5 0 0 0 16.5 3zm-3.25 12.25h-2.5a.75.75 0 0 1 0-1.5h2.5a.75.75 0 0 1 0 1.5zm0-3.5h-2.5a.75.75 0 0 1 0-1.5h2.5a.75.75 0 0 1 0 1.5zm0-3.5h-2.5a.75.75 0 0 1 0-1.5h2.5a.75.75 0 0 1 0 1.5z" />
  </svg>
);

// --- DATA ---
const PORTFOLIO_DATA = {
  name: "Aryan Srivastava",
  role: "Software Engineer",
  roles: ["Software Engineer", "Competitive Coder", "Problem Solver", "Full Stack Developer"],
  subRole: "B.Tech MNNIT Allahabad",
  summary: "I am a final-year B.Tech undergraduate in Electronics and Communication Engineering at MNNIT Allahabad, driven by a relentless passion for software development and algorithmic problem-solving. With a robust foundation in Data Structures and Algorithms (having solved over 1500+ problems), I specialize in architecting scalable full-stack web applications using the MERN stack and Next.js. My experience spans from developing AI-powered feedback systems to creating real-time social platforms, always focusing on writing efficient, clean code. I thrive in challenging environments that demand creative thinking and am constantly seeking opportunities to leverage technology to build impactful, user-centric solutions.",
  resumeUrl: "https://drive.google.com/file/d/1Kl80fKT44x4yvu5QGNLTeS_K56tGcLAq/view?usp=drive_link",
  achievements: [
    { title: "DSA Achievement", desc: "Solved 1500+ DSA questions across all platforms", icon: <Code className="w-5 h-5 text-indigo-500 dark:text-indigo-300" /> },
    { title: "Competitive Programming", desc: "Global Rank: 37 in CodeChef Starters 184", icon: <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-300" /> },
    { title: "Hackathon Finalist", desc: "Amongst Top Teams in DevJam - Web Development Competition", icon: <Award className="w-5 h-5 text-blue-500 dark:text-blue-300" /> },
    { title: "Cultural Winner", desc: "Winner of Hasyamanch in Culrav 23 (Dramatics Event)", icon: <Star className="w-5 h-5 text-purple-500 dark:text-purple-300" /> }
  ],
  projects: [
    {
      title: "MNNIT Insights",
      desc: "AI-powered campus feedback platform utilizing OpenAI to summarize student opinions and facilitate administrative improvements.",
      stack: ["Next.js", "Tailwind CSS", "MongoDB", "NextAuth", "Resend", "OpenAI API"],
      link: "https://github.com/aryanwebd35/MNNIT-Insights"
    },
    {
      title: "PsychoCorp",
      desc: "Comprehensive mental health platform connecting users with similar conditions and professional therapists for support.",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
      link: "https://github.com/aryanwebd35/PsychoCorp"
    },
    {
      title: "Food Factory",
      desc: "Streamlined online food ordering application for college cafes featuring real-time order tracking and chatbot support.",
      stack: ["React.js", "Node.js", "Tailwind CSS", "JavaScript", "HTML"],
      link: "https://github.com/aryanwebd35/Food-Factory"
    }
  ],
  skills: [
    { name: "C/C++", icon: <Terminal className="w-4 h-4" /> },
    { name: "JavaScript", icon: <Braces className="w-4 h-4" /> },
    { name: "HTML5", icon: <FileCode className="w-4 h-4" /> },
    { name: "CSS3", icon: <Palette className="w-4 h-4" /> },
    { name: "React.js", icon: <Atom className="w-4 h-4" /> },
    { name: "Next.js", icon: <Zap className="w-4 h-4" /> },
    { name: "Node.js", icon: <Server className="w-4 h-4" /> },
    { name: "Express.js", icon: <Layers className="w-4 h-4" /> },
    { name: "Tailwind", icon: <Layout className="w-4 h-4" /> },
    { name: "MongoDB", icon: <Database className="w-4 h-4" /> },
    { name: "MySQL", icon: <Database className="w-4 h-4" /> },
    { name: "Git & GitHub", icon: <GitBranch className="w-4 h-4" /> },
    { name: "Postman", icon: <Share2 className="w-4 h-4" /> },
    { name: "VS Code", icon: <Code className="w-4 h-4" /> },
    { name: "DSA", icon: <Network className="w-4 h-4" /> },
    { name: "OOP", icon: <Box className="w-4 h-4" /> },
    { name: "OS", icon: <HardDrive className="w-4 h-4" /> },
    { name: "DBMS", icon: <Server className="w-4 h-4" /> },
    { name: "System Design", icon: <Settings className="w-4 h-4" /> },
    { name: "Networks", icon: <Globe className="w-4 h-4" /> }
  ],
  contact: {
    email: "aryansri6362@gmail.com",
    phone: "+91-8744012078",
    github: "aryanwebd35",
    linkedin: "aryan-srivastava-223694269",
    instagram: "ary.sri_35"
  },
  codingProfiles: [
    { name: "LeetCode", url: "https://leetcode.com/u/aryancpp/", icon: <LeetCodeIcon className="w-6 h-6" />, color: "text-yellow-500 dark:text-yellow-400" },
    { name: "CodeForces", url: "https://codeforces.com/profile/aryan_0512", icon: <CodeForcesIcon className="w-6 h-6" />, color: "text-blue-500 dark:text-blue-400" },
    { name: "CodeChef", url: "https://www.codechef.com/users/aryan_cpp", icon: <CodeChefIcon className="w-6 h-6" />, color: "text-amber-600 dark:text-amber-500" },
    { name: "Code360", url: "https://www.naukri.com/code360/profile/efeb7839-b365-41c7-ad49-122578c0e53c", icon: <Code360Icon className="w-6 h-6" />, color: "text-orange-500" },
    { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/profile/aryanchex5ku?tab=activity", icon: <GeeksForGeeksIcon className="w-6 h-6" />, color: "text-green-600 dark:text-green-500" }
  ]
};

// --- COMPONENTS ---



const SectionHeading = ({ children, centered = false }) => (
  <h2 className={`text-3xl font-bold text-slate-900 dark:text-white mb-10 ${centered ? 'text-center' : ''} flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
    {children}
  </h2>
);

const Nav = ({ activeSection, scrollTo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Profiles', 'Projects', 'Skills', 'Resume'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-2" onClick={() => scrollTo('hero')}>
            {/* Compute Logo */}
            <span className="font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400 hover:scale-110 transition-transform duration-300">
              <Cpu className="w-8 h-8" />
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item === 'Resume' ? (
                <a
                  key={item}
                  href={PORTFOLIO_DATA.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs md:text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
                >
                  {item} <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-xs md:text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors"
                >
                  {item}
                </button>
              )
            ))}

          </div>

          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded-md"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b dark:border-slate-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              item === 'Resume' ? (
                <a
                  key={item}
                  href={PORTFOLIO_DATA.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 rounded-md text-base font-medium w-full text-left text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between"
                >
                  {item} <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <button
                  key={item}
                  onClick={() => {
                    scrollTo(item.toLowerCase());
                    setIsOpen(false);
                  }}
                  className="block px-3 py-4 rounded-md text-base font-medium w-full text-left text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  {item}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello! I'm Aryan's portfolio assistant. How can I help you learn more about his projects, skills, or coding journey?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  // Helper to render links
  const renderContent = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) =>
      urlRegex.test(part) ? (
        <a key={i} href={part} target="_blank" rel="noreferrer" className="underline text-indigo-400 hover:text-indigo-300 break-all">
          {part}
        </a>
      ) : part
    );
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "I can provide details on Aryan's projects, skills, or contact info. What would you like to know?";
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('project') || lowerInput.includes('work')) {
        reply = "Aryan has developed impactful projects like 'MNNIT Insights' (AI feedback system) and 'PsychoCorp' (mental health platform). He specializes in the MERN stack.";
      } else if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('stack')) {
        reply = "He is proficient in React.js, Node.js, Next.js, and C++. He also has a strong background in DSA with over 1500 problems solved.";
      } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('mail') || lowerInput.includes('gmail')) {
        reply = `You can reach him at ${PORTFOLIO_DATA.contact.email} or call at ${PORTFOLIO_DATA.contact.phone}.`;
      } else if (lowerInput.includes('resume') || lowerInput.includes('cv')) {
        reply = `Here is his Resume: ${PORTFOLIO_DATA.resumeUrl}`;
      } else if (lowerInput.includes('leetcode')) {
        const profile = PORTFOLIO_DATA.codingProfiles.find(p => p.name === 'LeetCode');
        reply = `Check out his LeetCode profile: ${profile.url}`;
      } else if (lowerInput.includes('codeforces')) {
        const profile = PORTFOLIO_DATA.codingProfiles.find(p => p.name === 'CodeForces');
        reply = `Here is his CodeForces profile: ${profile.url}`;
      } else if (lowerInput.includes('code360') || lowerInput.includes('naukri')) {
        const profile = PORTFOLIO_DATA.codingProfiles.find(p => p.name === 'Code360');
        reply = `Here is his Naukri Code360 profile: ${profile.url}`;
      } else if (lowerInput.includes('linkedin')) {
        reply = `Connect on LinkedIn: https://www.linkedin.com/in/${PORTFOLIO_DATA.contact.linkedin}`;
      } else if (lowerInput.includes('github')) {
        reply = `Check out his GitHub: https://github.com/${PORTFOLIO_DATA.contact.github}`;
      } else if (lowerInput.includes('about') || lowerInput.includes('who')) {
        reply = "Aryan is a B.Tech student at MNNIT, passionate about building scalable web applications and solving complex algorithmic problems.";
      }

      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-transform hover:scale-105 flex items-center justify-center"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 w-72 h-[400px] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-700 rounded p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-none border border-gray-100 dark:border-slate-700'
                  }`}>
                  {renderContent(msg.text)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 text-slate-500 p-3 rounded-2xl rounded-bl-none text-xs border border-gray-100 dark:border-slate-700">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-slate-100 dark:bg-slate-700 border-none rounded-full px-4 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button onClick={handleSend} className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-colors"
    aria-label={label}
  >
    {icon}
  </a>
);

// --- MAIN APP COMPONENT ---

const App = () => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen transition-colors duration-300 font-sans dark bg-slate-950">
      <div className="dark:text-slate-200 text-slate-800 relative">

        {/* 3D BACKGROUND */}
        <Scene3D />

        <Nav activeSection="hero" scrollTo={scrollTo} />

        {/* 1. INTRO (HERO) */}
        <FadeIn delay={100}>
          <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Subtle 3D Elements */}
            <div className="absolute top-20 right-20 animate-float-slow opacity-20 hidden lg:block">
              <Atom className="w-32 h-32 text-indigo-500" />
            </div>
            <div className="absolute bottom-20 left-10 animate-float opacity-20 hidden lg:block" style={{ animationDelay: '2s' }}>
              <Database className="w-24 h-24 text-blue-500" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                <div className="flex-1 text-center md:text-left space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    Open to Opportunities
                  </div>

                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Hi, I'm {PORTFOLIO_DATA.name}
                  </h1>

                  <div className="space-y-2">
                    {/* Typewriter Animation Here */}
                    <h2 className="text-2xl md:text-3xl font-semibold text-indigo-600 dark:text-indigo-400 min-h-[1.5em]">
                      <Typewriter words={PORTFOLIO_DATA.roles} />
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
                      {PORTFOLIO_DATA.subRole}
                    </p>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
                    Building scalable solutions and engineering robust applications.
                    Focused on efficient code and user-centric design.
                  </p>

                  <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PORTFOLIO_DATA.contact.email}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors shadow-lg shadow-indigo-500/20 flex items-center gap-2 hover:scale-105 transform duration-200"
                    >
                      Contact Me <Mail className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="flex gap-4 justify-center md:justify-start pt-4">
                    <SocialLink href={`https://github.com/${PORTFOLIO_DATA.contact.github}`} icon={<Github className="w-5 h-5" />} label="GitHub" />
                    <SocialLink href={`https://www.linkedin.com/in/${PORTFOLIO_DATA.contact.linkedin}`} icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
                    <SocialLink href={`https://www.instagram.com/${PORTFOLIO_DATA.contact.instagram}/`} icon={<Instagram className="w-5 h-5" />} label="Instagram" />
                    <SocialLink href={`mailto:${PORTFOLIO_DATA.contact.email}`} icon={<Mail className="w-5 h-5" />} label="Email" />
                  </div>
                </div>

                {/* IMAGE SECTION - 3D TILT */}
                <div className="flex-1 relative perspective-1000">
                  <TiltCard className="relative w-72 h-72 md:w-96 md:h-96 mx-auto group">
                    <div className="absolute inset-0 bg-indigo-600 rounded-[2rem] rotate-6 opacity-20 dark:opacity-40 group-hover:rotate-12 transition-transform duration-500"></div>
                    <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 rounded-[2rem] -rotate-6 group-hover:-rotate-12 transition-transform duration-500"></div>
                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-4 border-white dark:border-slate-700 shadow-2xl">
                      <img
                        src="/mypic.jpeg"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"; }}
                        alt="Aryan Srivastava"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TiltCard>
                </div>

              </div>
            </div>
          </section>
        </FadeIn>

        {/* 2. ABOUT ME */}
        <FadeIn delay={200}>
          <section id="about" className="py-20 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-sm border-y border-white/40 dark:border-slate-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <SectionHeading centered>About Me</SectionHeading>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                {PORTFOLIO_DATA.summary}
              </p>
            </div>
          </section>
        </FadeIn>

        {/* 3. CODING PROFILES */}
        <FadeIn delay={400}>
          <section id="profiles" className="py-20 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-sm border-y border-white/40 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading centered>Coding Profiles</SectionHeading>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {PORTFOLIO_DATA.codingProfiles.map((profile, idx) => (
                  <a
                    key={idx}
                    href={profile.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <span className={`${profile.color}`}>{profile.icon}</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{profile.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-500" />
                  </a>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* 4. PROJECTS - 3D CARDS */}
        <FadeIn delay={500}>
          <section id="projects" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading>Featured Projects</SectionHeading>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
                {PORTFOLIO_DATA.projects.map((project, idx) => (
                  <TiltCard key={idx} className="group bg-white/80 dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-indigo-50 dark:border-slate-700">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                        <Code className="w-6 h-6" />
                      </div>
                      <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors z-20">
                        <Github className="w-5 h-5" />
                      </a>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.stack.map((tech, tIdx) => (
                        <span key={tIdx} className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* 5. TECH SKILLS (Pill Style) */}
        <FadeIn delay={600}>
          <section id="skills" className="py-20 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-sm border-y border-white/40 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading centered>Technical Skills</SectionHeading>
              <div className="flex flex-wrap justify-center gap-3">
                {PORTFOLIO_DATA.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all cursor-default">
                    <span className="text-indigo-600 dark:text-indigo-400">
                      {React.cloneElement(skill.icon, { className: "w-4 h-4" })}
                    </span>
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* 6. ACHIEVEMENTS */}
        <FadeIn delay={700}>
          <section id="achievements" className="py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading centered>Achievements</SectionHeading>
              <div className="space-y-4">
                {PORTFOLIO_DATA.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 hover:scale-[1.02]">
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 rounded-full shrink-0">
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {achievement.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {achievement.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* 7. CONTACT SECTION */}
        <FadeIn delay={800}>
          <section id="contact" className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <SectionHeading centered>Get In Touch</SectionHeading>
              <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl">
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                  I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                  <a
                    href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                    className="flex items-center gap-3 px-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all hover:scale-105 shadow-lg shadow-indigo-500/25"
                  >
                    <Mail className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-xs opacity-75">Email Me</div>
                      <div className="font-semibold">{PORTFOLIO_DATA.contact.email}</div>
                    </div>
                  </a>

                  <a
                    href={`tel:${PORTFOLIO_DATA.contact.phone}`}
                    className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-600 transition-all hover:scale-105"
                  >
                    <Phone className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Call Me</div>
                      <div className="font-semibold">{PORTFOLIO_DATA.contact.phone}</div>
                    </div>
                  </a>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Connect with me on Social Media</p>
                  <div className="flex justify-center gap-4">
                    <SocialLink href={`https://github.com/${PORTFOLIO_DATA.contact.github}`} icon={<Github className="w-5 h-5" />} label="GitHub" />
                    <SocialLink href={`https://www.linkedin.com/in/${PORTFOLIO_DATA.contact.linkedin}`} icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
                    <SocialLink href={`https://www.instagram.com/${PORTFOLIO_DATA.contact.instagram}/`} icon={<Instagram className="w-5 h-5" />} label="Instagram" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* FOOTER */}
        <footer className="py-8 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center relative z-10">
          <p className="text-slate-600 dark:text-slate-400">© 2026 Aryan Srivastava. All Rights Reserved.</p>
        </footer>

        {/* GEMINI ASSISTANT */}
        <ChatBot />

      </div>
    </div>
  );
};

export default App;