class misSolicitudes_nuevo extends pantalla{
    static punto_inicial = "contenedor";
    static menuAsociado = menu_especial;
    static ids_general = ["uNUEVA-RECTANGULO-FONDO"];
    static html_general = ["<div id='uNUEVA-RECTANGULO-FONDO' class='NUEVA-RECTANGULO-FONDO'>"+
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
    static evento = {};

    static eventos = function(){
        //cancelar
        document.getElementById("NUEVA-RECTANGULO-BTN-CANCELAR").addEventListener("click",function(){
            misSolicitudes_nuevo.salir();
        });

        //aceptar
        document.getElementById("NUEVA-RECTANGULO-BTN-ACEPTAR").addEventListener("click",async function(){

            let fecha = document.getElementById("NUEVA-INPUT-FECHA").value;
            // console.log("la fecha es->"+fecha);

            let desc = document.getElementById("NUEVA-TXTTAREA-DESCRIPCION").value;
            // console.log("la descripción es->"+desc);

            let estado = document.getElementById("NUEVA-INPUTLIST-ESTADO").value;
            // console.log("la estado es->"+estado);

            if(fecha == "" || desc=="" || estado==""){
                //----------------- mostrar pantalla de error
                console.log("no se cargaron todos los datos");
            }else{
                await DB_agregar_item(MS_indice(),"nuevo",fecha,desc,estado,usuario_actual);
                // menu_mostrar_ocultar(Menu_misSolicitudes);
                misSolicitudes_nuevo.salir();
                misSolicitudes.salir();
                misSolicitudes.cargar();
            }

        });

    }
}






// let PANTALLA_NUEVO = false;
 
/*

async function CARGAR_PANTALLA_NUEVO(){
    pantalla_cargar(EVENTOS_PANTALLA_NUEVO,m-isSolicitudes_nuevo);
}




async function EVENTOS_PANTALLA_NUEVO(pan){
    // await dibujarPantallaNuevo(pan);
    //cancelar
    document.getElementById("NUEVA-RECTANGULO-BTN-CANCELAR").addEventListener("click",function(){
        pantalla_salir(misSolicitudes_nuevo);
    });
    //aceptar
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
            
            // MENU_misSolicitudes_borrarBotones();
            menu_mostrar_ocultar(menu_MS);
            pantalla_salir(pantalla_misSolicitudes);
            pantalla_misSolicitudes.salir();

            // SALIR_menu_misSolicitudes();
            MS_cargar();
        }

    });
}




function MSnuevo_salir(){
    BORRAR_PANTALLA_NUEVO();
}
*/