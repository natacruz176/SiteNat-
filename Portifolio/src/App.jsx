import { BrowserRouter, Route, Routes } from "react-router"
import { Footer } from "./Components/Shared/Footer.jsx"
import { Navbar } from "./Components/Shared/Navbar.jsx"
import { AboutMe } from "./Pages/AboutMe.jsx"
import { Contact } from "./Pages/Contact.jsx"
import { Projects } from "./Pages/Projects.jsx"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<AboutMe />} />
          <Route path="/projetos" element={<Projects />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
