import { Github, Linkedin, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
      }}
    >
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="title-text sm:text-7xl">
            Frontend & Full Stack Developer
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-200 max-w-3xl mx-auto">
            Passionate developer crafting exceptional digital experiences with
            React, TypeScript, and Node.js.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={() => navigate('/my-portfolio/projects')}
              className="inline-flex items-center px-8 py-3 rounded-lg bg-yellow-500 text-black hover:bg-yellow-600 transition-all shadow-md hover:shadow-lg"
            >
              View Projects
              <ExternalLink className="ml-2 h-5 w-5" />
            </button>
            <div className="flex gap-2">
              <a
                href="https://github.com/SomeiLam"
                className="p-3 rounded-full hover:bg-gray-500 transition"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-6 w-6 text-gray-200" />
              </a>
              <a
                href="https://www.linkedin.com/in/someilam/"
                className="p-3 rounded-full hover:bg-gray-500 transition"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-6 w-6 text-gray-200" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            About Me
          </h2>
          <p className="text-lg leading-8 text-gray-700">
            I’m a full-stack developer with a passion for crafting responsive,
            engaging interfaces using React, and building reliable, robust
            backends with Node.js. I strive to write clean, thoughtful code
            while embracing agile practices and continuous integration, ensuring
            that every solution adapts seamlessly to diverse needs. I also enjoy
            exploring AI and machine learning tools—always looking for subtle
            ways to enhance user experiences and efficiency. With a curious mind
            and a commitment to learning, I see every project as a chance to
            grow and contribute in meaningful, innovative ways.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-700">
            Technical Expertise
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Frontend Development',
                skills: [
                  'React',
                  'TypeScript',
                  'Next.js',
                  'Redux',
                  'Tailwind CSS',
                  'Jest',
                  'Cypress',
                  'Storybook',
                  'HTML',
                  'CSS',
                ],
              },
              {
                title: 'Backend Development',
                skills: [
                  'Node.js',
                  'Express',
                  'MongoDB',
                  'REST APIs',
                  'Firebase',
                  'Supabase',
                  'PostgreSQL',
                  'Wasp',
                ],
              },
              {
                title: 'Additional Skills',
                skills: ['Python', 'React Native', 'Flutter', 'Git'],
              },
            ].map((section) => (
              <div
                key={section.title}
                className="backdrop-blur-lg backdrop-saturate-[180%] bg-black/25  border border-white/10  filter drop-shadow-[0_30px_10px_rgba(0,0,0,0.125)] rounded-2xl p-8 shadow-lg hover:scale-105 transition-transform"
              >
                <h3 className="text-xl font-semibold mb-6 text-gray-200">
                  {section.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {section.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-sm backdrop-blur-lg backdrop-saturate-[120%] text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
