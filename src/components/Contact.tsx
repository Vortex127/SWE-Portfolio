
import { personalInfo } from "@/lib/data";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-6">Get In Touch</h2>
          <div className="h-1 w-12 bg-accent rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <p className="text-white/80 mb-8 leading-relaxed">
              Interested in working together? Have a question about one of my projects? 
              Feel free to reach out and I'll get back to you as soon as possible.
            </p>
            
            <div className="mb-6">
              <p className="text-white/60 mb-1">Email</p>
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="text-accent hover:text-accent/80 transition-colors"
              >
                {personalInfo.email}
              </a>
            </div>
            
            <div className="mb-8">
              <p className="text-white/60 mb-1">Location</p>
              <p className="text-white">{personalInfo.location}</p>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.657 21.128 10.438 21.878V18.89C7.055 18.297 6.552 16.586 6.462 16.035C6.342 15.322 6.124 14.916 5.787 14.614C5.28 14.23 5.243 14.228 5.232 14.228C5.17 14.202 5.111 14.166 5.058 14.123C5.003 14.079 4.955 14.027 4.917 13.969C4.875 13.9 4.846 13.825 4.83 13.746C4.814 13.667 4.812 13.586 4.824 13.507C4.891 13.203 5.164 13 5.546 13C6.161 13.003 6.792 13.29 7.219 13.785C7.446 14.048 7.618 14.367 7.93 14.89C8.211 15.368 8.778 15.897 10.117 15.87C10.146 15.869 10.642 15.866 11.136 15.783C11.447 14.964 12.014 14.296 12.697 13.936C9.382 13.423 7.379 12.133 6.547 10.137C5.725 8.144 5.777 5.7 6.681 3.97C6.682 3.968 6.683 3.965 6.684 3.962C6.945 3.427 7.388 2.553 8.14 1.708C8.237 1.628 8.356 1.579 8.482 1.568C8.608 1.557 8.733 1.585 8.843 1.647C10.177 2.364 11.633 2.825 13.127 3.001C14.622 2.825 16.079 2.364 17.414 1.647C17.523 1.585 17.649 1.556 17.775 1.567C17.901 1.578 18.021 1.628 18.117 1.708C18.871 2.555 19.311 3.44 19.575 3.983C20.428 5.738 20.453 8.177 19.614 10.137C18.775 12.097 16.821 13.43 13.587 13.926C14.48 14.394 15 15.96 15 16.969V21.878C19.781 21.128 22.438 16.991 22.438 12C22.438 6.477 17.961 2 12.438 2H12Z" 
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" 
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white/70 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 text-white"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white/70 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 text-white"
                  placeholder="Your email address"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white/70 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 text-white resize-none"
                  placeholder="Your message"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/80 text-white py-4 px-8 rounded-lg font-medium transition-colors duration-300 disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
