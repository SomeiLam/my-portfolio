import { ExternalLink, Github, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import amyImage from '../../assets/amy.jpeg'; // Ensure the image path is correct

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="h-screen snap-start max-w-7xl flex flex-col items-center mx-auto text-center px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32"
    >
      <img
        src={amyImage}
        alt="Amy Lam"
        draggable="false"
        className="w-40 h-40 sm:w-64 sm:h-64 rounded-full mx-auto mb-6 shadow-lg"
      />
      <h1 className="title-text text-2xl sm:text-6xl font-bold">
        Frontend & Full Stack Developer
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-200 max-w-5xl mx-auto">
        Passionate developer crafting exceptional digital experiences with
        React, TypeScript, and Node.js.
      </p>
      <div className="mt-8 flex gap-4 justify-center">
        <button
          onClick={() => navigate('/my-portfolio/projects')}
          className="inline-flex items-center px-8 py-3 rounded-lg bg-[rgba(255,220,25,0.7)] text-black hover:bg-yellow-300 transition-all shadow-md hover:shadow-lg"
        >
          View Projects
          <ExternalLink className="ml-2 h-5 w-5" />
        </button>
        <div className="flex gap-2">
          <a
            href="https://github.com/SomeiLam"
            className="p-3 rounded-full hover:bg-[rgba(255,220,25,0.2)] transition"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="h-6 w-6 text-gray-200" />
          </a>
          <a
            href="https://www.linkedin.com/in/someilam/"
            className="p-3 rounded-full hover:bg-[rgba(255,220,25,0.2)] transition"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="h-6 w-6 text-gray-200" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
