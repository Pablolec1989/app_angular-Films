import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ActoresService } from '../actores.service';
import { paginacionDTO } from '../../compartidos/modelos/paginacionDTOs';
import { HttpResponse } from '@angular/common/http';
import { ActorDTO } from '../actores';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatTableModule } from '@angular/material/table';
import { ListadoGenericoComponent } from '../../compartidos/componentes/listado-generico/listado-generico.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-indice-actores',
  imports: [RouterLink, MatButtonModule,MatTableModule, ListadoGenericoComponent, MatPaginatorModule, SweetAlert2Module],
  templateUrl: './indice-actores.component.html',
  styleUrl: './indice-actores.component.css'
})
export class IndiceActoresComponent {

  actoresService = inject(ActoresService);
  actores!: ActorDTO[];
  columnasAMostrar = ['id', 'nombre', 'acciones'];

  paginacion: paginacionDTO = {pagina: 1, recordsPorPagina: 5};
  cantidadTotalRegistros!: number;

  constructor(){
    this.cargarRegistros();
  }

  cargarRegistros(){
    this.actoresService.obtenerPaginado(this.paginacion)
    .subscribe((respuesta: HttpResponse<ActorDTO[]>) => {
      this.actores = respuesta.body as ActorDTO[];
      const cabecera = respuesta.headers.get("cantidad-total-registros") as string;

      this.cantidadTotalRegistros = parseInt(cabecera, 10);
    });
  }

  actualizarPaginacion(datos: PageEvent){

    this.paginacion = {pagina: datos.pageIndex + 1, recordsPorPagina: datos.pageSize};
    this.cargarRegistros();

  }

  borrarRegistros(id: number){
    this.actoresService.borrar(id).subscribe(() => {
      this.paginacion.pagina = 1;
      this.cargarRegistros();
    })

  }



}
