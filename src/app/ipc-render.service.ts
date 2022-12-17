import { Injectable } from '@angular/core';

// importa la clase ipcRenderer desde electron
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class IpcRenderService {

  // alamacena el conector ipcRender
  private ipc!: IpcRenderer;

  constructor() { 
    // comprueba que window.require esta disponible;
    if(window.require){
      // si es asi, la app esta funcianando con electron
      try {
        // ahora podemos cargar el ipcRenderer
        this.ipc = window.require("electron").ipcRenderer;
      } catch (e) {
        // por si sucede algun error lo imprimimos
        throw e;
      }
    }else{
      // msg si no se pudo cargar
      console.warn("Electron ipcRender was not loaded");
    }
  }


  public on(channel: string, listener: any): void {
    if(!this.ipc) return;
    this.ipc.on(channel, listener);
  }

  public once(channel: string, listener: any): void {
    if(!this.ipc) return;
    this.ipc.once(channel, listener);
  }

  public send(channel: string, ...arg: any[]): void {
    if(!this.ipc) return;
    this.ipc.send(channel, arg);
  }

  public removeAllListener(channel: string):void{
    if(!this.ipc) return;
    this.ipc.removeAllListeners(channel);
  }
}
