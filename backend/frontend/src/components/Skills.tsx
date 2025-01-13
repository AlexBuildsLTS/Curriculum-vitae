// src/components/Skills.tsx
import {useEffect, useState} from "react";

interface Skill {
  name: string;
  level: number; // 0 to 100
  category: string;
}

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);

  const skills: Skill[] = [
    { name: "Java", level: 90, category: "Languages" },
    { name: "JavaScript", level: 80, category: "Languages" },
    { name: "TypeScript", level: 70, category: "Languages" },
    { name: "AI Development", level: 65, category: "Languages" },
    { name: "Spring Boot", level: 70, category: "Backend" },
    { name: "RESTful APIs", level: 60, category: "Backend" },
    { name: "SQL", level: 70, category: "Database" },
    { name: "React", level: 60, category: "Frontend" },
    { name: "HTML/CSS", level: 75, category: "Frontend" },
    { name: "Git & GitHub", level: 80, category: "Tools" },
    { name: "VMware Workstation Pro", level: 90, category: "Tools" },
    { name: "Ubuntu/Linux", level: 85, category: "Operating Systems" },
    { name: "Kali Linux", level: 60, category: "Operating Systems" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
    );
    const element = document.getElementById("skills-section");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getSkillColor = (level: number) => {
    const hue = (level * 120) / 100;
    return `hsl(${hue}, 100%, 50%)`;
  };

  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
      <section id="skills" className="py-24">
        <h2 className="section-heading">Skills</h2>
        <div id="skills-section" className="grid gap-12 md:grid-cols-2">
          {categories.map((category) => (
              <div key={category} className="space-y-6">
                <h3 className="mb-4 text-xl font-semibold text-green">{category}</h3>
                {skills
                    .filter((skill) => skill.category === category)
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
                                  width: isVisible ? `${skill.level}%` : "0%",
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
