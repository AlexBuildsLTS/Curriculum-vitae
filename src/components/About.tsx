// About.tsx

import * as Icons from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24">
      <h2 className="section-heading">About Me</h2>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <p className="text-lg">
            Hello! I'm Alex Youssef, a dedicated Java Fullstack Developer currently studying at Lexicon. My passion for Java Fullstack development stems from the opportunity to work seamlessly across both front-end and back-end technologies, allowing me to gain a comprehensive understanding of the entire software development lifecycle.
          </p>
          <p className="text-lg">
            During my time at Lexicon, I developed a web application that streamlined user interactions, reinforcing my desire to create impactful solutions. With each passing week, my enthusiasm for this field grows, solidifying my confidence that Java Fullstack development is the career path I am committed to for the long term.
          </p>
          <p className="text-lg">
            Looking ahead, I aspire to build my own projects, embracing the endless opportunities in this field and finding immense satisfaction in crafting solutions that are uniquely my own. I am eager to leverage my skills in Java, Spring Boot, React, and database management to contribute to innovative projects and advance my career in a forward-thinking organization.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="flex items-center gap-3 text-green">
              <Icons.Code2 size={20} />
              <span>Frontend Dev</span>
            </div>
            <div className="flex items-center gap-3 text-green">
              <Icons.Database size={20} />
              <span>Backend Dev</span>
            </div>
            <div className="flex items-center gap-3 text-green">
              <Icons.Layout size={20} />
              <span>UI/UX Design</span>
            </div>
          </div>
        </div>
        {/* Adjusted Image Section */}
        <div className="relative group">
          <div className="relative z-10">
            <img
              src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
              alt="Developer workspace"
              className="w-full h-auto max-w-2xl mx-auto transition-all duration-300 rounded-lg grayscale hover:grayscale-0"
            />
          </div>
          <div className="absolute inset-0 transition-transform duration-300 transform -translate-x-6 -translate-y-6 border-2 rounded-lg -z-10 border-green group-hover:-translate-x-4 group-hover:-translate-y-4"></div>
        </div>
      </div>
    </section>
  );
}
