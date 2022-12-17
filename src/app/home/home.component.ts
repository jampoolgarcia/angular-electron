import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { IpcRenderService } from '../electron-services/ipc-render.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  // variable para manejar el estado del mensage
  pong: boolean = false;

  // injectamos el servicio ipc
  // injectamos el servicio de ChangeDetectorRef
  constructor(private _ipcService: IpcRenderService, private cdRef: ChangeDetectorRef) { }

  // se ejecuta cuando el componente es destruido
  ngOnDestroy(): void {
    // remueve el evento 'reply' para liverar memoria
    this._ipcService.removeAllListener("reply");
  }

  // creamos un meto que envia un mensaje. 
  ping(): void {
    // con el metodo send del ipcService pasamos canal 'message' y el mensaje 'ping'
    this._ipcService.send("message", "ping");
    // escuchas la respuesta que llegara desde el main por el canal 'reply'
    this._ipcService.on("reply", (event: any, arg: string) => {
      // compara la respuesta que llega por 'arg' con el text 'pong' y guarda en la variableel resultado
      this.pong = (arg === "pong");
      // forsamos a una deteccion de cambios en el componente (ngZone)
      this.cdRef.detectChanges;
    });
  }

}
