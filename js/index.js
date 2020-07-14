let pantalla_actual = new pantalla();

let INDEX_IDs =["index0","BotonLogear","index2"];



let INDEX_html =[
    "<p id='index0' class='texto-bienvenida'>Bienvenidos al departamento de acompañamiento de alumnos de la universidad"+
    "</p>"+
    "</div>"+
    "<div id='BotonLogear' class='texto-login' >LOGEAR</div>"+""
];



let INDEX_html2 = [
    "<div id='index2' class='rectangulo-info-inferior'>"+
    "<div id='index1' class='texto-rectangulo-inferior'>"+
        "Nuevos horarios de atención !!! <br> DE 2 A 3 AM !!!"+
    "</div>"+
    "</div>"
];



INDEX_CARGAR();



async function INDEX_CARGAR(){
    await INDEX_mostrar_bienvenida();
    document.getElementById("ultimo").insertAdjacentHTML("beforebegin",
    "<div id='BotonLogear' class='texto-login' >LOGEAR</div>"
    )
    
    document.getElementById("BotonLogear").addEventListener("click",async function(){
        INDEX_salir();
        login.cargar();
     });

    await document.getElementById("rectangulo-superior-flotante").parentNode.insertAdjacentHTML("afterend",
    "<div id='index2' class='rectangulo-info-inferior'>"+
    "<div id='index1' class='texto-rectangulo-inferior'>"+
        "Nuevos horarios de atención !!! <br> DE 2 A 3 AM !!!"+
    "</div>"+
    "</div>");

    DB_MS_seleccionados=[];
}




async function INDEX_salir(){
    await UTIL_BORRAR_HTML_pID(INDEX_IDs);
}




function INDEX_ocultar_bienvenida(){
    UTIL_BORRAR_HTML_pID(["index0","index2"]);
}




async function INDEX_mostrar_bienvenida(){
    await document.getElementById("rectangulo-superior-flotante").parentNode.insertAdjacentHTML("beforeEnd",""+
    "<p id='index0' class='texto-bienvenida'>Bienvenidos al departamento de acompañamiento de alumnos de la universidad"+
    "</p>"+
    "</div>");
}
