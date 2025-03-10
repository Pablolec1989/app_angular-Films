import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icon, latLng, LeafletMouseEvent, marker, Marker, MarkerOptions, tileLayer } from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Coordenada } from './coordenada';

@Component({
  selector: 'app-mapa',
  imports: [LeafletModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements OnInit {

  ngOnInit(): void {
    console.log("Coordenadas iniciales en MapaComponent:", this.coordenadasIniciales);
    this.capas = this.coordenadasIniciales.map(valor => {
      const marcador = marker([valor.latitud, valor.longitud], this.markerOptions);
      console.log("Marcador creado:", marcador); // Verifica la creación del marcador

      if(valor.texto){
        marcador.bindPopup(valor.texto, {autoClose: false, autoPan: false});
      }
      return marcador;

    });
  }


  @Input()
  coordenadasIniciales: Coordenada[] = [];

  @Input()
  soloLectura = false;

  @Output()
  coordenadaSeleccionada = new EventEmitter<Coordenada>();

  markerOptions: MarkerOptions = {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png'
    })
  }

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    ],
    zoom: 14,
    center: latLng(-43.2914402, -65.4933627,14)
  }

  capas: Marker<any>[] = [];

  manejarClick(event: LeafletMouseEvent){

    if(this.soloLectura){
      return;
    }

    const latitud = event.latlng.lat; 
    const longitud = event.latlng.lng;

    this.capas = [];
    this.capas.push(marker([latitud, longitud], this.markerOptions));
    this.coordenadaSeleccionada.emit({latitud, longitud})
  }

}
