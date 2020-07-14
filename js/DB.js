let USUARIOS = [];
let JSON_USUARIOS_CARGADO = false;
let DB_MS_seleccionados = [];
let DB_MS_solicitudes = [];
let DB_MS_indice = 0;
let USUARIOS_seleccion = [];
let USUARIOS_IDs_tabla =[];
let usuario_actual;

function MS_indice(){
    return DB_MS_indice++;
}

const DB_urlsAvatar = [
    "https://gravatar.com/avatar/ab3ef817e400dbddf665041ca1a55051?s=100&d=mp&r=x",
    "https://robohash.org/f79d8337d36910053a2d80563f9db3040?set=set4&bgset=&size=100x100",
    "https://robohash.org/9981987a80505dabe58e33f7a868e451?set=set4&bgset=&size=100x100",
    "https://api.adorable.io/avatars/100/9981987a80505dabe58e33f7a868e451.png",
    "https://api.adorable.io/avatars/100/1f843f4889f79b1744fc8422f1d32cca.png",
    "https://api.adorable.io/avatars/100/3ceeca62abcdc94ad767fae2e85ec3c4.png",
    "https://gravatar.com/avatar/8a88a4428712c782a99d07a678a7a040?s=100&d=robohash&r=x",
    "https://gravatar.com/avatar/8a6f2cc35c927e40ab3b837e70a3301a?s=100&d=robohash&r=x",
    "https://gravatar.com/avatar/b971eec97ed6ceb86fe307a362984db9?s=100&d=robohash&r=x",
    "https://gravatar.com/avatar/eb1e0a45a4c29acd4567748e432df5a8?s=100&d=robohash&r=x"
];

class db{

    myDB = [];

    nuevo(datos){
        this.myDB.push(datos);
    }

    actualizar(indiceDB,indiceDato,datoNuevo){
        try{
            myDB[indiceDB][indiceDato] = datoNuevo;
            return true;
        }catch (e){
            logs.push(e);
            return false;
        }
    }

    borrar(id){

    }

    get(subIndice, dato){
        retorno = null;
        this.myDB.forEach(item=>{
            if(item[subIndice]==dato){
                retorno = item;
            }
        })
        return retorno;
    }

}

async function DB_traer_JSON_MS(){
    if(JSON_Cargado==false){
        JSON_Cargado=true;
        return fetch('./json/tabla.json')
        .then(result=> result.json())
        .then(async (ar)=>{
            let arr = Array.from(ar['Solicitudes']);
            arr.reverse;
            for(let i = 0;i<arr.length;i++){  
                let fecha = arr[i]['Fecha Solicitud'];
                let desc = arr[i]['Descripción'];
                let estado = arr[i]['Estado'];
                let Usuario = arr[i]['Usuario'];
                await DB_agregar_item(MS_indice(),"JSON",fecha,desc,estado,Usuario);
            }
        })
    }
}




function DB_traer_JSON_USERS(){
    if(JSON_USUARIOS_CARGADO == false){
        JSON_USUARIOS_CARGADO = true;
        return fetch('./json/usuarios.json')
        .then(result=> result.json())
        .then(async (ar)=>{
            let arr = Array.from(ar['Usuarios']);
            arr.reverse;
            for(let i = 0;i<arr.length;i++){  
                let user = arr[i]['user'];
                let pass = arr[i]['pass'];
                let avatar = arr[i]['avatar'];
                let nombre = arr[i]['nombre'];
                let activo = arr[i]['activo'];
                let fecha = arr[i]['fecha'];
                let lvl = arr[i]['lvl'];
                USUARIOS.push([user,pass,avatar,nombre,activo,fecha,lvl]);
            }
        })
    }
}




function DB_BUSCAR_USUARIO(user,pass){
    let respuesta = false;
    let usuarioEncontrado;
    for(let i = 0;i<USUARIOS.length;i++){
        if(USUARIOS[i][0]==user && USUARIOS[i][1]==pass){
            usuarioEncontrado = USUARIOS[i];
            respuesta = true
        }
    }
    if (usuarioEncontrado != null && usuarioEncontrado !=undefined &&usuarioEncontrado[4]!="si"){
        LOGIN_imprimir_resultado("el usuario esta inactivo");
        respuesta = false;
    }
    return respuesta;
}




async function DB_agregar_item(indice,origen,fecha,descripcion,estado,usuario){
    DB_MS_solicitudes.push([indice,origen,fecha,descripcion,estado,usuario]);
    console.log("se agrego el item->"+indice+"-"+origen+"-"+fecha+"-"+descripcion+"-"+estado+"-"+usuario)
    // itemIndex++;
    return DB_MS_solicitudes.length-1;
}




async function DB_borrar_JSON(){
    let listaNormal =[];
    for(let i = 0;i<DB_MS_solicitudes.length;i++){
        if(DB_MS_solicitudes[i][1]!="JSON"){
            listaNormal.push(DB_MS_solicitudes[i]);
        }
    }
    DB_MS_solicitudes = listaNormal;
}




async function DB_borrar_seleccionados(){
    // MENU_misSolicitudes_borrarBotones();
    if(todosSeleccionados){
        document.getElementById("checkAll").checked = false;
    }
    for(let i = 0;i<DB_MS_seleccionados.length;i++){
        let id = DB_MS_seleccionados[i];
        DB_MS_solicitudes.splice(DB_MS_solicitudes.indexOf(id),1);
        UTIL_BORRAR_HTML_pID(["colFecha"+id,"colDescripcion"+id,"colEstado"+id,"check"+id,"colCheck"+id,"item"+id],"DB_borrar_seleccionados")
    }
    DB_MS_seleccionados = []
    // await MS_eventos();
}
