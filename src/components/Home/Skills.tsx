import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { useInViewObserver } from '../../hooks/useInViewObserver';

const SkillsSection = () => {
  const navigate = useNavigate();
  // const { ref, inView } = useInViewObserver();

  return (
    <section
      id="skills"
      // ref={ref}
      // className={`sm:h-screen mx-auto max-w-7xl snap-start flex flex-col items-center justify-between gap-10 px-4 pt-20 pb-8 sm:px-6 lg:px-8 lg:pt-32 transition-opacity duration-700 ease-in-out ${
      //   inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      // }`}
      className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-10 pb-20 px-4 pt-20 sm:px-6 lg:px-8 lg:pt-32 transition-opacity duration-700 ease-in-out z-10 relative"
    >
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-3xl text-center mb-16 text-slate-700">
          Technical Expertise
        </h2>
        <div className="flex flex-col gap-8">
          {[
            {
              title: 'Frontend Development',
              skills: [
                'React',
                'TypeScript',
                'Next.js',
                'Context API',
                'Redux',
                'Tailwind CSS',
                'Jest',
                'Cypress',
                'Storybook',
                'HTML',
                'CSS',
                'Responsive Design',
              ],
            },
            {
              title: 'Backend Development',
              skills: [
                'Node.js',
                'Express',
                'Prisma',
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
              skills: [
                'Generative AI',
                'Python',
                'React Native',
                'Flutter',
                'Git',
              ],
            },
          ].map((section, index) => (
            <div
              className={`w-3/5 mx-auto flex justify-center items-center gap-8 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}
              key={section.title}
            >
              <h2
                className={`text-2xl mb-6 text-slate-900 text-center ${index % 2 === 0 ? 'text-start' : 'text-end'}`}
              >
                {section.title}
              </h2>
              <div className="col-span-2 bg-black/10 border border-white/10 rounded-3xl p-8 shadow-lg hover:scale-105 transform transition duration-1000">
                <div className="flex flex-wrap gap-3">
                  {section.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-5 py-2 rounded-full bg-black/15 text-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="">
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
