class Usuario_modificar extends pantalla{
  static indexModificar;
  static punto_inicial = "contenedor";
  static menuAsociado = menu_usuario_nuevo;
  static ids_general = ["uNUEVA-RECTANGULO-FONDO"];
  static html_general =  ["<div id='uNUEVA-RECTANGULO-FONDO' class='uNUEVA-RECTANGULO-FONDO'>"+
  "<P id='uNUEVA-TXT-TITULO' class='uNUEVA-TXT-TITULO'>Modificar usuario</P>"+
  "<P  id='uNUEVA-TXT-FECHA' class='uNUEVA-TXT-FECHA' required>FECHA</P>"+
  "<INPUT type='date'  id='uNUEVA-INPUT-FECHA' class='uNUEVA-INPUT-FECHA' "+
  "value=''></INPUT>"+
  "<P  id='uNUEVA-TXT-NOMBRE' class='uNUEVA-TXT-NOMBRE'>NOMBRE</P>"+
  "<input id='uNUEVA-INPUT-NOMBRE' class='uNUEVA-INPUT-NOMBRE' type='text' value=''></input>"+
  "<table id='uNtabla' class='uNtabla'>"+
  "<tr>"+
  "<td colspan='2' id='uNavatar' class='uNavatar'><img id='imgAvatar' src=''>"+
  "</td>"+
  "</tr>"+
  "<tr>"+
  "<td id='uNavatarAnterior' class='uNavatarAnterior'></td>"+
  "<td id='uNavatarSiguiente' class='uNavatarSiguiente'></td>"+
  "</tr>"+
  "<P id='uNUEVA-TXT-PASS' class='uNUEVA-TXT-PASS'>CONTRASEÑA</P>"+
  "<input id='uNUEVA-INPUT-PASS' class='uNUEVA-INPUT-PASS' type='password' value=''></input>"+
  "<p  id='uNUEVA-TXT-ESTADO' class='uNUEVA-TXT-ESTADO'>Activo:</p>"+
  "<select  id='uNUEVA-INPUTLIST-ESTADO' class='uNUEVA-INPUTLIST-ESTADO' required>"+
  "    <option value='si'>si</option>"+
  "    <option value='no'>no</option>"+
  "</select>"+
  "<div id='uNuevo_alerta' class='uNuevo_alerta'></div>"+
  "<div  id='uNUEVA-RECTANGULO-BTN-CANCELAR' class='uNUEVA-RECTANGULO-BTN-CANCELAR' >CANCELAR</div>"+
  "<div  id='uNUEVA-RECTANGULO-BTN-ACEPTAR' class='uNUEVA-RECTANGULO-BTN-ACEPTAR' >GUARDAR</div>"+
  "</div>"];
  static evento = {};

  static eventos =  function(){
    if(USUARIOS_seleccion.length>0){
    
      Usuario_modificar.indexModificar = USUARIOS.indexOf(USUARIOS_seleccion[0]);
  
      document.getElementById("uNUEVA-TXT-TITULO").textContent = "Modificar usuario";
  
      document.getElementById("uNUEVA-INPUT-FECHA").value = USUARIOS[Usuario_modificar.indexModificar][5];
      
      document.getElementById("uNUEVA-INPUT-NOMBRE").value = USUARIOS[Usuario_modificar.indexModificar][3];
  
      document.getElementById("imgAvatar").src = USUARIOS[Usuario_modificar.indexModificar][2];
  
      document.getElementById("uNUEVA-INPUT-PASS").value = USUARIOS[Usuario_modificar.indexModificar][1];
  
      document.getElementById("uNUEVA-INPUTLIST-ESTADO").value =USUARIOS[Usuario_modificar.indexModificar][4];
  
      // await UsuarioM_eventos();
      // await MenuUN_cargar();
      Unuevo_avatar_id = DB_urlsAvatar.indexOf(USUARIOS[Usuario_modificar.indexModificar][2]);
    }else{
      const alert = new alerta();
      Usuario_modificar.salir();
      alert.mostrar("Debe seleccionar un item,\nsi selecciona mas de uno, solo se tomara el primero");
      setTimeout(function(){
        Usuario_modificar.cargar();
      },3000);
    }
  
    document.getElementById("uNavatarAnterior").addEventListener("click",Unuevo_avatar_anterior);
    document.getElementById("uNavatarSiguiente").addEventListener("click",Unuevo_avatar_siguiente);
    document.getElementById("uNUEVA-RECTANGULO-BTN-CANCELAR").addEventListener("click",function(){
      Usuario_nuevo.salir();
    });
    document.getElementById("uNUEVA-RECTANGULO-BTN-ACEPTAR").addEventListener("click",function(){
      if(UsuarioM_guardar()){
        Usuario_modificar.salir();
      }
    });
  };

}


function UsuarioM_guardar(){
  let user = UsuarioM_validar_form();
  if(user.length == 5){
    let fecha = user[0];
    let nombre = user[1];
    let pass = user[2];
    let avatar = user[3];
    let activo = user[4];
    USUARIOS[Usuario_modificar.indexModificar][0] = ""+nombre;
    USUARIOS[Usuario_modificar.indexModificar][1] = ""+pass; 
    USUARIOS[Usuario_modificar.indexModificar][2] = ""+avatar;
    USUARIOS[Usuario_modificar.indexModificar][3] = ""+nombre;
    USUARIOS[Usuario_modificar.indexModificar][4] = ""+activo;
    USUARIOS[Usuario_modificar.indexModificar][5] = ""+fecha;
    console.log("usuario valido guardado");
    Usuario_modificar.salir();
    pantalla_usuarios.salir();
    pantalla_usuarios.cargar();
    Usuario_modificar.indexModificar = null;
    USUARIOS_seleccion = [];
    return true;
  }else{
    logs.push("usuario invalido")
    return false;
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
