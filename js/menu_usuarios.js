let MenuUsuarios_activado = false;

const MenuUsuarios_IDs = [
    "MUbtnMenu2a",
    "MUbtnMenu3a",
    "MUbtnMenu4a",
    "MUbtnMenu5a"
];

const MenuUsuarios_ID_btnMenu = ["MUbtnMenu1a"];
const MenuUsuarios_html_boton_menu =[
    "<div id='MUbtnMenu1a' class='botonMenu'></div>"
];

const MenuUsuarios_html_botones =[
    "<div id='MUbtnMenu2a' class='botonNuevo'>NUEVO</div>",
"<div id='MUbtnMenu3a' class='botonModificar'>Modificar</div>",
"<div id='MUbtnMenu4a' class='botonEliminar'>Eliminar</div>",
"<div id='MUbtnMenu5a' class='botonSalir'>Salir</div>"

];




async function MenuUsuarios_cargar(){
    document.getElementById("rectangulo-superior-flotante").insertAdjacentHTML("beforeend",MenuUsuarios_html_boton_menu[0]);
    // await UTIL_dibujar_HTML(MenuUsuarios_html_boton_menu);
    MenuUsuarios_evento_btnMenu();
}




function MenuUsuarios_botonera(){
    if(MenuUsuarios_activado == true ){
        MenuUsuarios_activado = false;
        UTIL_BORRAR_HTML_pID(MenuUsuarios_IDs);
    }else{
        MenuUsuarios_activado = true;
        UTIL_dibujar_HTML(MenuUsuarios_html_botones);
        MenuUsuarios_eventos_botonera();
    }
}




function MenuUsuarios_evento_btnMenu(){
    document.getElementById("MUbtnMenu1a").addEventListener("click",MenuUsuarios_botonera);
}




function MenuUsuarios_eventos_botonera(){
        //Nuevo
        document.getElementById("MUbtnMenu2a").addEventListener("click",function(){
            MenuUsuarios_botonera();
            console.log("Nuevo");
            UsuarioN_cargar();
        }); 
        //Modificar
        document.getElementById("MUbtnMenu3a").addEventListener("click",async function(){
            if(USUARIOS_seleccion.length<1){
                MenuUsuarios_botonera();
                USUARIOS_salir();
                const alert = new alerta();
                alert.mostrar("Debe seleccionar al menos un item,\nsi selecciona mas de uno, solo se tomara el primero");
                setTimeout(function(){
                    USUARIOS_cargar();
                },3000);
            }else{
                MenuUsuarios_botonera();
                console.log("Modificar");
                Umodificar_cargar();
            }
        }); 
        //Eliminar
        document.getElementById("MUbtnMenu4a").addEventListener("click",async function(){
            if(USUARIOS_seleccion.length<1){
                MenuUsuarios_botonera();
                USUARIOS_salir();
                const alert = new alerta();
                alert.mostrar("Debe seleccionar al menos un item");
                setTimeout(function(){
                    USUARIOS_cargar();
                },3000);
            }else{
                MenuUsuarios_botonera();
                console.log("Eliminar");
                await USUARIOS_eliminar_seleccion();
            }
        //   await USUARIOS_recargar_tabla();
        });
        //salir
        document.getElementById("MUbtnMenu5a").addEventListener("click",async function(){
            MenuUsuarios_botonera();
            console.log("Salir");
            await MenuUsuarios_salir();
            await INDEX_CARGAR();
      });
}




function MenuUsuarios_salir(){
    if(MenuUsuarios_activado){
        MenuUsuarios_activado = false;
    //    await UTIL_BORRAR_HTML_pID(MenuUsuarios_IDs,"MenuUsuarios_salir");
        // UTIL_BORRAR_HTML_pID(MenuUsuarios_IDs);
    }
    UTIL_BORRAR_HTML_pID(MenuUsuarios_ID_btnMenu);
    // UTIL_BORRAR_HTML_pID(["MUbtnMenu1a"]);
    UTIL_BORRAR_HTML_pID(MenuUsuarios_IDs);
    UTIL_BORRAR_HTML_pID(["contenedorDeSolicitudes"]);
}

