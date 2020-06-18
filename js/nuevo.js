let PANTALLA_NUEVO = false;
let htmlPantallaNuevo = ["<div id='NUEVA-RECTANGULO-FONDO' class='NUEVA-RECTANGULO-FONDO'>"+
"<P id='NUEVA-TXT-TITULO' class='NUEVA-TXT-TITULO'>NUEVA SOLICITUD</P>"+
"<P  id='NUEVA-TXT-FECHA' class='NUEVA-TXT-FECHA' required>FECHA:</P>"+
"<INPUT type='date'  id='NUEVA-INPUT-FECHA' class='NUEVA-INPUT-FECHA' > </INPUT>"+
"<P  id='NUEVA-TXT-DESCRIPCION' class='NUEVA-TXT-DESCRIPCION'>DESCRIPCÍON:</P>"+
"<textarea  id='NUEVA-TXTTAREA-DESCRIPCION' class='NUEVA-TXTTAREA-DESCRIPCION' cols='30' rows='10' maxlength='100' required></textarea>"+
"<p  id='NUEVA-TXT-ESTADO' class='NUEVA-TXT-ESTADO'>ESTADO:</p>"+
"<select  id='NUEVA-INPUTLIST-ESTADO' class='NUEVA-INPUTLIST-ESTADO' required>"+
"    <option value='Abierta'>Abierta</option>"+
"    <option value='En progreso'>En progreso</option>"+
"    <option value='Cerrada'>Cerrada</option>"+
"</select>"+
"<div  id='NUEVA-RECTANGULO-BTN-CANCELAR' class='NUEVA-RECTANGULO-BTN-CANCELAR' >CANCELAR</div>"+
"<div  id='NUEVA-RECTANGULO-BTN-ACEPTAR' class='NUEVA-RECTANGULO-BTN-ACEPTAR' >ACEPTAR</div>"+
"</div>"];




async function CARGAR_PANTALLA_NUEVO(){
    //evento del boton "nuevo"
    await dibujarPantallaNuevo();
    await EVENTOS_PANTALLA_NUEVO();
}




function dibujarPantallaNuevo(){
    dibujarMenuMS;
    const inicial = document.getElementById("ultimo").parentNode;

    console.log("dibujando pantalla nuevo");
    htmlPantallaNuevo.forEach(async function(item){
        console.log("agregando items de pantalla nuevo");
        await inicial.insertAdjacentHTML("beforeEnd",item);
    })
}




async function BORRAR_PANTALLA_NUEVO(){
    try{
        document.getElementById("NUEVA-RECTANGULO-FONDO").remove();
    }catch{
        console.log("no se puedo borrar la pantalla de 'NUEVO'");
    }
}




function EVENTOS_PANTALLA_NUEVO(){
    document.getElementById("NUEVA-RECTANGULO-BTN-ACEPTAR").addEventListener("click",async function(){

        let fecha = document.getElementById("NUEVA-INPUT-FECHA").value;
        console.log("la fecha es->"+fecha);

        let desc = document.getElementById("NUEVA-TXTTAREA-DESCRIPCION").value;
        console.log("la descripción es->"+desc);

        let estado = document.getElementById("NUEVA-INPUTLIST-ESTADO").value;
        console.log("la estado es->"+estado);
        if(fecha == "" || desc=="" || estado==""){
            console.log("no se cargaron todos los datos");
        }else{
            await DB_agregar_item("nuevo",fecha,desc,estado);
            await BORRAR_PANTALLA_NUEVO();
            
            MENU_borrar_botones();
            MS_salir();
            MenuMS_salir();
            MS_cargar();
        }

    });

    document.getElementById("NUEVA-RECTANGULO-BTN-CANCELAR").addEventListener("click",BORRAR_PANTALLA_NUEVO);
}

function MSnuevo_salir(){
    BORRAR_PANTALLA_NUEVO();
}