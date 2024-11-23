import * as Icons from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  progress: number;
}

export default function Projects() {
  const projects: Project[] = [
    {
      title: "Marketplace App",
      description:
        "A comprehensive marketplace application with robust backend and intuitive frontend, focusing on user experience and scalability.",
      image:
        "https://images.unsplash.com/photo-1549298916-f52d724204b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["Java", "Spring Boot", "React", "SQL"],
      githubUrl: "https://github.com/AlexBuildsLTS/marketplace-app",
      progress: 50,
    },
    {
      title: "Growth Analytics",
      description:
        "Frontend developed for a growth analytics tool, integrating data visualization features for business metrics.",
      image:
        "https://images.unsplash.com/photo-1580894742410-241c7a627d63?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Chart.js", "HTML/CSS"],
      githubUrl: "https://github.com/AlexBuildsLTS/growth-project",
      progress: 60,
    },
    {
      title: "Online Bookstore",
      description:
        "Developed a full-stack e-commerce web application for an online bookstore. Implemented user authentication, product catalog, shopping cart, and order processing features.",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["Java", "Spring Boot", "React", "MySQL"],
      githubUrl: "https://github.com/AlexBuildsLTS/online-bookstore",
      progress: 80,
    },
    {
      title: "Connectify",
      description:
        "Created a social networking platform that allows users to create profiles, connect with friends, and share updates. The project focuses on scalability and real-time communication using WebSockets.",
      image:
        "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["Java", "Spring Boot", "React", "WebSocket", "MongoDB"],
      githubUrl: "https://github.com/AlexBuildsLTS/connectify",
      progress: 70,
    },
  ];

  return (
    <section id="projects" className="px-6 py-24 lg:px-0">
      <h2 className="section-heading">Featured Projects</h2>
      <div className="space-y-24">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`flex flex-col ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } gap-8 items-center`}
          >
            <div className="relative flex-1 w-full group">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full rounded-lg aspect-video"
              />
              <div className="absolute inset-0 bg-[var(--navy-primary)]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--green)] hover:text-[var(--lightest-slate)]"
                  >
                    <Icons.Github size={24} />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--green)] hover:text-[var(--lightest-slate)]"
                    >
                      <Icons.ExternalLink size={24} />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1 w-full space-y-4">
              <h3 className="text-2xl font-bold text-[var(--lightest-slate)]">
                {project.title}
              </h3>
              <p className="text-[var(--slate)]">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm text-[var(--green)] border border-[var(--green)] rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[var(--light-slate)]">Progress</span>
                  <span className="text-[var(--green)]">
                    {project.progress}%
                  </span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
