import { useEffect, useState } from "react"
import "./Projects.css"

const projects = []
const projectsPerSpread = 2
const spreadCount = Math.max(1, Math.ceil(projects.length / projectsPerSpread))

function ProjectCard({ project }) {
  return (
    <article className="projects-book__project">
      {project.image && (
        <img
          className="projects-book__project-image"
          src={project.image}
          alt={project.imageAlt || ""}
        />
      )}
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className="projects-book__project-links">
        {project.links?.map((link) => (
          <a
            href={link.href}
            key={link.href}
            rel="noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  )
}

export function Projects() {
  const [isOpen, setIsOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [pageDirection, setPageDirection] = useState("")

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    if (prefersReducedMotion) {
      setIsOpen(true)
      return undefined
    }

    const timeoutId = window.setTimeout(() => setIsOpen(true), 2000)
    return () => window.clearTimeout(timeoutId)
  }, [])

  const currentProjects = projects.slice(
    page * projectsPerSpread,
    (page + 1) * projectsPerSpread,
  )

  function changePage(nextPage) {
    setPageDirection(nextPage > page ? "next" : "previous")
    setPage(nextPage)
  }

  return (
    <section className="projects-page" aria-labelledby="projects-page-title">
      <h1 className="projects-page__heading" id="projects-page-title">
        Um caderno de ideias
      </h1>

      <div
        className={`projects-book${isOpen ? " projects-book--open" : ""}`}
        aria-label="Caderno de projetos"
      >
        <div className="projects-book__case" aria-hidden="true" />

        <div
          aria-hidden={!isOpen}
          className={`projects-book__pages${pageDirection ? ` projects-book__pages--${pageDirection}` : ""}`}
          inert={!isOpen}
          key={page}
        >
          {[0, 1].map((side) => {
            const project = currentProjects[side]

            return (
              <div className="projects-book__page" key={side}>
                {project ? (
                  <ProjectCard project={project} />
                ) : (
                  <span className="projects-book__page-number">
                    {String(page * projectsPerSpread + side + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>
                )}
              </div>
            )
          })}

          {currentProjects.length === 0 && (
            <p className="projects-book__empty">
              Os projetos aparecerão aqui assim que forem adicionados ao
              portfólio.
            </p>
          )}
        </div>

        <div className="projects-book__cover">
          <div className="projects-book__cover-face projects-book__cover-front">
            <span className="projects-book__cover-kicker">PORTFÓLIO</span>
            <h2 className="projects-book__cover-title">
              <span>Meus</span>
              <span>Projetos</span>
            </h2>
            <span className="projects-book__cover-mark" aria-hidden="true">
              ✳
            </span>
            <span className="projects-book__cover-caption">
              ideias que ganham forma
            </span>
          </div>
          <div className="projects-book__cover-face projects-book__cover-back" />
        </div>
      </div>

      <div className="projects-book__controls" aria-live="polite">
        {projects.length > projectsPerSpread && (
          <>
            <button
              aria-label="Ver páginas anteriores"
              disabled={page === 0}
              onClick={() => changePage(page - 1)}
              type="button"
            >
              Anterior
            </button>
            <span>
              {page + 1} / {spreadCount}
            </span>
            <button
              aria-label="Ver próximas páginas"
              disabled={page === spreadCount - 1}
              onClick={() => changePage(page + 1)}
              type="button"
            >
              Próxima
            </button>
          </>
        )}
      </div>
    </section>
  )
}
