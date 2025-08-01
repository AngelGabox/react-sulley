import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuProfe from "../../container/Menu/MenuProfe/MenuProfe"
import "./Profe.css"
import { useGetCourseByTeacherQuery, useGetCourseWithStudentsQuery } from "../../../features/cursos/cursosApi";
import { coursesByTeacher, setSelectedCourse } from "../../../features/cursos/cursosSlice";

const Profe = () => {
    const dispatch = useDispatch();
    const [view, setView] = useState("inicio")

    const { data } = useGetCourseByTeacherQuery(2);
    // console.log("Cursos por ID:",  coursesByTeacherId);
    console.log(data);
    
  const verCurso = (curso) => {
    dispatch(setSelectedCourse(curso))
  } 




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

            {data?.length > 0 ? 
              data.map(course => (
                <div key={course.id} className="course-card" >
                <div className="course-icon" >
                    <img
                    src="https://img.icons8.com/ios/452/classroom.png"
                    alt={course.nombre_curso}
                    
                    />
                </div>
                <div className="course-info" >
                    <h3>{course.nombre_curso}</h3>
                    <p>{course.descripcion}</p> {/* puedes cambiar esto por course.edad si está disponible */}
                </div>
                <a className="view-course"  onClick={()=>verCurso(course)}>
                    Ver Curso
                </a>
                </div>
            ))  
            : <p>"No hay cursos"</p> }

          </div>)
      
      // case "curso-seleccionado":
      //   if (loadingCurso) return <p>Cargando curso...</p>;
      //   if (errorCurso)   return <p>Error cargando curso</p>;
      //   return (
      //     <div className="courses-section">
      //       <h2>{cursoSeleccionado.nombre_curso}</h2>
      //       <p>{cursoSeleccionado.descripcion}</p>
      //       <h3>Estudiantes:</h3>
      //       <ul>
      //         {cursoSeleccionado.estudiantes.map(e => (
      //           <li key={e.id}>{e.nombre} {e.apellido}</li>
      //         ))}
      //       </ul>
      //     </div>
      //   );

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
    if(data){
      dispatch(coursesByTeacher(data))
    }
  }, [dispatch, data ]);

//   if (loading) return <p>Cargando cursos...</p>;




  return (
    <div className="profe-container">
      <MenuProfe setView={setView} currentView={view} />
      <main className="main-content-profe">{renderContent()}</main>
    </div>
  );}

export default Profe