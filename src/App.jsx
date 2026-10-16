import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TechText from './components/reactbits/TechText'
import ScrollReveal from './components/reactbits/ScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const pad = (number) => String(number).padStart(2, '0')
const imageFor = (number) => `/pages/page-${pad(number)}.jpg`

const pageDimensions = {
  31: '1920 × 1899',
  33: '1920 × 2470',
  35: '1920 × 2501',
  38: '1920 × 1409',
  40: '1920 × 1414',
  42: '1920 × 1422',
  44: '1920 × 1349',
  45: '1920 × 2366',
  47: '1920 × 3048',
  62: '1920 × 4116',
  67: '1920 × 1899',
}

const sections = [
  {
    id: 'brand-design',
    index: '01',
    kicker: 'Identity / Visual System / Packaging',
    title: ['BRAND', 'DESIGN'],
    subtitle: '品牌设计 · Yue Xiang Ting / Bashi Degan',
    pages: Array.from({ length: 63 }, (_, index) => index + 3),
  },
  {
    id: 'type-logo-design',
    index: '02',
    kicker: 'Marks / Symbols / Systems',
    title: ['TYPE', '& LOGO'],
    subtitle: '字体与标志设计 · Type / Logo Studies',
    pages: [67, 69],
  },
  {
    id: 'layout-design',
    index: '03',
    kicker: 'Posters / Editorial / Composition',
    title: ['LAYOUT', 'DESIGN'],
    subtitle: '版式设计 · Poster Collection',
    pages: [71, 72, 73, 74],
  },
]

const visiblePages = [1, ...sections.flatMap((section) => section.pages), 75]

function groupPages(pages) {
  return pages.map((page) => [page])
}

function Opening() {
  return (
    <div className="opening" aria-hidden="true">
      <div className="opening-copy">
        <p className="opening-eyebrow">ZOU JIALE / SELECTED WORKS</p>
        <div className="opening-title" aria-label="设计，让想法被看见">
          <div className="opening-tech opening-tech-cn">
            <TechText
              text="设计，让想法被看见"
              fontFamily='Arial, "PingFang SC", "Microsoft YaHei", sans-serif'
              fontWeight={900}
              fontSize={260}
              letterSpacing={0.025}
              color="#f1f0eb"
              accentColor="#ff321d"
              align="left"
              intro="assemble"
              introDuration={1.9}
              reveal="letter"
              labels={false}
              guides={false}
              specks={12}
              sweep={false}
              draggable={false}
            />
          </div>
        </div>
        <div className="opening-load">
          <span>LOADING VISUAL ARCHIVE</span>
          <span className="opening-count">00</span>
        </div>
        <div className="opening-meter"><span className="opening-meter-fill" /></div>
      </div>
      <div className="opening-slice opening-slice-red" />
      <div className="opening-slice opening-slice-bone" />
    </div>
  )
}

function SiteHeader({ activeSection }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Back to top">
        <span>ZJL®</span>
        <span>2022—2026</span>
      </a>
      <nav aria-label="Portfolio sections">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={activeSection === section.id ? 'is-active' : ''}
          >
            {section.index}
          </a>
        ))}
      </nav>
      <span className="header-role">BRAND / GRAPHIC DESIGNER</span>
    </header>
  )
}

function Hero({ onOpen }) {
  return (
    <section className="hero" id="top">
      <div className="hero-meta">
        <span>PERSONAL PORTFOLIO</span>
        <span>SCROLL TO EXPLORE</span>
      </div>
      <button className="hero-frame image-button" type="button" onClick={() => onOpen(1)}>
        <img src={imageFor(1)} alt="Portfolio cover — page 1" fetchPriority="high" />
      </button>
      <div className="hero-foot">
        <p>A complete visual archive presented as a cinematic web experience.</p>
        <span className="scroll-cue"><i /> KEEP SCROLLING</span>
      </div>
    </section>
  )
}

function SectionIntro({ section }) {
  return (
    <div className="section-intro">
      <div className="section-index">({section.index})</div>
      <div className="section-heading">
        <p className="section-kicker">{section.kicker}</p>
        <div className="section-tech-title" aria-label={section.title.join(' ')}>
          {section.title.map((line) => (
            <div className="section-tech-line" key={line}>
              <TechText
                text={line}
                fontFamily="Arial, Helvetica, sans-serif"
                fontWeight={900}
                fontSize={210}
                letterSpacing={-0.085}
                color="#f1f0eb"
                accentColor="#ff321d"
                align="left"
                intro="assemble"
                introDuration={1.85}
                reveal="letter"
                labels={false}
                guides={false}
                specks={12}
                sweep
                speed={0.68}
                draggable={false}
              />
            </div>
          ))}
        </div>
        <div className="section-subtitle">
          <span>{section.subtitle}</span>
          <span>{pad(section.pages[0])}—{pad(section.pages.at(-1))}</span>
        </div>
      </div>
    </div>
  )
}

function PageCard({ page, wide, onOpen }) {
  return (
    <article className={`page-card ${wide ? 'page-card-wide' : ''}`}>
      <button
        type="button"
        className="image-button page-card-button"
        onClick={() => onOpen(page)}
        aria-label={`Open portfolio page ${page} full screen`}
      >
        <img
          src={imageFor(page)}
          alt={`Portfolio page ${page}`}
          loading={page < 4 ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className="view-label">VIEW FULL ↗</span>
      </button>
      <footer>
        <span>PAGE / {pad(page)}</span>
        <span>{pageDimensions[page] ?? '1920 × 1080'}</span>
      </footer>
    </article>
  )
}

function PortfolioSection({ section, onOpen }) {
  const rows = useMemo(
    () => groupPages(section.pages),
    [section.pages],
  )

  return (
    <section className="portfolio-section" id={section.id} data-section={section.id}>
      <SectionIntro section={section} />
      <div className="page-list">
        {rows.map((row) => (
          <div className="page-row" key={row.join('-')}>
            {row.map((page) => (
              <ScrollReveal
                key={page}
                containerClassName="page-reveal"
                textClassName="page-reveal-content"
                mode="enter"
                effect="rise"
                duration={1.15}
                stagger={0}
                baseOpacity={0}
                baseRotation={0}
                baseOffset={92}
                enableBlur
                blurStrength={10}
              >
                <PageCard page={page} wide={row.length === 1} onOpen={onOpen} />
              </ScrollReveal>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

function Lightbox({ page, onClose, onChange }) {
  const pageIndex = visiblePages.indexOf(page)
  const previousPage = pageIndex > 0 ? visiblePages[pageIndex - 1] : null
  const nextPage = pageIndex < visiblePages.length - 1 ? visiblePages[pageIndex + 1] : null

  useEffect(() => {
    if (!page) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight' && nextPage) onChange(nextPage)
      if (event.key === 'ArrowLeft' && previousPage) onChange(previousPage)
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.classList.add('lightbox-open')
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('lightbox-open')
    }
  }, [page, onClose, onChange, nextPage, previousPage])

  if (!page) return null

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Portfolio page ${page}`}>
      <div className="lightbox-bar">
        <span>ZOU JIALE / PAGE {pad(page)}</span>
        <button type="button" onClick={onClose}>CLOSE ×</button>
      </div>
      <div className="lightbox-stage">
        <button type="button" onClick={() => previousPage && onChange(previousPage)} disabled={!previousPage} aria-label="Previous page">←</button>
        <img src={imageFor(page)} alt={`Portfolio page ${page}, full screen`} />
        <button type="button" onClick={() => nextPage && onChange(nextPage)} disabled={!nextPage} aria-label="Next page">→</button>
      </div>
      <span className="lightbox-hint">USE ← → KEYS TO NAVIGATE</span>
    </div>
  )
}

function Closing({ onOpen }) {
  return (
    <section className="closing" id="end">
      <p className="closing-kicker">END OF ARCHIVE / SELECTED WORKS</p>
      <ScrollReveal
        containerClassName="page-reveal closing-reveal"
        textClassName="page-reveal-content"
        mode="enter"
        effect="rise"
        duration={1.25}
        stagger={0}
        baseOpacity={0}
        baseRotation={0}
        baseOffset={96}
        enableBlur
        blurStrength={10}
      >
        <button className="closing-frame image-button" type="button" onClick={() => onOpen(75)}>
          <img src={imageFor(75)} alt="Thanks for watching — portfolio page 75" loading="lazy" />
        </button>
      </ScrollReveal>
      <footer>
        <span>DESIGNED BY ZOU JIALE</span>
        <a href="#top">BACK TO TOP ↑</a>
        <span>© 2026</span>
      </footer>
    </section>
  )
}

export default function App() {
  const appRef = useRef(null)
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const [lightboxPage, setLightboxPage] = useState(null)

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      document.body.classList.add('is-ready')
      return undefined
    }

    document.body.style.overflow = 'hidden'
    const context = gsap.context(() => {
      gsap.set('.opening-meter-fill', { scaleX: 0, transformOrigin: 'left center' })
      gsap.set('.hero-frame', { clipPath: 'inset(0 100% 0 0)', scale: 0.965 })

      const opening = gsap.timeline({
        defaults: { ease: 'power4.inOut' },
        onComplete: () => {
          document.body.style.overflow = ''
          document.body.classList.add('is-ready')
          ScrollTrigger.refresh()
        },
      })

      opening
        .from('.opening-eyebrow', { y: 18, opacity: 0, duration: 0.7 })
        .from('.opening-tech', { opacity: 0, duration: 0.55, stagger: 0.12 }, '-=0.3')
        .from('.opening-load', { opacity: 0, duration: 0.5 }, '+=1.15')
        .to('.opening-meter-fill', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, '<')
        .to('.opening-count', { innerText: 100, duration: 1.1, snap: { innerText: 1 }, ease: 'none' }, '<')
        .to('.opening-copy', { y: -30, opacity: 0, duration: 0.45, ease: 'power2.in' })
        .to('.opening', { yPercent: -100, duration: 1.25 }, '-=0.05')
        .to('.hero-frame', { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1.35 }, '-=0.85')
        .from('.hero-meta span, .hero-foot > *', { y: 18, opacity: 0, duration: 0.75, stagger: 0.08 }, '-=0.8')

      gsap.utils.toArray('.section-intro').forEach((intro) => {
        const details = intro.querySelectorAll('.section-index, .section-kicker, .section-subtitle')
        gsap.timeline({
          scrollTrigger: {
            trigger: intro,
            start: 'top 74%',
            end: 'bottom 34%',
            toggleActions: 'play none none reverse',
          },
        })
          .from(details, { y: 30, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' })
      })

      gsap.utils.toArray('.page-card').forEach((card) => {
        gsap.fromTo(card, { yPercent: 1.8 }, {
          yPercent: -1.8,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      })

    }, appRef)

    return () => {
      context.revert()
      document.body.style.overflow = ''
      document.body.classList.remove('is-ready')
    }
  }, [])

  useEffect(() => {
    const triggers = sections.map((section) => ScrollTrigger.create({
      trigger: `#${section.id}`,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => {
        if (self.isActive) setActiveSection(section.id)
      },
    }))

    return () => triggers.forEach((trigger) => trigger.kill())
  }, [])

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      document.documentElement.style.setProperty('--scroll-progress', progress)
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div ref={appRef}>
      <Opening />
      <div className="scroll-progress" aria-hidden="true" />
      <SiteHeader activeSection={activeSection} />
      <main>
        <div className="portfolio-shell">
          <Hero onOpen={setLightboxPage} />
          {sections.map((section) => (
            <PortfolioSection key={section.id} section={section} onOpen={setLightboxPage} />
          ))}
          <Closing onOpen={setLightboxPage} />
        </div>
      </main>
      <Lightbox page={lightboxPage} onClose={() => setLightboxPage(null)} onChange={setLightboxPage} />
    </div>
  )
}
