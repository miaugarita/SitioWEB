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

var login = document.getElementById("ingresar");
var usuario = "";
var contrasena = "";
login.addEventListener('click', comprobarUsuario);

function extraerInfo() {
    usuario = document.getElementById("usuario").value;
    contrasena = document.getElementById("clave").value;
}

function comprobarUsuario() {
    extraerInfo();
    const dbref = ref(db);
    get(child(dbref, 'usuarios/' + usuario))
    .then((snapshot) => {
        if (snapshot.exists()) {
            if (contrasena == snapshot.val().contraseña) {
                alert("Bienvenido " + usuario)
                window.open("/html/admin.html")
            }
            else {
                alert("Clave incorrecta, vuelva a intentarlo")
                window.open("/html/error.html")
            }
        }
        else {
            alert("No existe el usuario");
        }
    }).catch((error) => {
        alert("error ... comprobar Usuario" + error);
    });
}