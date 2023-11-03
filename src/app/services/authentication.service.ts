import { Injectable, inject } from '@angular/core';
import { Firestore, getFirestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { UserCredential } from '@firebase/auth';
import { Carrito } from '../interfaces/carrito.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);

  constructor() { }

  async register(email: string, password: string, nombre : string, apellido : string): Promise<void> {

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      const db = getFirestore();
      const docRef = doc(db, "users", user.uid);
      const data = {
        isAdmin: false,
        nombre: nombre,
        apellido: apellido,
        telefono: "",
        direccion: "",
        ciudad: "",
        provincia: "",
        codigoPostal: "",
        carrito: [] as Carrito[]
      };

      await setDoc(docRef, data);

    } catch (error) {

      console.error(error);
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredentials = await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCurrentUserData() {
    const user = this.auth.currentUser;

    if (user) {
      try {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        const docData = docSnap.data();
        if (docData)
          console.log(docData);
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  async getCurrentUserRole(): Promise<any> {
    const user = this.auth.currentUser;

    if (user) {
      try {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        const docData = docSnap.data();

        if (docData)
          return docData['rol'];
      }
      catch (error) {
        console.log(error);
      }
    }
    return null;
  }
}
