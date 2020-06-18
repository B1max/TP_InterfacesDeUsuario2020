let indexModificar;


function Umodificar_html(){
    return [
    "<div id='uNUEVA-RECTANGULO-FONDO' class='uNUEVA-RECTANGULO-FONDO'>"+
  "<P id='uNUEVA-TXT-TITULO' class='uNUEVA-TXT-TITULO'>Modificar usuario</P>"+
  "<P  id='uNUEVA-TXT-FECHA' class='uNUEVA-TXT-FECHA' required>FECHA</P>"+
  "<INPUT type='date'  id='uNUEVA-INPUT-FECHA' class='uNUEVA-INPUT-FECHA' "+
  "value='"+USUARIOS[indexModificar][5]+"'></INPUT>"+
  "<P  id='uNUEVA-TXT-NOMBRE' class='uNUEVA-TXT-NOMBRE'>NOMBRE</P>"+
  "<input id='uNUEVA-INPUT-NOMBRE' class='uNUEVA-INPUT-NOMBRE' type='text' value='"+USUARIOS[indexModificar][3]+"'></input>"+
  "<table id='uNtabla' class='uNtabla'>"+
  "<tr>"+
  "<td colspan='2' id='uNavatar' class='uNavatar'><img id='imgAvatar' src='"+USUARIOS[indexModificar][2]+"'>"+
  "</td>"+
  "</tr>"+
  "<tr>"+
  "<td id='uNavatarAnterior' class='uNavatarAnterior'></td>"+
  "<td id='uNavatarSiguiente' class='uNavatarSiguiente'></td>"+
  "</tr>"+
  "<P id='uNUEVA-TXT-PASS' class='uNUEVA-TXT-PASS'>CONTRASEÑA</P>"+
  "<input id='uNUEVA-INPUT-PASS' class='uNUEVA-INPUT-PASS' type='password' value='"+USUARIOS[indexModificar][1]+"'></input>"+
  "<p  id='uNUEVA-TXT-ESTADO' class='uNUEVA-TXT-ESTADO'>Activo:</p>"+
  "<select  id='uNUEVA-INPUTLIST-ESTADO' class='uNUEVA-INPUTLIST-ESTADO' required>"+
  "    <option value='si'>si</option>"+
  "    <option value='no'>no</option>"+
  "</select>"+
  "<div id='uNuevo_alerta' class='uNuevo_alerta'></div>"+
  "<div  id='uNUEVA-RECTANGULO-BTN-CANCELAR' class='uNUEVA-RECTANGULO-BTN-CANCELAR' >CANCELAR</div>"+
  "<div  id='uNUEVA-RECTANGULO-BTN-ACEPTAR' class='uNUEVA-RECTANGULO-BTN-ACEPTAR' >GUARDAR</div>"+
  "</div>"
  ];
}




async function Umodificar_cargar(){
  if(USUARIOS_seleccion.length>0){
    indexModificar = USUARIOS_seleccion[0];

    await UTIL_dibujar_HTML(Umodificar_html());
    document.getElementById("uNUEVA-INPUTLIST-ESTADO").value =USUARIOS[indexModificar][4];
    await UsuarioM_eventos();
    await MenuUN_cargar();
    Unuevo_avatar_id = DB_urlsAvatar.indexOf(USUARIOS[indexModificar][2]);
  }else{
    //una alerta diciendo "no selecciono nada"
  }
}




function UsuarioM_eventos(){
  document.getElementById("uNavatarAnterior").addEventListener("click",Unuevo_avatar_anterior);
  document.getElementById("uNavatarSiguiente").addEventListener("click",Unuevo_avatar_siguiente);
  document.getElementById("uNUEVA-RECTANGULO-BTN-CANCELAR").addEventListener("click",function(){
    Unuevo_IDs.reverse
    UTIL_BORRAR_HTML_pID(Unuevo_IDs);
  });
  document.getElementById("uNUEVA-RECTANGULO-BTN-ACEPTAR").addEventListener("click",UsuarioM_guardar);
}




function UsuarioM_guardar(){
  let user = UsuarioM_validar_form();
  if(user.length == 5){
    let fecha = user[0];
    let nombre = user[1];
    let pass = user[2];
    let avatar = user[3];
    let activo = user[4];
    USUARIOS[indexModificar][0] = ""+nombre;
    USUARIOS[indexModificar][1] = ""+pass; 
    USUARIOS[indexModificar][2] = ""+avatar;
    USUARIOS[indexModificar][3] = ""+nombre;
    USUARIOS[indexModificar][4] = ""+activo;
    USUARIOS[indexModificar][5] = ""+fecha;
    console.log("usuario valido guardado");
    UTIL_BORRAR_HTML_pID(Unuevo_IDs);
    USUARIOS_recargar_tabla();
    indexModificar = null;
    USUARIOS_seleccion = [];
  }else{
    console.log("usuario invalido")
  }
}





function UsuarioM_validar_form(){
  let retorno = [];
  const fecha = document.getElementById("uNUEVA-INPUT-FECHA").value;
  if(fecha!="" && fecha!=null){
    retorno.push(""+fecha);
  }else{
    Mun_alertar("seleccione una fecha");
  }

  const nombre = document.getElementById("uNUEVA-INPUT-NOMBRE").value;
  if(UsuarioM_validar_usuario(nombre)){
    retorno.push(""+nombre);
  }else{
    Mun_alertar("ingrese un nombre, debe contener hasta 8 caracteres y todos numeros");
  }

  const pass = document.getElementById("uNUEVA-INPUT-PASS").value;
  if(UsuarioM_validar_cont(pass)){
    retorno.push(""+pass);
  }else{
    Mun_alertar("ingrese una contraseña correcta, "+
    "debe contener al menos una letra, "+
    "al menos un numero y "+
    "al menos debe tener 6 caracteres");
  }

  // const avatar = Unuevo_avatar;
  const avatar = document.getElementById("imgAvatar").src;
  retorno.push(""+avatar);

  const activo = document.getElementById("uNUEVA-INPUTLIST-ESTADO").value;
  retorno.push(""+activo);

  console.log(retorno);
  return retorno;
}




function UsuarioM_validar_usuario(usuario){
  console.log("validando usuario:"+usuario)
  if((usuario.length == 8) && !isNaN(usuario)){
      return true;
  }else{
      return false;
  }
}




function UsuarioM_validar_cont(cont){
  console.log("validando contraseña:"+cont)
  let numeros = [1,2,3,4,5,6,7,8,9,0];
  let letras = ['q','w','e','r','t','y','u','i','o','p','a','s','d',
  'f','g','h','j','k','l','ñ','z','x','c','v','b','n','m','Q','W','E',
  'R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Ñ',
  'Z','X','C','V','B','N','M'];
  let tieneUnNumero = false
  let tieneUnaLetra = false
  let palabra = Array.from(cont);
  palabra.forEach((caracter)=>{
      letras.forEach((letra)=>{if(caracter == letra){tieneUnaLetra = true}})
      numeros.forEach((numero)=>{if(caracter == numero){tieneUnNumero= true}})
  })
  if(cont.length < 6){
    Mun_alertar("la contraseña debe tener al menos 6 caracteres");
  }
  if(tieneUnNumero==false){
    Mun_alertar("la contraseña debe tener al menos un numero");
  }
  if(tieneUnaLetra==false){
    Mun_alertar("la contraseña debe tener al menos una letra");
  }

  return (cont.length >= 6) && tieneUnNumero && tieneUnaLetra;
}

function Umodificar_salir(){
  UTIL_BORRAR_HTML_pID(["uNUEVA-RECTANGULO-FONDO"]);
}