//principal/usuarios y mis solicitudes
class Menu_usuarios extends menu{
    static pos_inicial = "rectangulo-superior-flotante";

    // static ultimo = "contenedorDeSolicitudes";
    static ultimo = "rectangulo-superior-flotante";



    static id_menu =["MUbtnMenu1a"];

    static html_menu =["<div id='MUbtnMenu1a' class='botonMenu'></div>"];

    static ids_botones =[
        "btnMenu2a",
        "btnMenu3a",
        "btnMenu4a",
        "btnMenu5a"
    ];

    static html_botones=["<div id='btnMenu2a' class='botonNuevo'>NUEVO</div>",
    "<div id='btnMenu3a' class='botonModificar'>MODIFICAR</div>",
    "<div id='btnMenu4a' class='botonEliminar'>ELIMINAR</div>",
    "<div id='btnMenu5a' class='botonSalir'>SALIR</div>"];
    static eventoMenu = MenuUsuarios_evento_btnMenu;
}




//solo eventos

function MenuUsuarios_evento_btnMenu(menu){
    document.getElementById(menu.id_menu[0]+"").addEventListener("click",
    function(){
        menu_mostrar_ocultar(menu);
        if(menu.estado){
            MenuUsuarios_eventos_botonera(menu);
        }
    });
}




function MenuUsuarios_eventos_botonera(menu){
    //Nuevo
    document.getElementById(menu.ids_botones[0]).addEventListener("click",function(){
        menu_mostrar_ocultar(menu);
        Usuario_nuevo.pantalla_origen = pantalla_usuarios;
        Usuario_nuevo.cargar();
    }); 

    //Modificar
    document.getElementById(menu.ids_botones[1]).addEventListener("click",async function(){
        if(USUARIOS_seleccion.length<1){
            menu_mostrar_ocultar(menu);
            pantalla_usuarios.salir();
            const alert = new alerta();
            alert.mostrar("Debe seleccionar al menos un item,\nsi selecciona mas de uno, solo se tomara el primero");
            setTimeout(function(){
                pantalla_usuarios.cargar();
            },3000);
        }else{
            menu_mostrar_ocultar(menu);
            Usuario_modificar.cargar();
        }
    }); 

    //Eliminar
    document.getElementById(menu.ids_botones[2]).addEventListener("click",async function(){
        if(USUARIOS_seleccion.length<1){
            menu_mostrar_ocultar(menu);
            pantalla_usuarios.salir();
            const alert = new alerta();
            alert.mostrar("Debe seleccionar al menos un item");
            setTimeout(function(){
                pantalla_usuarios.cargar();
            },3000);
        }else{
            menu_mostrar_ocultar(menu);
            await USUARIOS_eliminar_seleccion();
            pantalla_usuarios.salir();
            pantalla_usuarios.cargar();
        }
    });

    //salir
    document.getElementById(menu.ids_botones[3]).addEventListener("click",async function(){
        menu_mostrar_ocultar(menu);
        menu_salir(menu);
        pantalla_usuarios.salir()
        login.cargar();
    });
}
