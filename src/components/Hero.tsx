export default function Hero() {
  return (
    <section className="flex items-center min-h-screen">
      <div className="max-w-4xl animate-slide-up">
        <h1 className="text-[var(--green)] mb-4">Hi, my name is</h1>
        <h2 className="mb-4 text-4xl font-bold md:text-6xl">Alex Youssef.</h2>
        <h3 className="text-3xl md:text-5xl font-bold text-[var(--slate)] mb-6">
          I build things for the web.
        </h3>
        <p className="text-lg text-[var(--slate)] max-w-xl mb-8">
          I'm a Java Fullstack Developer specializing in building exceptional digital experiences.
          Currently focused on building accessible, human-centered products. My recent work includes 
          developing a marketplace app, a growth analytics tool, and an online bookstore platform.
        </p>
        <a href="#projects" className="btn-primary">Check out my work</a>
      </div>
    </section>
  );
}
