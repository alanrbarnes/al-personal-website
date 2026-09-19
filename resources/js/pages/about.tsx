import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Briefcase, Code, Database, Cloud } from 'lucide-react';
import AboutTechnologyHero from '../components/about/AboutTechnologyHero';


export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <Head title="About" />
      <div className="bg-background pb-24">
        <AboutTechnologyHero />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Narrative Section */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground"
          >
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" />
                The Manufacturing Years
              </h2>
              <p className="leading-relaxed mb-6">
                For two decades, my world was defined by tolerances measured in thousandths of an inch. As a CNC programmer and manufacturing professional, I lived at the intersection of digital instruction and physical reality. My job was to take blueprints and translate them into code that would command heavy machinery to cut raw metal into precise parts.
              </p>
              <p className="leading-relaxed mb-6">
                In manufacturing, inefficiency is expensive. You learn quickly that every wasted movement compounds. I started noticing bottlenecks in our administrative and production workflows—processes that were manual, error-prone, and slow. The engineer in me couldn't leave them alone.
              </p>
              <img
                src="/images/personal_pic_st_louis_1200-630_1.jpg"
                alt="Alan Barnes standing in front of the Gateway Arch in St. Louis"
                className="w-full rounded-xl border border-border shadow-sm mb-6"
              />
            </motion.div>
  
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Code className="w-6 h-6 text-primary" />
                The Pivot to Software
              </h2>
              <p className="leading-relaxed mb-6">
                I taught myself C# and JavaScript specifically to fix those problems. I started building small automation scripts, then internal tools, and eventually full applications that streamlined our operations. I realized that the core principles were the same: designing a logical sequence of operations to solve a complex problem efficiently.
              </p>
              <p className="leading-relaxed mb-6">
                This self-directed work ignited a deeper curiosity about computer science. I wanted to understand the underlying architecture, not just the surface-level syntax. While working full-time in manufacturing, I enrolled at the University of Illinois Springfield. Balancing a demanding career with rigorous academic work required discipline, but in December 2020, I earned my B.S. in Computer Science.
              </p>
            </motion.div>
  
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Cloud className="w-6 h-6 text-primary" />
                Building for the Web
              </h2>
              <p className="leading-relaxed mb-6">
                Today, I am a full-stack software engineer at Living Word Christian Center, applying the same pragmatism and precision I learned on the factory floor to the cloud. I design and build robust web applications, scalable REST APIs, and the infrastructure that supports them.
              </p>
              <p className="leading-relaxed">
                I don't believe in technology for technology's sake. I believe in using the right tool to solve the problem at hand, writing clean, maintainable code, and delivering software that works reliably, every single time.
              </p>
            </motion.div>
          </motion.div>
  
          {/* Skills Section */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-card border border-border rounded-xl p-8 sm:p-10 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-foreground mb-8">Technical Arsenal</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-4 text-foreground">
                  <Code className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Languages & Frameworks</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>C# / .NET</li>
                  <li>ASP.NET Core</li>
                  <li>JavaScript / TypeScript</li>
                  <li>Angular</li>
                  <li>React / React Router</li>
                  <li>Node.js</li>
                </ul>
              </motion.div>
  
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-4 text-foreground">
                  <Database className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Data & APIs</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>SQL Server</li>
                  <li>MySQL</li>
                  <li>MongoDB</li>
                  <li>RESTful API Design</li>
                  <li>Entity Framework</li>
                  <li>Express.js</li>
                </ul>
              </motion.div>
  
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-3 mb-4 text-foreground">
                  <Cloud className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Cloud & DevOps</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Microsoft Azure</li>
                  <li>AWS</li>
                  <li>IBM Cloud</li>
                  <li>Git / Version Control</li>
                  <li>CI/CD Pipelines</li>
                  <li>Docker</li>
                  <li>Agile Workflows</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
  
        </div>
      </div>
    </>
  );
}
