'use strict';
let botones = false;
let MENU_IDs =[
    "btnMenu2a",
    "btnMenu3a",
    "btnMenu4a",
    "btnMenu5a"
];
const itemsMenu = [
"<div id='btnMenu1a' class='botonMenu'></div>"];
let BOTONES_mis_solicitudes=[
"<div id='btnMenu2a' class='botonNuevo'>NUEVO</div>",
"<div id='btnMenu3a' class='botonModificar'>MODIFICAR</div>",
"<div id='btnMenu4a' class='botonEliminar'>ELIMINAR</div>",
"<div id='btnMenu5a' class='botonSalir'>SALIR</div>"];

let BOTONES_solicitud = [
    "<div id='btnMenu2a' class='botonNuevo'>NUEVO</div>",
    "<div id='btnMenu3a' class='botonModificar'>MODIFICAR</div>",
    "<div id='btnMenu4a' class='botonEliminar'>ELIMINAR</div>",
    "<div id='btnMenu5a' class='botonSalir'>SALIR</div>"];

function MenuMS_cargar(){
    console.log("dibujando Menu");
    //document.getElementById("rectangulo-superior-flotante").insertAdjacentHTML("beforeend",
    const inicial = document.getElementById("rectangulo-superior-flotante");
    // const inicial = document.getElementById("ultimo").parentNode;
    itemsMenu.forEach(function(item){
        inicial.insertAdjacentHTML("beforeend",item);
    })
    MENU_evento_boton_Menu();
}

function MENU_evento_boton_Menu(){
    document.getElementById("btnMenu1a").addEventListener("click",MenuMS_mostrar);
}

async function MenuMS_mostrar(){
    console.log("menu");
    if(botones){
        MENU_borrar_botones();
        botones=false;
    }else{
        MENU_MS_dibujar_botones();
        botones=true;
    }
}

async function MENU_MS_dibujar_botones(){

    const inicial = document.getElementById("ultimo").parentNode;

    console.log("dibujando Botones");
    BOTONES_mis_solicitudes.forEach(async function(item){
        console.log("agregando items de menu");
        await inicial.insertAdjacentHTML("beforeEnd",item);
    })
    document.getElementById("btnMenu2a").addEventListener("click",async function(){
        MENU_borrar_botones();
        botones=false;
        await CARGAR_PANTALLA_NUEVO();
        await dibujarMenuMS();
    });
    document.getElementById("btnMenu3a").addEventListener("click",function(){
        if(DB_MS_seleccionados.length<1){
            const alert = new alerta();
            MENU_borrar_botones();
            MS_salir();
            MenuMS_salir();
            MenuMS_salir();
            alert.mostrar("Debe seleccionar al menos un item,\nsi selecciona mas de uno, solo se tomara el primero");
            setTimeout(function(){
                MS_cargar();
            },3000);
        }else{
            MENU_borrar_botones();
            botones=false;
            MS_modificar_cargar()
        }
    });
    document.getElementById("btnMenu4a").addEventListener("click",function(){
        if(DB_MS_seleccionados.length<1){
            const alert = new alerta();
            MENU_borrar_botones();
            MS_salir();
            MenuMS_salir();
            MenuMS_salir();
            alert.mostrar("Debe seleccionar al menos un item");
            setTimeout(function(){
                MS_cargar();
            },3000);
        }else{
            MENU_borrar_botones();
            botones=false;
            DB_borrar_seleccionados();
        }
    });
    document.getElementById("btnMenu5a").addEventListener("click",async function(){
        MS_salir();
        MenuMS_salir();
        await INDEX_CARGAR();
        INDEX_ocultar_bienvenida();
        await LOGIN_cargar();
    });
}

async function MENU_borrar_botones(){
    //borra excepto el boton "MENU"
    botones = false;
    console.log("borrando Botones");
    UTIL_BORRAR_HTML_pID(MENU_IDs);
}


function MenuMS_salir(){
    MENU_borrar_botones();
    UTIL_BORRAR_HTML_pID(["btnMenu1a"]);
}