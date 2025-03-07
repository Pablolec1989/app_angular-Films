import { Component, OnInit, Input, numberAttribute, inject } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { RouterLink } from "@angular/router";
import Swal from "sweetalert2";
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";
import { Coordenada } from "../../compartidos/componentes/mapa/coordenada";
import { MapaComponent } from "../../compartidos/componentes/mapa/mapa.component";
import { RatingComponent } from "../../compartidos/componentes/rating/rating.component";
import { RatingService } from "../../rating/rating.service";
import { SeguridadService } from "../../seguridad/seguridad.service";
import { PeliculaDTO } from "../peliculas";
import { PeliculasService } from "../peliculas.service";
import { MatChipsModule } from '@angular/material/chips';
import { LeafletModule } from "@bluehalo/ngx-leaflet";


@Component({
    selector: 'app-detalle-pelicula',
    imports: [CargandoComponent, MatChipsModule, RouterLink, MapaComponent, RatingComponent, LeafletModule],
    templateUrl: './detalle-pelicula.component.html',
    styleUrl: './detalle-pelicula.component.css'
})
export class DetallePeliculaComponent implements OnInit {


  @Input({transform: numberAttribute})
  id!: number;

  peliculasService = inject(PeliculasService);
  ratingsService = inject(RatingService);
  seguridadService = inject(SeguridadService);
  pelicula!: PeliculaDTO;
  sanitizer = inject(DomSanitizer);
  trailerURL!: SafeResourceUrl;
  coordenadas: Coordenada[] = [];


  ngOnInit(): void {
    this.peliculasService.obtenerPorId(this.id).subscribe(pelicula => {
      pelicula.fechaLanzamiento = new Date(pelicula.fechaLanzamiento);
      this.pelicula = pelicula;
      this.trailerURL = this.generarURLYoutubeEmbed(pelicula.trailer);

      this.coordenadas = pelicula.cines!.map(cine => {
        return <Coordenada>{latitud: cine.latitud, longitud: cine.longitud, texto: cine.nombre}
      })

    });
  }
  
  generarURLYoutubeEmbed(url: string): SafeResourceUrl | string {
    if (!url){
      return '';
    }

    var videoId = url.split('v=')[1];
    var posicionAmpersand = videoId.indexOf('&');
    if (posicionAmpersand !== -1){
      videoId = videoId.substring(0, posicionAmpersand);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`)

  }

  puntuar(puntuacion: number){

    if (!this.seguridadService.estaLogueado()){
      Swal.fire('Error', "Debes loguearte para poder votar por una película", 'error')
      return;
    }

    this.ratingsService.puntuar(this.id, puntuacion).subscribe(() => {
      Swal.fire('Exitoso', "Su voto ha sido recibido", "success")
    });
  }

}
