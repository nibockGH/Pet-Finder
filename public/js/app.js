import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDiARvFGII_WHEdvo4fLWB14E-DttXIX9Q",
  authDomain: "basedatos-72c84.firebaseapp.com",
  projectId: "basedatos-72c84",
  storageBucket: "basedatos-72c84.appspot.com",
  messagingSenderId: "783805687294",
  appId: "1:783805687294:web:114cc822185c52d89c8caf"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const formulario = document.getElementById("pet-form");

formulario.addEventListener("submit", async function (event) {
  event.preventDefault();

  const file = document.getElementById("img-uploader").files[0];
  const direccion = document.getElementById("direccion").value;
  const calles = document.getElementById("calles").value;
  const detalles = document.getElementById("detalles").value;

  try {
    let imageUrl = "";
    if (file) {
      console.log("Subiendo imagen...");
      const storageRef = ref(storage, `images/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(snapshot.ref);
      console.log("Imagen subida con URL:", imageUrl);
    }

    console.log("Enviando datos a Firestore...");
    await addDoc(collection(firestore, "animal_reports"), {
      imageUrl: imageUrl,
      direccion: direccion,
      calles: calles,
      detalles: detalles,
      timestamp: new Date()
    });

    alert("Datos enviados exitosamente");
    formulario.reset();
  } catch (error) {
    console.error("Error al agregar datos", error);
  }
});
