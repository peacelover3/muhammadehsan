import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type CSSProperties } from 'react'

type Project = {
  number: string
  kind: string
  name: string
  description: string
  contribution: string
  stack: string[]
  visual: string
  accent: string
  featured?: boolean
}

const projects: Project[] = [
  { number: '01', kind: 'HEALTHCARE · MY CLINIC KSA', name: 'My Clinic KSA', description: 'Web and mobile healthcare app for appointments, remote consultations and patient records.', contribution: 'Built REST APIs and backend services in C#, Angular interfaces, JWT authentication and the Yakeen KSA identity verification integration.', stack: ['C# / ASP.NET Core', 'Angular', 'REST APIs', 'JWT', 'Yakeen KSA'], visual: 'clinic', accent: '#7de5c2', featured: true },
  { number: '02', kind: 'HEALTHCARE OPERATIONS', name: 'My Operations', description: 'Hospital and clinic management for staff, doctor schedules and patient records.', contribution: 'Developed SQL Server schemas and queries, Web Forms interfaces, and API documentation in collaboration with healthcare teams.', stack: ['SQL Server', 'C#', 'Web Forms'], visual: 'operations', accent: '#b5c8ff', featured: true },
  { number: '03', kind: 'RESTAURANT TECHNOLOGY', name: 'Restaurant Management System', description: 'Restaurant platform for managing brands, branches and live delivery orders.', contribution: 'Implemented .NET functionality, payment and location services, SignalR chat and Firebase push notifications.', stack: ['.NET Core', 'SignalR', 'Firebase Cloud Messaging'], visual: 'orders', accent: '#f2bd83' },
  { number: '04', kind: 'COMMUNITY · SISTERS UNITED', name: 'Sisters United', description: 'Community platform for learning resources, personal development and wellbeing support.', contribution: 'Built platform features with Angular and .NET Core, including a library of educational resources and practical guides.', stack: ['Angular', '.NET Core'], visual: 'community', accent: '#e7a8d3' },
  { number: '05', kind: 'HEALTH & WELLNESS', name: 'Healthy Diet', description: 'Wellness platform for personalized diet plans, health guidance and progress tracking.', contribution: 'Integrated Firebase Authentication, Firestore and Firebase Storage for secure sign-in and user content.', stack: ['Firebase Auth', 'Firestore', 'Firebase Storage'], visual: 'wellness', accent: '#c7e781' },
  { number: '06', kind: 'PRODUCT DISCOVERY', name: 'Find Me Mobile', description: 'Mobile phone comparison app with specifications, reviews and side-by-side comparisons.', contribution: 'Developed Angular interfaces, .NET Core REST APIs and SQL Server data handling; integrated web-sourced product information.', stack: ['Angular', '.NET Core', 'SQL Server'], visual: 'devices', accent: '#82c7e8' },
]

const experience = [
  { dates: 'OCT 2021 — PRESENT', location: 'REMOTE · ISLAMABAD', company: 'My Clinic KSA', title: 'Full Stack .NET Developer', summary: 'Developing REST APIs and backend services in C# and ASP.NET Core for web and mobile platforms. Work includes JWT authentication, session handling, LINQ data access, testing and technical documentation.' },
  { dates: 'FEB 2020 — SEP 2021', location: 'ON-SITE · ISLAMABAD', company: 'NGBS', title: '.NET Developer', summary: 'Developed and integrated RESTful APIs and third-party services, worked with frontend developers, and maintained technical documentation for web applications.' },
]

function SectionLabel({ number, children }: { number: string; children: string }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>
}

function InterfaceSketch({ project }: { project: Project }) {
  const rows = project.visual === 'clinic'
    ? ['Doctor consultation', 'Appointment details', 'Patient records']
    : project.visual === 'operations'
      ? ['Staff & schedules', 'Patient histories', 'Reports & lab results']
      : project.visual === 'orders'
        ? ['Order prepared', 'Courier assigned', 'Live order updates']
        : project.visual === 'community'
          ? ['Learning resources', 'Personal development', 'Wellbeing support']
          : project.visual === 'wellness'
            ? ['Personalized nutrition', 'Progress tracking', 'Professional guidance']
            : ['Device specifications', 'Reviews & ratings', 'Side-by-side compare']
  const heading = project.visual === 'clinic' ? 'Appointments & care' : project.visual === 'operations' ? 'Staff & schedules' : project.visual === 'orders' ? 'Restaurant order tracking' : project.visual === 'community' ? 'Learning resources' : project.visual === 'wellness' ? 'Personalized diet plans' : 'Compare mobile phones'

  return (
    <div className={`interface-art art-${project.visual}`} role="img" aria-label={`Illustrative interface concept for ${project.name}`}>
      <div className="art-orbit orbit-a" /><div className="art-orbit orbit-b" />
      <div className="interface-window">
        <div className="window-top"><span className="window-mark" /><span className="window-app">{project.kind}</span><span className="window-state" style={{ color: project.accent }}>● &nbsp;OVERVIEW</span></div>
        <div className="window-heading">{heading}</div>
        <div className="window-rows">{rows.map((row, index) => <div className="window-row" key={row}><span className="row-count">0{index + 1}</span><span>{row}</span><i style={{ background: project.accent, opacity: .45 + index * .15 }} /></div>)}</div>
      </div>
      <span className="art-note">ILLUSTRATIVE INTERFACE</span>
      <span className="art-index">{project.number}</span>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article className={`project-card ${project.featured ? 'project-featured' : ''}`} style={{ '--project-accent': project.accent } as CSSProperties}
      initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-7%' }}
      transition={{ duration: .68, delay: index % 2 * .08, ease: [0.16, 1, 0.3, 1] }}>
      <InterfaceSketch project={project} />
      <div className="project-copy">
        <div className="project-meta"><span>{project.number} / {project.kind}</span><span className="project-mark" aria-hidden="true">↗</span></div>
        <h3>{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <p className="project-contribution"><span>MY CONTRIBUTION</span>{project.contribution}</p>
        <div className="project-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
      </div>
    </motion.article>
  )
}

function App() {
  const reducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const { scrollYProgress: pageProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 88])
  const heroOpacity = useTransform(scrollYProgress, [0, .82], [1, reducedMotion ? 1 : .45])

  return (
    <MotionConfig reducedMotion="user">
    <div className="site-shell" id="top">
      <div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" />
      <motion.div className="scroll-progress" style={{ scaleX: pageProgress }} aria-hidden="true" />
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Muhammad Ehsan, top"><span>ME</span><i>.</i></a>
        <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#experience">Experience</a><a className="nav-contact" href="#contact">Contact <span>↗</span></a></nav>
      </header>

      <main id="main">
        <section className="hero" ref={heroRef} aria-labelledby="hero-title">
          <motion.div className="hero-inner" style={{ y: heroY, opacity: heroOpacity }}>
            <div className="hero-content">
              <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}><span className="live-dot" /> FULL-STACK DEVELOPER <span className="eyebrow-divider">/</span> ISLAMABAD, PAKISTAN</motion.p>
              <h1 id="hero-title"><span className="hero-line">Muhammad</span><span className="hero-line hero-serif">Ehsan<span className="hero-period">.</span></span></h1>
              <div className="hero-summary"><p>Full-stack .NET developer building web and mobile applications for healthcare, operations and community services.</p><span className="hero-rule" /></div>
              <div className="hero-actions"><a className="button-primary" href="#work">Explore my work <span>↓</span></a><a className="button-text" href="/Muhammad_Ehsan.pdf" target="_blank" rel="noreferrer">View résumé <span>↗</span></a><a className="button-text" href="mailto:mehsanaazad@gmail.com">Email me <span>↗</span></a></div>
            </div>
            <div className="hero-art" aria-label="Technology map showing C#, ASP.NET Core, Angular and SQL Server">
              <div className="hero-art-grid" />
              <div className="tech-orbit orbit-outer" /><div className="tech-orbit orbit-inner" />
              <div className="tech-core"><span>ME</span><small>FULL STACK<br />DEVELOPER</small></div>
              <span className="tech-node node-dotnet"><i />C# / .NET</span><span className="tech-node node-angular"><i />ANGULAR</span><span className="tech-node node-sql"><i />SQL SERVER</span><span className="tech-node node-api"><i />REST APIs</span>
            </div>
          </motion.div>
          <div className="hero-bottom"><span>MY CLINIC KSA · 2021—PRESENT &nbsp; / &nbsp; NGBS · 2020—2021</span><a href="#work">SCROLL TO EXPLORE ↓</a></div>
        </section>

        <section className="work-section content-section" id="work" aria-labelledby="work-title">
          <motion.div className="section-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65 }}>
            <SectionLabel number="01">SELECTED WORK</SectionLabel><div><h2 id="work-title">Work project<br /><em>highlights.</em></h2><p>Healthcare, restaurant, community, wellness and product discovery. Preview panels are illustrative, not product screenshots.</p></div>
          </motion.div>
          <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} />)}</div>
        </section>

        <section className="about-section content-section" id="about" aria-labelledby="about-title">
          <motion.div className="section-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65 }}>
            <SectionLabel number="02">ABOUT</SectionLabel><div><h2 id="about-title">About Muhammad Ehsan</h2></div>
          </motion.div>
          <div className="about-grid"><div className="about-index">THE DEVELOPER <span>ISLAMABAD · PK</span></div><p className="about-lede">Full-stack developer with experience in C#, ASP.NET Core, Angular and SQL Server.</p><div className="about-detail"><p>Built APIs, integrated third-party services and developed web interfaces across healthcare, business and community products.</p><div className="education"><span>EDUCATION</span><strong>Bachelor of Science<br />in Software Engineering</strong><small>Virtual University of Pakistan · Islamabad</small></div></div></div>
          <div className="skills-strip"><span>TOOLS I WORK WITH</span><div>C# <i /> ASP.NET CORE <i /> ANGULAR <i /> TYPESCRIPT <i /> SQL SERVER <i /> FIREBASE <i /> SIGNALR</div></div>
        </section>

        <section className="experience-section content-section" id="experience" aria-labelledby="experience-title">
          <motion.div className="section-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65 }}>
            <SectionLabel number="03">EXPERIENCE</SectionLabel><div><h2 id="experience-title">Work experience</h2><p>Professional experience developing web applications and services with .NET.</p></div>
          </motion.div>
          <div className="timeline">{experience.map((job, index) => <motion.article className="job" key={job.company} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: index * .12 }}><div className="job-date">{job.dates}<small>{job.location}</small></div><div className="job-main"><div><h3>{job.company}</h3><span>{job.title}</span></div><p>{job.summary}</p></div><span className="job-number">0{index + 1}</span></motion.article>)}</div>
        </section>

        <section className="contact-section content-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-shell"><div className="contact-top"><SectionLabel number="04">LET’S CONNECT</SectionLabel><span>EMAIL · PHONE · LINKEDIN</span></div>
            <h2 id="contact-title">Get in touch</h2><div className="contact-bottom"><p>Email is the best way to discuss a role, project or technical question.</p><div className="contact-links"><a href="mailto:mehsanaazad@gmail.com">mehsanaazad@gmail.com <span>↗</span></a><a href="tel:+92305384203">+92 305 384 203 <span>↗</span></a><a href="https://www.linkedin.com/in/ehsanaazad/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="/Muhammad_Ehsan.pdf" target="_blank" rel="noreferrer">Résumé <span>↗</span></a></div></div>
          </div>
        </section>
      </main>
      <footer className="footer"><a className="brand" href="#top">ME<i>.</i></a><span>© {new Date().getFullYear()} MUHAMMAD EHSAN</span><a href="#top">BACK TO TOP ↑</a></footer>
    </div>
    </MotionConfig>
  )
}

export default App
