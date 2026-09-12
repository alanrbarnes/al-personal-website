import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import SkillsSidebar from '../components/resume/SkillsSidebar';


export default function Resume() {
  const skills = {
    languages: ["C#", "TypeScript", "JavaScript", "Java", "SQL", "HTML5/CSS3"],
    frameworks: ["ASP.NET", "ASP.NET Core", "Entity Framework", "Angular", "React"],
    tools: ["Git", "Docker", "Azure", "AWS", "REST APIs", "Postman"]
  };

  const experience = [
    {
      title: "Senior Level Programmer/Web Developer",
      company: "Living Word Christian Center",
      period: "2021 - Present",
      description: "Design and implement scalable web applications and REST APIs. Manage cloud infrastructure and optimize existing internal tools for performance.",
      highlights: [
        "Migrated applications and Windows services off 3 legacy Rackspace servers onto 2 modernized ones, cutting hosting costs by $3,000/month (~$36,000 annually).",
        "Maintain and support 30+ websites across 100+ domains, including 3 ASP.NET Core/Angular applications, 5 Ektron applications, and 1 Umbraco site.",
        "Built and maintained RESTful APIs powering multiple ASP.NET Core/Angular applications, with GraphQL integration for WordPress-based content sources."
      ]
    },
    {
      title: "Manufacturing & CNC Professional",
      company: "Various Manufacturing Firms",
      period: "2000 - 2021",
      description: "Programmed precise CNC machinery, interpreted complex blueprints, and optimized production workflows. Transitioned into software by developing scripts to automate shop-floor administration.",
      highlights: [
        "Self-taught C# and JS to build internal efficiency tools while working full-time.",
        "Maintained sub-millimeter tolerances on critical components.",
        "Led shift teams and managed production schedules."
      ]
    }
  ];

  const education = [
    {
      degree: "B.S. Computer Science",
      school: "University of Illinois Springfield",
      period: "Graduated Dec 2020",
      details: "Completed degree while working full-time. Focus on software engineering principles and data structures."
    }
  ];

  return (
    <>
      <Head title="Resume" />
      <div className="bg-background pt-20 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Download Action */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-16 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Resume</h1>
              <p className="text-xl text-muted-foreground">Alan Barnes — Full-Stack Engineer</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <a
                href="/images/resume.pdf"
                download="Alan_Barnes_Resume.pdf"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto"
              >
                <Download className="mr-2 w-5 h-5" /> Download PDF
              </a>
            </motion.div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Main Content (Left 2/3) */}
            <div className="md:col-span-2 space-y-12">
              
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold border-b border-border pb-2 mb-6 text-foreground">Experience</h2>
                <div className="space-y-10">
                  {experience.map((job, idx) => (
                    <div key={idx} className="relative pl-6 sm:pl-0">
                      <div className="hidden sm:block absolute left-[-29px] top-2 w-3 h-3 bg-primary rounded-full ring-4 ring-background"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                        <h3 className="text-xl font-bold text-foreground">{job.title}</h3>
                        <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded mt-1 sm:mt-0 w-fit">{job.period}</span>
                      </div>
                      <h4 className="text-lg font-medium text-primary mb-3">{job.company}</h4>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{job.description}</p>
                      <ul className="space-y-2">
                        {job.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start text-muted-foreground text-sm">
                            <span className="text-primary mr-2 mt-1">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.section>
  
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold border-b border-border pb-2 mb-6 text-foreground">Education</h2>
                <div>
                  {education.map((edu, idx) => (
                    <div key={idx} className="mb-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                        <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                        <span className="text-sm font-medium text-muted-foreground">{edu.period}</span>
                      </div>
                      <h4 className="text-lg font-medium text-primary mb-2">{edu.school}</h4>
                      <p className="text-muted-foreground text-sm">{edu.details}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
  
            </div>
  
              {/* Skills sidebar and supporting callout */}
            <div className="space-y-10">
              <SkillsSidebar skills={skills} />
              
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-primary/5 border border-primary/20 rounded-xl p-6"
              >
                <h2 className="text-lg font-bold mb-3 text-foreground">Fast Learner</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Transitioning from a 20-year career in manufacturing to full-stack engineering required intense self-study and a degree completed after-hours. I bring that same discipline and drive to every codebase I touch.
                </p>
              </motion.section>
            </div>
  
          </div>
        </div>
        
        {/* Decorative timeline line for larger screens */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 640px) {
            .space-y-10 > .relative::before {
              content: '';
              position: absolute;
              left: -24px;
              top: 24px;
              bottom: -40px;
              width: 2px;
              background-color: hsl(var(--border));
              z-index: -1;
            }
            .space-y-10 > .relative:last-child::before {
              display: none;
            }
          }
        `}} />
      </div>
    </>
  );
}
