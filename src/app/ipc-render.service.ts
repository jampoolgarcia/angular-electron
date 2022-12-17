import { Injectable } from '@angular/core';

import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class IpcRenderService {

  private ipc!: IpcRenderer;

  constructor() { 
    if(window.require){
      try {
        this.ipc = window.require("electron").ipcRenderer;
      } catch (e) {
        throw e;
      }
    }else{
      console.warn("Electron ipcRender was not loaded");
    }
  }
}
