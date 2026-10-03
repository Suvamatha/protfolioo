import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { DemoProvider } from "./components/LiveDemo";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";

function App() {
  return (
    <DemoProvider>
      <div className="relative min-h-dvh bg-paper text-ink">
        <div className="noise-layer" />
        <Nav />
        <main className="relative z-0">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </DemoProvider>
  );
}

export default App;
