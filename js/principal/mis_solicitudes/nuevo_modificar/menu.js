//eventos para submenu nuevo modificar de mis solicitudes
class menu_especial extends menu_usuario_nuevo{
    static eventoMenu = MS_menu_nuevo_modificar;
}
function MS_menu_nuevo_modificar(){
    document.getElementById(menu_especial.id_menu[0]).addEventListener("click",function(){
        menu_mostrar_ocultar(menu_especial);
        if(menu_especial.estado){
            MS_eventos_botones();
        }
    });
}


async function MS_eventos_botones(){
    //mis solicitudes
    document.getElementById(menu_especial.ids_botones[0]).addEventListener("click",
    async function(){
        menu_mostrar_ocultar(menu_especial);
        pantalla_actual.salir();
    });

    // usuarios
    document.getElementById(menu_especial.ids_botones[1]).addEventListener("click",async function(){
        menu_mostrar_ocultar(menu_especial);
        pantalla_actual.salir();
        misSolicitudes.salir();
        pantalla_usuarios.cargar();
    });

    //salir
    document.getElementById(menu_especial.ids_botones[2]).addEventListener("click",async function(){
        menu_salir(menu_especial);
        pantalla_actual.salir();
        pantalla_usuarios.salir();
        login.cargar();
    });

}
