// Projects.tsx

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
      title: 'Growth Analytics',
      description:
        'Frontend developed for a growth analytics tool, integrating data visualization features for business metrics.',
      image: 'https://www.mercy.edu/sites/default/files/2020-07/iStock-1150199386.jpg',
      technologies: ['React', 'TypeScript', 'Chart.js', 'Vite', 'Tailwind CSS'],
      githubUrl: 'https://github.com/AlexBuildsLTS/Growth-Analytics-demo',
      liveUrl: 'https://growthdemo.netlify.app/',
      progress: 78,
    },
    
    {
      title: 'Marketplace App',
      description:
        'A comprehensive marketplace application with robust backend and intuitive frontend, focusing on user experience and scalability.',
      image:
        'https://images.unsplash.com/photo-1549298916-f52d724204b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      technologies: ['Java', 'Spring Boot', 'React', 'SQL'],
      githubUrl: 'https://github.com/AlexBuildsLTS/marketplace-app',
      progress: 50,
    },
    {
      title: 'Online Bookstore',
      description:
        'Developed a full-stack e-commerce web application for an online bookstore. Implemented user authentication, product catalog, shopping cart, and order processing features.',
      image:
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      technologies: ['Java', 'Spring Boot', 'React', 'MySQL'],
      githubUrl: 'https://github.com/AlexBuildsLTS/online-bookstore',
      progress: 80,
    },
    {
      title: 'Connectify',
      description:
        'Created a social networking platform that allows users to create profiles, connect with friends, and share updates. The project focuses on scalability and real-time communication using WebSockets.',
      image:
        'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      technologies: ['Java', 'Spring Boot', 'React', 'WebSocket', 'MongoDB'],
      githubUrl: 'https://github.com/AlexBuildsLTS/connectify',
      progress: 70,
    },
  ];

  // Function to calculate the color based on the progress percentage
  const getProgressColor = (progress: number) => {
    // Map progress (0-100) to hue (0-120), where 0 is red and 120 is green
    const hue = (progress * 120) / 100;
    return `hsl(${hue}, 100%, 50%)`;
  };

  return (
    <section id="projects" className="py-24">
      <h2 className="section-heading">Featured Projects</h2>
      <div className="space-y-24">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`flex flex-col ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } gap-8 items-center`}
          >
            {/* Project Image */}
            <div className="relative flex-1">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-64 rounded-lg"
              />
            </div>
            {/* Project Details */}
            <div className="flex-1 space-y-4">
              {/* Project Title and Icons */}
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-lightest">
                  {project.title}
                </h3>
                <div className="flex gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View GitHub Repository"
                    className="text-green hover:text-slate-lightest"
                  >
                    <Icons.Github size={24} />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Live Demo"
                      className="text-green hover:text-slate-lightest"
                    >
                      <Icons.ExternalLink size={24} />
                    </a>
                  )}
                </div>
              </div>
              {/* Project Description */}
              <p className="text-slate">{project.description}</p>
              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm border rounded text-green border-green"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-light">Progress</span>
                  <span className="text-green">{project.progress}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: getProgressColor(project.progress),
                    }}
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
