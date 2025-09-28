import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import doctorImage from '@/assets/doctor-headshot.jpg';
import { use3DTilt } from '@/hooks/use-3d-tilt';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import FloatingCube from '@/components/3D/FloatingCube';
import ScrollingText from '@/components/ScrollingText';

const Home = () => {
  const [titleRef, isTitleVisible] = useIntersectionObserver<HTMLHeadingElement>({ threshold: 0.1 });
  const [subtitleRef, isSubtitleVisible] = useIntersectionObserver<HTMLParagraphElement>({ threshold: 0.1 });
  const [statsRef, isStatsVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const imageContainerRef = use3DTilt({ maxTilt: 4, scale: 1.02 });
  const ctaButtonRef = use3DTilt({ maxTilt: 3, scale: 1.05 });

  useEffect(() => {
    anime({
      targets: titleRef.current,
      translateY: isTitleVisible ? [50, 0] : [0, 50],
      opacity: isTitleVisible ? [0, 1] : [1, 0],
      duration: 1000,
      easing: 'easeOutExpo',
    });
  }, [isTitleVisible]);

  useEffect(() => {
    anime({
      targets: subtitleRef.current,
      translateY: isSubtitleVisible ? [30, 0] : [0, 30],
      opacity: isSubtitleVisible ? [0, 1] : [1, 0],
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, [isSubtitleVisible]);

  useEffect(() => {
    anime({
      targets: statsRef.current?.children,
      translateY: isStatsVisible ? [40, 0] : [0, 40],
      opacity: isStatsVisible ? [0, 1] : [1, 0],
      duration: 600,
      delay: anime.stagger(200),
      easing: 'easeOutExpo',
    });
  }, [isStatsVisible]);

  useEffect(() => {
    // Floating animation for image
    anime({
      targets: imageContainerRef.current,
      translateY: [-10, 10],
      duration: 3000,
      direction: 'alternate',
      easing: 'easeInOutSine',
      loop: true,
    });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20 flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute top-20 right-20 opacity-30">
        <FloatingCube />
      </div>
      
      <div className="absolute bottom-20 left-20 opacity-20 hidden lg:block">
        <FloatingCube />
      </div>

      <ScrollingText words={['Trust', 'Patience', 'Guarantee']} className="top-1/4" />
      <ScrollingText words={['Compassion', 'Expertise', 'Clarity']} className="top-1/2" direction="right" />
      <ScrollingText words={['Resilience', 'Strength', 'Wellness']} className="top-3/4" />

      <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Professional Headshot */}
        <div className="order-2 lg:order-1 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary-light/20 rounded-2xl transform rotate-3 blur-sm"></div>
            <div 
              ref={imageContainerRef as any}
              className="relative rounded-2xl shadow-strong overflow-hidden bg-card"
            >
              <img 
                src={doctorImage} 
                alt="Dr. [Doctor's Name] - Board-Certified Psychiatrist"
                className="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary to-primary-light text-primary-foreground px-6 py-4 rounded-xl shadow-medium">
                <span className="font-serif text-xl font-semibold">MD, ABPN</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="order-1 lg:order-2 text-center lg:text-left">
          <div className="mb-8">
            <h1 
              ref={titleRef}
              className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-tight mb-6 opacity-0"
            >
              Compassionate Care,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                Expert Insight
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-primary-light to-accent mx-auto lg:mx-0 mb-8"></div>
          </div>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 font-light leading-relaxed opacity-0"
          >
            Board-Certified Psychiatrist specializing in 
            <strong className="text-primary font-medium"> Anxiety and Depression</strong>
          </p>
          
          {/* Stats Cards */}
          <div ref={statsRef} className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-primary transition-all duration-300">
              <div className="text-4xl font-serif font-bold text-primary mb-3">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-primary transition-all duration-300">
              <div className="text-4xl font-serif font-bold text-primary mb-3">500+</div>
              <div className="text-sm text-muted-foreground">Patients Helped</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/about"
              ref={ctaButtonRef as any}
              className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground px-8 py-4 rounded-xl font-medium text-lg shadow-medium hover:shadow-strong transition-all duration-300 transform hover:scale-105"
            >
              Learn About My Approach
            </Link>
            <Link
              to="/contact"
              className="bg-card border-2 border-primary text-primary px-8 py-4 rounded-xl font-medium text-lg shadow-soft hover:shadow-glow hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;