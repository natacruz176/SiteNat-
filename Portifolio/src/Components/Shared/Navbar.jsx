import "./Navbar.css"
import { NavLink } from "react-router"

export function Navbar() {
  return (
    <header className="site-header">
      <div className="navbar">
        <NavLink className="navbar__brand" to="/">
          Natã
        </NavLink>
        <nav className="navbar__links" aria-label="Navegação principal">
          <NavLink
            className={({ isActive }) =>
              `navbar__link${isActive ? " navbar__link--active" : ""}`
            }
            end
            to="/"
          >
            Sobre mim
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `navbar__link${isActive ? " navbar__link--active" : ""}`
            }
            to="/projetos"
          >
            Projetos
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `navbar__link${isActive ? " navbar__link--active" : ""}`
            }
            to="/contato"
          >
            Contato
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
