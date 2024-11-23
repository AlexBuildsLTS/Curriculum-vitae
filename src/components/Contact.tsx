import * as Icons from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <h2 className="section-heading">Get In Touch</h2>
      <div className="max-w-2xl mx-auto text-center mb-12">
        <p className="text-lg text-[var(--slate)]">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </div>
      <form className="max-w-2xl mx-auto space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-[var(--light-slate)] mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              className="w-full bg-[var(--navy-light)] border border-[var(--navy-lightest)] rounded px-4 py-2 text-[var(--light-slate)] focus:outline-none focus:border-[var(--green)]"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-[var(--light-slate)] mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="w-full bg-[var(--navy-light)] border border-[var(--navy-lightest)] rounded px-4 py-2 text-[var(--light-slate)] focus:outline-none focus:border-[var(--green)]"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-[var(--light-slate)] mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="w-full bg-[var(--navy-light)] border border-[var(--navy-lightest)] rounded px-4 py-2 text-[var(--light-slate)] focus:outline-none focus:border-[var(--green)]"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-[var(--light-slate)] mb-2">Message</label>
          <textarea
            id="message"
            rows={5}
            className="w-full bg-[var(--navy-light)] border border-[var(--navy-lightest)] rounded px-4 py-2 text-[var(--light-slate)] focus:outline-none focus:border-[var(--green)]"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn-primary flex items-center gap-2 mx-auto">
          <Icons.Send size={18} />
          Send Message
        </button>
      </form>
    </section>
  );
}