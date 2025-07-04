import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuProfe from "../../container/Menu/MenuProfe/MenuProfe"
import "./Profe.css"
import { useGetCourseByIdQuery } from "../../../features/cursos/cursosApi";
import { coursesByTeacher } from "../../../features/cursos/cursosSlice";

const Profe = () => {
    const dispatch = useDispatch();
    const [view, setView] = useState("inicio")
    const [courses, setCourses] = useState([]);
    const cursosById = useSelector(state => state.courses.coursesByTeacher);
    const { data } = useGetCourseByIdQuery(2);
    console.log("Cursos por ID:", cursosById);
    
    // Función para renderizar el contenido según la vista seleccionada
const renderContent = () => {



    switch (view) {
      case "inicio":
        return (
          <div className="main-content">
            <div className="navbar">
              <div className="greeting">
                <h1>Hola, Profe Juan</h1>
                <div className="notification">
                  <img
                    src="https://img.icons8.com/ios/452/bell.png"
                    alt="Notificaciones"
                  />
                </div>
              </div>
            </div>

            <div className="dashboard-cards">
              <div className="card">
                <h3>Total estudiantes</h3>
                <p>25</p>
              </div>
              <div className="card">
                <h3>Clases hoy</h3>
                <p>3</p>
              </div>
              <div className="card">
                <h3>Actividades pendientes</h3>
                <p>4</p>
              </div>
            </div>

            <div className="attendance-section">
              <h2>Asistencia semanal</h2>
              <div className="attendance-circle">
                <p>90%</p>
              </div>
            </div>

            <div className="recent-activities">
              <h2>Actividades Recientes</h2>
              <ul>
                <li>Dibujo de animales</li>
                <li>Juego con bloques</li>
                <li>Collage creativo</li>
                <li>Cuento infantil</li>
              </ul>
            </div>
          </div>
        );


        
        
      case "cursos":
        return (<div className="courses-section" >
            {cursosById.map(course => (
                <div key={course.id} className="course-card" >
                <div className="course-icon" >
                    <img
                    src="https://img.icons8.com/ios/452/classroom.png"
                    alt={course.nombre_curso}
                    
                    />
                </div>
                <div className="course-info" >
                    <h3>{course.nombre_curso}</h3>
                    <p>Edad: 4-5 años</p> {/* puedes cambiar esto por course.edad si está disponible */}
                    <p>Estudiantes: 25</p> {/* idem, si tienes course.estudiantes */}
                </div>
                <a href={`/cursos/${course.id}`} className="view-course" >
                    Ver Curso
                </a>
                </div>
            ))}
            </div>);

      case "asistencia":
        return <div className="view-placeholder">Asistencia</div>;

      case "actividades":
        return <div className="view-placeholder">Actividades</div>;

      case "perfil":
        return <div className="view-placeholder">Perfil</div>;

      default:
        return null;
    }
  };


  useEffect(() => {
    setCourses(data?.data|| []);
    dispatch(coursesByTeacher(courses))
  }, [dispatch, data, coursesByTeacher]);

//   if (loading) return <p>Cargando cursos...</p>;


  return (
    <div className="profe-container">
      <MenuProfe setView={setView} currentView={view} />
      <main className="main-content-profe">{renderContent()}</main>
    </div>
  );}

export default Profe