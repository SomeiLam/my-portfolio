import { ExternalLink, Github, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import amyImage from '../../assets/amy.jpeg'; // Ensure the image path is correct

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="sm:min-h-screen sm:snap-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      style={{ paddingTop: '15vh', paddingBottom: '15vh' }}
    >
      <div className="flex flex-col items-center text-center h-full z-10 relative">
        <div className="relative w-max">
          <svg viewBox="0 0 800 640" className="w-72 h-72 sm:w-96 sm:h-96">
            {/* Circular Path for the Image */}
            <clipPath id="circleClip">
              <circle cx="400" cy="300" r="280" />
            </clipPath>
            <image
              href={amyImage}
              className="rounded-full"
              x="120"
              y="20"
              width="560"
              height="560"
              style={{ clipPath: 'url(#circleClip)' }}
            />

            {/* Path for the Curved Text (A Little Higher Still) */}
            <path
              id="curve"
              d="M 200 105 A 280 290 0 0 1 600 105"
              fill="none"
              stroke="none"
            />

            {/* Curved Text */}
            <text
              className="text-6xl font-bold"
              style={{ textAnchor: 'middle', fill: 'white' }}
            >
              <textPath xlinkHref="#curve" startOffset="50%">
                SO MEI LAM AMY
              </textPath>
            </text>
          </svg>
        </div>

        <h1 className="title-text text-2xl sm:text-5xl font-bold">
          Frontend & Full Stack Developer
        </h1>
        <p className="mt-6 text-sm sm:text-lg leading-8 text-gray-500 max-w-5xl mx-auto">
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
              className="p-3 rounded-full hover:bg-[rgba(255,220,25,0.4)] transition group"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-6 w-6 text-gray-400 group-hover:text-gray-50" />{' '}
              {/* Added 'group-hover' class */}
            </a>
            <a
              href="https://www.linkedin.com/in/someilam/"
              className="p-3 rounded-full hover:bg-[rgba(255,220,25,0.4)] transition group"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-6 w-6 text-gray-400 group-hover:text-gray-50" />{' '}
              {/* Added 'group-hover' class */}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
