class misSolicitudes extends pantalla{
    static menuAsociado = Menu_misSolicitudes;
    static ids_general = ["contenedorDeSolicitudes","tabla"];
    static html_general = ["<div id='contenedorDeSolicitudes' class='contenedorDeSolicitudes'>"+

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
            "</table></div>"];
    static evento = {};

    static eventos = async function(){
            // await DB_traer_JSON_MS();

            await MS_TABLA_dibujar_items(this);
        
            document.getElementById("checkAll").addEventListener("click",function(){
                MS_check_All
            });
    }

}






let itemIndex = 0;


let todosSeleccionados = false;



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





async function MS_TABLA_dibujar_items(pantalla){
    for(let i = 0;i<DB_MS_solicitudes.length;i++){
        let itemID = ""+DB_MS_solicitudes[i][0]
        let fecha = ""+DB_MS_solicitudes[i][2];
        let desc = ""+DB_MS_solicitudes[i][3];
        let estado = ""+DB_MS_solicitudes[i][4];
        let usuario = ""+DB_MS_solicitudes[i][5];
        if(usuario_actual!=null && usuario_actual!=undefined && usuario_actual==usuario){
            MS_agregar_a_lista(itemID,fecha,desc,estado);
        }
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




async function MS_TABLA_agregar_desde_DB(){
    if(DB_MS_solicitudes.length>0){
        for(let i = 0;i<DB_MS_solicitudes.length;i++){
            MS_agregar_a_lista(DB_MS_solicitudes[i][0],DB_MS_solicitudes[i][2],DB_MS_solicitudes[i][3],DB_MS_solicitudes[i][4]);
        }
    }else{
        console.log("nada que agregar")
    }
}
