import { Component, OnInit } from '@angular/core';
import { ElectronStoreService } from '../electron-services/electron-store.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  // crea e inicializa la variable 'clicks'
  clicks: number = 0;
  // contiene el estado de guardado de los 'clicks'
  saved: boolean = true;

  // injecta el servicio del store
  constructor(private storeService: ElectronStoreService) { }

  // se ejecuta la inicia el componente
  ngOnInit(): void {
    // inicializa la variable 'clicks' con lo almacenado en el store
    this.clicks = this.storeService.get("clicks");
  }

  // evento que se ejecuta al hacer clicks
  addClicks(): void {
    // incrementa la variable clicks de 1 en 1
    this.clicks++;
    // cambia el estado de guardado de la varible 'saved'
    this.saved = false;
  }

  save(): void {
    // guarda la cantidad de click en el store
    this.storeService.set('clicks', this.clicks);
     // cambia el estado de guardado de la varible 'saved'
    this.saved = true;
  }

}
