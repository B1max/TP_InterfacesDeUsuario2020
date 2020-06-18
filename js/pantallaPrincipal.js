const PP_IDs = ["DIV_PPimgBienvenida"];
const PP_HTML = ["<div id='DIV_PPimgBienvenida' class ='DIV_PPimgBienvenida'></div>"];


async function PP_cargar(){
  // INDEX_salir();
  await MenuP_cargar();
  await PP_mostrarBienvenida();
}


function PP_salir(){
  MenuP_salir();
  PP_borrarBienvenida();
}


function PP_mostrarBienvenida(){
  document.getElementById("rectangulo-superior-flotante").parentNode.insertAdjacentHTML("afterEnd","<div id='DIV_PPimgBienvenida' class ='DIV_PPimgBienvenida'></div>");
}


function PP_borrarBienvenida(){
  UTIL_BORRAR_HTML_pID(PP_IDs,"PP_borrarBienvenida");
}