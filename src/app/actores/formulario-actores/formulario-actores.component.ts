import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import * as datepicker from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Importación correcta

@Component({
    selector: 'app-formulario-actores',
    imports: [
        MatButtonModule,
        RouterLink,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        datepicker.MatDatepickerModule,
        MatNativeDateModule,
        MatDatepickerModule 
    ],
    templateUrl: './formulario-actores.component.html',
    styleUrl: './formulario-actores.component.css'
})
export class FormularioActoresComponent {
    private formBuilder = inject(FormBuilder);

    form = this.formBuilder.group({
        nombre: ['', { validators: [Validators.required] }],
        fechaNacimiento: new FormControl<Date | null>(null)
    });
}