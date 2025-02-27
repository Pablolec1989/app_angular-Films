import { Component, Input, numberAttribute } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/selectorMultipleModelo';

@Component({
  selector: 'app-editar-pelicula',
  imports: [FormularioPeliculasComponent],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})

export class EditarPeliculaComponent {

  @Input({transform: numberAttribute})
  id!:number;

  pelicula: PeliculaDTO = {
    id:1, 
    titulo:'Spider-man', 
    trailer: 'ABC', 
    fechaLanzamiento : new Date('2018-07-25'), 
    poster: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg?20240514232832'
  

  }

  generosSeleccionados: SelectorMultipleDTO[] = [
    {llave: 2, valor: "Acción"}];

  generosNoSeleccionados: SelectorMultipleDTO[] = [
    {llave: 1, valor: "Drama"},
    {llave: 3, valor: "Comedia"}
  ];

  guardarCambios(pelicula: PeliculaCreacionDTO){
    console.log('creando pelicula', pelicula);
  }
}