const USUARIOS_IDs = [
  "contenedorDeSolicitudes","tabla","MUbtnMenu1a"
];


let UtodosSeleccionados = false;


const USUARIOS_html = [
  "<div id='contenedorDeSolicitudes' class='contenedorDeSolicitudes'>"+
  "<table id='tabla' class='tabla'>"+
              "<tr>"+
                  "<td class='colCheck'>"+
                      "<input type='checkbox' id='UcheckAll' class='check'>"+
                  "</td>"+
                  "<td class='colFecha'>"+
                      "Avatar"+
                  "</td>"+
                  "<td class='colDescripcion'>Nombre</td>"+
                  "<td class='colEstado'>Estado</td>"+
              "</tr>"+
          "</table></div>"
];



async function USUARIOS_cargar(){
  // falta cargar menu();
  await MenuUsuarios_cargar();
  UTIL_BORRAR_HTML_pID(PP_IDs,"PP_borrarBienvenida");
  await DB_traer_JSON_USERS();
  
  USUARIOS_mostrar_encabezado();
  await USUARIOS_mostrar_usuarios();
  USUARIOS_eventos();
}




function USUARIOS_eventos(){
  // document.getElementById("UcheckAll").removeEventListener("click",function(){});
  document.getElementById("UcheckAll").addEventListener("click", function(){
    //codigo chheckall

      if(UtodosSeleccionados){
        USUARIOS_seleccion = [];
        UtodosSeleccionados = false;
      }else{
        USUARIOS_seleccion = [];
        for(let i = 0;i<USUARIOS.length;i++){
          USUARIOS_seleccion.push(i);
        }
        UtodosSeleccionados = true;
      }
      for(let i = 0;i<USUARIOS.length;i++){
          document.getElementById("userCheck"+i).checked = UtodosSeleccionados;
      }

  });
}




function USUARIOS_mostrar_encabezado(){
  UTIL_dibujar_HTML(USUARIOS_html);
}




async function USUARIOS_mostrar_usuarios(){
  for(let i = 0 ; i < USUARIOS.length ; i++){
    let id = i;
    let avatar = USUARIOS[i][2];
    let nombre = USUARIOS[i][3];
    let activo = USUARIOS[i][4];
    await USUARIOS_mostrar_usuario(id,avatar,nombre,activo);
  }
}




function USUARIOS_mostrar_usuario(id,avatar,nombre,activo){
  document.getElementById("tabla").insertAdjacentHTML("beforeEnd","<tr id='user"+id+"'>"+
  "<td id='userColCheck"+id+"' class='colCheck'>"+
  "<input type= 'checkbox' id='userCheck"+id+"' class= 'check '>"+
  "</td>"+
  "<td id='userColAvatar"+id+"' class= 'colAvatar'>"+
  "<img id='avatar"+id+"' src='"+avatar+"'>"+
  "</td>"+
  "<td id='userColNombre"+id+"' class='colNombre'>"+nombre+"</td>"+
  "<td id='userColEstado"+id+"' class='colActivo'>"+activo+"</td>"+
  "</tr>");

  USUARIOS_IDs_tabla.push("user"+id);

  document.getElementById("userCheck"+id).addEventListener("click",function(){
       console.log("item seleccionado");
      if(document.getElementById("userCheck"+id).checked){
        USUARIOS_seleccion.push(id);
      }else{
        USUARIOS_seleccion.splice(id,1);
      }
      console.log(USUARIOS_seleccion);
  })
}




async function USUARIOS_recargar_tabla(){
  // await USUARIOS_borrar_usuarios();
  UTIL_BORRAR_HTML_pID(USUARIOS_IDs_tabla);
  await USUARIOS_mostrar_usuarios();
}




function USUARIOS_borrar_usuarios(){
  UTIL_BORRAR_HTML_pID(USUARIOS_IDs_tabla);
}




async function USUARIOS_eliminar_seleccion(){
  for(let i = 0; i < USUARIOS_seleccion.length; i++){
    USUARIOS.splice(USUARIOS.indexOf(USUARIOS_seleccion[i][0]),1);
  }

  USUARIOS_seleccion = [];
  USUARIOS_recargar_tabla();
}



function USUARIOS_salir(){
  UTIL_BORRAR_HTML_pID(USUARIOS_IDs);
  MenuUsuarios_salir();
}