import { Link } from "react-router"
import { useEffect, useState } from "react"
import bioPaper from "../assets/VisualElements/FolhaAboutMe.png"
import skillPaper from "../assets/VisualElements/FolhaAmarelaAboutme.png"
import "./AboutMe.css"

const skills = ["HTML", "CSS", "JavaScript", "React"]
const biography =
  "Olá, me chamo Natã, tenho 16 anos e sou desenvolvedor. Gosto do que faço e sou capaz de realizar projetos impactantes com criatividade, agilidade e precisão. Atualmente, sei HTML, CSS e JavaScript."

export function AboutMe() {
  const [typedCharacters, setTypedCharacters] = useState(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return biography.length
    }

    return 0
  })

  useEffect(() => {
    if (typedCharacters >= biography.length) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setTypedCharacters((current) =>
        Math.min(current + 1, biography.length),
      )
    }, 28)

    return () => window.clearTimeout(timeoutId)
  }, [typedCharacters])

  const isTyping = typedCharacters < biography.length

  return (
    <section className="about-me" aria-labelledby="about-me-title">
      <div
        className="about-me__portrait-placeholder"
        role="img"
        aria-label="Espaço reservado para uma foto"
      />

      <div className="about-me__intro">
        <h1 className="about-me__title" id="about-me-title">
          <span>coder and</span>
          <span>designer</span>
        </h1>
        <Link className="about-me__projects-button" to="/projetos">
          Ver Projetos
        </Link>
      </div>

      <div className="about-me__details">
        <div className="about-me__bio-placeholder">
          <img alt="" src={bioPaper} />
          <p className="about-me__bio-text" aria-hidden="true">
            {biography.slice(0, typedCharacters)}
            {isTyping && (
              <span className="about-me__typing-cursor" aria-hidden="true" />
            )}
          </p>
          <p className="about-me__screen-reader-only">{biography}</p>
        </div>
        <ul className="about-me__skills" aria-label="Tecnologias">
          {skills.map((skill, index) => (
            <li
              className={`about-me__skill about-me__skill--${index + 1}`}
              key={skill}
            >
              <img alt="" aria-hidden="true" src={skillPaper} />
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
