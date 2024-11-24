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

  // Function to calculate the color based on the skill level
  const getSkillColor = (level: number) => {
    // Convert level to a value between 0 and 120 (hue range for red to green)
    const hue = (level * 120) / 100; // 0 (red) to 120 (green)
    return `hsl(${hue}, 100%, 50%)`;
  };

  return (
    <section id="skills" className="py-24">
      <h2 className="section-heading">Skills</h2>
      <div id="skills-section" className="grid gap-12 md:grid-cols-2">
        {categories.map((category) => (
          <div key={category} className="space-y-6">
            <h3 className="mb-4 text-xl font-semibold text-green">{category}</h3>
            {skills
              .filter(skill => skill.category === category)
              .map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-light-slate">{skill.name}</span>
                    <span className="text-green">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{
                        width: isVisible ? `${skill.level}%` : '0%',
                        backgroundColor: getSkillColor(skill.level),
                        transition: `width 1s ease-out ${Math.random() * 0.5}s`,
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
