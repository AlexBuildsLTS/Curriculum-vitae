export default function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="max-w-4xl animate-slide-up">
        <h1 className="text-[var(--green)] mb-4">Hi, my name is</h1>
        <h2 className="text-4xl md:text-6xl font-bold mb-4">Alex Youssef.</h2>
        <h3 className="text-3xl md:text-5xl font-bold text-[var(--slate)] mb-6">
          I build things for the web.
        </h3>
        <p className="text-lg text-[var(--slate)] max-w-xl mb-8">
          I'm a Java Fullstack Developer specializing in building exceptional digital experiences.
          Currently focused on building accessible, human-centered products.
        </p>
        <a href="#projects" className="btn-primary">Check out my work</a>
      </div>
    </section>
  );
}