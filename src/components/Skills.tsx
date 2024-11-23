import { useState, useEffect } from 'react';

interface Skill {
  name: string;
  level: number;
  category: string;
}

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);

  const skills: Skill[] = [
    { name: 'Java', level: 85, category: 'Languages' },
    { name: 'Spring Boot', level: 70, category: 'Backend' },
    { name: 'JavaScript', level: 50, category: 'Languages' },
    { name: 'React', level: 30, category: 'Frontend' },
    { name: 'HTML/CSS', level: 70, category: 'Frontend' },
    { name: 'SQL', level: 50, category: 'Database' },
    { name: 'Git & GitHub', level: 80, category: 'Tools' },
    { name: 'RESTful APIs', level: 60, category: 'Backend' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('skills-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <section id="skills" className="py-24">
      <h2 className="section-heading">Skills</h2>
      <div id="skills-section" className="grid md:grid-cols-2 gap-12">
        {categories.map((category) => (
          <div key={category} className="space-y-6">
            <h3 className="text-xl font-semibold text-[var(--green)] mb-4">{category}</h3>
            {skills
              .filter(skill => skill.category === category)
              .map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--light-slate)]">{skill.name}</span>
                    <span className="text-[var(--green)]">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transition: `width 1s ease-out ${Math.random() * 0.5}s`
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}