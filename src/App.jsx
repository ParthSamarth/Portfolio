import { Suspense, lazy, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar.jsx'
import TerminalOverlay from './components/shared/TerminalOverlay.jsx'
import SocialSidebar from './components/shared/SocialSidebar.jsx'
import Splash from './components/home/Splash.jsx'

const Home   = lazy(() => import('./pages/Home.jsx'))
const Resume = lazy(() => import('./pages/Resume.jsx'))
const Links  = lazy(() => import('./pages/Links.jsx'))

const DataStreams = () => (
  <>
    <div className="data-stream stream-1" />
    <div className="data-stream stream-2" />
    <div className="data-stream stream-3" />
  </>
)

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [splashDone, setSplashDone] = useState(false)

  return (
    <div className="app-shell">
      <DataStreams />

      <AnimatePresence>
        {!splashDone && <Splash onComplete={() => setSplashDone(true)} />}
      </AnimatePresence>

      {splashDone && (
        <>
          <Navbar />
          {isHome && <SocialSidebar />}

          <main className="app-main">
            <Suspense fallback={<div style={{ background: 'var(--bg)', minHeight: '100vh' }} />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/"       element={<Home />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/links"  element={<Links />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>

          <TerminalOverlay />
        </>
      )}
    </div>
  )
}

export default App
