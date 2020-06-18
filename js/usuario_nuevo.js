const Unuevo_IDs = ["uNUEVA-RECTANGULO-FONDO"];/*"MUbtnMenu1a","uNUEVA-TXT-TITULO","uNUEVA-TXT-FECHA",
"uNUEVA-INPUT-FECHA","uNUEVA-TXT-NOMBRE","uNUEVA-INPUT-NOMBRE","uNtabla","uNavatar","uNavatarAnterior","uNavatarSiguiente","uNUEVA-TXT-ESTADO","uNUEVA-INPUTLIST-ESTADO","uNuevo_alerta","uNUEVA-RECTANGULO-BTN-CANCELAR","uNUEVA-RECTANGULO-BTN-ACEPTAR"
];*/
let Unuevo_avatar_id = 0;
let Unuevo_avatar ="https://gravatar.com/avatar/ab3ef817e400dbddf665041ca1a55051?s=100&d=mp&r=x";
const Unuevo_html = [
  "<div id='uNUEVA-RECTANGULO-FONDO' class='uNUEVA-RECTANGULO-FONDO'>"+
"<P id='uNUEVA-TXT-TITULO' class='uNUEVA-TXT-TITULO'>Nuevo usuario</P>"+
"<P  id='uNUEVA-TXT-FECHA' class='uNUEVA-TXT-FECHA' required>FECHA</P>"+
"<INPUT type='date'  id='uNUEVA-INPUT-FECHA' class='uNUEVA-INPUT-FECHA' > </INPUT>"+
"<P  id='uNUEVA-TXT-NOMBRE' class='uNUEVA-TXT-NOMBRE'>NOMBRE</P>"+
"<input id='uNUEVA-INPUT-NOMBRE' class='uNUEVA-INPUT-NOMBRE' type='text'></input>"+
"<table id='uNtabla' class='uNtabla'>"+
"<tr>"+
"<td colspan='2' id='uNavatar' class='uNavatar'><img id='imgAvatar' src='https://gravatar.com/avatar/ab3ef817e400dbddf665041ca1a55051?s=100&d=mp&r=x'>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td id='uNavatarAnterior' class='uNavatarAnterior'></td>"+
"<td id='uNavatarSiguiente' class='uNavatarSiguiente'></td>"+
"</tr>"+
"<P id='uNUEVA-TXT-PASS' class='uNUEVA-TXT-PASS'>CONTRASEÑA</P>"+
"<input id='uNUEVA-INPUT-PASS' class='uNUEVA-INPUT-PASS' type='password'></input>"+
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


async function UsuarioN_cargar(){
  await UTIL_dibujar_HTML(Unuevo_html);
  await UsuarioN_eventos();
  await MenuUN_cargar();
}


function UsuarioN_eventos(){
  document.getElementById("uNavatarAnterior").addEventListener("click",Unuevo_avatar_anterior);
  document.getElementById("uNavatarSiguiente").addEventListener("click",Unuevo_avatar_siguiente);
  document.getElementById("uNUEVA-RECTANGULO-BTN-CANCELAR").addEventListener("click",UsuarioN_salir);
  document.getElementById("uNUEVA-RECTANGULO-BTN-ACEPTAR").addEventListener("click",UsuarioN_guardar);
}


function Unuevo_avatar_siguiente(){
  Unuevo_avatar_id++;
  let urlAvatar = DB_urlsAvatar[Unuevo_avatar_id%DB_urlsAvatar.length];
  document.getElementById("imgAvatar").src = urlAvatar;
}


function Unuevo_avatar_anterior(){
  Unuevo_avatar_id--;
  let urlAvatar = DB_urlsAvatar[Unuevo_avatar_id%DB_urlsAvatar.length];
  if(urlAvatar<0){
    Unuevo_avatar = DB_urlsAvatar.length-1
  }else{
    Unuevo_avatar = urlAvatar;
  }
  document.getElementById("imgAvatar").src = urlAvatar;
}




function UsuarioN_validar_form(){
  let retorno = [];
  const fecha = document.getElementById("uNUEVA-INPUT-FECHA").value;
  if(fecha!="" && fecha!=null){
    retorno.push(""+fecha);
  }else{
    Mun_alertar("seleccione una fecha");
  }

  const nombre = document.getElementById("uNUEVA-INPUT-NOMBRE").value;
  if(UsuarioN_validar_usuario(nombre)){
    retorno.push(""+nombre);
  }else{
    Mun_alertar("ingrese un nombre, debe contener hasta 8 caracteres y todos numeros");
  }

  const pass = document.getElementById("uNUEVA-INPUT-PASS").value;
  if(UsuarioN_validar_cont(pass)){
    retorno.push(""+pass);
  }else{
    Mun_alertar("ingrese una contraseña correcta, "+
    "debe contener al menos una letra, "+
    "al menos un numero y "+
    "al menos debe tener 6 caracteres");
  }

  const avatar = Unuevo_avatar;
  retorno.push(""+avatar);

  const activo = document.getElementById("uNUEVA-INPUTLIST-ESTADO").value;
  retorno.push(""+activo);

  console.log(retorno);
  return retorno;
}




function UsuarioN_validar_usuario(usuario){
  console.log("validando usuario:"+usuario)
  if((usuario.length == 8) && !isNaN(usuario)){
      return true;
  }else{
      return false;
  }
}




function UsuarioN_validar_cont(cont){
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


function UsuarioN_guardar(){
  let user = UsuarioN_validar_form();
  if(user.length == 5){
    console.log("usuario valido guardado")
    let fecha = user[0];
    let nombre = user[1];
    let pass = user[2];
    let avatar = user[3];
    let activo = user[4];
    USUARIOS.push([nombre,pass,avatar,nombre,activo,fecha]);
    Unuevo_IDs.reverse
    UTIL_BORRAR_HTML_pID(Unuevo_IDs);
    USUARIOS_recargar_tabla();
  }else{
    console.log("conteo guardar invalido ->"+user.length)
  }
}


function Mun_alertar(texto){
  let html = document.getElementById("uNuevo_alerta");
  html.style.borderColor = "red";
  html.textContent = texto;
  setTimeout(function(){
    html.textContent = "";
    html.style.borderColor = "white";
  },8000);
}


function UsuarioN_salir(){
  Unuevo_IDs.reverse
    UTIL_BORRAR_HTML_pID(Unuevo_IDs);
    UTIL_BORRAR_HTML_pID(["contenedorDeSolicitudes"]);
}