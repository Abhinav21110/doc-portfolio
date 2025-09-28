import { useEffect } from 'react';
import anime from 'animejs';
import { use3DTilt } from '@/hooks/use-3d-tilt';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import AnimatedSphere from '@/components/3D/AnimatedSphere';
import FloatingTorus from '@/components/3D/FloatingTorus';
import ScrollingText from '@/components/ScrollingText';

const About = () => {
  const [titleRef, isTitleVisible] = useIntersectionObserver<HTMLHeadingElement>({ threshold: 0.1 });
  const [quoteRef, isQuoteVisible] = useIntersectionObserver<HTMLQuoteElement>({ threshold: 0.1 });
  const [contentRef, isContentVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [cardsRef, isCardsVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  
  const mainCardRef = use3DTilt({ maxTilt: 3, scale: 1.02 });
  const approachCardRef = use3DTilt({ maxTilt: 4, scale: 1.05 });
  const valuesCardRef = use3DTilt({ maxTilt: 4, scale: 1.05 });

  useEffect(() => {
    anime({
      targets: titleRef.current,
      opacity: isTitleVisible ? [0, 1] : [1, 0],
      duration: 1000,
      easing: 'easeOutCubic',
    });
  }, [isTitleVisible]);

  useEffect(() => {
    anime({
      targets: quoteRef.current,
      opacity: isQuoteVisible ? [0, 1] : [1, 0],
      duration: 800,
      easing: 'easeOutCubic',
    });
  }, [isQuoteVisible]);

  useEffect(() => {
    anime({
      targets: contentRef.current?.children,
      opacity: isContentVisible ? [0, 1] : [1, 0],
      duration: 600,
      delay: anime.stagger(200),
      easing: 'easeOutCubic',
    });
  }, [isContentVisible]);

  useEffect(() => {
    anime({
      targets: cardsRef.current?.children,
      scale: isCardsVisible ? [0.8, 1] : [1, 0.8],
      opacity: isCardsVisible ? [0, 1] : [1, 0],
      duration: 500,
      delay: anime.stagger(150),
      easing: 'easeOutCubic',
    });
  }, [isCardsVisible]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-card via-background to-muted/20 py-20 px-6 relative overflow-hidden">
      {/* 3D Background Element */}
      <div className="absolute top-40 right-10 opacity-20">
        <AnimatedSphere />
      </div>
      <div className="absolute bottom-20 left-10 opacity-10">
        <FloatingTorus />
      </div>

      <ScrollingText words={['Philosophy', 'Care', 'Connection']} className="top-1/4" />
      <ScrollingText words={['Evidence-Based', 'Holistic', 'Patient-Centered']} className="top-1/2" direction="right" />
      <ScrollingText words={['Collaboration', 'Healing', 'Growth']} className="top-3/4" />

      <section className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 
            ref={titleRef}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 opacity-0"
          >
            Philosophy of Care
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-primary via-primary-light to-accent mx-auto mb-8"></div>
        </div>

        <div 
          ref={mainCardRef as any}
          className="bg-background/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 shadow-primary border border-border mb-16"
        >
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2" ref={contentRef}>
              <blockquote 
                ref={quoteRef}
                className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground/90 italic mb-8 opacity-0"
              >
                "Mental health is not just the absence of illness—it's the presence of resilience, 
                purpose, and the capacity to navigate life's challenges with clarity and strength."
              </blockquote>
              
              <div className="space-y-6 opacity-0">
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                  With over 15 years of dedicated practice in psychiatric medicine, I believe in a 
                  patient-centered approach that combines evidence-based treatment with genuine human 
                  connection. Every individual's journey is unique, and my role is to provide the 
                  tools, insights, and support needed to achieve lasting mental wellness.
                </p>
                
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                  My practice integrates cognitive behavioral therapy, mindfulness-based interventions, 
                  and when appropriate, psychopharmacological treatment to create comprehensive care 
                  plans tailored to each patient's specific needs and goals.
                </p>

                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                  I am committed to creating a safe, non-judgmental space where healing can flourish. 
                  Through collaborative partnership, we work together to identify strengths, address 
                  challenges, and develop sustainable strategies for mental wellness.
                </p>
              </div>
            </div>

            <div ref={cardsRef} className="space-y-8">
              <div 
                ref={approachCardRef as any}
                className="bg-muted/50 backdrop-blur-sm rounded-2xl p-8 shadow-primary border border-border opacity-0 transition-shadow duration-300"
              >
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Treatment Approach</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Evidence-based therapy
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Personalized treatment plans
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Holistic wellness focus
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Collaborative care model
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Mindfulness integration
                  </li>
                </ul>
              </div>
              
              <div 
                ref={valuesCardRef as any}
                className="bg-gradient-to-br from-primary/10 to-primary-light/5 border border-primary/30 rounded-2xl p-8 shadow-medium opacity-0 hover:shadow-glow transition-shadow duration-300"
              >
                <h3 className="font-serif text-xl font-semibold text-primary mb-4">Core Values</h3>
                <ul className="space-y-3 text-primary/80">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Compassionate listening
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Respect for patient autonomy
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Cultural sensitivity
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Continuous learning
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Ethical practice standards
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Professional Background */}
        <div className="grid md:grid-cols-2 gap-8 fade-in-up">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-primary border border-border transition-shadow duration-300">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">Education & Training</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-primary mb-2">Medical Degree</h4>
                <p className="text-muted-foreground">MD from [Medical School Name]</p>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Psychiatric Residency</h4>
                <p className="text-muted-foreground">Completed at [Hospital/Institution Name]</p>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Fellowship</h4>
                <p className="text-muted-foreground">Specialized training in [Specialty Area]</p>
              </div>
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-primary border border-border transition-shadow duration-300">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">Therapeutic Specialties</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-primary mb-2">Anxiety Disorders</h4>
                <p className="text-sm text-muted-foreground">Generalized anxiety, panic disorder, social anxiety</p>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Depression</h4>
                <p className="text-sm text-muted-foreground">Major depression, treatment-resistant depression</p>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Trauma & PTSD</h4>
                <p className="text-sm text-muted-foreground">Evidence-based trauma therapy approaches</p>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Mood Disorders</h4>
                <p className="text-sm text-muted-foreground">Bipolar disorder, mood stabilization</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;