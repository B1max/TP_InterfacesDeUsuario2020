class pantalla_usuarios extends pantalla{
  static selectAll = false;
  static menuAsociado = Menu_usuarios;
  static ids_general = ["contenedorDeSolicitudes","tabla"];
  static html_general = [ "<div id='contenedorDeSolicitudes' class='contenedorDeSolicitudes'>"+
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
          "</table></div>"];


  static eventos = async function(){
    await DB_traer_JSON_USERS();
    await USUARIOS_mostrar_usuarios();
    document.getElementById("UcheckAll").addEventListener("click", function(){
        if(this.selectAll){
          USUARIOS_seleccion = [];
          this.selectAll = false;
        }else{
          USUARIOS_seleccion = [];
          for(let i = 0;i<USUARIOS.length;i++){
            USUARIOS_seleccion.push(i);
          }
          this.selectAll = true;
        }
        for(let i = 0;i<USUARIOS.length;i++){
            document.getElementById("userCheck"+i).checked = this.selectAll;
        }
    });
  };

}





async function USUARIOS_mostrar_usuarios(){
  for(let i = 0 ; i < USUARIOS.length ; i++){
    let id = i;
    let avatar = USUARIOS[i][2];
    let nombre = USUARIOS[i][3];
    let activo = USUARIOS[i][4];
    USUARIOS_mostrar_usuario(id,avatar,nombre,activo);
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
  document.getElementById("userCheck"+id).removeEventListener("click",function(){});
  document.getElementById("userCheck"+id).addEventListener("click",async function(){
    console.log("item seleccionado");
    let seleccion = USUARIOS[id];
    if(document.getElementById("userCheck"+id).checked){
      USUARIOS_seleccion.push(seleccion);
    }else{
      for(let i = 0; i < USUARIOS_seleccion.length; i++){
        if(USUARIOS_seleccion[i]==seleccion){
          USUARIOS_seleccion.splice(i,1);
        }
      }
    }
    console.log(USUARIOS_seleccion);
  });
}





async function USUARIOS_eliminar_seleccion(){

  let ids_solicitudes_borrables =[];

  for(let i = 0; i < USUARIOS_seleccion.length; i++){
    //["87654321", "Admin1234", "https://gravatar.com/avatar/ab3ef817e4
    //00dbddf665041ca1a55051?s=100&d=mp&r=x", "87654321", "si", "2020-05-03", undefined]

    //aca elimino el usuario solamente
    USUARIOS.forEach(usuario=>{
      if(usuario==USUARIOS_seleccion[i]){
        USUARIOS.splice(USUARIOS.indexOf(usuario),1);
      }
    });
    //aca elimino las solicitudes

    // DB_MS_solicitudes.forEach(solicitud=>{
    //   if(solicitud[5]==USUARIOS_seleccion[i][0]){
    //     DB_MS_solicitudes.splice(DB_MS_solicitudes.indexOf(solicitud),1);
    //   }
    // });

    for(let e = DB_MS_solicitudes.length-1; e > 0; e--){
      if(DB_MS_solicitudes[e][5]==USUARIOS_seleccion[i][0]){
        ids_solicitudes_borrables.push(e);
        console.log("para eliminar->"+e);
      }
    }


  }
  // for(let a = 0; a<ids_solicitudes_borrables.length;a++){
  //   DB_MS_solicitudes.splice(DB_MS_solicitudes[ids_solicitudes_borrables[a]],1);
  // }
  USUARIOS_seleccion = [];
  return ids_solicitudes_borrables;
}
