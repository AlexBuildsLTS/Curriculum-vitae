export default function Hero() {
  return (
    <section className="flex items-center min-h-screen bg-navy-primary text-slate-lightest">
      <div className="max-w-4xl animate-slide-up">
        <h1 className="mb-4 text-4xl font-bold text-green">Hi, my name is</h1>
        <h2 className="mb-4 text-4xl font-bold md:text-6xl">Alex Youssef.</h2>
        <h3 className="mb-6 text-3xl font-bold md:text-5xl text-slate-light">
          I build things for the web.
        </h3>
        <p className="max-w-xl mb-8 text-lg text-slate-light">
          I'm a Java Fullstack Developer specializing in building exceptional digital experiences.
          Currently focused on building accessible, human-centered products. My recent work includes 
          developing a marketplace app, a growth analytics tool, and an online bookstore platform.
        </p>
        <a href="#projects" className="btn-primary">Check out my work</a>
      </div>
      <div className="ml-8 animate-fade-in">
        <p className="text-lg text-slate-light">
          Welcome to my portfolio! Here, you'll find my projects, skills, and experience as a Java Fullstack Developer.
        </p>
      </div>
    </section>
  );
}
