import { useState, useEffect, useRef } from 'react';
import HeroSection from '../components/Home/Hero';
import AboutSection from '../components/Home/About';
import { ChevronDown } from 'lucide-react';
import SkillsSection from '../components/Home/Skills';
import CustomCursor from '../components/Home/CustomCursor';

const HomePage = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollDown, setShowScrollDown] = useState(true);

  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight;
    const clientHeight = el.clientHeight;

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
    setShowScrollDown(!isAtBottom);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    handleScroll(); // Initial check

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const sections =
      scrollContainerRef.current?.querySelectorAll('section') ?? [];
    const current = Array.from(sections).find((el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= -window.innerHeight / 2 && rect.top < window.innerHeight / 2
      );
    });

    const currentIndex = current ? Array.from(sections).indexOf(current) : 0;
    const next = sections[currentIndex + 1] as HTMLElement;

    if (next) {
      next.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="gradient-bg relative sm:h-screen overflow-hidden cursor-none">
      {/* Fixed white circle "rug" in the background */}
      <div className="fixed rounded-full bg-[rgba(255,255,255,.5)] h-[100vh] w-[100vh] lg:h-[120vh] lg:w-[120vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      {!isTouchDevice() && <CustomCursor />}

      <div
        ref={scrollContainerRef}
        className="sm:h-screen sm:snap-y sm:snap-mandatory overflow-y-scroll scroll-smooth relative" // Added relative here
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        {showScrollDown && (
          <button
            onClick={scrollToNext}
            className="hidden sm:flex fixed bottom-6 left-1/2 transform -translate-x-1/2 p-3 rounded-full text-black hover:scale-125 transition-transform duration-300 ease-in-out z-40"
          >
            <ChevronDown className="h-8 w-8 animate-bounce" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
