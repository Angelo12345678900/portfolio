"use client";
import React, { useState, useEffect, useRef, memo, lazy, Suspense } from "react";
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Download,
  ZoomIn,
  Menu,
  X
} from "lucide-react";

// Lazy load components to reduce initial bundle size
const Card = lazy(() => import("@/components/ui/card").then(mod => ({ default: mod.Card })));
const CardContent = lazy(() => import("@/components/ui/card").then(mod => ({ default: mod.CardContent })));
const CardHeader = lazy(() => import("@/components/ui/card").then(mod => ({ default: mod.CardHeader })));
const CardTitle = lazy(() => import("@/components/ui/card").then(mod => ({ default: mod.CardTitle })));

// Lazy load icons
const Icons = lazy(() => import('@/components/ui/Icons'));

// Move data outside component to prevent re-creation on each render
const portfolioData = {
  name: "Angelo David Brioso Castuera",
  personalInfo: {
    email: "angelodavidcastuera@gmail.com",
    phone: "(+63) 9169907440",
    location: "Zone 4, Balinad, Polangui, Albay",
  },
  skills: [
    "Python", "Java", "PHP", "HTML", "JavaScript", ".NET", 
    "MySQL", "Git", "Firebase", "YOLOv8", "Machine Learning", "CNN"
  ],
  experience: [
    {
      title: "TESDA SIL - Software Developer Intern",
      company: "NRG Info-Tech Institute INC. - Infinitech Advertising Corporation",
      period: "2024",
      location: "Ligao City, Albay",
      responsibilities: [
        "Built School Timetable System using Java",
        "Utilized development tools such as Netbeans IDE, XAMPP, Git, and MySQL",
      ],
    },
    {
      title: "Backend Developer Intern",
      company: "Pixel8 Web Solutions & Consultancy Inc.",
      period: "2023",
      location: "Legazpi City, Albay",
      responsibilities: [
        "Built Restful APIs written with PHP as Backend",
        "Utilized development tools such as HTML, PHP, MySQL, Insomnia, XAMPP, Git, and Gitlab",
      ],
    },
  ],
  projects: [
    {
      title: "CUENTA: CNN Approach for Real-Time Bus Passenger Counting",
      description: "A Convolutional Neural Network-based system for real-time bus passenger counting using CCTV, DVR, and Raspberry Pi 4b.",
      technologies: ["Python", "YOLOv8", "Firebase", "HTML", "CSS", "JavaScript", "Google Colab", "Roboflow", "Git"],
      highlights: [
        "Developed a functional CNN-based real-time passenger counting system.",
        "Integrated bus passenger counting through CCTVs, DVRs, and Raspberry Pi 4b.",
        "Designed and implemented an accurate passenger counting system.",
        "Successfully deployed the system in a real-world environment.",
      ],
      images: ["/assets/cuenta1.png", "/assets/cuenta2.png", "/assets/cuenta3.png"],
    },
    {
      title: "Student Information System",
      description: "A comprehensive student information management system built with .NET.",
      technologies: [".NET", "Microsoft Access", "Visual Studio"],
      highlights: [
        "Developed a functional Student Information System with .NET.",
        "Implemented both frontend and backend functionality.",
        "Created a robust database system using Microsoft Access.",
      ],
      images: ["/assets/sis1.png", "/assets/sis2.jpg", "/assets/sis3.jpg"],
    },
  ],
  certificates: [
    "/certificates/infinitech.png",
    "/certificates/javascript_essentials1.png",
    "/certificates/ubws.png",
  ],
};

// Simplified NavLink to reduce re-renders
const NavLink = memo(({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-white hover:text-blue-300 transition-colors duration-300 relative 
              after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-blue-300 
              after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 
              after:transition-transform after:duration-300"
  >
    {children}
  </a>
));
NavLink.displayName = 'NavLink';

// Optimized mobile navigation
const MobileNav = memo(({ isOpen, setIsOpen }) => (
  <div className={`
    fixed inset-0 bg-blue-950/95 backdrop-blur-lg transform transition-transform duration-300 z-50
    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
  `}>
    <div className="flex justify-end p-4">
      <button onClick={() => setIsOpen(false)} className="text-white p-2">
        <X size={24} />
      </button>
    </div>
    <div className="flex flex-col items-center gap-8 p-8">
      {['about', 'projects', 'experience', 'trainings', 'contact'].map((item) => (
        <NavLink 
          key={item} 
          href={`#${item}`}
          onClick={() => setIsOpen(false)}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </NavLink>
      ))}
    </div>
  </div>
));
MobileNav.displayName = 'MobileNav';

// Simplified Section component
const Section = memo(({ id, title, children, bgColor = "bg-blue-800" }) => (
  <section 
    id={id} 
    className={`py-8 md:py-16 ${bgColor} scroll-mt-16 relative overflow-hidden`}
  >
    <div className="max-w-6xl mx-auto px-4 relative">
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 relative inline-block">
          {title}
        </h2>
      )}
      {children}
    </div>
  </section>
));
Section.displayName = 'Section';

// Optimized image scroll component using IntersectionObserver for better performance
const AutoScrollImages = memo(({ images }) => {
  const scrollContainerRef = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }
    
    return () => {
      if (scrollContainerRef.current) {
        observer.unobserve(scrollContainerRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!isVisible || !images.length) return;
    
    const interval = setInterval(() => {
      setVisibleIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isVisible, images.length]);
  
  return (
    <div
      ref={scrollContainerRef}
      className="overflow-hidden h-48 relative"
    >
      <div 
        className="flex transition-transform duration-500 h-full" 
        style={{ transform: `translateX(-${visibleIndex * 100}%)` }}
      >
        {images.map((image, idx) => (
          <div key={idx} className="h-full min-w-full flex-shrink-0 relative">
            <img
              src={image}
              alt={`Project Screenshot ${idx + 1}`}
              className="h-full w-auto mx-auto object-contain"
              loading={idx < 2 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
AutoScrollImages.displayName = 'AutoScrollImages';

// Main Portfolio component with performance optimizations
const Portfolio = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState({ email: false, phone: false });

  // Optimized scroll handler using requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body overflow when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle resume download
  const handleDownload = () => {
    setIsDownloading(true);
    
    const link = document.createElement("a");
    link.href = "/assets/Angelo_David_Castuera_Resume.pdf";
    link.download = "Angelo_David_Castuera_Resume.pdf";
    link.click();
    
    setTimeout(() => setIsDownloading(false), 500);
  };

  // Copy text to clipboard
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setShowContact(prev => ({
      email: type === 'email' ? true : false,
      phone: type === 'phone' ? true : false
    }));
  };

  // Simple placeholder for not-yet-loaded sections
  const PlaceholderLoader = () => (
    <div className="animate-pulse bg-blue-800/30 rounded-lg h-32 w-full"></div>
  );

  return (
    <div className="relative min-h-screen">
      {/* Simplified background with fewer elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.1),transparent_70%)]" />
      </div>

      <div className="relative z-10">
        {/* Mobile Navigation */}
        <MobileNav isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
        
        {/* Navigation Bar - Simplified */}
        <nav className={`fixed w-full transition-all duration-300 z-50 ${
          isScrolled ? "bg-blue-950/60 backdrop-blur-lg shadow-lg" : "bg-transparent"
        }`}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <span className="font-bold text-xl text-white">AC</span>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex gap-8">
                <NavLink href="#about">About</NavLink>
                <NavLink href="#projects">Projects</NavLink>
                <NavLink href="#experience">Experience</NavLink>
                <NavLink href="#trainings">Trainings</NavLink>
                <NavLink href="#contact">Contact</NavLink>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white p-2"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </nav>

        {/* About Section */}
        <Section id="about" bgColor="bg-blue-950/20">
          <div className="min-h-screen flex flex-col items-center justify-center text-white space-y-6 px-4">
            {/* Profile Image - Optimized */}
            <div className="relative">
              <img
                src="/assets/mypicture.png"
                alt={portfolioData.name}
                className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full border-4 border-blue-300 shadow-xl"
                width={192}
                height={192}
                loading="eager"
              />
            </div>

            <div className="w-full text-center">
              <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                {portfolioData.name}
              </h1>
            </div>

            <p className="italic text-blue-200 text-center text-sm md:text-base">
              "Strive not to be a success, but rather to be of value." – Albert Einstein
            </p>

            <p className="text-blue-50 text-center max-w-2xl text-sm md:text-base">
              Passionate software developer skilled in Python, .NET, and machine learning, driven to create impactful solutions and continually learn new technologies.
            </p>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-blue-400 
                         text-white px-6 py-3 rounded-lg hover:bg-blue-300 transition-all 
                         duration-300 shadow-lg"
                aria-label="Download Resume"
              >
                <Download size={20} />
                {isDownloading ? "Downloading..." : "Download Resume"}
              </button>
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-blue-300 
                         text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-200 transition-all 
                         duration-300 shadow-lg"
                aria-label="Contact Me"
              >
                <MapPin size={20} />
                Contact Me
              </button>
            </div>
          </div>
        </Section>

        {/* Skills Section - Lazy loaded and code-split */}
        <Section id="skills" title="Skills & Technologies" bgColor="bg-blue-900/20">
          <Suspense fallback={<PlaceholderLoader />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolioData.skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg hover:shadow-xl 
                           transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 
                           flex items-center gap-3 border border-white/20"
                >
                  <Suspense fallback={<div className="w-6 h-6 bg-blue-300/20 rounded-full"></div>}>
                    <Icons skill={skill} />
                  </Suspense>
                  <span className="text-white">{skill}</span>
                </div>
              ))}
            </div>
          </Suspense>
        </Section>

        {/* Projects Section - Lazy loaded */}
        <Section id="projects" title="Featured Projects" bgColor="bg-blue-950/20">
          <Suspense fallback={<PlaceholderLoader />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolioData.projects.map((project, index) => (
                <Suspense key={index} fallback={<PlaceholderLoader />}>
                  <Card className="bg-white/10 backdrop-blur-lg border border-white/20 
                                  overflow-hidden hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-4 md:p-6 space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-white">{project.title}</h3>
                      <p className="text-blue-50 text-sm md:text-base">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map((tech, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-blue-600/30 px-2 md:px-3 
                                                py-1 md:py-2 rounded-full text-blue-100 text-sm">
                            <Suspense fallback={<div className="w-4 h-4"></div>}>
                              <Icons framework={tech} />
                            </Suspense>
                            <span>{tech}</span>
                          </div>
                        ))}
                      </div>
                      <ul className="space-y-2">
                        {project.highlights.slice(0, 2).map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-300"></div>
                            <p className="text-blue-50 text-sm md:text-base">{highlight}</p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <AutoScrollImages images={project.images} />
                  </Card>
                </Suspense>
              ))}
            </div>
          </Suspense>
        </Section>

        {/* Experience Section - Lazy loaded */}
        <Section id="experience" title="Work Experience" bgColor="bg-blue-900/20">
          <Suspense fallback={<PlaceholderLoader />}>
            <div className="space-y-8">
              {portfolioData.experience.map((job, index) => (
                <Suspense key={index} fallback={<PlaceholderLoader />}>
                  <Card className="bg-white/10 backdrop-blur-lg border border-white/20 
                                 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-4 md:p-6 space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-white">{job.title}</h3>
                      <p className="text-blue-100 font-semibold">{job.company}</p>
                      <p className="text-blue-200 text-sm">{job.period} • {job.location}</p>
                      <ul className="space-y-2">
                        {job.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-300"></div>
                            <p className="text-blue-50 text-sm md:text-base">{responsibility}</p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Suspense>
              ))}
            </div>
          </Suspense>
        </Section>

        {/* Trainings Section - Lazy loaded with optimized image loading */}
        <Section id="trainings" title="Trainings & Certifications" bgColor="bg-blue-900/20">
          <Suspense fallback={<PlaceholderLoader />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.certificates.map((certificate, index) => (
                <div 
                  key={index}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg cursor-pointer 
                           hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedImage(certificate)}
                >
                  <img
                    src={certificate}
                    alt={`Certificate ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 
                             group-hover:scale-105"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 
                                transition-all duration-300 flex items-center justify-center">
                    <ZoomIn 
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity 
                                duration-300" 
                      size={32}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Suspense>
        </Section>

        {/* Contact Section - Simplified and optimized */}
        <Section id="contact" title="Contact Me" bgColor="bg-blue-950/20">
          <Suspense fallback={<PlaceholderLoader />}>
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl w-full">
              <CardContent className="p-4 md:p-8 space-y-8">
                <p className="text-lg md:text-xl text-center text-white">
                  Feel free to reach out to me through my contact channels or social platforms!
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Email */}
                    <button
                      onClick={() => copyToClipboard(portfolioData.personalInfo.email, 'email')}
                      className="flex flex-col items-center justify-center gap-2 text-blue-100 hover:text-white 
                              transition-colors p-4 bg-blue-600/30 rounded-lg hover:bg-blue-600/50
                              text-sm md:text-base group"
                      title="Email"
                      aria-label="Copy Email Address"
                    >
                      <Mail size={32} className="group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm truncate max-w-full px-2">
                        {showContact.email ? "Copied!" : "Email"}
                      </span>
                    </button>
                    
                    {/* Phone */}
                    <button
                      onClick={() => copyToClipboard(portfolioData.personalInfo.phone, 'phone')}
                      className="flex flex-col items-center justify-center gap-2 text-blue-100 hover:text-white 
                              transition-colors p-4 bg-blue-600/30 rounded-lg hover:bg-blue-600/50
                              text-sm md:text-base group"
                      title="Phone Number"
                      aria-label="Copy Phone Number"
                    >
                      <Phone size={32} className="group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm truncate max-w-full px-2">
                        {showContact.phone ? "Copied!" : "Phone"}
                      </span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="https://github.com/Angelo12345678900"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-2 text-blue-100 hover:text-white 
                            transition-colors bg-blue-600/30 p-4 rounded-lg hover:bg-blue-600/50
                            text-sm md:text-base group"
                      aria-label="GitHub Profile"
                    >
                      <Github size={32} className="group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm">GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/angelo-david-castuera-804300278/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-2 text-blue-100 hover:text-white 
                            transition-colors bg-blue-600/30 p-4 rounded-lg hover:bg-blue-600/50
                            text-sm md:text-base group"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={32} className="group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Suspense>
        </Section>

        {/* Image Modal - Only render when needed */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full">
              <img
                src={selectedImage}
                alt="Certificate"
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-blue-300 
                         transition-colors duration-300"
                aria-label="Close"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
