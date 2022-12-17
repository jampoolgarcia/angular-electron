import { Injectable } from '@angular/core';
// importo todo lo necesario 
import * as ElectronStore from 'electron-store';

@Injectable({
  providedIn: 'root'
})
export class ElectronStoreService {

  // alamacena el obejto store
  private store!: ElectronStore;

  constructor() {
    // comprueba que window.require esta disponible;
    if(window.require){
      // si es asi, la app esta funcianando con 'electron'
      try {
        // obtiene la clase 'storeClass' desde electron-store
        const storeClass = window.require("electron-store");
        // creo una instancia y la guardo en 'store'
        this.store = new storeClass();
      } catch (e) {
        // por si sucede algun error lo imprimimos
        throw e;
      }
    }else{
      // msg si no se pudo cargar 'Electron-store'
      console.warn("Electron-store was not loaded");
    }

   }

   // obtiene un valor mediante su 'key' del store
   get(key: string): any {
    return this.store.get(key);
   }

   // guarda o remplaza un valor con una 'key' en el store
   set(key: string, value: any): void {
    this.store.set(key, value);
   }
}
