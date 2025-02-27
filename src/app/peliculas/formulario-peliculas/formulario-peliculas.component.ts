import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { InputImgComponent } from '../../compartidos/componentes/input-img/input-img.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import moment from 'moment';
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/selectorMultipleModelo';
import { SelectorMultipleComponent } from "../../compartidos/componentes/selector-multiple/selector-multiple.component";

@Component({
  selector: 'app-formulario-peliculas',
  imports: [MatFormField, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink, MatDatepickerModule, InputImgComponent, SelectorMultipleComponent],
  templateUrl: './formulario-peliculas.component.html',
  styleUrl: './formulario-peliculas.component.css'
})

export class FormularioPeliculasComponent implements OnInit {

  ngOnInit(): void {
    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  @Input({required: true})
  generosNoSeleccionados!: SelectorMultipleDTO[];
  
  @Input({required: true})
  generosSeleccionados!: SelectorMultipleDTO[];

  @Input()
  modelo?: PeliculaDTO;

  @Output()
  posteoFormulario = new EventEmitter<PeliculaCreacionDTO>();


  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    titulo: ['', {validators: [Validators.required]}],
    fechaLanzamiento: new FormControl<Date | null>(null, {validators: [Validators.required]}),
    trailer:'',
    poster: new FormControl<File | string | null>(null)
  });

  archivoSeleccionado(file: File){
    this.form.controls.poster.setValue(file);
  }

  guardarCambios(){
    if(!this.form.valid){
      return;
    }

  
    const pelicula = this.form.value as PeliculaCreacionDTO;
    pelicula.fechaLanzamiento = moment(pelicula.fechaLanzamiento).toDate();

    const generosIds = this.generosSeleccionados.map(val => val.llave);
    pelicula.generosIds = generosIds;

    this.posteoFormulario.emit(pelicula);

  }

  obtenerErrorCampoTitulo():string{
    let campo = this.form.controls.titulo;

    if(campo.hasError('required')){
      return "El campo nombre es requerido"
    }

    return '';
  }

  obtenerErrorCampoFechaLanzamiento():string{
    let fechaLanzamiento = this.form.controls.fechaLanzamiento;

    if(fechaLanzamiento.hasError('required')){
      return "El campo Fecha de lanzamiento es requerido";
    }
    return '';
  }
  

}
