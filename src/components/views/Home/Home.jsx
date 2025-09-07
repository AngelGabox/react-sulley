import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <main className='home'>
      {/* NAV */}
      <header className="nav">
        <div className="wrap nav-inner">
          <a className="brand" href="#inicio">
            <img src="/Imagen/logojardin.jpg" alt="Jardín Sullivan Logo" />
          </a>

          <nav className="nav-links">
            <a href="#inicio">Inicio</a>
            <a href="#eventos">Eventos</a>
            <a href="#Nosotros">Nosotros</a>
            <a href="#programas">Programas</a>
            <a href="#contacto">Contacto</a>
            <a className="btn-login" href="/login">Inicia Sesión</a>
          </nav>
        </div>
      </header>

      {/* BIENVENIDA */}
      <section id="inicio" className="welcome-section">
        <div className="wrap welcome-inner">
          <div className="welcome-text">
            <h1>Bienvenido al Jardín Sullivan</h1>
            <p className="lead">
              El Jardín Sullivan es un espacio donde la educación y el corazón se unen. Con un modelo pedagógico basado en el juego, la exploración y el respeto, acompañamos a cada niño en su desarrollo único. Nuestras instalaciones seguras, programas bilingües y atención personalizada garantizan un crecimiento feliz y equilibrado. ¡Bienvenidos a vivir la magia de aprender!
            </p>
          </div>
          <div className="welcome-cta">
            <button className="btn-enroll">Inscríbete aquí</button>
          </div>
        </div>
      </section>

      {/* IMAGEN DESTACADA */}
      <section>
        <a className="imagen" id="nosotros">
          {/* Si la ñ da problemas, renombra el archivo a ninosjugando.jpg */}
          <img src="/Imagen/niñosjugando.jpg" alt="Niños jugando" />
        </a>
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
            En nuestro Jardín Infantil, ofrecemos un ambiente cálido y acogedor donde los niños
            pueden desarrollar sus habilidades sociales, emocionales y cognitivas de manera natural
            y divertida. Nuestro enfoque educativo está basado en la curiosidad y la exploración,
            fomentando la creatividad y el aprendizaje a través del juego.
          </p>
          <p>
            Contamos con un equipo de profesionales capacitados que se esfuerzan por brindar
            atención personalizada a cada niño, asegurando su desarrollo integral y un crecimiento
            saludable en un ambiente seguro y afectivo.
          </p>
        </div>

        <div className="col">
          <p>
            Además, en nuestro Jardín Infantil nos enfocamos en crear un entorno inclusivo donde
            cada niño se sienta valorado y respetado. Promovemos la diversidad y enseñamos a los
            pequeños a apreciar las diferencias, fomentando valores como la empatía, el respeto
            y la colaboración.
          </p>
          <p>
            También contamos con programas especializados que incluyen actividades artísticas,
            musicales y deportivas, diseñadas para estimular el desarrollo físico y mental de los
            niños. Nuestro objetivo es prepararlos no solo para la escuela, sino para la vida,
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
              <p className="descripcion">Pequeños exploradores que describen el mundo a través de los sentidos.</p>
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
              <p className="descripcion">Potentes comunicadores que expanden su mundo a través del lenguaje.</p>
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
              <p className="descripcion">Jóvenes científicos naturales que exploran mediante proyectos.</p>
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
              <p className="descripcion">Futuros líderes preparados para conquistar nuevos retos.</p>
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
            <div className="beneficio-circulo" style={{ backgroundColor: '#F25141' }}>
              🎓
            </div>
            <h3>Excelentes docentes</h3>
            <p>Todos nuestros educadores son profesionales en pedagogía infantil con amplia experiencia en primera infancia.</p>
          </div>

          <div className="beneficio-item">
            <div className="beneficio-circulo" style={{ backgroundColor: '#93C524' }}>
              🍎
            </div>
            <h3>Alimentación Saludable</h3>
            <p>Cada día servimos menús balanceados preparados con ingredientes frescos y seguimos estrictos protocolos de higiene.</p>
          </div>

          <div className="beneficio-item">
            <div className="beneficio-circulo" style={{ backgroundColor: '#28A8E3' }}>
              🎮
            </div>
            <h3>Aprendizaje Jugando</h3>
            <p>Usamos juegos y actividades creativas para que los niños aprendan naturalmente y con alegría.</p>
          </div>
        </div>
      </section>

      {/* BANNER MATRICULACIÓN */}
      <section className="matricula-banner-horizontal">
        <div className="wrap banner-inner">
          <h2>¿DESEAS MATRICULAR EN NUESTRO JARDÍN?</h2>
          <a href="#contacto" className="matricula-btn-horizontal">MÁS INFORMACIÓN</a>
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section className="metodologia-section">
        <div className="wrap metodo-grid">
          <div className="metodo-text">
            <h2 className="titulo-metodologia">Nuestra Metodología</h2>
            <p className="texto-metodologia">
              Nuestro enfoque educativo está basado en el método de aprendizaje activo, donde los niños
              son los protagonistas de su propio desarrollo. Creemos en la importancia del juego como
              herramienta fundamental para el aprendizaje, ya que permite desarrollar habilidades sociales,
              emocionales y cognitivas de manera natural.
            </p>
          </div>
          <div className="metodo-img">
            <img src="/Imagen/profesora.jpeg" alt="Profesora con niños" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-section" id="contacto">
        <div className="wrap footer-grid">
          <div className="footer-left">
            <h3>Contacto</h3>
            <div className="mb">
              <p><strong>Jardín Infantil Sullivan</strong></p>
              <p>© 2024. | Políticas de privacidad</p>
              <p>Dirección: Calle 45 #12-34, Bogotá</p>
            </div>

            <div className="mb">
              <h4>Horarios de Atención</h4>
              <p>Lunes a viernes: 7:30 a.m. - 5:00 p.m.</p>
              <p>Sábados: 8:00 a.m. - 12:00 m.</p>
            </div>

            <div>
              <h4>Línea Administrativa</h4>
              <p>Teléfono: (601) 555 1324</p>
              <p>Celular: 300 455 7890</p>
              <p>Correos:</p>
              <ul className="dotless">
                <li>Coordinación: coordinacion@sullivan.edu.co</li>
                <li>Psicología: psicologia@sullivan.edu.co</li>
                <li>Secretaría: secretaria@sullivan.edu.co</li>
              </ul>
            </div>
          </div>

          <div className="footer-right">
            <img src="/Imagen/mapa.png" alt="Ubicación del Jardín Sullivan" />
          </div>
        </div>

        <div className="center mt">
          <a href="#inicio" className="btn-to-top">↑ Inicio</a>
        </div>
      </footer>
    </main>
  );
};

export default Home;
