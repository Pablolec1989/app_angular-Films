import { inject, Injectable } from '@angular/core';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';
import { CineCreationDTO, CineDTO } from './cines';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { paginacionDTO } from '../compartidos/modelos/paginacionDTOs';
import { environment } from '../../environments/environment.development';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class CinesService implements IServicioCRUD<CineDTO, CineCreationDTO> {


  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/cines';

  constructor() { }

  obtenerPaginado(paginacion: paginacionDTO): Observable<HttpResponse<CineDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<CineDTO[]>(this.urlBase , {params: queryParams, observe: 'response'});
  }

  obtenerPorId(id: number): Observable<CineDTO> {
    return this.http.get<CineDTO>(`${this.urlBase}/${id}`)
  }
  
  actualizar(id: number, entidad: CineCreationDTO): Observable<any> {
    return this.http.put(`${this.urlBase}/${id}`, entidad);
  }
  
  crear(entidad: CineCreationDTO): Observable<any> {
    return this.http.post(this.urlBase, entidad);
  }
  
  borrar(id: number): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`)
  }
}
