import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SkillsSection = () => {
  const navigate = useNavigate();
  return (
    <section
      id="skills"
      className="sm:h-screen mx-auto max-w-7xl snap-start flex flex-col items-center justify-between gap-10 px-4 pt-20 pb-8 sm:px-6 lg:px-8 lg:pt-32"
    >
      <div>
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
      <div className="z-50">
        <button
          onClick={() => navigate('/my-portfolio/projects')}
          className="inline-flex items-center px-8 py-3 rounded-lg bg-[rgba(255,220,25,1)] text-black hover:bg-yellow-300 transition-all shadow-md hover:shadow-lg"
        >
          View Projects
          <ExternalLink className="ml-2 h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default SkillsSection;
