'use strict';
//principal/usuarios/nuevo-modificar

class menu_usuario_nuevo extends menu {
    static pos_inicial = "uNUEVA-RECTANGULO-FONDO";
    static ultimo = "uNUEVA-RECTANGULO-FONDO";

    static id_menu =["uNUEVO-menu"];
    static html_menu =["<div id='uNUEVO-menu' class='uNUEVO-menu'>MENU</div>"];
    static ids_botones =["MunbtnMisSolicitudes","MunbtnUsuarios","MunbtnSalir"];
    static html_botones=["<div id='MunbtnMisSolicitudes' class='MunbtnMisSolicitudes'>Mis Solicitudes</div>",
    "<div id='MunbtnUsuarios' class='MunbtnUsuarios'>Usuarios</div>",
    "<div id='MunbtnSalir' class='MunbtnSalir'>Salir</div>"];
    static eventoMenu = MenuUN_eventos;
}




async function MenuUN_cargar(){
    menu_cargar(MenuUN_eventos,menu_usuario_nuevo);
}



//------------------------solo para usuarios-----------------------------
function MenuUN_eventos(){
    document.getElementById(menu_usuario_nuevo.id_menu[0]).addEventListener("click",function(){
        menu_mostrar_ocultar(menu_usuario_nuevo);
        if(menu_usuario_nuevo.estado){
            MenuUN_eventos_botones();
        }
    });
}




async function MenuUN_eventos_botones(){
    //mis solicitudes
    document.getElementById(menu_usuario_nuevo.ids_botones[0]).addEventListener("click",
    async function(){
        menu_mostrar_ocultar(menu_usuario_nuevo);
        pantalla_actual.salir();
        pantalla_usuarios.salir();
        misSolicitudes.cargar();
    });
    // usuarios
    document.getElementById(menu_usuario_nuevo.ids_botones[1]).addEventListener("click",async function(){
        menu_mostrar_ocultar(menu_usuario_nuevo);
        pantalla_actual.salir();
    });
    //salir
    document.getElementById(menu_usuario_nuevo.ids_botones[2]).addEventListener("click",async function(){
        menu_salir(menu_usuario_nuevo);
        pantalla_actual.salir();
        pantalla_usuarios.salir();
        login.cargar();
    });

}

