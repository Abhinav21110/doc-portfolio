import { useEffect } from 'react';
import anime from 'animejs';
import { Award, BookOpen, Users, GraduationCap, Star, Trophy } from 'lucide-react';
import { use3DTilt } from '@/hooks/use-3d-tilt';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import FloatingTorus from '@/components/3D/FloatingTorus';
import ScrollingText from '@/components/ScrollingText';

const achievements = [
  {
    icon: Award,
    title: "Board Certifications",
    description: "American Board of Psychiatry and Neurology (ABPN) Certified",
    highlight: "ABPN Certified",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: GraduationCap,
    title: "Academic Affiliations",
    description: "Clinical Faculty at [University Name] School of Medicine",
    highlight: "Clinical Faculty",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Users,
    title: "Areas of Focus",
    description: "Cognitive Behavioral Therapy (CBT) and Psychopharmacology Specialist",
    highlight: "CBT & Psychopharmacology",
    color: "from-green-500 to-green-600"
  },
  {
    icon: BookOpen,
    title: "Publications & Awards",
    description: "Author of 'The Resilient Mind' and multiple peer-reviewed articles",
    highlight: "Published Author",
    color: "from-orange-500 to-orange-600"
  }
];

const additionalAchievements = [
  {
    icon: Star,
    title: "Excellence in Patient Care Award",
    year: "2023",
    organization: "State Medical Association"
  },
  {
    icon: Trophy,
    title: "Research Excellence Grant",
    year: "2022",
    organization: "National Institute of Mental Health"
  },
  {
    icon: Award,
    title: "Distinguished Service Award",
    year: "2021",
    organization: "University Medical Center"
  }
];

const Achievements = () => {
  const [titleRef, isTitleVisible] = useIntersectionObserver<HTMLHeadingElement>({ threshold: 0.1 });
  const [achievementsGridRef, areAchievementsVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [credentialsRef, areCredentialsVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [awardsRef, areAwardsVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  useEffect(() => {
    anime({
      targets: titleRef.current,
      translateY: isTitleVisible ? [80, 0] : [0, 80],
      opacity: isTitleVisible ? [0, 1] : [1, 0],
      duration: 1000,
      easing: 'easeOutExpo',
    });
  }, [isTitleVisible]);

  useEffect(() => {
    anime({
      targets: achievementsGridRef.current?.children,
      translateY: areAchievementsVisible ? [60, 0] : [0, 60],
      opacity: areAchievementsVisible ? [0, 1] : [1, 0],
      rotateX: areAchievementsVisible ? [90, 0] : [0, 90],
      duration: 800,
      delay: anime.stagger(150),
      easing: 'easeOutExpo',
    });
  }, [areAchievementsVisible]);

  useEffect(() => {
    anime({
      targets: credentialsRef.current,
      translateY: areCredentialsVisible ? [40, 0] : [0, 40],
      opacity: areCredentialsVisible ? [0, 1] : [1, 0],
      duration: 600,
      easing: 'easeOutExpo',
    });
  }, [areCredentialsVisible]);

  useEffect(() => {
    anime({
      targets: awardsRef.current?.children,
      scale: areAwardsVisible ? [0, 1] : [1, 0],
      opacity: areAwardsVisible ? [0, 1] : [1, 0],
      duration: 500,
      delay: anime.stagger(100),
      easing: 'easeOutExpo',
    });
  }, [areAwardsVisible]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-muted via-background to-accent/10 py-20 px-6 relative overflow-hidden">
      <section className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 
            ref={titleRef}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 opacity-0"
          >
            Expertise & Achievements
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-primary via-primary-light to-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Dedicated to excellence in psychiatric care through continuous learning, 
            research, and evidence-based practice.
          </p>
        </div>

        <div className="absolute top-20 left-20 opacity-10">
          <FloatingTorus />
        </div>

        <ScrollingText words={['Excellence', 'Awards', 'Recognition']} className="top-1/4" />
        <ScrollingText words={['Research', 'Publications', 'Expertise']} className="top-1/2" direction="right" />
        <ScrollingText words={['Dedication', 'Service', 'Learning']} className="top-3/4" />

        {/* Main Achievements Grid */}
        <div ref={achievementsGridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            const cardRef = use3DTilt({ maxTilt: 5, scale: 1.05 });
            
            return (
              <div
                key={index}
                ref={cardRef as any}
                className="bg-card/90 backdrop-blur-sm border border-border rounded-3xl p-8 shadow-primary transition-all duration-500 group opacity-0 relative overflow-hidden"
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-light/20 group-hover:from-primary/30 group-hover:to-primary-light/30 transition-all duration-300 mb-6 group-hover:scale-110">
                    <IconComponent className="w-10 h-10 text-primary" />
                  </div>
                  
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  
                  <div className="mb-6">
                    <span className="inline-block bg-gradient-to-r from-primary/20 to-primary-light/20 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                      {achievement.highlight}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Professional Credentials */}
        <div 
          ref={credentialsRef}
          className="bg-card/90 backdrop-blur-sm border border-border rounded-3xl p-8 md:p-12 shadow-strong mb-20 opacity-0"
        >
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Professional Credentials & Memberships
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors duration-300">
              <h3 className="font-serif text-xl font-semibold text-primary mb-4">Medical Education</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>MD from [Medical School Name]</p>
                <p>Residency in Psychiatry</p>
                <p>Board Certification - ABPN</p>
              </div>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors duration-300">
              <h3 className="font-serif text-xl font-semibold text-primary mb-4">Professional Memberships</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>American Psychiatric Association</p>
                <p>International Association of Psychiatrists</p>
                <p>State Medical Society</p>
              </div>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors duration-300">
              <h3 className="font-serif text-xl font-semibold text-primary mb-4">Continuing Education</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Regular conference attendance</p>
                <p>Ongoing professional development</p>
                <p>Research participation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Awards & Recognition
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto mb-8"></div>
        </div>

        <div ref={awardsRef} className="grid md:grid-cols-3 gap-8">
          {additionalAchievements.map((award, index) => {
            const IconComponent = award.icon;
            const awardRef = use3DTilt({ maxTilt: 4, scale: 1.08 });
            
            return (
              <div
                key={index}
                ref={awardRef as any}
                className="bg-gradient-to-br from-card/90 to-muted/30 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-primary transition-all duration-300 group opacity-0"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary-light/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {award.title}
                  </h3>
                  
                  <p className="text-primary font-medium mb-2">{award.year}</p>
                  <p className="text-sm text-muted-foreground">{award.organization}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Achievements;