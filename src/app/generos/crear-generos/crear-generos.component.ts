import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { GeneroCreationDTO } from '../generos';
import { FormularioGeneroComponent } from '../formulario-genero/formulario-genero.component';

@Component({
  selector: 'app-crear-generos',
  imports: [MatButtonModule, RouterLink, ReactiveFormsModule, MatInputModule, FormularioGeneroComponent],
  templateUrl: './crear-generos.component.html',
  styleUrl: './crear-generos.component.css'
})
export class CrearGenerosComponent {

  private router = inject(Router);
  
  guardarCambios(genero: GeneroCreationDTO){

    //Guardar cambios...
    //this.router.navigate(['/generos']);

    console.log("Creando el género", genero);

  }

}
