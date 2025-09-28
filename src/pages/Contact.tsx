import { useEffect } from 'react';
import anime from 'animejs';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { use3DTilt } from '@/hooks/use-3d-tilt';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollingText from '@/components/ScrollingText';

const contactInfo = [
  {
    icon: MessageCircle, 
    title: "Instagram",
    details: ["@your_instagram_handle"],
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["(555) 123-4567", "Emergency: (555) 987-6543"],
    color: "from-green-500 to-green-600"
  },
  {
    icon: Mail,
    title: "Email",
    details: ["doctor@example.com", "appointments@example.com"],
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Clock,
    title: "Consultations",
    details: ["Online consultations available"],
    color: "from-orange-500 to-orange-600"
  }
];

const Contact = () => {
  const [titleRef, isTitleVisible] = useIntersectionObserver<HTMLHeadingElement>({ threshold: 0.1 });
  const [contactGridRef, areContactsVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [formRef, isFormVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [ctaRef, isCtaVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  useEffect(() => {
    anime({
      targets: titleRef.current,
      translateY: isTitleVisible ? [100, 0] : [0, 100],
      opacity: isTitleVisible ? [0, 1] : [1, 0],
      duration: 1000,
      easing: 'easeOutExpo',
    });
  }, [isTitleVisible]);

  useEffect(() => {
    anime({
      targets: contactGridRef.current?.children,
      translateY: areContactsVisible ? [80, 0] : [0, 80],
      opacity: areContactsVisible ? [0, 1] : [1, 0],
      rotateY: areContactsVisible ? [45, 0] : [0, 45],
      duration: 800,
      delay: anime.stagger(150),
      easing: 'easeOutExpo',
    });
  }, [areContactsVisible]);

  useEffect(() => {
    anime({
      targets: formRef.current,
      translateX: isFormVisible ? [-100, 0] : [0, -100],
      opacity: isFormVisible ? [0, 1] : [1, 0],
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, [isFormVisible]);

  useEffect(() => {
    anime({
      targets: ctaRef.current,
      scale: isCtaVisible ? [0.8, 1] : [1, 0.8],
      opacity: isCtaVisible ? [0, 1] : [1, 0],
      duration: 600,
      easing: 'easeOutExpo',
    });
  }, [isCtaVisible]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 py-20 px-6">
      <section className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 
            ref={titleRef}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 opacity-0"
          >
            Get in Touch
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-primary via-primary-light to-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to begin your journey toward mental wellness? I'm here to support you 
            with compassionate, professional psychiatric care.
          </p>
        </div>

        {/* Contact Information Grid */}
        <div ref={contactGridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            const cardRef = use3DTilt({ maxTilt: 4, scale: 1.05 });
            
            return (
              <div
                key={index}
                ref={cardRef as any}
                className="bg-card/90 backdrop-blur-sm border border-border rounded-3xl p-8 shadow-primary transition-all duration-500 group opacity-0 relative overflow-hidden"
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-light/20 group-hover:from-primary/30 group-hover:to-primary-light/30 transition-all duration-300 mb-6 group-hover:scale-110">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {info.title}
                  </h3>
                  
                  <div className="space-y-2">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form Section */}
        <div className="mb-20 slide-in-from-left">
          {/* Contact Form */}
          <div 
            ref={formRef}
            className="bg-card/90 backdrop-blur-sm border border-border rounded-3xl p-8 md:p-12 shadow-primary opacity-0"
          >
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-8">
              Send a Message
            </h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select a subject</option>
                  <option value="new-patient">New Patient Inquiry</option>
                  <option value="appointment">Schedule Appointment</option>
                  <option value="consultation">Consultation Request</option>
                  <option value="insurance">Insurance Questions</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Please describe how I can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary-light text-primary-foreground px-8 py-4 rounded-xl font-medium text-lg shadow-medium hover:shadow-strong transition-all duration-300 transform hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* Quick Contact CTA */}
        <div 
          ref={ctaRef}
          className="text-center bg-gradient-to-br from-primary/10 to-primary-light/5 border border-primary/20 rounded-3xl p-12 shadow-strong opacity-0"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
            Ready to Schedule Your Appointment?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take the first step toward better mental health. Click below to start a conversation 
            via WhatsApp and schedule your consultation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => {
                const phoneNumber = "[Doctor's Phone Number]";
                const message = encodeURIComponent("Hello Dr. [Name], I would like to schedule an appointment for a consultation.");
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-medium hover:shadow-strong transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              Book via WhatsApp
            </button>
            
            <p className="text-muted-foreground">or call (555) 123-4567</p>
          </div>
        </div>
      </section>

      <WhatsAppButton />

      <ScrollingText words={['Support', 'Guidance', 'Confidentiality']} className="top-1/4" />
      <ScrollingText words={['Reach Out', 'Connect', 'Schedule']} className="top-1/2" direction="right" />
      <ScrollingText words={['Wellness', 'Journey', 'Begin']} className="top-3/4" />
    </main>
  );
};

export default Contact;