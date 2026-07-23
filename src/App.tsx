import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
// @ts-ignore
import catPhoto from "../050b99b45afffb9749594e14d53a76f1.jpg";
import { 
  GraduationCap, 
  Mail, 
  MapPin, 
  Phone, 
  Award, 
  Layers, 
  BookOpen, 
  Cpu, 
  Calendar, 
  ExternalLink, 
  Sparkles, 
  Workflow, 
  Monitor, 
  Smartphone, 
  FileText,
  ChevronRight,
  ChevronDown,
  Eye,
  Target,
  Linkedin,
  Star,
  BookMarked,
  Presentation,
  CheckCircle2,
  PhoneCall,
  Menu,
  X
} from "lucide-react";
import { professorProfile, GovProject, CoopProject, ProjectExp, AcademicPaper } from "./data";
import { InteractiveMap } from "./components/InteractiveMap";
import { PaperTimeline } from "./components/PaperTimeline";

type TabId = "about" | "experience" | "expertise" | "projects_research" | "academic_exchange";
type ProjectSubTab = "gov_coop" | "project_exp" | "academic";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 110, 
      damping: 15 
    } 
  }
};

export default function App() {
  const p = professorProfile;
  const [currentTab, setCurrentTab] = useState<TabId>("about");
  const [projectSubTab, setProjectSubTab] = useState<ProjectSubTab>("gov_coop");
  const [showNavDropdown, setShowNavDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProjectsExpanded, setMobileProjectsExpanded] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<AcademicPaper | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowNavDropdown(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowNavDropdown(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Scroll to top of page when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentTab, projectSubTab]);

  return (
    <div className="min-h-screen w-full bg-transparent font-sans text-chestnut flex flex-col relative selection:bg-peach/40 selection:text-plum">
      
      {/* GLOBAL HEADER & NAVIGATION (Minimalist Editorial Design) */}
      <header className="sticky top-0 z-40 bg-[#85a6bf] backdrop-blur-md border-b border-[#7292ab]/30 shrink-0 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 py-4 flex items-center justify-between bg-[#85a6bf]">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => {
              setCurrentTab("about");
              setMobileMenuOpen(false);
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white transition-transform group-hover:scale-125 duration-300" />
            <span className="font-serif text-base sm:text-lg tracking-[0.2em] font-medium text-white uppercase">
              {p.englishName}
            </span>
          </div>
          
          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-2 sm:gap-3 md:gap-4 text-white relative">
            <button
              onClick={() => setCurrentTab("about")}
              className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-sans tracking-widest font-bold transition-all duration-300 cursor-pointer rounded-xl ${
                currentTab === "about" ? "text-white font-bold" : "text-white/75 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="relative z-10">關於</span>
              {currentTab === "about" && (
                <>
                  <motion.div
                    layoutId="header-active-bg"
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                  <motion.div
                    layoutId="header-active-line"
                    className="absolute bottom-0 left-2 right-2 h-[3px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                </>
              )}
            </button>

            <button
              onClick={() => setCurrentTab("experience")}
              className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-sans tracking-widest font-bold transition-all duration-300 cursor-pointer rounded-xl ${
                currentTab === "experience" ? "text-white font-bold" : "text-white/75 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="relative z-10">學歷與經歷</span>
              {currentTab === "experience" && (
                <>
                  <motion.div
                    layoutId="header-active-bg"
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                  <motion.div
                    layoutId="header-active-line"
                    className="absolute bottom-0 left-2 right-2 h-[3px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                </>
              )}
            </button>

            <button
              onClick={() => setCurrentTab("expertise")}
              className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-sans tracking-widest font-bold transition-all duration-300 cursor-pointer rounded-xl ${
                currentTab === "expertise" ? "text-white font-bold" : "text-white/75 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="relative z-10">專長領域</span>
              {currentTab === "expertise" && (
                <>
                  <motion.div
                    layoutId="header-active-bg"
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                  <motion.div
                    layoutId="header-active-line"
                    className="absolute bottom-0 left-2 right-2 h-[3px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                </>
              )}
            </button>

            {/* Dropdown Tab: 專案與研究 */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => {
                  setCurrentTab("projects_research");
                  setShowNavDropdown(!showNavDropdown);
                }}
                className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-sans tracking-widest font-bold transition-all duration-300 cursor-pointer rounded-xl flex items-center gap-1.5 ${
                  currentTab === "projects_research" ? "text-white font-bold" : "text-white/75 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="relative z-10">專案與研究</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 relative z-10 ${showNavDropdown ? "rotate-180" : ""}`} />
                {currentTab === "projects_research" && (
                  <>
                    <motion.div
                      layoutId="header-active-bg"
                      className="absolute inset-0 bg-white/10 rounded-xl"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                    <motion.div
                      layoutId="header-active-line"
                      className="absolute bottom-0 left-2 right-2 h-[3px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  </>
                )}
              </button>

              <AnimatePresence>
                {showNavDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1.5 w-48 rounded-2xl bg-[#0f1d3a] border border-[#2a6f97]/30 shadow-xl overflow-hidden py-2 z-50"
                  >
                    {[
                      { subId: "gov_coop", label: "政府與產學" },
                      { subId: "project_exp", label: "專案項目" },
                      { subId: "academic", label: "學術著作" }
                    ].map((item) => (
                      <button
                        key={item.subId}
                        onClick={() => {
                          setCurrentTab("projects_research");
                          setProjectSubTab(item.subId as ProjectSubTab);
                          setShowNavDropdown(false);
                        }}
                        className={`w-full text-left px-5 py-2.5 text-xs font-medium tracking-wide transition-colors duration-200 cursor-pointer group ${
                          currentTab === "projects_research" && projectSubTab === item.subId
                            ? "bg-[#2a6f97] text-white font-bold"
                            : "text-white/80 hover:bg-[#2a6f97]/35 hover:text-white"
                        }`}
                      >
                        <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-1.5">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setCurrentTab("academic_exchange")}
              className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-sans tracking-widest font-bold transition-all duration-300 cursor-pointer rounded-xl ${
                currentTab === "academic_exchange" ? "text-white font-bold" : "text-white/75 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="relative z-10">學術與實踐</span>
              {currentTab === "academic_exchange" && (
                <>
                  <motion.div
                    layoutId="header-active-bg"
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                  <motion.div
                    layoutId="header-active-line"
                    className="absolute bottom-0 left-2 right-2 h-[3px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                </>
              )}
            </button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-xl transition-colors duration-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-[#85a6bf] border-t border-[#7292ab]/20 shadow-lg"
            >
              <div className="px-4 py-4 space-y-2.5 flex flex-col text-left">
                <button
                  onClick={() => {
                    setCurrentTab("about");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-2.5 px-4 text-xs font-sans tracking-widest font-bold rounded-xl text-left transition-colors cursor-pointer ${
                    currentTab === "about" ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  關於
                </button>

                <button
                  onClick={() => {
                    setCurrentTab("experience");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-2.5 px-4 text-xs font-sans tracking-widest font-bold rounded-xl text-left transition-colors cursor-pointer ${
                    currentTab === "experience" ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  學歷與經歷
                </button>

                <button
                  onClick={() => {
                    setCurrentTab("expertise");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-2.5 px-4 text-xs font-sans tracking-widest font-bold rounded-xl text-left transition-colors cursor-pointer ${
                    currentTab === "expertise" ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  專長領域
                </button>

                {/* Mobile Accordion/Submenu for Projects & Research */}
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setMobileProjectsExpanded(!mobileProjectsExpanded);
                    }}
                    className={`w-full py-2.5 px-4 text-xs font-sans tracking-widest font-bold rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                      currentTab === "projects_research" ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    <span>專案與研究</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileProjectsExpanded ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {mobileProjectsExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 space-y-1 mt-1"
                      >
                        {[
                          { subId: "gov_coop", label: "政府與產學" },
                          { subId: "project_exp", label: "專案項目" },
                          { subId: "academic", label: "學術著作" }
                        ].map((item) => (
                          <button
                            key={item.subId}
                            onClick={() => {
                              setCurrentTab("projects_research");
                              setProjectSubTab(item.subId as ProjectSubTab);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full py-2 px-4 text-xs font-bold rounded-lg text-left transition-colors cursor-pointer ${
                              currentTab === "projects_research" && projectSubTab === item.subId
                                ? "bg-white/30 text-white"
                                : "text-white/70 hover:bg-white/10"
                            }`}
                          >
                            ✦ {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => {
                    setCurrentTab("academic_exchange");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-2.5 px-4 text-xs font-sans tracking-widest font-bold rounded-xl text-left transition-colors cursor-pointer ${
                    currentTab === "academic_exchange" ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  學術與實踐
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-10 py-6 md:py-12 flex flex-col gap-8 md:gap-10">
        
        <AnimatePresence mode="wait">
          
          {/* TAB 1: 關於 */}
          {currentTab === "about" && (
            <motion.div
              key="about"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-12"
            >
              {/* Hero Profile Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-4">
                
                {/* Left Portrait & Contacts */}
                <motion.div 
                  variants={itemVariants} 
                  className="lg:col-span-5 flex flex-col items-center lg:items-start gap-8 order-2 lg:order-1"
                >
                  <div className="relative w-full max-w-[340px] aspect-square rounded-[40px] overflow-hidden shadow-md bg-vanilla/30 border border-peach/50 group cursor-pointer">
                    <img 
                      src={catPhoto} 
                      alt={p.name} 
                      className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#2a6f97]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white drop-shadow-md animate-pulse" />
                    </div>
                  </div>
                  
                  {/* Real contacts layout */}
                  <div className="w-full max-w-[340px] space-y-4 pt-2">
                    <div className="flex items-center gap-3.5 text-chestnut/90 font-medium font-sans">
                      <motion.div 
                        whileHover={{ 
                          scale: 1.15, 
                          rotate: [0, -8, 8, -8, 8, 0],
                          transition: { duration: 0.4 } 
                        }}
                        className="w-10 h-10 rounded-full bg-[#85a6bf]/20 border border-[#85a6bf]/40 flex items-center justify-center text-[#2a6f97] shrink-0 cursor-pointer"
                      >
                        <Phone className="w-4 h-4" />
                      </motion.div>
                      <span className="text-sm font-bold tracking-wide font-mono text-plum">{p.contact.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-3.5 text-chestnut/90 font-medium font-sans">
                      <motion.div 
                        whileHover={{ 
                          scale: 1.15, 
                          rotate: [0, -8, 8, -8, 8, 0],
                          transition: { duration: 0.4 } 
                        }}
                        className="w-10 h-10 rounded-full bg-[#85a6bf]/20 border border-[#85a6bf]/40 flex items-center justify-center text-[#2a6f97] shrink-0 cursor-pointer"
                      >
                        <Mail className="w-4 h-4" />
                      </motion.div>
                      <span className="text-sm font-bold tracking-wide font-mono text-plum">{p.contact.email}</span>
                    </div>
                  </div>
                  
                  <div className="w-16 h-1 bg-gradient-to-r from-[#85a6bf] to-[#9ec4c7] rounded-full self-center lg:self-start mt-2" />
                </motion.div>
  
                {/* Right Intro details */}
                <motion.div 
                  variants={itemVariants} 
                  className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left order-1 lg:order-2"
                >
                  <div className="space-y-4">
                    <span className="inline-block px-3 py-0.5 rounded-full bg-peach/30 text-clay border border-peach/50 text-[10px] font-bold tracking-wider uppercase">
                      {p.institution} • {p.department}
                    </span>
                    <div className="space-y-2">
                      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-wide text-plum">
                        {p.name}
                      </h1>
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-chestnut/80 font-sans text-sm tracking-wider font-semibold">
                        <span className="font-serif font-bold text-base text-clay">{p.title}</span>
                        <span className="text-peach">|</span>
                        <span className="uppercase tracking-[0.1em] text-plum font-bold">
                          {p.englishName}
                        </span>
                      </div>
                    </div>
                  </div>
  
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-chestnut/90 text-sm sm:text-base leading-relaxed font-normal tracking-wide max-w-xl mx-auto lg:mx-0 font-sans border-l-2 border-[#85a6bf]/50 pl-4 text-left"
                  >
                    現任淡江大學教育科技學系助理教授。<br />
                    長期專注於虛擬實境（VR）與擴增實境（AR）沉浸式教學教材研發，將前沿數位科技無縫融入課程與產學合作，深耕數位教育創新與實踐。
                  </motion.p>
  
                  {/* Specialties block with dynamic hover physics */}
                  <div className="space-y-3 max-w-xl mx-auto lg:mx-0 text-left">
                    <span className="text-sm font-bold text-plum font-serif tracking-wide block border-b border-peach pb-1">
                      學術研究關鍵字 :
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {p.expertise.map((exp, idx) => (
                        <motion.span
                          key={exp}
                          whileHover={{ 
                            scale: 1.06, 
                            rotate: idx % 2 === 0 ? 1 : -1,
                            backgroundColor: "#eef4f8",
                            borderColor: "#2a6f97",
                            color: "#2a6f97",
                          }}
                          className="px-3.5 py-1.5 rounded-xl border border-peach text-xs text-[#2a6f97] font-bold tracking-wider bg-white transition-all duration-300 cursor-pointer select-none"
                        >
                          {exp}
                        </motion.span>
                      ))}
                    </div>
                  </div>
  
                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
                    <button
                      onClick={() => {
                        setCurrentTab("projects_research");
                        setProjectSubTab("gov_coop");
                      }}
                      className="px-6 py-2.5 bg-[#c8e0eb] hover:bg-[#b5d3e3] text-[#363535] rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer group shadow-xs"
                    >
                      政府與產學
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentTab("projects_research");
                        setProjectSubTab("project_exp");
                      }}
                      className="px-6 py-2.5 bg-[#cde1ed] hover:bg-[#bad4e5] text-[#363535] rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer group shadow-xs"
                    >
                      專案項目
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Fast Stats highlights block */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-4">
                {[
                  { icon: GraduationCap, val: "助理教授", label: "淡江大學教育科技" },
                  { icon: Layers, val: "7+", label: "學術與研發專長" },
                  { icon: Cpu, val: "VR & AR", label: "沉浸式數位教材" },
                  { icon: Award, val: "15+", label: "專案計畫執行經驗" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -4,
                      boxShadow: "0 10px 20px -5px rgba(42, 111, 151, 0.1)",
                      borderColor: "#2a6f97"
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    className="p-5 rounded-2xl bg-white border border-peach/50 flex flex-col items-center justify-center text-center gap-2 shadow-xs cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#eef4f8] flex items-center justify-center text-[#2a6f97]">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg sm:text-xl font-bold font-serif text-plum tracking-tight">{stat.val}</span>
                    <span className="text-[10px] sm:text-xs font-semibold text-chestnut/60 font-sans">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Research Philosophy Section */}
              <motion.div 
                variants={itemVariants} 
                className="pt-8 border-t border-peach/30 flex flex-col items-center text-center max-w-3xl mx-auto space-y-5"
              >
                <span className="text-clay text-[10px] font-bold uppercase tracking-[0.25em] font-mono">RESEARCH PHILOSOPHY</span>
                <p className="font-serif text-base sm:text-xl text-plum leading-relaxed font-light tracking-wide px-4">
                  "科技賦能教育，創意重塑學習。<br />深耕沉浸式教材設計，引領數位時代的卓越教學。"
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-[#85a6bf] to-[#9ec4c7] rounded-full" />
              </motion.div>

              {/* Highly Interactive Core Identity Section */}
              <div className="space-y-6 pt-4">
                <div className="text-center space-y-1.5 max-w-xl mx-auto">
                  <span className="text-clay text-[10px] font-bold tracking-widest uppercase font-mono">
                    Core Focus
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#2a6f97] font-bold">
                    核心價值與學術實踐
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "🔬 學術探索",
                      subtitle: "沉浸式科技教學模型",
                      desc: "深耕虛擬實境（VR）與擴增實境（AR）數位教材，聚焦數位媒介對教學成效與學習動機的量化實證影響。",
                      bgColor: "bg-white",
                      borderColor: "border-peach/70 hover:border-[#2a6f97]/50",
                      bullets: [
                        "沉浸式多媒體教材設計研發",
                        "研究榮獲國內指標性期刊發表",
                        "高教深耕計畫行政與管考經驗"
                      ]
                    },
                    {
                      title: "💡 教學創新",
                      subtitle: "專案與實作導向 (PBL)",
                      desc: "強調動手操作、以學習者為中心。運用教學設計原理，培育獨立專案解決與前瞻技能對接能力。",
                      bgColor: "bg-white",
                      borderColor: "border-peach/70 hover:border-[#2a6f97]/50",
                      bullets: [
                        "數位內容設計與實作導向",
                        "專案式學習 (Project-Based)",
                        "高階實務人才與數位職能培育"
                      ]
                    },
                    {
                      title: "🏢 產學與企業賦能",
                      subtitle: "教育科技與數位轉型",
                      desc: "主持產學合作專案與企業輔導，將教育科技融入企業教育訓練，推動 ESG 與碳盤查知識導入，建置數位學習資源與知識網站。",
                      bgColor: "bg-white",
                      borderColor: "border-peach/70 hover:border-[#2a6f97]/50",
                      bullets: [
                        "ESG 導入與企業創新轉型輔導",
                        "企業數位教材與知識網站建置",
                        "教育科技輔導與實務人才培訓"
                      ]
                    }
                  ].map((card, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      whileHover={{ 
                        y: -6,
                        scale: 1.02,
                        boxShadow: "0 12px 30px rgba(42, 111, 151, 0.06)",
                        transition: { type: "spring", stiffness: 200, damping: 16 }
                      }}
                      className={`group relative p-6 sm:p-7 rounded-3xl border ${card.borderColor} ${card.bgColor} shadow-xs transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer h-full`}
                    >
                      <div className="space-y-3 relative z-10 text-left flex-1 flex flex-col">
                        <div className="h-[46px] flex flex-col justify-start">
                          <h4 className="text-plum font-serif text-base sm:text-lg font-bold">
                            {card.title}
                          </h4>
                          <span className="text-[10px] font-mono text-clay font-bold tracking-wide block mt-0.5">
                            {card.subtitle}
                          </span>
                        </div>
                        <p className="text-chestnut/80 text-xs sm:text-sm leading-relaxed font-normal flex-1">
                          {card.desc}
                        </p>
                      </div>

                      {/* Micro bullets displayed dynamically */}
                      <div className="mt-5 pt-4 border-t border-dashed border-peach/35 relative z-10 text-left space-y-1.5 shrink-0">
                        {card.bullets.map((b, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-1.5 text-xs text-chestnut/90 font-semibold">
                            <span className="text-[#2a6f97] text-xs shrink-0 font-sans">✦</span>
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>

                      <div className="absolute right-4 bottom-4 text-peach/25 group-hover:text-[#2a6f97]/40 transition-colors duration-300 pointer-events-none font-bold text-lg select-none font-mono">
                        0{idx + 1}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="flex flex-col items-center justify-center pt-4 text-chestnut/40 gap-2">
                <span className="text-[10px] tracking-[0.3em] uppercase font-mono">SCROLL</span>
                <div className="w-[1px] h-12 bg-peach/50" />
              </div>
            </motion.div>
          )}

          {/* TAB 2: 專長領域 */}
          {currentTab === "expertise" && (
            <motion.div
              key="expertise"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-12 py-4"
            >
               {/* Header Block */}
              <motion.div variants={itemVariants} className="space-y-5 text-center lg:text-left max-w-4xl">
                <span className="inline-block px-3 py-1 rounded-full border border-peach text-[10px] font-bold tracking-widest text-clay uppercase bg-peach/30">
                  RESEARCH FOCUS
                </span>
                <div className="space-y-4">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-plum font-bold leading-tight tracking-wide whitespace-pre-line">
                    教學設計{"\n"}與數位創新
                  </h2>
                  <p className="text-chestnut/80 text-sm sm:text-base leading-relaxed tracking-wider font-light">
                    跨領域的學術研究與實務經驗，涵蓋教育科技的核心面向。
                  </p>
                </div>
              </motion.div>

              {/* Grid Layout of specialties with details */}
              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 items-stretch"
              >
                {/* Specialty 1 */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-white border border-peach/70 shadow-[0_4px_24px_rgba(15,29,58,0.02)] hover:border-clay/60 hover:shadow-[0_12px_32px_rgba(15,29,58,0.04)] hover:-translate-y-1 transition-all duration-300 p-7 sm:p-8 rounded-[32px] flex flex-col h-full group" 
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <div className="h-[120px] flex flex-col justify-start space-y-3 shrink-0">
                    <div className="w-11 h-11 rounded-full border border-peach/50 flex items-center justify-center text-clay bg-peach/30 group-hover:scale-105 transition-transform duration-300">
                      <Target className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-plum leading-tight">教學設計</h3>
                      <p className="text-[10px] font-mono tracking-widest uppercase text-clay font-bold">INSTRUCTIONAL DESIGN</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-peach/20 flex-1 flex flex-col justify-start">
                    <p className="text-chestnut/90 text-xs sm:text-sm font-normal leading-relaxed">
                      系統化教學設計方法論，從需求分析、學習者特性評估到教學策略擬定與評量設計，建構完整的教學系統。
                    </p>
                  </div>
                </motion.div>

                {/* Specialty 2 */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-vanilla border border-peach/70 shadow-[0_4px_24px_rgba(15,29,58,0.02)] hover:border-mustard/60 hover:shadow-[0_12px_32px_rgba(15,29,58,0.04)] hover:-translate-y-1 transition-all duration-300 p-7 sm:p-8 rounded-[32px] flex flex-col h-full group" 
                  style={{ backgroundColor: "#eef4f8" }}
                >
                  <div className="h-[120px] flex flex-col justify-start space-y-3 shrink-0">
                    <div className="w-11 h-11 rounded-full border border-cream/80 flex items-center justify-center text-mustard bg-cream/40 group-hover:scale-105 transition-transform duration-300">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-plum leading-tight">數位學習</h3>
                      <p className="text-[10px] font-mono tracking-widest uppercase text-mustard font-bold">E-LEARNING</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-peach/20 flex-1 flex flex-col justify-start">
                    <p className="text-chestnut/90 text-xs sm:text-sm font-normal leading-relaxed">
                      數位學習平台規劃、線上課程設計、混合式教學模式開發，結合學習分析技術優化學習體驗與成效。
                    </p>
                  </div>
                </motion.div>

                {/* Specialty 3 */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-white border border-peach/70 shadow-[0_4px_24px_rgba(15,29,58,0.02)] hover:border-clay/60 hover:shadow-[0_12px_32px_rgba(15,29,58,0.04)] hover:-translate-y-1 transition-all duration-300 p-7 sm:p-8 rounded-[32px] flex flex-col h-full group" 
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <div className="h-[120px] flex flex-col justify-start space-y-3 shrink-0">
                    <div className="w-11 h-11 rounded-full border border-peach/50 flex items-center justify-center text-clay bg-peach/30 group-hover:scale-105 transition-transform duration-300">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-plum leading-tight">VR/AR教材開發</h3>
                      <p className="text-[10px] font-mono tracking-widest uppercase text-clay font-bold">VR/AR DEVELOPMENT</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-peach/20 flex-1 flex flex-col justify-start">
                    <p className="text-chestnut/90 text-xs sm:text-sm font-normal leading-relaxed">
                      虛擬實境與擴增實境沉浸式教材設計與開發，運用 Unity 與各類創作工具打造高度互動的學習內容。
                    </p>
                  </div>
                </motion.div>

                {/* Specialty 4 */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-vanilla border border-peach/70 shadow-[0_4px_24px_rgba(15,29,58,0.02)] hover:border-clay/60 hover:shadow-[0_12px_32px_rgba(15,29,58,0.04)] hover:-translate-y-1 transition-all duration-300 p-7 sm:p-8 rounded-[32px] flex flex-col h-full group" 
                  style={{ backgroundColor: "#eef4f8" }}
                >
                  <div className="h-[120px] flex flex-col justify-start space-y-3 shrink-0">
                    <div className="w-11 h-11 rounded-full border border-peach/50 flex items-center justify-center text-clay bg-peach/30 group-hover:scale-105 transition-transform duration-300">
                      <Workflow className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-plum leading-tight">專案管理</h3>
                      <p className="text-[10px] font-mono tracking-widest uppercase text-clay font-bold">PROJECT MANAGEMENT</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-peach/20 flex-1 flex flex-col justify-start">
                    <p className="text-chestnut/90 text-xs sm:text-sm font-normal leading-relaxed">
                      統籌與管考大型產學專案與研發計畫，對接企業委託之微型數位學習方案，實踐高效跨部門協作與管考流程。
                    </p>
                  </div>
                </motion.div>

                {/* Specialty 5 */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-white border border-peach/70 shadow-[0_4px_24px_rgba(15,29,58,0.02)] hover:border-mustard/60 hover:shadow-[0_12px_32px_rgba(15,29,58,0.04)] hover:-translate-y-1 transition-all duration-300 p-7 sm:p-8 rounded-[32px] flex flex-col h-full group" 
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <div className="h-[120px] flex flex-col justify-start space-y-3 shrink-0">
                    <div className="w-11 h-11 rounded-full border border-cream/80 flex items-center justify-center text-mustard bg-cream/40 group-hover:scale-105 transition-transform duration-300">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-plum leading-tight">資訊科技整合應用</h3>
                      <p className="text-[10px] font-mono tracking-widest uppercase text-mustard font-bold">IT INTEGRATION</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-peach/20 flex-1 flex flex-col justify-start">
                    <p className="text-chestnut/90 text-xs sm:text-sm font-normal leading-relaxed">
                      前瞻資訊工具與數據分析技術整合，引領高等教育數位化教學變革、設計互動式教具與智能評量機制。
                    </p>
                  </div>
                </motion.div>

                {/* Specialty 6 */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-vanilla border border-peach/70 shadow-[0_4px_24px_rgba(15,29,58,0.02)] hover:border-mustard/60 hover:shadow-[0_12px_32px_rgba(15,29,58,0.04)] hover:-translate-y-1 transition-all duration-300 p-7 sm:p-8 rounded-[32px] flex flex-col h-full group" 
                  style={{ backgroundColor: "#eef4f8" }}
                >
                  <div className="h-[120px] flex flex-col justify-start space-y-3 shrink-0">
                    <div className="w-11 h-11 rounded-full border border-cream/80 flex items-center justify-center text-clay bg-cream/40 group-hover:scale-105 transition-transform duration-300">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-plum leading-tight">教育科技應用</h3>
                      <p className="text-[10px] font-mono tracking-widest uppercase text-clay font-bold">EDUCATIONAL TECHNOLOGY</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-peach/20 flex-1 flex flex-col justify-start">
                    <p className="text-chestnut/90 text-xs sm:text-sm font-normal leading-relaxed">
                      探討人工智慧與新型載具在教學現場的融合方式，輔導師生建立數位實務職能。
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: 專案與研究 */}
          {currentTab === "projects_research" && (
            <motion.div
              key="projects_research"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-10 py-4"
            >
              {/* Header */}
              <motion.div variants={itemVariants} className="space-y-2 max-w-3xl">
                <span className="text-clay text-xs font-bold uppercase tracking-[0.25em]">PROJECTS & RESEARCH</span>
                <h2 className="text-3xl sm:text-4xl font-serif text-plum tracking-wide font-bold">
                  專案與研究成果
                </h2>
                <p className="text-chestnut/80 text-xs sm:text-sm font-light tracking-wide">
                  長期致力於政府專案計畫管考、產學研發委辦案，以及國內外學術研究論文發表。
                </p>
              </motion.div>

              {/* Sub Tab Controls matching Dropdown items */}
              <motion.div variants={itemVariants} className="flex border-b border-peach/50 pb-px overflow-x-auto whitespace-nowrap scrollbar-none gap-2">
                {[
                  { id: "gov_coop", label: "政府與產學" },
                  { id: "project_exp", label: "專案項目" },
                  { id: "academic", label: "學術著作" }
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setProjectSubTab(sub.id as ProjectSubTab)}
                    className={`relative px-5 py-3 text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 cursor-pointer shrink-0 rounded-t-xl ${
                      projectSubTab === sub.id
                        ? "text-clay font-bold"
                        : "text-chestnut/60 hover:text-clay hover:bg-peach/10"
                    }`}
                  >
                    <span className="relative z-10">{sub.label}</span>
                    {projectSubTab === sub.id && (
                      <motion.div
                        layoutId="project-subtab-active-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-clay rounded-full shadow-xs"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                  </button>
                ))}
              </motion.div>

              {/* Dynamic Sub-tab views */}
              <AnimatePresence mode="wait">
                
                {/* 1. 政府/產學計畫 (gov_coop) */}
                {projectSubTab === "gov_coop" && (
                  <motion.div
                    key="gov_coop_panel"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
                  >
                    {/* Left Column: 政府計畫 */}
                    <div className="lg:col-span-6 space-y-8">
                      <div className="border-b border-peach pb-3 space-y-1">
                        <h3 className="text-2xl font-serif font-bold text-plum flex items-center gap-2">
                          政府計畫
                        </h3>
                        <p className="text-xs uppercase tracking-widest font-mono text-clay font-semibold">
                          GOVERNMENT PROGRAM
                        </p>
                      </div>

                      <div className="space-y-6">
                        {p.govProjects.map((gov, index) => (
                          <div 
                            key={gov.title}
                            className="bg-white rounded-3xl p-6 border border-peach/70 shadow-[0_4px_24px_rgba(15,29,58,0.015)] relative overflow-hidden group hover:border-clay/60 hover:-translate-y-0.5 transition-all duration-300"
                          >
                            <div className="flex items-start gap-4">
                              <span className="text-orange-400 mt-1 shrink-0">
                                <Star className="w-5 h-5 fill-current" />
                              </span>
                              <div className="space-y-2">
                                <span className="text-xs text-clay font-bold tracking-widest font-mono block">
                                  &lt; {gov.period} &gt;
                                </span>
                                <h4 className="text-base sm:text-lg font-serif font-bold text-plum leading-snug">
                                  {gov.title}
                                </h4>
                                <div className="inline-block px-3 py-1 rounded-full bg-peach/30 border border-peach/60 text-xs font-bold text-plum mt-1">
                                  {gov.role}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: 產學計畫 */}
                    <div className="lg:col-span-6 space-y-8">
                      <div className="border-b border-peach pb-3 space-y-1">
                        <h3 className="text-2xl font-serif font-bold text-plum flex items-center gap-2">
                          產學計畫
                        </h3>
                        <p className="text-xs uppercase tracking-widest font-mono text-clay font-semibold">
                          COOPERATION PROJECT
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {p.coopProjects.map((coop, index) => (
                          <div 
                            key={index}
                            className="bg-vanilla/50 rounded-2xl p-5 border border-peach/70 flex items-center justify-between gap-4 shadow-sm hover:border-clay/60 hover:bg-white transition-all duration-300 group"
                          >
                            <div className="flex items-start gap-3.5">
                              <span className="text-orange-400 mt-1 shrink-0">
                                <Star className="w-4 h-4 fill-current" />
                              </span>
                              <div className="space-y-1">
                                <h4 className="text-sm sm:text-base font-serif font-bold text-plum group-hover:text-clay transition-colors">
                                  {coop.title.includes("年") || coop.title.includes("委託") ? coop.title : `${coop.year}年 ${coop.title}`}
                                </h4>
                                {coop.role && (
                                  <p className="text-xs text-chestnut/60 font-medium">
                                    {coop.role}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="shrink-0">
                              <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#85a6bf]/20 border border-[#85a6bf]/40 text-xs font-bold text-clay tracking-wide font-mono">
                                {coop.funding}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. 專案項目 (project_exp) */}
                {projectSubTab === "project_exp" && (
                  <motion.div
                    key="project_exp_panel"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-8"
                  >
                    <div className="border-b border-peach pb-3 space-y-1 max-w-xl">
                      <h3 className="text-2xl font-serif font-bold text-plum">
                        專案項目
                      </h3>
                      <p className="text-xs uppercase tracking-widest font-mono text-clay font-semibold">
                        RESEARCH & PROJECT EXPERIENCE
                      </p>
                    </div>

                    {/* Timeline List matching Image 5 */}
                    <div className="relative pl-6 sm:pl-8 space-y-5 before:content-[''] before:absolute before:left-[11px] before:top-4 before:bottom-4 before:w-[2px] before:bg-peach/55">
                      {p.projectExps.map((item, index) => {
                        // Alternate bg: 先藍色 (vanilla / ice-blue #eef4f8) 再白色 (#ffffff)
                        // index = 0 -> true (vanilla), index = 1 -> false (white), etc.
                        const isBlue = index % 2 === 0;

                        return (
                          <div key={index} className="relative group">
                            {/* Dot indicator */}
                            <div className="absolute -left-[20px] sm:-left-[22px] top-[24px] w-3.5 h-3.5 rounded-full border-2 border-white bg-clay transition-all duration-300 group-hover:scale-130 z-10 shadow-xs" />
                            
                            <div 
                              className={`p-5 sm:p-6 rounded-2xl border border-peach/70 shadow-[0_2px_12px_rgba(61,27,19,0.015)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                                isBlue ? "bg-vanilla" : "bg-white"
                              }`}
                              style={{ backgroundColor: isBlue ? "#eef4f8" : "#ffffff" }}
                            >
                              <div className="space-y-1.5 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-xs font-bold text-clay font-mono">
                                    {item.period}
                                  </span>
                                  {item.isStarred && (
                                    <span className="text-orange-400">
                                      <Star className="w-4 h-4 fill-current" />
                                    </span>
                                  )}
                                </div>
                                <h4 className="text-base sm:text-lg font-serif font-bold text-plum group-hover:text-clay transition-colors leading-snug">
                                  {item.title}
                                </h4>
                                {item.detail && (
                                  <p className="text-xs text-chestnut/75 leading-relaxed font-sans max-w-2xl bg-white/60 p-2.5 rounded-lg border border-peach/30 mt-1">
                                    {item.detail}
                                  </p>
                                )}
                              </div>
                              {item.funding && (
                                <div className="shrink-0 self-start sm:self-center">
                                  <span className="inline-block px-3 py-1 rounded-full bg-peach/40 border border-peach/60 text-xs font-bold text-plum font-mono">
                                    {item.funding}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* 3. 學術研究 (academic) */}
                {projectSubTab === "academic" && (
                  <motion.div
                    key="academic_panel"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-10"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-peach pb-4">
                      <div className="space-y-1 max-w-xl">
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-plum">
                          學術研究
                        </h3>
                        <p className="text-xs uppercase tracking-widest font-mono text-clay font-semibold">
                          ACADEMIC RESEARCH & PUBLICATIONS
                        </p>
                      </div>

                      {/* Official TKU Teacher Portal Banner */}
                      <a
                        href="https://teacher.tku.edu.tw/PsnCat.aspx?t=psh_a_author_data&u=t952085"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#2a6f97] text-white text-xs font-medium hover:bg-[#1f5373] transition-all shadow-sm hover:shadow-md shrink-0 self-start sm:self-auto"
                      >
                        <span>淡江大學教師歷程系統</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Quick Statistics Badges */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                      <div className="bg-white/90 backdrop-blur-xs border border-peach/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs hover:border-[#2a6f97]/40 hover:shadow-xs transition-all duration-300 group">
                        <div className="w-11 h-11 rounded-xl bg-[#2a6f97]/10 text-[#2a6f97] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <BookMarked className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xl sm:text-2xl font-serif font-bold text-plum leading-none">
                            {professorProfile.academicResearch.journals?.length || 3}<span className="text-xs font-sans font-normal text-chestnut/70 ml-0.5">篇</span>
                          </div>
                          <div className="text-xs font-sans font-medium text-chestnut/70 mt-1">期刊論文發表</div>
                        </div>
                      </div>

                      <div className="bg-white/90 backdrop-blur-xs border border-peach/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs hover:border-[#2a6f97]/40 hover:shadow-xs transition-all duration-300 group">
                        <div className="w-11 h-11 rounded-xl bg-peach/30 text-clay flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <Presentation className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xl sm:text-2xl font-serif font-bold text-plum leading-none">
                            {professorProfile.academicResearch.conferences?.length || 3}<span className="text-xs font-sans font-normal text-chestnut/70 ml-0.5">篇</span>
                          </div>
                          <div className="text-xs font-sans font-medium text-chestnut/70 mt-1">研討會論文</div>
                        </div>
                      </div>

                      <div className="bg-white/90 backdrop-blur-xs border border-peach/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs hover:border-[#2a6f97]/40 hover:shadow-xs transition-all duration-300 group">
                        <div className="w-11 h-11 rounded-xl bg-mustard/15 text-mustard flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xl sm:text-2xl font-serif font-bold text-plum leading-none">
                            {professorProfile.academicResearch.reports?.items?.length || 11}<span className="text-xs font-sans font-normal text-chestnut/70 ml-0.5">案</span>
                          </div>
                          <div className="text-xs font-sans font-medium text-chestnut/70 mt-1">管考與深耕計畫</div>
                        </div>
                      </div>

                      <div className="bg-white/90 backdrop-blur-xs border border-peach/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs hover:border-[#2a6f97]/40 hover:shadow-xs transition-all duration-300 group">
                        <div className="w-11 h-11 rounded-xl bg-clay/10 text-clay flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xl sm:text-2xl font-serif font-bold text-plum leading-none">
                            {professorProfile.academicResearch.speeches?.length || 5}<span className="text-xs font-sans font-normal text-chestnut/70 ml-0.5">場</span>
                          </div>
                          <div className="text-xs font-sans font-medium text-chestnut/70 mt-1">演講與專家服務</div>
                        </div>
                      </div>
                    </div>

                    {/* Academic publications timeline & speeches */}
                    <div className="space-y-8">
                      {/* Interactive Paper Timeline */}
                      <PaperTimeline
                        journals={professorProfile.academicResearch.journals}
                        conferences={professorProfile.academicResearch.conferences}
                        dissertations={professorProfile.academicResearch.dissertations}
                      />

                      {/* 5. 專業服務及演講 Professional Services & Speeches */}
                      {professorProfile.academicResearch.speeches && (
                        <div className="bg-white rounded-[32px] border border-peach/70 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-clay transition-all duration-300 space-y-6 lg:col-span-2">
                          <div className="space-y-6">
                            <div className="flex items-center gap-4 pb-4 border-b border-peach/30">
                              <div className="w-12 h-12 bg-peach/20 rounded-2xl flex items-center justify-center border border-peach text-clay shrink-0">
                                <Award className="w-6 h-6" />
                              </div>
                              <div>
                                <h4 className="text-lg font-serif font-bold text-plum">專業服務及演講</h4>
                                <p className="text-xs uppercase font-mono text-chestnut/50 font-bold">Professional Services & Speeches</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {professorProfile.academicResearch.speeches.map((sp, idx) => (
                                <div key={idx} className="p-4 rounded-2xl bg-vanilla/30 border border-peach/40 hover:bg-vanilla/60 transition-colors flex flex-col justify-between space-y-2">
                                  <p className="text-sm font-sans text-plum leading-relaxed font-bold">
                                    {sp.title}
                                  </p>
                                  <div className="flex items-center justify-between text-xs text-chestnut/70 pt-2 border-t border-peach/20">
                                    <span className="font-semibold text-clay">{sp.unit}</span>
                                    <span className="font-mono text-chestnut/60 font-medium">⟨ {sp.period} ⟩</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 6. 報告書 Project & Assessment Reports */}
                      {professorProfile.academicResearch.reports && (
                        <div className="bg-white rounded-[32px] border border-peach/70 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-clay transition-all duration-300 space-y-6 lg:col-span-2">
                          <div className="space-y-6">
                            <div className="flex items-center gap-4 pb-4 border-b border-peach/30">
                              <div className="w-12 h-12 bg-peach/20 rounded-2xl flex items-center justify-center border border-peach text-clay shrink-0">
                                <FileText className="w-6 h-6" />
                              </div>
                              <div>
                                <h4 className="text-lg font-serif font-bold text-plum">報告書</h4>
                                <p className="text-xs uppercase font-mono text-chestnut/50 font-bold">Project & Assessment Reports</p>
                              </div>
                            </div>

                            {/* Intro text (if any) */}
                            {professorProfile.academicResearch.reports.introParagraphs && professorProfile.academicResearch.reports.introParagraphs.length > 0 && (
                              <div className="space-y-3 text-sm text-chestnut/85 leading-relaxed font-sans bg-vanilla/30 p-5 rounded-2xl border border-peach/40">
                                {professorProfile.academicResearch.reports.introParagraphs.map((para, idx) => (
                                  <p key={idx}>{para}</p>
                                ))}
                              </div>
                            )}

                            {/* Reports list */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                              {professorProfile.academicResearch.reports.items.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-vanilla/30 border border-peach/40 hover:bg-vanilla/60 transition-colors">
                                  <span className="text-clay font-bold text-sm shrink-0 mt-0.5">✦</span>
                                  <span className="text-sm font-sans text-plum font-medium leading-relaxed">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </motion.div>
          )}

          {/* TAB 4: 學歷與經歷 */}
          {currentTab === "experience" && (
            <motion.div
              key="experience"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-16 py-4"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                
                {/* Left Header */}
                <motion.div variants={itemVariants} className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
                  <div className="flex items-center gap-2.5 text-clay">
                    <span className="text-clay text-base font-bold">◆</span>
                    <span className="font-sans text-xs tracking-widest font-bold uppercase">學思歷程</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-plum font-bold leading-tight tracking-wide">
                    學思歷程
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#85a6bf] to-[#9ec4c7] rounded-full my-4" />
                  <p className="text-chestnut/80 text-xs sm:text-sm font-normal leading-relaxed max-w-sm font-sans">
                    深耕教育科技學系，歷任行政主管、副研發長與教學職務。將先進的 VR/AR 沉浸式教材設計、計畫管考與產學合作實戰成果，深度實踐於高等教育的課堂創新中。
                  </p>
                </motion.div>

                {/* Right Timeline */}
                <motion.div variants={itemVariants} className="lg:col-span-8 space-y-12">
                  <div className="relative pl-6 space-y-8 before:content-[''] before:absolute before:left-[3.5px] before:top-4 before:bottom-4 before:w-[1.5px] before:bg-peach/30">
                    
                    {p.experience.map((exp, index) => {
                      const isBlue = index % 2 === 0;

                      return (
                        <div key={index} className="relative group">
                          <div className={`absolute -left-[27.5px] top-[26px] w-2.5 h-2.5 rounded-full border-2 border-white transition-all duration-300 group-hover:scale-130 z-10 shadow-xs ${
                            isBlue ? "bg-clay" : "bg-mustard"
                          }`} />
                          <motion.div 
                            whileHover={{ y: -3, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="p-5 sm:p-6 rounded-2xl border border-peach/70 shadow-xs cursor-pointer text-left space-y-2 transition-all duration-300"
                            style={{ backgroundColor: isBlue ? "#eef4f8" : "#ffffff" }}
                          >
                            <span className="text-xs font-mono text-clay uppercase tracking-widest block font-bold">
                              {exp.time}
                            </span>
                            <div className="space-y-0.5">
                              <h4 className="font-serif text-lg sm:text-xl font-bold text-plum group-hover:text-clay transition-colors">
                                {exp.role}
                              </h4>
                            </div>
                            <p className="text-chestnut/80 text-xs font-normal leading-relaxed pt-1 max-w-xl">
                              {exp.desc}
                            </p>
                          </motion.div>
                        </div>
                      );
                    })}

                    {/* Educational background listed under experience timeline */}
                    {p.education.map((edu, index) => {
                      const isBlue = (p.experience.length + index) % 2 === 0;

                      return (
                        <div key={index} className="relative group">
                          <div className={`absolute -left-[27.5px] top-[26px] w-2.5 h-2.5 rounded-full border-2 border-white transition-all duration-300 group-hover:scale-130 z-10 shadow-xs ${
                            isBlue ? "bg-clay" : "bg-mustard"
                          }`} />
                          <motion.div 
                            whileHover={{ y: -3, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="p-5 sm:p-6 rounded-2xl border border-peach/70 shadow-xs cursor-pointer text-left space-y-2 transition-all duration-300"
                            style={{ backgroundColor: isBlue ? "#eef4f8" : "#ffffff" }}
                          >
                            <span className="text-xs font-mono text-chestnut/60 uppercase tracking-widest block font-bold">
                              {edu.time}
                            </span>
                            <div className="space-y-0.5">
                              <h4 className="font-serif text-lg sm:text-xl font-bold text-plum group-hover:text-mustard transition-colors">
                                {edu.degree}
                              </h4>
                            </div>
                            <p className="text-chestnut/80 text-xs font-normal leading-relaxed pt-1 max-w-xl">
                              {edu.desc}
                            </p>
                          </motion.div>
                        </div>
                      );
                    })}

                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: 學術交流與產學合作 */}
          {currentTab === "academic_exchange" && (
            <motion.div
              key="academic_exchange"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-16 py-4"
            >
              {/* Header */}
              <motion.div variants={itemVariants} className="space-y-3 max-w-3xl">
                <span className="text-clay text-xs font-bold uppercase tracking-[0.25em]">ACADEMIC EXCHANGE & INDUSTRY COLLABORATION</span>
                <h2 className="text-3xl sm:text-4xl font-serif text-plum tracking-wide font-bold">
                  學術交流與產學合作
                </h2>
                <p className="text-chestnut/80 text-xs sm:text-sm font-light tracking-wide">
                  積極參與跨校、跨院、中央部會以及企業產學合作，透過數位科技推動計畫管考、產業人才培訓與企業永續轉型，展現多元產學整合能量。
                </p>
              </motion.div>

              {/* 互動式學術交流與產學合作地圖 */}
              <motion.div variants={itemVariants} className="pt-6">
                <InteractiveMap />
              </motion.div>

              {/* Certifications & Academic Contacts */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-peach/30">
                {/* Certifications */}
                <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-xl text-plum font-bold">專業證照與資格</h3>
                    <p className="text-chestnut/60 text-xs font-normal tracking-wide">跨足微軟文書大師、網路資訊安全、商品數據分析等跨域專業認證</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {p.certifications.map((cert, index) => (
                      <div 
                        key={cert.name}
                        className={`p-5 rounded-2xl border border-peach/70 shadow-xs hover:border-clay/60 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-3.5 group ${
                          index % 2 === 0 ? "bg-white" : "bg-vanilla"
                        }`}
                        style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#eef4f8" }}
                      >
                        <div className="p-2 rounded-xl bg-peach/20 border border-peach/40 text-clay group-hover:bg-clay group-hover:text-white transition-colors duration-300 shrink-0">
                          <Award className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs sm:text-sm font-bold text-plum leading-snug">{cert.name}</h4>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-clay block font-bold">
                            🏆 {cert.authority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Contacts Column */}
                <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-xl text-plum font-bold">研究室與學術諮詢</h3>
                    <p className="text-chestnut/60 text-xs font-normal tracking-wide">歡迎研究生學術面談與跨校、各級公私立機構產學委任探討</p>
                  </div>
                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-white border border-peach/50 shadow-xs flex items-start gap-4 hover:border-clay/60 hover:-translate-y-0.5 transition-all duration-300" style={{ backgroundColor: "#ffffff" }}>
                      <Mail className="w-4 h-4 text-clay shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase tracking-widest text-chestnut/50 font-bold block">學術與專案郵箱</span>
                        <a href={`mailto:${p.contact.email}`} className="text-plum font-serif text-sm font-bold hover:text-clay hover:underline">
                          {p.contact.email}
                        </a>
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white border border-peach/50 shadow-xs flex items-start gap-4 hover:border-clay/60 hover:-translate-y-0.5 transition-all duration-300" style={{ backgroundColor: "#ffffff" }}>
                      <Phone className="w-4 h-4 text-clay shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase tracking-widest text-chestnut/50 font-bold block">研究室聯絡電話</span>
                        <span className="text-plum font-serif text-sm font-bold">{p.contact.phone}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Paper Detail Modal */}
        <AnimatePresence>
          {selectedPaper && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24 }}
                onClick={() => setSelectedPaper(null)}
                className="fixed inset-0 bg-stone-950/60 backdrop-blur-md"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 35 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className="bg-vanilla rounded-[32px] shadow-2xl border border-peach/50 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden relative z-10 font-sans"
              >
                {/* Clean Top border bar */}
                <div className="h-1 bg-clay shrink-0" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-peach/10 text-clay hover:bg-peach/20 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-peach/40 z-20"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
                  {/* Badge & Year */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] bg-peach/30 text-clay border border-peach/55 font-bold">
                      <BookOpen className="w-3.5 h-3.5" />
                      學術發表
                    </span>
                    <span className="text-[10px] bg-peach/20 text-clay font-mono font-bold px-3 py-1 rounded-full border border-peach/40">
                      {selectedPaper.year} 年度
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-plum tracking-wide leading-snug">
                    {selectedPaper.title}
                  </h3>

                  {/* Authors & Source */}
                  <div className="p-4 bg-peach/10 border border-peach/30 rounded-2xl space-y-1.5">
                    <span className="text-[9px] font-bold text-chestnut/50 uppercase tracking-widest block">著作人與發表來源</span>
                    <p className="text-xs sm:text-sm font-bold text-plum">作者 : {selectedPaper.authors}</p>
                    <p className="text-xs text-chestnut/80 leading-relaxed font-sans">{selectedPaper.source}</p>
                  </div>

                  {/* Abstract placeholder/details */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-chestnut/50 uppercase tracking-widest block">著作與研究方向 Details:</span>
                    <p className="text-xs sm:text-sm text-chestnut/90 leading-relaxed font-normal font-sans">
                      本篇研究旨在探討高等教育中科技媒體之創新融入方式，並對教學成效進行實證性量化與質性綜合分析，期望能為教育科技領域的教材設計、遠距教學、以及學習動機與投入度提供具實用性的參考價值與實務指導。
                    </p>
                  </div>

                  {/* Keywords */}
                  {selectedPaper.tags && selectedPaper.tags.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold text-chestnut/50 uppercase tracking-widest block">學術關鍵字 Keywords:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPaper.tags.map(tag => (
                          <span key={tag} className="text-xs bg-peach/10 border border-peach/20 text-clay rounded-xl px-3 py-1 font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 bg-peach/10 border-t border-peach/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
                  <span className="text-[11px] text-chestnut/50 font-sans">教育科技學系 郭盈芝著作發表</span>
                  <button
                    onClick={() => setSelectedPaper(null)}
                    className="px-6 py-2.5 bg-clay hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    關閉視窗
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ELEGANT EDITORIAL FOOTER CARD */}
        <footer className={`w-full bg-vanilla rounded-[32px] border border-peach/70 p-8 sm:p-12 md:p-16 shadow-xs mt-16 ${
          currentTab === "about" ? "block" : "hidden md:block"
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Profile Intro Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="font-serif text-3xl font-bold tracking-[0.18em] leading-tight text-plum uppercase">
                YING CHIH<br />KUO
              </div>
              <p className="text-chestnut/80 text-xs sm:text-sm leading-relaxed font-normal max-w-md">
                淡江大學教育科技學系助理教授。<br />
                專注於教學設計、數位學習與 VR/AR 沉浸式教材開發。
              </p>
            </div>

            {/* NAVIGATION Column */}
            <div className="lg:col-span-2 lg:col-start-7 space-y-5">
              <span className="text-[10px] font-bold font-sans text-chestnut/50 tracking-[0.2em] uppercase block">
                NAVIGATION
              </span>
              <ul className="space-y-3.5 text-xs sm:text-sm font-bold">
                <li>
                  <button 
                    onClick={() => setCurrentTab("about")}
                    className="text-chestnut/80 hover:text-clay transition-colors cursor-pointer text-left"
                  >
                    首頁 / 關於
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentTab("expertise")}
                    className="text-chestnut/80 hover:text-clay transition-colors cursor-pointer text-left"
                  >
                    專長領域
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setCurrentTab("projects_research");
                      setProjectSubTab("gov_coop");
                    }}
                    className="text-chestnut/80 hover:text-clay transition-colors cursor-pointer text-left"
                  >
                    專案與研究
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentTab("experience")}
                    className="text-chestnut/80 hover:text-clay transition-colors cursor-pointer text-left"
                  >
                    學術交流
                  </button>
                </li>
              </ul>
            </div>

            {/* CONNECT Column */}
            <div className="lg:col-span-2 space-y-5">
              <span className="text-[10px] font-bold font-sans text-chestnut/50 tracking-[0.2em] uppercase block">
                SPECIALTIES
              </span>
              <ul className="space-y-3.5 text-xs sm:text-sm font-bold">
                <li>
                  <button 
                    onClick={() => setCurrentTab("expertise")}
                    className="text-chestnut/80 hover:text-clay transition-colors cursor-pointer text-left"
                  >
                    教學設計
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentTab("expertise")}
                    className="text-chestnut/80 hover:text-clay transition-colors cursor-pointer text-left"
                  >
                    數位學習
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentTab("expertise")}
                    className="text-chestnut/80 hover:text-clay transition-colors cursor-pointer text-left"
                  >
                    VR/AR 教材開發
                  </button>
                </li>
              </ul>
            </div>

            {/* RESEARCH Column */}
            <div className="lg:col-span-2 space-y-5">
              <span className="text-[10px] font-bold font-sans text-chestnut/50 tracking-[0.2em] uppercase block">
                CONTACTS
              </span>
              <ul className="space-y-3.5 text-xs sm:text-sm font-bold text-chestnut/80">
                <li className="flex items-center gap-2 group">
                  <motion.div
                    whileHover={{ 
                      scale: 1.25, 
                      rotate: [0, -8, 8, -8, 8, 0],
                      transition: { duration: 0.4 } 
                    }}
                    className="shrink-0 text-clay"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </motion.div>
                  <a href={`mailto:${p.contact.email}`} className="hover:text-clay truncate">
                    {p.contact.email}
                  </a>
                </li>
                <li className="flex items-center gap-2 group">
                  <motion.div
                    whileHover={{ 
                      scale: 1.25, 
                      rotate: [0, -8, 8, -8, 8, 0],
                      transition: { duration: 0.4 } 
                    }}
                    className="shrink-0 text-clay"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </motion.div>
                  <span>{p.contact.phone.split(' ')[0]}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-peach/20 my-8 sm:my-10" />

          {/* Bottom Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-[11px] sm:text-xs text-chestnut/50 font-normal">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1.5">
              <span>© 2026 Ying Chih Kuo. All rights reserved.</span>
              <span className="text-peach/30 hidden sm:inline">｜</span>
              <span>淡江大學教育科技學系</span>
            </div>
            <div className="flex items-center gap-5 justify-end">
              <motion.a 
                href="https://www.linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                whileHover={{ 
                  scale: 1.25, 
                  rotate: [0, -10, 10, -10, 10, 0],
                  transition: { duration: 0.4 } 
                }}
                className="text-chestnut/60 hover:text-clay transition-colors block"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a 
                href={`mailto:${p.contact.email}`} 
                aria-label="Email"
                whileHover={{ 
                  scale: 1.25, 
                  rotate: [0, -10, 10, -10, 10, 0],
                  transition: { duration: 0.4 } 
                }}
                className="text-chestnut/60 hover:text-clay transition-colors block"
              >
                <Mail className="w-4.5 h-4.5" />
              </motion.a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
