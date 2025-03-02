import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { GeneroCreationDTO, GeneroDTO } from '../generos';

@Component({
  selector: 'app-formulario-genero',
  imports: [MatButtonModule, RouterLink, ReactiveFormsModule, MatInputModule],
  templateUrl: './formulario-genero.component.html',
  styleUrl: './formulario-genero.component.css'
})
export class FormularioGeneroComponent implements OnInit {

  ngOnInit(): void {

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  @Input()
  modelo?: GeneroDTO;

  @Output()
  posteoFormulario = new EventEmitter<GeneroCreationDTO>()

  private formbuilder = inject(FormBuilder);

  form = this.formbuilder.group({
    nombre:['', {validators:
      [Validators.required, 
        primeraLetraMayuscula(), 
        Validators.maxLength(50)]}]
  })

  obtenerErrorCampoNombre():string{
    let nombre = this.form.controls.nombre;

    if(nombre.hasError('primeraLetraMayuscula')){
      return nombre.getError('primeraLetraMayuscula').mensaje;
    }
    if(nombre.hasError('maxlength')){
      return `El campo nombre no puede tener mas de ${nombre.getError('maxlength').requiredLength} caracteres`
    }
    
    return "";
  }

  guardarCambios(){

    if(!this.form.value){
      return;
    }
    const genero = this.form.value as GeneroCreationDTO;
    this.posteoFormulario.emit(genero);
    
  }
}

