const debug = false;
let logs = [];
let JSON_Cargado = false;
let SELECCION_A_MODIFICAR;


function UTIL_BORRAR_HTML_pID(ids,info){
    
    let  estados = [];
    for(let i = 0;i<ids.length;i++){
        try {
            document.getElementById(ids[i]).removeEventListener("click",function(){});
        } catch (error) {
            if(debug){
                console.log("no hay evento para eliminar");
            }
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
            logs.push("error dibujando items->"+error);
        }
    });
}




function UTIL_dibujar_HTML2(posicion,html){
    let pos = document.getElementById(posicion);
    html.forEach(function(item){
        try {
            pos.insertAdjacentHTML("afterend",item);
        } catch (error) {
            if(debug){
                console.log("error dibujando items->"+error);
            }
        }
    });
}




function UTIL_agregarEvento_pID(lista){
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
    if(debug){
        console.log("UTIL: modificaciones de los eventos(quitar)");
        console.log(resultado);
        console.log("---------------"+info+"-----------------");
    }
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



class menu{
    static estado = false;
    static pos_inicial = "";
    static ultimo = "ultimo";
    static id_menu =[];
    static html_menu =[];
    static ids_botones =[];
    static html_botones=[];
    static eventoMenu = function(){console.log("menu sin eventos")}
}



function menu_mostrar_ocultar(menu){
    const inicial = document.getElementById(menu.id_menu).parentNode;
    if(inicial != null){
        if(menu.estado){
            UTIL_BORRAR_HTML_pID(menu.ids_botones);
            menu.estado=false;
        }else{
            menu.html_botones.forEach(async function(item){
                console.log("agregando items de menu");
                await inicial.insertAdjacentHTML("beforeEnd",item);
            })
            menu.estado=true;
        }
    }else{
        console.log("inicial no definido");
    }
}



function menu_cargar(eventos, menu){
    const inicial = document.getElementById(menu.pos_inicial);
    if(inicial != null){
    menu.html_menu.forEach(function(item){
        inicial.insertAdjacentHTML("beforeend",item);
    })
    eventos(menu);
    }else{
        console.log("error [punto inicial es nulo]")
    }
}



function menu_salir(menu= new menu()){
    menu.estado = false;
    UTIL_BORRAR_HTML_pID([menu.id_menu]);
    UTIL_BORRAR_HTML_pID(menu.ids_botones);
}
//--------pantalla------------



class pantalla{
    static pantalla_origen = new pantalla();
    static punto_inicial = "contenedor";
    static menuAsociado = new menu();
    static ids_general = [];
    static html_general = [];
    static evento = {};
    static cargar = function(){
        // pantalla_cargar(this.eventos,this);
        const inicial = document.getElementById(this.punto_inicial);
        if(inicial!=null){
            this.html_general.forEach(function(panHtml){
                inicial.insertAdjacentHTML("beforeend",panHtml);
            });
            // await eventos(this);
            this.eventos();
            if(this.menuAsociado!=null){
                menu_cargar(this.menuAsociado.eventoMenu, this.menuAsociado);
            }
            //para utilizar en el menu submenu nuevo modificar
            pantalla_actual = this;
        }else{
            logs.push("el punto inicial de "+this+" no existe o es incorrecto");
        }
    };
    static eventos = {};
    static salir = function(){
        UTIL_BORRAR_HTML_pID(this.ids_general);
        if (this.menuAsociado!=null){
            menu_salir(this.menuAsociado);
        }
    };
    static recargar (){
        this.salir();
        this.cargar();
    }
}

/*
async function pantalla_cargar(eventos, pan){
    const inicial = document.getElementById(pan.punto_inicial);
    if(inicial!=null){
        pan.html_general.forEach(function(panHtml){
            inicial.insertAdjacentHTML("beforeend",panHtml);
        });
        await eventos(pan);
        if(pan.menuAsociado!=null){
            menu_cargar(pan.menuAsociado.eventoMenu, pan.menuAsociado);
        }
        //para utilizar en el menu submenu nuevo modificar
        pantalla_actual = pan;
    }else{
        logs.push("el punto inicial de "+pan.punto_inicial+" no existe o es incorrecto");
    }
}

*/

/*
function pantalla_salir(pan){
    UTIL_BORRAR_HTML_pID(pan.ids_general);
    if (pan.menuAsociado!=null){
        menu_salir(pan.menuAsociado);
    }
}
*/



function Mun_alertar(texto){
    let html = document.getElementById("uNuevo_alerta");
    html.style.borderColor = "red";
    html.textContent = texto;
    setTimeout(function(){
      html.textContent = "";
      html.style.borderColor = "white";
    },8000);
}

