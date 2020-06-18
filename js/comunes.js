const debug = true;


function UTIL_BORRAR_HTML_pID(ids,info){
    
    let  estados = [];
    for(let i = 0;i<ids.length;i++){
        try {
            document.getElementById(ids[i]).removeEventListener("click",function(){});
        } catch (error) {
            console.log("no hay evento para eliminar");
        }
        try {
            document.getElementById(ids[i]).remove();
            estados.push([i,ids[i],true,""]);
        } catch (error) {
            estados.push([i,ids[i],false,error]);
        }
    }
    if(debug){
        console.log("HTML modificado, se borraron los siguentes IDs")
        console.log(estados);
        console.log("---------------"+info+"-----------------");
    }
}




function UTIL_dibujar_HTML(html){
    html.forEach(function(item){
        try {
            document.body.lastElementChild.insertAdjacentHTML("afterend",item);
        } catch (error) {
            console.log("error dibujando items->"+error);
        }
    });
}




function UTIL_dibujar_HTML2(posicion,html){
    let pos = document.getElementById(posicion);
    html.forEach(function(item){
        try {
            pos.insertAdjacentHTML("afterend",item);
        } catch (error) {
            console.log("error dibujando items->"+error);
        }
    });
}




function UTIL_agregarEvento_pID(lista){
    //lista es [[elementId,evento,funcion][][]]...etc
    let resultado = [];
    for(let i = 0;i<lista.lenght;i++){

        let id = lista[i][0];
        let even = lista[i][1];
        let func = lista[i][2];

        let elemento = document.getElementById(id);

        if(elemento!=null){
            elemento.addEventListener(even,func);
        }else{
            if(debug){
                console.log("UTIL: no se puedo agregar el evento "+even+" al id: "+id);
            }
        }
    }
}




function UTIL_quitarEvento_pID(ids,info){
    //formato de argumento [id,evento]
    let resultado =[];
    for(let i = 0;i<ids.length;i++){
        let id = ids[i][0];
        let even = ids[i][1];
        let item = document.getElementById(id);
        if(item!=null){
            item.removeEventListener(even,function(){});
            resultado.push([id,even,true]);
        }else{
            resultado.push([id,even,false]);
        }
    }
    console.log("UTIL: modificaciones de los eventos(quitar)");
    console.log(resultado);
    console.log("---------------"+info+"-----------------");
}




class alerta{
    alerta(){
    }
    mostrar(texto){
        document.body.firstElementChild.insertAdjacentHTML("beforeend","<div id='alerta' class='alerta'>"+
        "<p id='Palerta' class='Palerta' ></p></div>");
        document.getElementById("Palerta").textContent = ""+texto;
        setTimeout(function(){
            document.getElementById("alerta").remove();
        }
        ,3000);
    }
}
