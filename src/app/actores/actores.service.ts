import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ActorCreationDTO, ActorDTO } from './actores';
import { Observable } from 'rxjs';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';
import { paginacionDTO } from '../compartidos/modelos/paginacionDTOs';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  constructor() {}

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/actores';

  
  public obtenerPaginado(paginacion: paginacionDTO): Observable<HttpResponse<ActorDTO[]>>{

    let queryParams = construirQueryParams(paginacion);
    return this.http.get<ActorDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});

  }

  public obtenerPorId(id: number): Observable<ActorDTO>{

    return this.http.get<ActorDTO>(`${this.urlBase}/${id}`)

  }

  public actualizar(id: number, actor: ActorCreationDTO){
    const formData = this.construirFormData(actor);

    return this.http.put(`${this.urlBase}/${id}`, formData);

  }

  public crearActor(actor: ActorCreationDTO){

    const formData = this.construirFormData(actor);
    return this.http.post(this.urlBase, formData);
  }

  public borrar(id: number){
    return this.http.delete(`${this.urlBase}/${id}`);
  }

  private construirFormData(actor: ActorCreationDTO): FormData {

    const formData = new FormData();

    formData.append('nombre', actor.nombre);
    formData.append('fechaNacimiento', actor.fechaNacimiento.toISOString().split('T')[0]);

    if(actor.foto){
      formData.append('foto', actor.foto);
    }

    return formData;
  }





}
