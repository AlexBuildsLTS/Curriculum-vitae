export default function Hero() {
  return (
    <section className="flex items-center min-h-screen px-6 bg-navy-primary text-slate-lightest sm:px-12">
      <div className="max-w-4xl mx-auto animate-slide-up">
        <h1 className="mb-4 text-2xl font-bold text-green sm:text-4xl">
          Hi, my name is
        </h1>
        <h2 className="mb-4 text-3xl font-bold sm:text-6xl">
          Alex Youssef.
        </h2>
        <h3 className="mb-6 text-xl font-bold sm:text-5xl text-slate-light">
          I build things for the web.
        </h3>
        <p className="max-w-xl mb-8 text-base sm:text-lg text-slate-light">
          I'm a Java Fullstack Developer specializing in building exceptional digital experiences.
          Currently focused on building accessible, human-centered products. My recent work includes 
          developing a marketplace app, a growth analytics tool, and an online bookstore platform.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <a href="#projects" className="w-full mb-4 btn-primary sm:w-auto sm:mb-0">
            Check out my work
          </a>
        </div>
      </div>
    </section>
  );
}
