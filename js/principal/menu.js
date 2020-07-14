class menu_principal extends menu{
    static estado = false;
    static eventoMenu = MenuP_evento_btnMenu;
    static ultimo = "btnMenu1a";
    static pos_inicial =  "rectangulo-superior-flotante";

    static ids_botones = [
        "btnMenu2a",
        "btnMenu3a",
        "btnMenu4a"
    ];


    static id_menu =["btnMenu1a"];


    static html_menu =[
        "<div id='btnMenu1a' class='botonMenu'></div>"
    ];

    static  html_botones =[
        "<div id='btnMenu2a' class='botonNuevo'>Mis Solicitudes</div>",
    "<div id='btnMenu3a' class='botonModificar'>Usuarios</div>",
    "<div id='btnMenu4a' class='botonEliminar'>Salir</div>",

    ];
}


async function MenuP_cargar(){
    menu_cargar(MenuP_evento_btnMenu, menu_principal);
}



function MenuP_evento_btnMenu(mEnu){
    document.getElementById(mEnu.id_menu[0]).addEventListener("click",function(){
       menu_mostrar_ocultar(menu_principal);
       if(menu_principal.estado){
           MenuP_eventos_botonera(mEnu);
       }
    });
}




function MenuP_eventos_botonera(mEnu){
    
        //mis solicitudes
        document.getElementById(mEnu.ids_botones[0]).addEventListener("click",function(){
            principal.salir();
            misSolicitudes.cargar();
            INDEX_ocultar_bienvenida();
        }); 

        //Usuarios
        document.getElementById(mEnu.ids_botones[1]).addEventListener("click",function(){
            principal.salir();
            pantalla_usuarios.cargar();
        }); 

        //salir
        document.getElementById(mEnu.ids_botones[2]).addEventListener("click",function(){
       menu_mostrar_ocultar(mEnu);
            principal.salir();
            INDEX_CARGAR();
        });
}



