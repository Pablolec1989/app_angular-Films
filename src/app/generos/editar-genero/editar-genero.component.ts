import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { GeneroCreationDTO, GeneroDTO } from '../generos';
import { FormularioGeneroComponent } from '../formulario-genero/formulario-genero.component';
import { GenerosService } from '../generos.service';
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { Router } from '@angular/router';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';

@Component({
  selector: 'app-editar-genero',
  imports: [FormularioGeneroComponent, CargandoComponent, MostrarErroresComponent],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.css'
})
export class EditarGeneroComponent implements OnInit {

  ngOnInit(): void {
    this.generoService.obtenerPorId(this.id).subscribe(genero => {
      this.genero = genero;})
    }

  @Input({transform: numberAttribute})

  id!: number;
  genero!: GeneroDTO;
  generoService = inject(GenerosService);
  errores: string[]=[];
  router = inject(Router);

  guardarCambios(genero: GeneroCreationDTO){

    this.generoService.actualizar(this.id, genero).subscribe({
      next: () => {
        this.router.navigate(['/generos']);
      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    })
  }



}
