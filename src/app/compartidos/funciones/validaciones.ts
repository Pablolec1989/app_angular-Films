import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function primeraLetraMayuscula(): ValidatorFn{

    return (control:AbstractControl): ValidationErrors | null => {
        const valor = <string>control.value;

        if(!valor) return null;
        if(valor.length === 0) return null;

        const primeraLetra = valor[0];

        if (primeraLetra !== primeraLetra.toUpperCase()){
            return{
                primeraLetraMayuscula:{
                    mensaje : 'La primera letra debe ser mayúscula'
                }
            }
        }
        return null;
    }

}

export function fechaNoPuedeSerFutura():ValidatorFn{
    return(control: AbstractControl): ValidationErrors | null => {
        const fechaEscogidaUsuario = new Date(control.value);
        const hoy = new Date();

        if (fechaEscogidaUsuario > hoy){
            return { futuro: { mensaje: "La fecha no puede ser posterior a la actual" } }
        }
        return null;
    }
}

export function toBase64(file: File): Promise<string>{

    return new Promise((resolve, reject) => {
        const lector = new FileReader();
        lector.readAsDataURL(file);
        lector.onload = () => resolve(lector.result as string)
        lector.onerror = (error)=> reject(error);
        
    })

}