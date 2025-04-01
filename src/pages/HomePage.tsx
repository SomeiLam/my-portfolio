import { useState, useEffect, useRef } from 'react';
import HeroSection from '../components/Home/Hero';
import AboutSection from '../components/Home/About';
import { ChevronDown } from 'lucide-react';
import SkillsSection from '../components/Home/Skills';

const HomePage = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollDown, setShowScrollDown] = useState(true);

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
    <div
      ref={scrollContainerRef}
      className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth"
      style={{
        background:
          'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
      }}
    >
      <HeroSection />

      <AboutSection />

      <SkillsSection />
      {showScrollDown && (
        <button
          onClick={scrollToNext}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 p-3 rounded-full text-black hover:scale-125 transition-transform duration-300 ease-in-out z-50"
        >
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </button>
      )}
    </div>
  );
};

export default HomePage;
