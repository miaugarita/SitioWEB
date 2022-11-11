// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getStorage, ref as refS, uploadBytes, getDownloadURL }
  from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";
import { getDatabase, onValue, ref, set, child, get, update, remove }
  from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtyVaImQfS36IhQxa_1eNWm6_BYTJUM6k",
  authDomain: "uvuweb-ffecc.firebaseapp.com",
  databaseURL: "https://uvuweb-ffecc-default-rtdb.firebaseio.com",
  projectId: "uvuweb-ffecc",
  storageBucket: "uvuweb-ffecc.appspot.com",
  messagingSenderId: "811905934331",
  appId: "1:811905934331:web:ba075a200b737c21e9a15e",
  measurementId: "G-V7VVKC2RDF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const storage = getStorage();

var precio = "";
var nombre = "";
var ID = "";
var descripcion = "";
var estado = "";
var url = "";
var imgNombre = "";

// Botones

var btnInsertar = document.getElementById('btnInsertar');
var btnActualizar = document.getElementById('btnActualizar');
var btnBuscar = document.getElementById('btnBuscar');
var btnDeshabilitar = document.getElementById('btnDeshabilitar');
var btnLimpiar = document.getElementById('btnLimpiar');
var img = document.getElementById("img");

// funciones

function insertarProducto() {
    extraerInfo();
    if (ID == "" || nombre == "" || precio == "" ||
        url == "" || descripcion == "" || estado == "" || imgNombre == "") {
        alert("Hay campos vacíos!")
    } else {
        set(ref(db, 'productos/' + ID), {
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            imgNombre: imgNombre,
            url: url,
            estado: estado
        }).then((resp) => {
            alert("Se ha guardado el registro.");
            limpiarInfo();
        }).catch((error) => {
            alert("Ha ocurrido un error: " + error);
        })
    }
}

function buscarProducto() {
    extraerInfo();
    const dbref = ref(db);
    get
        (child(dbref, 'productos/' + ID))
        .then((snapshot) => {
            if (snapshot.exists()) {
                nombre = snapshot.val().nombre;
                descripcion = snapshot.val().descripcion;
                precio = snapshot.val().precio;
                imgNombre = snapshot.val().imgNombre;
                url = snapshot.val().url;
                estado = snapshot.val().estado;
                llamarInformacion();
                descargarImagen();
            }
            else {
                alert("No existe el registro :0");
            }
        }).catch((error) => {
            alert("Ha ocurrido un error: " + error);
        })
}

function actualizarProducto() {
    extraerInfo();
    if (ID == "" || nombre == "" || precio == "" ||
        url == "" || descripcion == "" || estado == "" || imgNombre == "") {
        alert("Hay campos vacíos, introduzca todos los datos :D")
    } else {
    update(ref(db, 'productos/' + ID), {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        imgNombre: imgNombre,
        url: url,
        estado: estado
    }).then(() => {
        alert("Se ha actualizado la información");
        limpiarInfo();
    }).catch(() => {
        alert("Ha ocurrido un error ;( " + error);
    });
}
}

function deshabilitarProducto() {
    if (ID == "") {
        alert("Consulte un producto a deshabilitar");
    }
    else {
        update(ref(db, 'productos/' + ID), {
            estado: "1"
        }).then(() => {
            alert("El producto " + ID + " se ha deshabilitado");
            limpiarInfo();
        }).catch(() => {
            alert("Ha ocurrido un error" + error);
        });
    }
}

function limpiarInfo() {
    document.getElementById('identificador').value = "";
    document.getElementById('nombre').value = "";
    document.getElementById('descripcion').value = "";
    document.getElementById('precio').value = "";
    document.getElementById('img').value = "";
    document.getElementById('url').value = "";
    document.getElementById('imagen').src = "/img/LOGO.png";
    document.getElementById('imgNombre').value = "";
    document.getElementById('estado').value = "-1";
}

function llamarInformacion() {
    document.getElementById('identificador').value = ID;
    document.getElementById('nombre').value = nombre;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('precio').value = precio;
    document.getElementById('estado').value = estado;
    document.getElementById('url').value = url;
    document.getElementById('imgNombre').value = imgNombre;
}

function extraerInfo() {
    ID = document.getElementById('identificador').value;
    nombre = document.getElementById('nombre').value;
    descripcion = document.getElementById('descripcion').value;
    precio = document.getElementById('precio').value;
    url = document.getElementById('url').value;
    imgNombre = document.getElementById('imgNombre').value;
    estado = document.getElementById('estado').value;
}

async function imagenProducto() {
    const file = event.target.files[0];
    const name = event.target.files[0].name;
    document.getElementById('imgNombre').value = name;
    const storage = getStorage();
    const storageRef = refS(storage, 'imagenes/' + name);
    uploadBytes(storageRef, file).then((snapshot) => {
        descargarImagen(name);
        alert("Se subió la imagen")

    });
}

async function descargarImagen(name) {

    img = document.getElementById('imgNombre').value;
    alert("el archivo es:" + 'imagenes/' + img)
    const storage = getStorage();
    const starsRef = refS(storage, 'imagenes/' + img);
    // Get the download URL
    getDownloadURL(starsRef)
        .then((url) => {
            // Insert url into an <img> tag to "download"
            document.getElementById('imagen').src = url;
            console.log(url);
            document.getElementById('img').src = url;
            document.getElementById('url').value = url;
        })
        .catch((error) => {
            switch (error.code) {
                case 'storage/object-not-found':
                    console.log("No se encontró la imagen")
                    break;
                case 'storage/unauthorized':
                    console.log("No tiene los permisos para accesar a la imagen")
                    break;
                case 'storage/canceled':
                    console.log("Se canceló la subida");
                    break;
                // ...
                case 'storage/unknown':
                    break;
            }
        });
}

btnInsertar.addEventListener('click', insertarProducto);
btnActualizar.addEventListener('click', actualizarProducto);
btnBuscar.addEventListener('click', buscarProducto);
btnDeshabilitar.addEventListener('click', deshabilitarProducto);
btnLimpiar.addEventListener('click', limpiarInfo);
img = addEventListener('change', imagenProducto);

