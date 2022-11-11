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

var producto = document.getElementById('productos');

function extraerProductos() {
    const db = getDatabase();
    const dbRef = ref(db, 'productos/');
    onValue(dbRef, (snapshot) => {
        producto.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            if (childData.estado == "0") {
                producto.innerHTML = producto.innerHTML + "<tr>" + "<td>" +
                    "<p>" + childData.nombre + "</p>" +
                    "<img src='" + childData.url + "' alt=''>" +
                    "<p>" + "$" + childData.precio + "<br>" + "Descripción: " + childData.descripcion + "</p>" +
                    "</td>" + "</tr>";
            }
        });
        {
            onlyOnce: true
        }
    });
}
window.onload(extraerProductos());
