let MenuP_activado = false;
const MenuP_IDs = [
    "btnMenu2a",
    "btnMenu3a",
    "btnMenu4a"
];
const MenuP_ID_btnMenu =["btnMenu1a"];
const MenuP_html_boton_menu =[
    "<div id='btnMenu1a' class='botonMenu'></div>"
];
const MP_html_botones =[
    "<div id='btnMenu2a' class='botonNuevo'>Mis Solicitudes</div>",
"<div id='btnMenu3a' class='botonModificar'>Usuarios</div>",
"<div id='btnMenu4a' class='botonEliminar'>Salir</div>",

];


async function MenuP_cargar(){
    // PP_borrarBienvenida();
    document.getElementById("rectangulo-superior-flotante").insertAdjacentHTML("beforeend",MenuP_html_boton_menu[0]);

    // await UTIL_dibujar_HTML(MenuP_html_boton_menu);
    MenuP_evento_btnMenu();
}

async function MenuP_botonera(){
    if(MenuP_activado == true ){
        // await MenuP_eventos_botonera();
        MenuP_activado = false;
        await UTIL_BORRAR_HTML_pID(MenuP_IDs);
    }else{
        MenuP_activado = true;
        await UTIL_dibujar_HTML(MP_html_botones);
        MenuP_eventos_botonera();
    }
}

function MenuP_evento_btnMenu(){
    document.getElementById("btnMenu1a").addEventListener("click",MenuP_botonera);
}

function MenuP_eventos_botonera(){
        //Mis Solicitudes
        document.getElementById("btnMenu2a").addEventListener("click",function(){
            MenuP_botonera();
            console.log("Mis Solicitudes");
            MenuP_salir();
            // MenuMS_cargar();
            MS_cargar();
        }); 
        //Usuarios
        document.getElementById("btnMenu3a").addEventListener("click",function(){
            MenuP_botonera();
            console.log("Usuarios");
            MenuP_salir();
            // MenuUsuarios_cargar();
            USUARIOS_cargar();
        }); 
        //salir
        document.getElementById("btnMenu4a").addEventListener("click",function(){
            MenuP_botonera();
            PP_salir();
            INDEX_CARGAR();
            // LOGIN_cargar();
            console.log("Salir");
        });
}



async function MenuP_salir(){
    if(MenuP_activado){
        MenuP_activado = false;
       await UTIL_BORRAR_HTML_pID(MenuP_IDs,"MenuP_salir");
    }
    await UTIL_BORRAR_HTML_pID(["btnMenu1a"]);
    await UTIL_BORRAR_HTML_pID(MenuP_IDs);
}

