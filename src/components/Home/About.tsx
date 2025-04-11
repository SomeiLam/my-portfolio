// import { useInViewObserver } from '../../hooks/useInViewObserver';
import { motion } from 'framer-motion';

const AboutSection = () => {
  // const { ref, inView } = useInViewObserver();

  return (
    <motion.section
      id="about"
      // ref={ref}
      // className={`sm:h-screen sm:snap-start flex flex-col items-center mx-auto max-w-3xl justify-center py-16 px-4 sm:px-6 lg:px-8 transition-opacity duration-700 ease-in-out ${
      //   inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      // }`}
      className="flex flex-col items-center mx-auto max-w-3xl justify-center px-4 sm:px-6 lg:px-8 z-10 relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl text-center mb-8 text-slate-700">About Me</h2>
      <p className="px-5 text-sm leading-6 sm:text-lg sm:leading-8 text-slate-700 text-center">
        I’m a full-stack developer with a passion for crafting responsive,
        engaging interfaces using React, and building reliable, robust backends
        with Node.js. I strive to write clean, thoughtful code while embracing
        agile practices and continuous integration, ensuring that every solution
        adapts seamlessly to diverse needs. I also enjoy exploring AI and
        machine learning tools—always looking for subtle ways to enhance user
        experiences and efficiency. With a curious mind and a commitment to
        learning, I see every project as a chance to grow and contribute in
        meaningful, innovative ways.
      </p>
    </motion.section>
  );
};

export default AboutSection;
