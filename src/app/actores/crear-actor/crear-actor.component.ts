import { Component } from '@angular/core';
import { FormularioActoresComponent } from '../formulario-actores/formulario-actores.component';
import { ActorCreationDTO } from '../actores';

@Component({
  selector: 'app-crear-actor',
  imports: [FormularioActoresComponent],
  templateUrl: './crear-actor.component.html',
  styleUrl: './crear-actor.component.css'
})
export class CrearActorComponent {

  guardarCambios(actor: ActorCreationDTO){
    console.log('creando el actor', actor)
  }

}
