import * as Icons from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24">
      <h2 className="section-heading">About Me</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <p className="text-lg">
            Hello! I'm Alex Youssef, a dedicated Java Fullstack Developer currently studying at Lexicon. My passion lies in creating robust and scalable web applications that deliver exceptional user experiences.
          </p>
          <p className="text-lg">
            With a strong foundation in both frontend and backend technologies, I specialize in building comprehensive solutions that bridge the gap between user needs and technical implementation.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="flex items-center gap-3 text-[var(--green)]">
              <Icons.Code2 size={20} />
              <span>Frontend Dev</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--green)]">
              <Icons.Database size={20} />
              <span>Backend Dev</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--green)]">
              <Icons.Layout size={20} />
              <span>UI/UX Design</span>
            </div>
          </div>
        </div>
        <div className="relative group">
          <div className="relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Developer workspace"
              className="rounded-lg grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="absolute inset-0 border-2 border-[var(--green)] rounded-lg transform translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
        </div>
      </div>
    </section>
  );
}