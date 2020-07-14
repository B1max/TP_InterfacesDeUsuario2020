class Menu_misSolicitudes extends Menu_usuarios{
    static eventoMenu = EVENTOS_menu_misSOlicitudes;
}

function Menu_ms_cargar(){
    menu_cargar(EVENTOS_menu_misSOlicitudes, Menu_misSolicitudes);
}



function EVENTOS_menu_misSOlicitudes(menu){
    document.getElementById(menu.id_menu[0]).addEventListener("click",function(){
        menu_mostrar_ocultar(menu);
        if(menu.estado){
            EVENTOS_menu_misSOlicitudes_botonera(menu);
        }
    });
}




function EVENTOS_menu_misSOlicitudes_botonera(mEnu){
    //nuevo
    document.getElementById(mEnu.ids_botones[0]).addEventListener("click",async function(){
        menu_mostrar_ocultar(mEnu);
        // pantalla_cargar(function(){},misSolicitudes_nuevo);
        misSolicitudes_nuevo.cargar();
    });
    //modificar
    document.getElementById(mEnu.ids_botones[1]).addEventListener("click",async function(){
        if(DB_MS_seleccionados.length<1){
            const alert = new alerta();
            menu_mostrar_ocultar(mEnu);
        //----------------------------------?
            misSolicitudes.salir();
            menu_salir(mEnu);
            alert.mostrar("Debe seleccionar al menos un item,\nsi selecciona mas de uno, solo se tomara el primero");
            setTimeout(function(){
                misSolicitudes.cargar();
            },3000);
        }else{
            menu_mostrar_ocultar(mEnu);
            pantalla_modificar_solicitud.cargar();
        }
    });
    //eliminar
    document.getElementById(mEnu.ids_botones[2]).addEventListener("click",function(){
        if(DB_MS_seleccionados.length<1){
            const alert = new alerta();
            menu_mostrar_ocultar(mEnu);
            misSolicitudes.salir();
            menu_salir(mEnu);
            alert.mostrar("Debe seleccionar al menos un item");
            setTimeout(function(){
                misSolicitudes.cargar();
            },3000);
        }else{
            menu_mostrar_ocultar(mEnu);
            DB_borrar_seleccionados();
        }
    });
    //salir
    document.getElementById(mEnu.ids_botones[3]).addEventListener("click",async function(){
        misSolicitudes.salir();
        menu_salir(mEnu);
        await INDEX_CARGAR();
        login.cargar();
    });
}

