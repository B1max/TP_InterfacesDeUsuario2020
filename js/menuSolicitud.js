'use strict';
let botonesMS = false;

let botonesMS_IDs = ["MSbtnMenu","MSbtnMisSolicitudes","MSbtnSalir"];
const itemsMenuMS = ["<div id='MSbtnMenu' class='MSbtnMenu'>MENU</div>"];
let BOTONES_mis_solicitudesMS=[
    "<div id='MSbtnMisSolicitudes' class='MSbtnMisSolicitudes'>Mis Solicitudes</div>",
    "<div id='MSbtnSalir' class='MSbtnSalir'>SALIR</div>"];

let BOTONES_solicitudMS = [
    "<div id='MSbtnMisSolicitudes' class='MSbtnMisSolicitudes'>Mis Solicitudes</div>",
    "<div id='MSbtnSalir' class='MSbtnSalir'>SALIR</div>"];

async function dibujarMenuMS(){
    console.log("dibujando Menu");
    const inicial = document.getElementById("NUEVA-RECTANGULO-BTN-ACEPTAR").parentNode;
    itemsMenuMS.forEach( function(item){
        inicial.insertAdjacentHTML("beforeend",item);
    });
    document.getElementById("MSbtnMenu").addEventListener("click",menuMS);
}

async function menuMS(){
    console.log("menu");
    if(botonesMS){
        borrarBotonesMS();
        botonesMS=false;
    }else{
        dibujarBotonesMS();
        botonesMS=true;
    }
}

async function dibujarBotonesMS(){
    const inicial = document.getElementById("MSbtnMenu");
    console.log("dibujando Botones 1");
    BOTONES_solicitudMS.forEach(async function(item){
        console.log("agregando items de menu");
        await inicial.insertAdjacentHTML("beforeEnd",item);
    })
    document.getElementById("MSbtnMisSolicitudes").addEventListener("click",
    async function(){
        await borrarBotonesMS();
        await BORRAR_PANTALLA_NUEVO();
    });
    document.getElementById("MSbtnSalir").addEventListener("click",async function(){
        MenuMS_salir();
        MSnuevo_salir();
        MS_salir();
        await INDEX_CARGAR();
        INDEX_ocultar_bienvenida();
        await LOGIN_cargar();
    });
}


async function borrarBotonesMS(){
    botonesMS = false;
    console.log("borrando Botones");
    try {
        document.getElementById("MSbtnMisSolicitudes").remove();
        document.getElementById("MSbtnSalir").remove();  
    } catch (error) {
        console.log("no se pudo eliminar el boton");
    }
}

function menuMS_salir(){
    UTIL_BORRAR_HTML_pID(botonesMS_IDs);
}