import { useState } from "react";
import MenuProfe from "../../container/Menu/MenuProfe/MenuProfe"


const Profe = () => {

    const [view, setView] = useState("inicio")



    return(
    <section>
        <MenuProfe ></MenuProfe>
        <main class="main-content-profe">
            {view == "inicio"?
                <div>Inicio</div>
            
            :view == "cursos"
            }
        </main>
    </section>
)}

export default Profe