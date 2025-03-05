import { Component } from '@angular/core';
import { CineCreationDTO } from '../cines';
import { FormularioCinesComponent } from "../formulario-cines/formulario-cines.component";
import { CrearEntidadComponent } from "../../compartidos/componentes/crear-entidad/crear-entidad.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { CinesService } from '../cines.service';


@Component({
  selector: 'app-crear-cine',
  imports: [CrearEntidadComponent],
  templateUrl: './crear-cine.component.html',
  styleUrl: './crear-cine.component.css',
  providers: [
    {provide: SERVICIO_CRUD_TOKEN, useClass: CinesService}
  ]
})
export class CrearCineComponent {
  FormularioCines = FormularioCinesComponent;

}
  