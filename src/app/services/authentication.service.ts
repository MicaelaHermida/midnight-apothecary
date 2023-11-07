import { Injectable, inject } from '@angular/core';
import { Firestore, getFirestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from '@angular/fire/auth';
import { Carrito } from '../interfaces/carrito.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private firestore: Firestore, private auth: Auth) {
  }

  async register(email: string, password: string, nombre: string, apellido: string): Promise<void> {

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      const db = getFirestore();
      const docRef = doc(db, "users", user.uid);
      const data = {
        rol: "user",
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

  async login(email: string, password: string): Promise<boolean> {
    let result = false;
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      result = true;
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async updateUserData(id: string, usuario: User): Promise<void> {
    try{
      const db = getFirestore();
      const docRef = doc(db, "users", id);
      await setDoc(docRef, usuario);
    }catch(error){
      console.error(error);
    }
  }

  async getAllCurrentUserData(): Promise<User> {
    let userData: User = null as unknown as User;

    try {
      const user = this.auth.currentUser;
      if (user) {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        const docData = docSnap.data();
        if (docData)
          userData = docData as User;
      }
    } catch (error) {
      // TODO: manejar error.
      console.log(error);
    }
    return userData;
  }

  async getCurrentUserRole(): Promise<string> {
    let rol = "";
    try {

      const user = this.auth.currentUser;

      if (user) {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        const docData = docSnap.data();

        if (docData)
          rol = docData['rol'];
      }
    }
    catch (error) {
      console.error(error);
    }

    return rol;
  }


  async logout() {
    try {
      await this.auth.signOut();
      console.log("logout");
    } catch (error) {
      console.error(error);
    }
  }


  isUserLoggedIn(): boolean {
    if (this.auth.currentUser) {
      return true;
    } else {
      return false;
    }
  }

  async waitForFirebaseAuthentication(): Promise<void> {
    await this.auth.authStateReady();
  }

  getCurrentUserId(): string{
    const user = this.auth.currentUser;
    if(user){
      return user.uid;
    }
    return "";
  }

}
