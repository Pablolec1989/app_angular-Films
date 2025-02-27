import { Component, Input, numberAttribute } from '@angular/core';
import { GeneroCreationDTO, GeneroDTO } from '../generos';
import { FormularioGeneroComponent } from '../formulario-genero/formulario-genero.component';

@Component({
  selector: 'app-editar-genero',
  imports: [FormularioGeneroComponent],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.css'
})
export class EditarGeneroComponent {

  @Input({transform: numberAttribute})
  id!: number;

  genero: GeneroDTO = {id:1, nombre:"Drama"}

  guardarCambios(genero: GeneroCreationDTO){

    console.log("editando el genero", genero)

  }

}
