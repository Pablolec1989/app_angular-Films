import { Component, Input, numberAttribute } from '@angular/core';
import { CineCreationDTO, CineDTO } from '../cines';
import { FormularioCinesComponent } from "../formulario-cines/formulario-cines.component";

@Component({
  selector: 'app-editar-cine',
  imports: [FormularioCinesComponent],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.css'
})
export class EditarCineComponent {

  @Input({transform:numberAttribute})
  id!:number;

  cine: CineDTO = {id:1, nombre:'Akropolis', latitud: -43.291223363183455, longitud: -65.4966240444952}

  guardarCambios(cine: CineCreationDTO){
    console.log('editando cine', cine);
  }

}
