import { DatosService } from '../services/datos.service';
import { CopiaService } from '../services/copia.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  constructor(private copiaService:CopiaService, private datosService:DatosService) {}
  ngOnInit(): void {
    
  }

  copia(){
    this.copiaService.copiarBBDD().then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    })
  }

  abrir(){
    this.datosService.openDB().then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    })
  }
  
  getHoras(){
    this.datosService.getHoras();
  }
}
