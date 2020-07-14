//pantalla/mis solicitudes / modificar
class pantalla_modificar_solicitud extends pantalla{
    static punto_inicial = "contenedor";
    static menuAsociado = menu_especial;
    static ids_general = ["uNUEVA-RECTANGULO-FONDO"];
    static html_general = ["<div id='uNUEVA-RECTANGULO-FONDO' class='NUEVA-RECTANGULO-FONDO'>"+
    "<P id='NUEVA-TXT-TITULO' class='NUEVA-TXT-TITULO'>MODIFICAR SOLICITUD</P>"+
    "<P  id='NUEVA-TXT-FECHA' class='NUEVA-TXT-FECHA' required >FECHA:</P>"+
    "<INPUT type='date'  id='NUEVA-INPUT-FECHA' class='NUEVA-INPUT-FECHA' value=''> </INPUT>"+
    "<P  id='NUEVA-TXT-DESCRIPCION' class='NUEVA-TXT-DESCRIPCION'>DESCRIPCÍON:</P>"+
    "<textarea  id='NUEVA-TXTTAREA-DESCRIPCION' class='NUEVA-TXTTAREA-DESCRIPCION'" +
    "cols='30' rows='10' maxlength='100' required></textarea>"+
    "<p  id='NUEVA-TXT-ESTADO' class='NUEVA-TXT-ESTADO'>ESTADO:</p>"+
    "<select  id='NUEVA-INPUTLIST-ESTADO' class='NUEVA-INPUTLIST-ESTADO' required >"+
    "    <option value='Abierta'>Abierta</option>"+
    "    <option value='En progreso'>En progreso</option>"+
    "    <option value='Cerrada'>Cerrada</option>"+
    "</select>"+
    "<div  id='NUEVA-RECTANGULO-BTN-CANCELAR' class='NUEVA-RECTANGULO-BTN-CANCELAR' >CANCELAR</div>"+
    "<div  id='NUEVA-RECTANGULO-BTN-ACEPTAR' class='NUEVA-RECTANGULO-BTN-ACEPTAR' >ACEPTAR</div>"+
    "</div>"];
    static evento = {};
    static eventos = async function(){
        await MS_modificar_setSel();
        await MS_cargar_seleccion();

        //cancelar;

        document.getElementById("NUEVA-RECTANGULO-BTN-CANCELAR").addEventListener("click",function(){
            pantalla_modificar_solicitud.salir();
            DB_MS_seleccionados =[];
        });

        //aceptar;

        document.getElementById("NUEVA-RECTANGULO-BTN-ACEPTAR").addEventListener("click",async function(){
            await MS_modificar_guardar();
            pantalla_modificar_solicitud.salir();
            misSolicitudes.salir();
            misSolicitudes.cargar();
            DB_MS_seleccionados =[];
        });

    };
}





async function MS_cargar_seleccion(){
    const origen = DB_MS_solicitudes[DB_MS_seleccionados[0]];
    let fecha = origen[2];
    let desc = origen[3];
    let estado = origen[4];
    
    document.getElementById("NUEVA-INPUT-FECHA").value = fecha;
    document.getElementById("NUEVA-TXTTAREA-DESCRIPCION").textContent = ""+desc;
    document.getElementById("NUEVA-INPUTLIST-ESTADO").value = estado;
}





async function MS_modificar_guardar(){
    let val = document.getElementById("NUEVA-INPUT-FECHA").value;
    let mfecha = ""+val;

    let mdesc = await document.getElementById("NUEVA-TXTTAREA-DESCRIPCION").value;
    let mestado = await document.getElementById("NUEVA-INPUTLIST-ESTADO").value;

    if(mfecha!="" && mfecha!=undefined && mdesc !="" && mestado !=""){
        const origen = DB_MS_solicitudes[DB_MS_seleccionados[0]];
        origen[2] = mfecha;
        origen[3] = mdesc;
        origen[4] = mestado;
        DB_MS_seleccionados = [];
    }else{
        console.log("algun dato esta mal->"+mfecha+"-"+mdesc+"-"+mestado);
    }
}




function MS_modificar_setSel(){
    if(DB_MS_seleccionados.length>0){
        SELECCION_A_MODIFICAR = DB_MS_seleccionados[0];
        return true;
    }else{
        return false;
    }
}

