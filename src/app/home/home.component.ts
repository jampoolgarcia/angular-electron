import { Component, OnInit } from '@angular/core';
import { IpcRenderService } from '../ipc-render.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // variable para manejar el estado del mensage
  pong: boolean = false;

  // injectamos el servicio ipc
  constructor(private _ipcService: IpcRenderService) { }

  ngOnInit(): void {
  }

  // creamos un meto que envia un mensaje. 
  ping(): void {
    // con el metodo send del ipcService pasamos canal 'message' y el mensaje 'ping'
    this._ipcService.send("message", "ping");
  }

}
