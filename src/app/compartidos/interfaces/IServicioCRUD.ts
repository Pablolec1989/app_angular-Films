import { Observable } from "rxjs";
import { paginacionDTO } from "../modelos/paginacionDTOs";
import { HttpResponse } from "@angular/common/http";

export interface IServicioCRUD<TDTO, TCreationDTO>{
    obtenerPaginado(paginacion: paginacionDTO): Observable<HttpResponse<TDTO[]>>;
    obtenerPorId(id: number):Observable<TDTO>;
    actualizar(id: number, entidad: TCreationDTO): Observable<any>;
    crear(entidad: TCreationDTO): Observable<any>;
    borrar(id:number): Observable<any>;
}