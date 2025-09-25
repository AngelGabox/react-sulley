//src/components/views/Home/Home.jsx
import { useEffect, useState, useRef, useMemo } from "react";
import "./Home.css";
import logo from "../../../assets/logo.png";
import pelados from "../../../assets/pelados.png";
import pelados2 from "../../../assets/pelados2.png";
import evento1 from '../../../assets/evento01.jpeg'
const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollerRef = useRef(null);

  

  const scrollByStep = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = el.clientWidth; // desplaza un “viewport” del carrusel
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  const updateArrows = () => {
  const el = scrollerRef.current;
  if (!el) return;

  const atStart = el.scrollLeft <= 2;
  const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
  setCanPrev(!atStart);
  setCanNext(!atEnd);

  // indicadores (páginas = ancho total / ancho visible)
  const step = el.clientWidth;
  const pages = Math.max(1, Math.ceil(el.scrollWidth / step));
  setTotalPages(pages);
  const page = Math.round(el.scrollLeft / step);
  setCurrentPage(Math.min(pages - 1, page));
};

  useEffect(() => {
   const el = scrollerRef.current;
   if (!el) return;
   updateArrows(); // estado inicial
   const onScroll = () => updateArrows();
   el.addEventListener("scroll", onScroll, { passive: true });
   window.addEventListener("resize", updateArrows);
   return () => {
     el.removeEventListener("scroll", onScroll);
     window.removeEventListener("resize", updateArrows);
   };
 }, [/* si cargas desde API: */ /* eventos.length */]);

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "auto";
    root.classList.add("root-scroll-enabled");
    return () => {
      root.style.overflow = prevOverflow;
      root.classList.remove("root-scroll-enabled");
    };
  }, []);

  // cerrar el menú al cambiar de tamaño hacia desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // detectar el scroll para aplicar sombras/comprension
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="home">
      {/* NAV */}
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <a className="brand" href="#inicio" aria-label="Inicio">
            <img src={logo} alt="Jardín Sullivan Logo" />
          </a>

          {/* BOTÓN HAMBURGUESA */}
          <button
            className="hamburger"
            type="button"
            aria-label="Abrir menú"
            aria-controls="mainmenu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* LINKS */}
          <nav
            id="mainmenu"
            className={`nav-links ${menuOpen ? "open" : ""}`}
            onClick={(e) => {
              // JS puro: si el click ocurre en un <a> (o dentro de él), cierra el menú
              if (e.target instanceof Element && e.target.closest("a")) {
                setMenuOpen(false);
              }
            }}
          >
            <a href="#inicio">Inicio</a>
            <a href="#eventos">Eventos</a>
            <a href="#Nosotros">Nosotros</a>
            <a href="#programas">Programas</a>
            <a href="#contacto">Contacto</a>
            <a className="btn-login" href="/login">
              Inicia Sesión
            </a>
          </nav>
        </div>
      </header>

      {/* BIENVENIDA */}
      <section id="inicio" className="welcome-section">
        <div className="wrap welcome-inner">
          <div className="welcome-text">
            <h1>Bienvenido al Jardín Sullivan</h1>
            <p className="lead">
              El Jardín Sullivan es un espacio donde la educación y el corazón
              se unen. Con un modelo pedagógico basado en el juego, la
              exploración y el respeto, acompañamos a cada niño en su desarrollo
              único. Nuestras instalaciones seguras, programas bilingües y
              atención personalizada garantizan un crecimiento feliz y
              equilibrado. ¡Bienvenidos a vivir la magia de aprender!
            </p>
          </div>
        </div>
      </section>

      {/* IMAGEN DESTACADA */}
      <section>
        <a className="imagen" id="nosotros">
          <img src= {pelados} alt="Niños jugando" />
        </a>
      </section>

      {/*Eventos*/}
<section id="eventos" className="events-section">
  <div className="wrap events-header">
    <h2 className="events-title">Eventos</h2>
  </div>

  <div className="wrap">
    <div className="ev-wrap">
      {/* Flecha izquierda superpuesta */}
      <button
        type="button"
        className={`ev-btn ev-prev ev-overlay ${!canPrev ? "is-disabled" : ""}`}
        aria-label="Evento anterior"
        onClick={() => scrollByStep(-1)}
        disabled={!canPrev}
        aria-disabled={!canPrev}
      >
        ‹
      </button>

      <div className="ev-scroller" ref={scrollerRef} tabIndex={0} aria-label="Carrusel de eventos">
        <ul className="ev-track">
          {[
            {
              title: "Feria de la ciencia",
              date: "12 Oct 2025, 9:00 a.m.",
              place: "Auditorio Principal",
              description: "Muestras de proyectos y experimentos de los niños.",
              image: "/Imagen/evento1.jpg",
              link: "#",
            },
            {
              title: "Día de la familia",
              date: "20 Oct 2025, 8:00 a.m.",
              place: "Patio Central",
              description: "Juegos, picnic y actividades colaborativas.",
              image: "/Imagen/evento2.jpg",
              link: "#",
            },
            {
              title: "Muestra artística",
              date: "28 Oct 2025, 10:00 a.m.",
              place: "Sala Multiusos",
              description: "Exposición de arte y música.",
              image: "/Imagen/evento3.jpg",
              link: "#",
            },
            {
              title: "Charla de nutrición",
              date: "05 Nov 2025, 4:00 p.m.",
              place: "Aula 3",
              description: "Hábitos saludables en la primera infancia.",
              image: "/Imagen/evento4.jpg",
              link: "#",
            },
            {
              title: "Festival de lectura",
              date: "15 Nov 2025, 9:30 a.m.",
              place: "Biblioteca",
              description: "Cuentacuentos y trueque de libros.",
              image: "/Imagen/evento5.jpg",
              link: "#",
            },
          ].map((ev, i) => (
            <li className="ev-slide" key={i}>
              <article className="ev-card">
                <div className="ev-card-media">
                  {ev.image ? <img src={evento1} alt="" aria-hidden="true" /> : <div className="ev-card-fallback" />}
                </div>
                <div className="ev-card-body">
                  <h3 className="ev-title">{ev.title}</h3>
                  <p className="ev-date">{ev.date} · {ev.place}</p>
                  <p className="ev-desc">{ev.description}</p>
                  {ev.link && <a className="ev-link" href={ev.link}>Ver detalle</a>}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* Indicadores tipo “líneas” (fuera del <ul>) */}
      <div className="ev-indicators" role="tablist" aria-label="Páginas del carrusel">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`ev-indicator ${currentPage === i ? "is-active" : ""}`}
            aria-label={`Ir a página ${i + 1}`}
            aria-current={currentPage === i ? "true" : undefined}
            onClick={() => {
              const el = scrollerRef.current;
              if (!el) return;
              el.scrollTo({ left: el.clientWidth * i, behavior: "smooth" });
            }}
          />
        ))}
      </div>

      {/* Flecha derecha superpuesta */}
      <button
        type="button"
        className={`ev-btn ev-next ev-overlay ${!canNext ? "is-disabled" : ""}`}
        aria-label="Siguiente evento"
        onClick={() => scrollByStep(1)}
        disabled={!canNext}
        aria-disabled={!canNext}
      >
        ›
      </button>
    </div>
  </div>
</section>

      {/* NOSOTROS */}
      <section>
        <div className="nos" id="Nosotros">
          <h2>Nosotros</h2>
        </div>
      </section>

      {/* TEXTO 2 COLUMNAS */}
      <section className="wrap two-cols">
        <div className="col">
          <p>
            En nuestro Jardín Infantil, ofrecemos un ambiente cálido y acogedor
            donde los niños pueden desarrollar sus habilidades sociales,
            emocionales y cognitivas de manera natural y divertida. Nuestro
            enfoque educativo está basado en la curiosidad y la exploración,
            fomentando la creatividad y el aprendizaje a través del juego.
          </p>
          <p>
            Contamos con un equipo de profesionales capacitados que se esfuerzan
            por brindar atención personalizada a cada niño, asegurando su
            desarrollo integral y un crecimiento saludable en un ambiente seguro
            y afectivo.
          </p>
        </div>

        <div className="col">
          <p>
            Además, en nuestro Jardín Infantil nos enfocamos en crear un entorno
            inclusivo donde cada niño se sienta valorado y respetado. Promovemos
            la diversidad y enseñamos a los pequeños a apreciar las diferencias,
            fomentando valores como la empatía, el respeto y la colaboración.
          </p>
          <p>
            También contamos con programas especializados que incluyen
            actividades artísticas, musicales y deportivas, diseñadas para
            estimular el desarrollo físico y mental de los niños. Nuestro
            objetivo es prepararlos no solo para la escuela, sino para la vida,
            ayudándoles a construir una base sólida de confianza y autoestima.
          </p>
        </div>
      </section>

      {/* GRUPOS */}
      <section className="grupos-section" id="programas">
        <div className="wrap">
          <h2 className="title-center">Nuestros Grupos</h2>
          <div className="grupos-grid">
            <article className="grupo-card">
              <h3>Organiza</h3>
              <p className="edad">Edad 1 a 3 años</p>
              <p className="descripcion">
                Pequeños exploradores que describen el mundo a través de los
                sentidos.
              </p>
              <ul className="actividades">
                <li>Juegos sensoriales</li>
                <li>Rondas infantiles</li>
                <li>Manipulación de materiales</li>
                <li>Desarrollo de autonomía</li>
              </ul>
            </article>

            <article className="grupo-card">
              <h3>Capullitos</h3>
              <p className="edad">Edad 3 a 4 años</p>
              <p className="descripcion">
                Potentes comunicadores que expanden su mundo a través del
                lenguaje.
              </p>
              <ul className="actividades">
                <li>Dramatizaciones</li>
                <li>Actividades artísticas</li>
                <li>Juegos colaborativos</li>
                <li>Desarrollo de independencia</li>
              </ul>
            </article>

            <article className="grupo-card">
              <h3>Hormiguitas</h3>
              <p className="edad">Edad 4 a 5 años</p>
              <p className="descripcion">
                Jóvenes científicos naturales que exploran mediante proyectos.
              </p>
              <ul className="actividades">
                <li>Trabajo en equipo</li>
                <li>Resolución de desafíos</li>
                <li>Cultivo de huertas</li>
                <li>Pensamiento crítico</li>
              </ul>
            </article>

            <article className="grupo-card">
              <h3>Colonizadores</h3>
              <p className="edad">Edad 5 a 6 años</p>
              <p className="descripcion">
                Futuros líderes preparados para conquistar nuevos retos.
              </p>
              <ul className="actividades">
                <li>Conceptos académicos</li>
                <li>Proyectos innovadores</li>
                <li>Tecnología responsable</li>
                <li>Desarrollo de resiliencia</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="beneficios-section">
        <div className="wrap beneficios-grid">
          <div className="beneficio-item">
            <div
              className="beneficio-circulo"
              style={{ backgroundColor: "#F25141" }}
            >
              🎓
            </div>
            <h3>Excelentes docentes</h3>
            <p>
              Todos nuestros educadores son profesionales en pedagogía infantil
              con amplia experiencia en primera infancia.
            </p>
          </div>

          <div className="beneficio-item">
            <div
              className="beneficio-circulo"
              style={{ backgroundColor: "#93C524" }}
            >
              🍎
            </div>
            <h3>Alimentación Saludable</h3>
            <p>
              Cada día servimos menús balanceados preparados con ingredientes
              frescos y seguimos estrictos protocolos de higiene.
            </p>
          </div>

          <div className="beneficio-item">
            <div
              className="beneficio-circulo"
              style={{ backgroundColor: "#28A8E3" }}
            >
              🎮
            </div>
            <h3>Aprendizaje Jugando</h3>
            <p>
              Usamos juegos y actividades creativas para que los niños aprendan
              naturalmente y con alegría.
            </p>
          </div>
        </div>
      </section>

      {/* BANNER MATRICULACIÓN */}
      <section className="matricula-banner-horizontal">
        <div className="wrap banner-inner">
          <h2>¿DESEAS MATRICULAR EN NUESTRO JARDÍN?</h2>
          <a href="#contacto" className="matricula-btn-horizontal">
            MÁS INFORMACIÓN
          </a>
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section className="metodologia-section">
        <div className="wrap metodo-grid">
          <div className="metodo-text">
            <h2 className="titulo-metodologia">Nuestra Metodología</h2>
            <p className="texto-metodologia">
              Nuestro enfoque educativo está basado en el método de aprendizaje
              activo, donde los niños son los protagonistas de su propio
              desarrollo. Creemos en la importancia del juego como herramienta
              fundamental para el aprendizaje, ya que permite desarrollar
              habilidades sociales, emocionales y cognitivas de manera natural.
            </p>
          </div>
          <div className="metodo-img">
            <img src={pelados2} alt="Profesora con niños" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-section" id="contacto">
        <div className="wrap footer-grid">
          <div className="footer-left">
            <h3>Contacto</h3>
            <div className="mb">
              <p>
                <strong>Jardín Infantil Sullivan</strong>
              </p>
              <p>© 2024. | Políticas de privacidad</p>
              <p>Dirección: Calle 45 #12-34, Bogotá</p>
            </div>

            <div className="mb">
              <h3>Horarios de Atención</h3>
              <p>Lunes a viernes: 7:30 a.m. - 5:00 p.m.</p>
              <p>Sábados: 8:00 a.m. - 12:00 m.</p>
            </div>

            <div>
              <h3>Línea Administrativa</h3>
              <p>Teléfono: (601) 555 1324</p>
              <p>Celular: 300 455 7890</p>
              <p>Correos:</p>
              <br />
              <ul className="dotless">
                <li>Coordinación: coordinacion@sullivan.edu.co</li>
                <li>Psicología: psicologia@sullivan.edu.co</li>
                <li>Secretaría: secretaria@sullivan.edu.co</li>
              </ul>
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-right">
              <div
                className="map-embed"
                role="region"
                aria-label="Mapa de ubicación Jardín Sullivan"
              >
                <iframe
                  title="Ubicación Jardín Sullivan"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Sullivan+Kinder%2C+Carrera+87%2C+Cl.+53+Sur+%2349A%2C+Bogot%C3%A1%2C+Cundinamarca%2C+Colombia&output=embed">
                  </iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="center mt">
          <a href="#inicio" className="btn-to-top">
            ↑ Inicio
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
