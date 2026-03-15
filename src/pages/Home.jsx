import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Skills from '../components/home/Skills'
import Projects from '../components/home/Projects'
import DataScience from '../components/home/DataScience'
import Credentials from '../components/home/Credentials'
import Contact from '../components/home/Contact'
import Footer from '../components/layout/Footer'
import PageTransition from '../components/layout/PageTransition'

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <DataScience />
      <Credentials />
      <Contact />
      <Footer />
    </PageTransition>
  )
}
