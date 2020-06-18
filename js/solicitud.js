let SELECCION_A_MODIFICAR;

function htmlPantallaModificar(fecha,desc,estado){ 
    return ["<div id='NUEVA-RECTANGULO-FONDO' class='NUEVA-RECTANGULO-FONDO'>"+
"<P id='NUEVA-TXT-TITULO' class='NUEVA-TXT-TITULO'>MODIFICAR SOLICITUD</P>"+
"<P  id='NUEVA-TXT-FECHA' class='NUEVA-TXT-FECHA' required >FECHA:</P>"+
"<INPUT type='date'  id='NUEVA-INPUT-FECHA' class='NUEVA-INPUT-FECHA' defaultValue='"+fecha+"'> </INPUT>"+
"<P  id='NUEVA-TXT-DESCRIPCION' class='NUEVA-TXT-DESCRIPCION'>DESCRIPCÍON:</P>"+
"<textarea  id='NUEVA-TXTTAREA-DESCRIPCION' class='NUEVA-TXTTAREA-DESCRIPCION'" +
"cols='30' rows='10' maxlength='100' required>"+desc+"</textarea>"+
"<p  id='NUEVA-TXT-ESTADO' class='NUEVA-TXT-ESTADO'>ESTADO:</p>"+
"<select  id='NUEVA-INPUTLIST-ESTADO' class='NUEVA-INPUTLIST-ESTADO' required >"+
"    <option value='Abierta'>Abierta</option>"+
"    <option value='En progreso'>En progreso</option>"+
"    <option value='Cerrada'>Cerrada</option>"+
"</select>"+
"<div  id='NUEVA-RECTANGULO-BTN-CANCELAR' class='NUEVA-RECTANGULO-BTN-CANCELAR' >CANCELAR</div>"+
"<div  id='NUEVA-RECTANGULO-BTN-ACEPTAR' class='NUEVA-RECTANGULO-BTN-ACEPTAR' >ACEPTAR</div>"+
"</div>"];
};

async function MS_modificar_cargar(){
    await dibujarPantallaModificar();
}

async function dibujarPantallaModificar(){
    const inicial = document.getElementById("ultimo").parentNode;
    console.log("dibujando pantalla nuevo");
    await MS_modificar_setSel();
    let fecha = SELECCION_A_MODIFICAR[2];
    let desc = SELECCION_A_MODIFICAR[3];
    let estado = SELECCION_A_MODIFICAR[4];
    let item = htmlPantallaModificar(fecha,desc,estado);
    inicial.insertAdjacentHTML("beforeEnd",item);
    document.getElementById("NUEVA-INPUT-FECHA").defaultValue = fecha;
    document.getElementById("NUEVA-INPUT-FECHA").value = fecha;
    document.getElementById("NUEVA-TXTTAREA-DESCRIPCION").value = desc;
    document.getElementById("NUEVA-INPUTLIST-ESTADO").value = estado;

    document.getElementById("NUEVA-RECTANGULO-BTN-CANCELAR").addEventListener("click",BORRAR_PANTALLA_MODIFICAR);
    document.getElementById("NUEVA-TXT-FECHA").addEventListener("click",function(){
        console.log("se cambio la fecha a -> "+document.getElementById("NUEVA-INPUT-FECHA").value);
    });
    document.getElementById("NUEVA-RECTANGULO-BTN-ACEPTAR").addEventListener("click",async function(){

        let val = document.getElementById("NUEVA-INPUT-FECHA").value;
        let mfecha = ""+val;

        console.log("la fecha en el documento es->"+mfecha+"-seleccion: "+SELECCION_A_MODIFICAR[2]);
        console.log("datos del input->"+val);
 
        let mdesc = await document.getElementById("NUEVA-TXTTAREA-DESCRIPCION").value;
        let mestado = await document.getElementById("NUEVA-INPUTLIST-ESTADO").value;
        if(mfecha!="" && mfecha!=undefined && mdesc !="" && mestado !=""){
            SELECCION_A_MODIFICAR[2] = mfecha;
            SELECCION_A_MODIFICAR[3] = mdesc;
            SELECCION_A_MODIFICAR[4] = mestado;
            BORRAR_PANTALLA_MODIFICAR();
            TABLA_recargar_lista();
        }else{
            console.log("algun dato esta mal->"+mfecha+"-"+mdesc+"-"+mestado);
        }
    });

}

function MS_modificar_setSel(){
    if(itemSeleccionados.length>0){
        SELECCION_A_MODIFICAR = itemSeleccionados[0];
    }else{
        return false;
    }
}

function MODIFICAR_SELECCION(){
        for(let e = 0;e<listaDeSolicitudes.length;e++){
            if(listaDeSolicitudes[e][0]==MS_modificar_setSel[0]){
                console.log("borrando item-> "+"item"+MS_modificar_setSel[0])
                // document.getElementById("item"+listaDeSolicitudes[e][0]).remove();
                listaDeSolicitudes[e][2] = ""
                listaDeSolicitudes[e][2] = ""
                listaDeSolicitudes[e][2] = ""
            }
        }
}

function BORRAR_PANTALLA_MODIFICAR(){
    try {
        document.getElementById("NUEVA-RECTANGULO-FONDO").remove();
    } catch (error) {
        console.log("no se puede borrar la pantalla modificar->"+error);
    }

}