const AboutSection = () => {
  return (
    <section
      id="about"
      className="h-screen snap-start flex flex-col items-center mx-auto max-w-3xl justify-center py-16 px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-600">
        About Me
      </h2>
      <p className="px-5 text-sm leading-6 sm:text-lg sm:leading-8 text-gray-500">
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
    </section>
  );
};

export default AboutSection;
