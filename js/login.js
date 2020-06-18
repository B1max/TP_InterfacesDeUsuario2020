// const botonLogear = document.getElementById("BotonLogear");
const usuariosLogin = [
    ['30337591','dario83']
];
let LOGIN_IDs = [
    "elementoMenu0","elementoMenu1","elementoMenu2","elementoMenu3","elementoMenu4",
    "elementoMenu5","elementoMenu8","elementoMenu6","elementoMenu7"];

let LOGIN_html = [
    "<div id='elementoMenu0' class='menu-fondo'>esto es del menu</div>",
    "<div id='elementoMenu1' class='ventanaColoreada'>",
    "<div id='elementoMenu2' class='txtIngresar'>INGRESAR</div>",
    "<div id='elementoMenu3' class='USUARIO_CONTRASEÑA'>USUARIO: <br>CONTRASEÑA: </div>",
    "<input id='elementoMenu4' class='ingresoDeUsuario' type='text' name='usuario' id='usuario'>",
    "<input id='elementoMenu5' class='ingresoDeContraseña' type='password' name='contraseña' id='contraseña'>",
    "<p id='elementoMenu8' class='loginResultado'></p>",
    "<div id='elementoMenu6' class='BotonAceptar'></div>",
    "<div id='elementoMenu7' class='ACEPTAR'>ACEPTAR</div></div>"
];




async function LOGIN_cargar(){
    INDEX_ocultar_bienvenida()
    UTIL_dibujar_HTML(LOGIN_html);
    LOGIN_eventos();
}




function LOGIN_eventos(){
    document.getElementById("elementoMenu6").addEventListener("click", async function(){
        console.log("se apreto el boton cancelar");
        await LOGIN_validar_UserPass();
    });
    document.getElementById("elementoMenu7").addEventListener("click", async function(){
        console.log("se apreto el boton aceptar");
        await LOGIN_validar_UserPass();

    });
    document.getElementById("elementoMenu0").addEventListener("click",function(){
        LOGIN_salir();
        INDEX_mostrar_bienvenida();
    });
}




function LOGIN_validar_usuario(usuario){
    console.log("validando usuario:"+usuario.value)
    if((usuario.value.length == 8) && !isNaN(usuario.value)){
        return true;
    }else{
        return false;
    }
}




function LOGIN_validar_contraseña(cont){
    console.log("validando contraseña:"+cont.value)
    let numeros = [1,2,3,4,5,6,7,8,9,0];
    let letras = ['q','w','e','r','t','y','u','i','o','p','a','s','d',
    'f','g','h','j','k','l','ñ','z','x','c','v','b','n','m','Q','W','E',
    'R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Ñ',
    'Z','X','C','V','B','N','M'];
    let tieneUnNumero = false
    let tieneUnaLetra = false
    let palabra = Array.from(cont.value);
    palabra.forEach((caracter)=>{
        letras.forEach((letra)=>{if(caracter == letra){tieneUnaLetra = true}})
        numeros.forEach((numero)=>{if(caracter == numero){tieneUnNumero= true}})
    })
    if(cont.value.length < 6){LOGIN_imprimir_resultado("la contraseña debe tener al menos 6 caracteres");};
    if(tieneUnNumero==false){LOGIN_imprimir_resultado("la contraseña debe tener al menos un numero");};
    if(tieneUnaLetra==false){LOGIN_imprimir_resultado("la contraseña debe tener al menos una letra");};
    return (cont.value.length >= 6) && tieneUnNumero && tieneUnaLetra;
}




async function LOGIN_validar_UserPass(){
    console.log("validando usuario y contraseña");
    await LOGIN_validador();
}





async function LOGIN_validador(){
    let usuario = document.getElementById("elementoMenu4");
    let cont = document.getElementById("elementoMenu5");
    let usuarioValido = LOGIN_validar_usuario(usuario);
    let contValida = LOGIN_validar_contraseña(cont);
    await DB_traer_JSON_USERS();
    if(usuarioValido && contValida && DB_BUSCAR_USUARIO(usuario.value,cont.value)){
        //si hay al menos una coincidencia
        console.log("usuario : ("+usuario.value+")y contraseña : ("+cont.value+") valido");
        //borra los objetos de mas
        await LOGIN_salir();
        try{
            PP_borrarBienvenida();
        }catch(err){
            console.log("no se pudo eliminar algo->"+err);
        }
        await INDEX_salir();
        await PP_cargar();
        return true;
    }else{
        LOGIN_imprimir_resultado("Usuario o contraseña incorrecta");
        console.log("usuario : ("+usuario.value+")y contraseña : ("+cont.value+") no valido");
        return false;
    }
}





function LOGIN_imprimir_resultado(txt){
    console.log(txt);
    const resultado = document.getElementById("elementoMenu8");
    resultado.textContent = txt+"";
    setTimeout(function(){
        resultado.textContent = " ";
    },2000);
}




async function LOGIN_salir(){
    LOGIN_IDs.forEach(item =>{
        try {
            document.getElementById(item).remove();
        } catch (error) {
            console.log("no se pudo borrar el HTML de login");
        }
    })
}