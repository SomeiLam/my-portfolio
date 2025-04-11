import { ExternalLink, Github, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import amyImage from '../../assets/amy.jpeg';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      id="hero"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[5vh] pb-[15vh] transition-opacity duration-700 ease-in-out"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col lg:flex-row lg:mt-40 items-center text-center h-full z-10 relative">
        <div className="relative w-max">
          <svg
            viewBox="0 0 800 640"
            className="w-96 h-96 lg:w-[500px] lg:h-[500px]"
          >
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
        <div className="max-w-2xl lg:text-start text-center z-20 mt-[-50px]">
          <h1 className="text-2xl lg:text-3xl">
            Hello, I am Amy,
            <p className="title-text font-bold py-2">
              Frontend-focused Full Stack Developer
            </p>{' '}
            based in San Francisco Bay Area
          </h1>

          <p className="mt-6 text-sm sm:text-lg leading-8 text-slate-700">
            I am a passionate developer with over 3 years hands-on experience
            building exceptional digital experiences with React, TypeScript, and
            Node.js.
          </p>
          <div className="mt-8 flex gap-4 justify-center lg:justify-start">
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
                className="p-3 rounded-full hover:bg-[rgba(255,220,25,0.4)] hover:shadow-lg transition group"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-6 w-6 text-slate-600 group-hover:text-slate-700 group-hover:shadow-lg" />{' '}
                {/* Added 'group-hover' class */}
              </a>
              <a
                href="https://www.linkedin.com/in/someilam/"
                className="p-3 rounded-full hover:bg-[rgba(255,220,25,0.4)] hover:shadow-lg transition group"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-6 w-6 text-slate-600 group-hover:text-slate-700 group-hover:shadow-lg" />{' '}
                {/* Added 'group-hover' class */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
