import { useEffect, useRef, useState } from 'react'

const NAV = [
  { id: 'home', label: 'home' },
  { id: 'skills', label: 'skills' },
  { id: 'about', label: 'about' },
  { id: 'projects', label: 'projects' },
] as const

const EMAIL = 'michaelcmatteis@gmail.com'
const PHONE = '830-359-6162'
const MAILTO = 'mailto:michaelcmatteis@gmail.com?subject=Hello%20Michael'

type PageId = (typeof NAV)[number]['id']

const SKILLS = [
  {
    id: 'languages',
    label: 'languages',
    items: [
      {
        name: 'TypeScript',
        detail: 'Types on the app and the API so a change in one place does not slip through.',
      },
      {
        name: 'JavaScript',
        detail: 'The language I write for the browser and for Node when something has to run now.',
      },
      {
        name: 'SQL',
        detail: 'Queries written by hand when the join, the filter, and the result should stay visible.',
      },
      {
        name: 'HTML5',
        detail: 'Semantic markup for the page, so the content has a real outline before any style.',
      },
      {
        name: 'CSS3',
        detail: 'Layout, type, and spacing that hold together on a phone and on a wide screen.',
      },
    ],
  },
  {
    id: 'frontend',
    label: 'frontend',
    items: [
      {
        name: 'React',
        detail: 'Components and state for interfaces that update in place instead of reloading the page.',
      },
      {
        name: 'React Native',
        detail: 'The same component thinking, aimed at a phone, with native layout and touch in mind.',
      },
      {
        name: 'Atlassian Design System',
        detail: 'Atlassian screens built with their components and spacing instead of a one-off look.',
      },
    ],
  },
  {
    id: 'backend',
    label: 'backend',
    items: [
      {
        name: 'Node.js',
        detail: 'Server-side JavaScript for APIs, background work, and anything that should stay off the page.',
      },
      {
        name: 'Express.js',
        detail: 'HTTP routes that check their input and return a JSON shape a client can trust.',
      },
      {
        name: 'NestJS',
        detail: 'A Node server split into modules so routes, services, and data access stay apart.',
      },
      {
        name: 'REST APIs',
        detail: 'Endpoints that take JSON, validate it, and return a response a client can rely on.',
      },
      {
        name: 'microservices',
        detail: 'Work split across smaller services that talk over HTTP instead of one process doing it all.',
      },
      {
        name: 'JWT authentication',
        detail: 'Signed tokens checked on the server, so a protected route knows who is calling.',
      },
      {
        name: 'OAuth 2.0',
        detail: 'Sign-in handed to another provider, with tokens stored and checked before a route trusts them.',
      },
      {
        name: 'asynchronous processing',
        detail: 'Work that continues after the response, so a slow job does not hold the request open.',
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI & integrations',
    items: [
      {
        name: 'AI development',
        detail: 'I write and review code in Cursor, with a model in the editor, and I decide what stays.',
      },
      {
        name: 'xAI Grok',
        detail: 'A model I use to think a problem through, draft the code, and then check the result.',
      },
      {
        name: 'Model Context Protocol (MCP)',
        detail: 'A way to hand a model real tools, so it can call them instead of only guessing.',
      },
      {
        name: 'AI tool development',
        detail: 'Tools a model can call, with a clear input, a clear result, and a limit on the work.',
      },
      {
        name: 'prompt design',
        detail: 'A prompt written for one result, then run again to see whether the output still holds.',
      },
      {
        name: 'structured outputs',
        detail: 'A fixed shape asked of the model, with anything that misses that shape rejected.',
      },
      {
        name: 'external AI client integrations',
        detail: 'An app wired to an outside model client, including the request, the reply, and the failures.',
      },
    ],
  },
  {
    id: 'databases',
    label: 'databases',
    items: [
      {
        name: 'PostgreSQL',
        detail: 'Relational data modeled and queried in Postgres, with the schema as the source of truth.',
      },
      {
        name: 'MySQL',
        detail: 'The same relational work in MySQL: tables, joins, and queries I can read back later.',
      },
      {
        name: 'Forge SQL',
        detail: 'Relational storage inside Forge, queried with SQL from the app that owns the data.',
      },
      {
        name: 'relational data modeling',
        detail: 'Tables and relationships shaped so a row stays consistent when it is created or changed.',
      },
      {
        name: 'SQL migrations',
        detail: 'Schema changes written as migrations, so the database can be rebuilt to the same shape.',
      },
      {
        name: 'multi-tenant architecture',
        detail: 'One database for many tenants, with each tenant’s rows kept inside their own boundary.',
      },
      {
        name: 'data isolation',
        detail: 'Queries scoped to one tenant, so another tenant’s rows cannot be read or written by mistake.',
      },
    ],
  },
  {
    id: 'cloud',
    label: 'cloud & infra',
    items: [
      {
        name: 'Docker',
        detail: 'An app and its dependencies packed so they start the same way here and on a server.',
      },
      {
        name: 'Kubernetes',
        detail: 'Containers scheduled and kept running, with a check that a pod is actually healthy.',
      },
      {
        name: 'DigitalOcean',
        detail: 'Where I deploy, with the app reachable and the host set for that environment.',
      },
      {
        name: 'PM2',
        detail: 'A process manager that keeps a Node server up and restarts it when the process dies.',
      },
      {
        name: 'deployments',
        detail: 'A build shipped as a known version, so I can see what is running and move it forward.',
      },
      {
        name: 'environment configuration',
        detail: 'Secrets and settings kept in the environment, so they never travel inside the code.',
      },
      {
        name: 'health checks',
        detail: 'A small endpoint that says the service is actually up, not only that the process started.',
      },
      {
        name: 'production troubleshooting',
        detail: 'Logs and the running process, read until the failure has a cause I can act on.',
      },
    ],
  },
  {
    id: 'atlassian',
    label: 'Atlassian',
    items: [
      {
        name: 'Atlassian Forge',
        detail: 'Apps that run inside Atlassian, built on Forge instead of a server I have to host.',
      },
      {
        name: 'Jira REST APIs',
        detail: 'Jira issues read and updated through the REST API, with the payload checked before it goes.',
      },
      {
        name: 'webtriggers',
        detail: 'An incoming call that starts one job and returns, instead of holding the caller while it runs.',
      },
      {
        name: 'scheduled triggers',
        detail: 'Work that runs on a clock, so it still happens when nobody is there to start it.',
      },
      {
        name: 'asynchronous consumers',
        detail: 'Events handled after they arrive, so the first response is not waiting on the whole job.',
      },
    ],
  },
  {
    id: 'testing',
    label: 'testing',
    items: [
      {
        name: 'Vitest',
        detail: 'Unit tests written next to the code, so a broken function fails before it ships.',
      },
      {
        name: 'automated testing',
        detail: 'Checks that run on their own, so a change is tested without clicking through it by hand.',
      },
      {
        name: 'code coverage',
        detail: 'A report of which lines the tests actually reach, and which ones they still skip.',
      },
      {
        name: 'Lighthouse',
        detail: 'A pass over a page for speed, accessibility, and the basics of how it loads.',
      },
    ],
  },
  {
    id: 'tools',
    label: 'tools',
    items: [
      {
        name: 'Git',
        detail: 'Branches, history, and a clean way back when a change should not have landed.',
      },
      {
        name: 'GitHub',
        detail: 'The remote for the repo, the issues, and the branch a change is reviewed and shipped from.',
      },
      {
        name: 'Jira',
        detail: 'The board where a task lives, so the work and the change stay tied together.',
      },
      {
        name: 'Postman',
        detail: 'A request sent by hand, so I can see the status, the body, and what actually came back.',
      },
      {
        name: 'Agile workflow',
        detail: 'Short cycles: pick the task, build it, show it, then take the next one from what was learned.',
      },
    ],
  },
]

async function writeClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    return true
  } catch {
    try {
      const area = document.createElement('textarea')
      area.value = value
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.left = '-9999px'
      document.body.appendChild(area)
      area.select()
      const ok = document.execCommand('copy')
      area.remove()
      return ok
    } catch {
      return false
    }
  }
}

export default function App() {
  const [page, setPage] = useState<PageId>('home')
  const [wiping, setWiping] = useState(false)
  const [pending, setPending] = useState<PageId | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null)
  const contactButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const copyTimer = useRef<number | null>(null)

  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (NAV.some((item) => item.id === id)) setPage(id as PageId)
  }, [])

  const open = (id: PageId) => {
    if (id === page || wiping) return
    setPending(id)
    setWiping(true)
    window.setTimeout(() => {
      setPage(id)
      setPending(null)
      setWiping(false)
      window.history.replaceState(null, '', `#${id}`)
    }, 720)
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (contactOpen) return
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
      const current = pending ?? page
      const index = NAV.findIndex((item) => item.id === current)
      const next = event.key === 'ArrowRight' ? index + 1 : index - 1
      if (NAV[next]) open(NAV[next].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [page, pending, wiping, contactOpen])

  useEffect(() => {
    if (!contactOpen) return
    const dialog = dialogRef.current
    const previouslyFocused = contactButtonRef.current
    const email = dialog?.querySelector<HTMLElement>('[data-autofocus]')
    email?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setContactOpen(false)
        return
      }
      if (event.key !== 'Tab' || !dialog) return
      const items = [...dialog.querySelectorAll<HTMLElement>('a, button')]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus()
    }
  }, [contactOpen])

  const copyValue = async (value: string, which: 'email' | 'phone') => {
    const ok = await writeClipboard(value)
    if (!ok) return
    setCopied(which)
    if (copyTimer.current) window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(null), 1600)
  }

  const shown = pending ?? page

  return (
    <div className="bezel">
      <div className="screen">
        <aside className="rail">
          <div className="elbow-top" />
          <nav aria-label="Pages">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={shown === item.id ? 'is-active' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  open(item.id)
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="rail-fill" />
          <div className="elbow-bottom" />
        </aside>

        <div className="stage">
          <header className="topbar">
            <h1>Michael Matteis</h1>
            <p className="live">
              <span className="pip" aria-hidden="true" />
              online
            </p>
          </header>

          <main className={`viewport ${wiping ? 'is-wiping' : ''}`}>
            <div className={`wipe ${wiping ? 'is-on' : ''}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <section className={`page home-page ${page === 'home' && !wiping ? 'is-active' : ''}`} id="home">
              <div className="home-copy">
                <p className="kicker">access id</p>
                <h2 className="name">Michael Matteis</h2>
                <p className="role">
                  Full-stack development, <em>AI automation</em>, and data processing.
                </p>
                <button
                  ref={contactButtonRef}
                  type="button"
                  className="contact-open"
                  onClick={() => setContactOpen(true)}
                >
                  Contact
                </button>
              </div>
            </section>

            <section className={`page skills-page ${page === 'skills' && !wiping ? 'is-active' : ''}`} id="skills">
              <div className="skill-grid">
                {SKILLS.map((group) => (
                  <article key={group.id} className={`skill-panel is-${group.id}`}>
                    <header>
                      <h4>
                        <span className="cap" aria-hidden="true" />
                        {group.label}
                      </h4>
                    </header>
                    <ul>
                      {group.items.map((skill) => (
                        <li key={skill.name}>
                          <strong>{skill.name}</strong>
                          <span>{skill.detail}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className={`page about-page ${page === 'about' && !wiping ? 'is-active' : ''}`} id="about">
              <article className="project">
                <h2 className="project-title">
                  I’m Michael, a full-stack developer who likes figuring things
                  out.
                </h2>
                <div className="project-copy">
                  <p>
                    I’ve been working professionally as a developer for nearly
                    two years, building and maintaining applications across the
                    frontend and backend. The part I enjoy most isn’t any
                    particular technology. It’s understanding a problem, working
                    through the possibilities, and figuring out what makes the
                    most sense.
                  </p>
                  <p>
                    I tend to look beyond the immediate task. When something
                    needs to be built or something isn’t working, I want to
                    understand why. What are we actually trying to accomplish?
                    Where is the real problem? Is there a simpler way?
                    Sometimes the answer is code. Other times it’s changing a
                    workflow, rethinking how information moves, finding a
                    better integration, or automating something that shouldn’t
                    be manual.
                  </p>
                  <p>
                    That mindset has also shaped how I learn. Outside of work
                    I’m constantly building and experimenting with my own
                    ideas. Working on products from the ground up lets me
                    explore areas I may not encounter professionally, and it
                    taught me to think beyond the code: how the software fits
                    into the larger system around it.
                  </p>
                  <p>
                    More recently that curiosity has led me deeper into AI and
                    automation. I’m interested in how these tools are changing
                    the way software is built, and I care as much about where
                    they provide real value as I do about experimenting with
                    them. Traditional approaches are still often the better
                    choice.
                  </p>
                  <p>
                    I don’t think development is something you ever really
                    finish learning. There’s always another problem, another
                    approach, or another idea worth exploring. That’s a big
                    part of what keeps me interested in it.
                  </p>
                </div>
              </article>
            </section>

            <section className={`page projects-page ${page === 'projects' && !wiping ? 'is-active' : ''}`} id="projects">
              <article className="project">
                <h2 className="project-title">On Call Mobile Oil</h2>
                <p className="project-links">
                  <a href="https://www.oncallmobileoil.com/" target="_blank" rel="noreferrer">
                    Live site
                  </a>
                  <a href="https://github.com/mikematt23/mtOil-frontend-public" target="_blank" rel="noreferrer">
                    Frontend
                  </a>
                  <a href="https://github.com/mikematt23/mtOil-backend-public" target="_blank" rel="noreferrer">
                    Backend
                  </a>
                </p>
                <div className="project-copy">
                  <p className="label">What it does</p>
                  <p>
                    I built On Call Mobile Oil for a mobile oil-change business.
                    A customer looks up their vehicle, sees a price, and books a
                    visit at their address. The shop runs jobs, payments, and the
                    website from the same app.
                  </p>
                  <p>
                    A customer starts with their vehicle. They enter the year,
                    make, model, and engine, or a VIN, and the app finds the oil
                    that engine takes. The price is the oil and the filter for
                    that vehicle, plus tax. A launch price, a referral credit, or
                    a promo code can lower it before they book.
                  </p>
                  <p>
                    They pick a time at their address. The address has to fall in
                    the Austin area, about 25 miles out. The time is held so
                    another person can’t take the same slot. They save a card, and
                    Stripe charges it only when the tech finishes the job. If the
                    shop is taking payment in the driveway, Square handles it on a
                    reader instead.
                  </p>
                  <p>
                    The shop runs the day from a job board. Admins, managers, and
                    techs each see what their role allows, and they set the
                    schedule and the prices in the same app. After a booking, the
                    customer gets a confirmation, a reminder before the visit, and
                    a note when the oil is due again. Those go by text or email,
                    and only if they opted in.
                  </p>
                  <p className="label">How it was built</p>
                  <p>
                    It’s two TypeScript services and one Postgres database. React
                    19, Vite, and React Router run the site. Express 5, Zod, and
                    Prisma run the API, with JWTs, bcrypt passwords, and roles for
                    who can do what.
                  </p>
                  <p>
                    Pricing, slot holds, the service area, the charge when a job
                    is finished, and the reminders each live in their own small
                    module. Tests cover pricing, consent, and payments. Stripe and
                    Square are a setting on the shop, and a timer every fifteen
                    minutes authorizes today’s cards and sends the oil-due notes.
                    I built it in slices: sign-in, then the quote, then the
                    scheduler, then the job and its messages, then office tools
                    for roles, pricing, offers, oil corrections, and a funnel
                    dashboard.
                  </p>
                  <p className="meta">react · express · prisma · postgres · stripe</p>
                </div>
              </article>
            </section>

          </main>

          <footer className="dock">
            <div className="lcars-foot" aria-hidden="true">
              <span className="elbow" />
              <span className="bar" />
              <span className="cap" />
            </div>
            <nav className="dock-nav" aria-label="Pages">
              {NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={shown === item.id ? 'is-active' : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    open(item.id)
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </footer>
        </div>
      </div>

      {contactOpen && (
        <div className="modal-backdrop" onClick={() => setContactOpen(false)}>
          <div
            ref={dialogRef}
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="contact-title">Contact</h2>
            <a className="modal-email" href={MAILTO} data-autofocus>
              Email me
            </a>
            <div className="modal-row">
              <span>{EMAIL}</span>
              <button type="button" className="modal-copy" onClick={() => copyValue(EMAIL, 'email')}>
                {copied === 'email' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="modal-row">
              <a href="tel:+18303596162">{PHONE}</a>
              <button type="button" className="modal-copy" onClick={() => copyValue(PHONE, 'phone')}>
                {copied === 'phone' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <a className="modal-github" href="https://github.com/mikematt23" target="_blank" rel="noreferrer">
              github.com/mikematt23
            </a>
            <button type="button" className="modal-close" onClick={() => setContactOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
