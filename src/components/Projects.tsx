/* src/components/Projects.tsx */
import {useTheme} from '../contexts/ThemeContext';
import {Github, ExternalLink, GithubIcon} from 'lucide-react';

<div className="project-card p-4">
  <h3 className="text-xl font-bold mb-2">Project Title</h3>
  <p className="text-slate-light">Description of the project.</p>
  <div className="flex items-center gap-2 mt-4">
    <a href="#" className="btn-primary">Live Demo</a>
    <a href="#" className="btn-primary">GitHub</a>
  </div>
</div>

export default function Projects() {
  const {darkMode} = useTheme();
  const cardClasses = darkMode ? 'bg-[#112240]' : 'bg-white';

  return (
      <section id="projects" className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Assistant */}
            <div className={`rounded-lg overflow-hidden shadow-lg ${cardClasses}`}>
              <div className="h-48 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1542831371-d531d36971e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="AI Assistant"
                    className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">AI Assistant</h3>
                <p className="mb-4">
                  An intelligent chatbot powered by advanced AI technology
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'TypeScript', 'AI', 'Node.js'].map((tag) => (
                      <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-sm bg-teal-500/10 text-teal-400"
                      >
                    {tag}
                  </span>
                  ))}
                </div>

                {/* Icon Links for Live Demo & GitHub */}
                <div className="flex gap-4">
                  {/* Live Demo Icon */}
                  <a
                      href="https://alexaiassistant.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
                      aria-label="AI Assistant Live Demo"
                  >
                    <ExternalLink size={20}/>
                    <span>Live Demo</span>
                  </a>
                  {/* GitHub Icon */}
                  <a
                      href="https://github.com/AlexBuildsLTS/AiBotAssistent"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
                      aria-label="AI Assistant GitHub"
                  >
                    <GithubIcon size={20}/>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Growth Analytics */}
            <div className={`rounded-lg overflow-hidden shadow-lg ${cardClasses}`}>
              <div className="h-48 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                    alt="Growth Analytics"
                    className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Growth Analytics</h3>
                <p className="mb-4">
                  Data visualization and analytics platform
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'D3.js', 'Analytics', 'TypeScript'].map((tag) => (
                      <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-sm bg-teal-500/10 text-teal-400"
                      >
                    {tag}
                  </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                      href="https://growthdemo.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
                      aria-label="Growth Analytics Live Demo"
                  >
                    <ExternalLink size={20}/>
                    <span>Live Demo</span>
                  </a>
                  <a
                      href="https://github.com/AlexBuildsLTS/Growth-Analytics-demo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
                      aria-label="Growth Analytics GitHub"
                  >
                    <Github size={20}/>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* NorthMarket */}
            <div className={`rounded-lg overflow-hidden shadow-lg ${cardClasses}`}>
              <div className="h-48 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1472851294608-062f824d29cc"
                    alt="NorthMarket"
                    className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">NorthMarket</h3>
                <p className="mb-4">
                  Modern e-commerce marketplace platform
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'Node.js', 'E-commerce', 'TypeScript'].map((tag) => (
                      <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-sm bg-teal-500/10 text-teal-400"
                      >
                    {tag}
                  </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                      href="https://northmarkup.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
                      aria-label="NorthMarket Live Demo"
                  >
                    <ExternalLink size={20}/>
                    <span>Live Demo</span>
                  </a>
                  <a
                      href="https://github.com/AlexBuildsLTS/NorthMarket-Frontend"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
                      aria-label="NorthMarket GitHub"
                  >
                    <Github size={20}/>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* FastFood */}
            <div className={`rounded-lg overflow-hidden shadow-lg ${cardClasses}`}>
              <div className="h-48 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5"
                    alt="FastFood"
                    className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">FastFood</h3>
                <p className="mb-4">
                  Restaurant ordering and delivery platform
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'Node.js', 'Food Delivery', 'TypeScript'].map((tag) => (
                      <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-sm bg-teal-500/10 text-teal-400"
                      >
                    {tag}
                  </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                      href="https://guileless-mousse-13cecc.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
                      aria-label="FastFood Live Demo"
                  >
                    <ExternalLink size={20}/>
                    <span>Live Demo</span>
                  </a>
                  <a
                      href="https://github.com/AlexBuildsLTS/FastFoodWS-g51"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
                      aria-label="FastFood GitHub"
                  >
                    <Github size={20}/>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
  );
}
