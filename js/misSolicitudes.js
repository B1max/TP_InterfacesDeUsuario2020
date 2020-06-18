let itemIndex = 0;
let todosSeleccionados = false;
let JSON_Cargado = false;
let MS_IDs = [
    "contenedorDeSolicitudes","tabla"
];
let MS_html = [
    "<div id='contenedorDeSolicitudes' class='contenedorDeSolicitudes'>"+

    "<table id='tabla' class='tabla'>"+
                "<tr>"+
                    "<td class='colCheck'>"+
                        "<input type='checkbox' id='checkAll' class='check'>"+
                    "</td>"+
                    "<td class='colFecha'>"+
                        "Fecha"+
                    "</td>"+
                    "<td class='colDescripcion'>Descripción</td>"+
                    "<td class='colEstado'>Estado</td>"+
                "</tr>"+
            "</table></div>"
];
let misSolicitudesInicial = document.getElementById("ultimo");
let tabla;
let checkAll ;
let checkAllState = false;


async function MS_cargar(){
    PP_borrarBienvenida()
    MS_salir();
    MenuMS_cargar();
    await DB_traer_JSON_MS();
    await MS_TABLA_dibujarEstructura();
    checkAll = document.getElementById("checkAll");
    tabla = document.getElementById("tabla");
    await MS_TABLA_dibujar_items();
    await MS_eventos();
}



async function MS_eventos(){
    await UTIL_quitarEvento_pID([["checkAll","click"]],"MisSolicitudesEventos");
    document.getElementById("checkAll").addEventListener("click",MS_check_All);
    let checks = [];
    console.log(checks);
}



function MS_check_All(){
    if(todosSeleccionados){
        DB_MS_seleccionados = [];
        todosSeleccionados = false;
    }else{
        DB_MS_seleccionados = DB_MS_solicitudes;
        todosSeleccionados = true;
    }
    for(let i = 0;i<DB_MS_solicitudes.length;i++){
        document.getElementById("check"+DB_MS_solicitudes[i][0]).checked = todosSeleccionados;
    }
}



async function MS_TABLA_dibujarEstructura(){
    MS_html.forEach(item =>{
        misSolicitudesInicial.insertAdjacentHTML("AfterEnd",item);
    });
}


function MS_TABLA_borrar(){
    UTIL_BORRAR_HTML_pID(["tabla"]);
}


async function MS_TABLA_dibujar_items(){
    for(let i = 0;i<DB_MS_solicitudes.length;i++){
        let itemID = ""+DB_MS_solicitudes[i][0]
        let fecha = ""+DB_MS_solicitudes[i][2];
        let desc = ""+DB_MS_solicitudes[i][3];
        let estado = ""+DB_MS_solicitudes[i][4];
        MS_agregar_a_lista(itemID,fecha,desc,estado);
    }
}


async function MS_TABLA_agregar_desde_DB(){
    if(DB_MS_solicitudes.length>0){
        for(let i = 0;i<DB_MS_solicitudes.length;i++){
            MS_agregar_a_lista(DB_MS_solicitudes[i][0],DB_MS_solicitudes[i][2],DB_MS_solicitudes[i][3],DB_MS_solicitudes[i][4]);
        }
    }else{
        console.log("nada que agregar")
    }
}


function MS_agregar_a_lista(id,fecha,descripcion,estado){
    document.getElementById("tabla").insertAdjacentHTML("beforeEnd","<tr id='item"+id+"'>"+
    "<td class='colCheck'>"+
        "<input type='checkbox' id='check"+id+"' class='check'>"+
    "</td>"+
    "<td id='colFecha"+id+"' class='colFecha'>"+fecha+"</td>"+
    "<td id='colDescripcion"+id+"' class='colDescripcion'>"+descripcion+"</td>"+
    "<td id='colEstado"+id+"' class='colEstado'>"+estado+"</td></tr>");
    document.getElementById("check"+id).addEventListener("click",function(){
         console.log("item seleccionado y agregado");
        if(document.getElementById("check"+id).checked){
            DB_MS_seleccionados.push(id);
        }else{
            DB_MS_seleccionados.splice(id,1);
        }
        console.log(DB_MS_seleccionados);
    })

}


function MS_salir(){
    //llamar con await
    for(let i = 0;i<DB_MS_solicitudes.length;i++){
        try{
            let id = DB_MS_solicitudes[i][0];
            document.getElementById("item"+id).remove();
            document.getElementById("check"+id).remove();
            document.getElementById("colFecha"+id).remove();
            document.getElementById("colDescripcion"+id).remove();
            document.getElementById("colEstado"+id).remove();
        }catch(error){
            console.log("Error borrando HTMLs->"+error)
        }
    }
    UTIL_BORRAR_HTML_pID(MS_IDs);
}