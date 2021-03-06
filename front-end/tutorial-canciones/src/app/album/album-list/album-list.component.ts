import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { Album, Cancion, Generos } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  constructor(
    private albumService: AlbumService,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private routerPath: Router
  ) { }

  userId: number
  token: string
  albumes: Array<Album>
  mostrarAlbumes: Array<Album>
  albumSeleccionado: Album
  indiceSeleccionado: number
  generoEscogido: string

  /*Se lleva a cabo la lista de Generos */
  generos:Array<Generos> = [
    {
      llave:"SALSA",
    },
    {
      llave:"ROCK",
    },
    {
      llave:"POP",
    },
    {
      llave:"BALADA",
    },
    {
      llave:"CLASICA",
    }
  ]

  ngOnInit() {
    if(!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.getAlbumes();
    }
  }

  getAlbumes():void{
    this.albumService.getAlbumes(this.userId, this.token)
    .subscribe(albumes => {
      this.albumes = albumes
      this.mostrarAlbumes = albumes
      if(albumes.length>0){
        this.onSelect(this.mostrarAlbumes[0], 0)
      }
    },
    error => {
      console.log(error)
      if(error.statusText === "UNAUTHORIZED"){
        this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if(error.statusText === "UNPROCESSABLE ENTITY"){
        this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else{
        this.showError("Ha ocurrido un error. " + error.message)
      }
    })

  }

  onSelect(a: Album, index: number){
    this.indiceSeleccionado = index
    this.albumSeleccionado = a
    this.albumService.getCancionesAlbum(a.id, this.token)
    .subscribe(canciones => {
      this.albumSeleccionado.canciones = canciones
      this.albumSeleccionado.interpretes = this.getInterpretes(canciones)
    },
    error =>{
      this.showError("Ha ocurrido un error, " + error.message)
    })
  }

  getInterpretes(canciones: Array<Cancion>): Array<string>{
    var interpretes: Array<string> = []
    canciones.map( c => {
      if(!interpretes.includes(c.interprete)){
        interpretes.push(c.interprete)
      }
    })
    return interpretes
  }

  /*Se ajusta el metodo de filtrado de nombre album por interprete y genero @William Sanchez */
  buscarAlbum(busqueda: string){
    let albumesBusqueda: Array<Album> = []
    if(!this.generoEscogido || this.generoEscogido == 'undefined'){
      this.albumes.map( albu => {
        this.onSelect(albu, this.indiceSeleccionado)
        if( albu.titulo.toLocaleLowerCase().includes(busqueda.toLowerCase()) || albu.canciones.forEach(function (value){
          if(value.interprete && value.interprete.toLowerCase().includes(busqueda.toLowerCase())){
             albumesBusqueda.push(albu)
          }
        })){
          albumesBusqueda.push(albu)
        }
      })
    }else{
      this.albumes.map( albu => {
      if( albu.titulo.toLocaleLowerCase().includes(busqueda.toLowerCase()) && albu.genero.llave.toLowerCase().includes(this.generoEscogido)){
        albumesBusqueda.push(albu)
      }
    })
  }
    this.mostrarAlbumes = albumesBusqueda
  }

  /*Metodo de filtrado para el genero @Willima Sanchez  */
  buscarAlbumGenero(genero: string){
    this.generoEscogido = genero
    if(genero == 'undefined'){
      this.getAlbumes()
    }else{
      let albumesBusqueda: Array<Album> = []
      this.albumes.map(albu =>{
        if(albu.genero.llave.toLowerCase().includes(genero.toLowerCase())){
          albumesBusqueda.push(albu)
        }
      })
      this.mostrarAlbumes = albumesBusqueda
    }
  }

  irCrearAlbum(){
    this.routerPath.navigate([`/albumes/create/${this.userId}/${this.token}`])
  }

  eliminarAlbum(){
    this.albumService.eliminarAlbum(this.userId, this.token, this.albumSeleccionado.id)
    .subscribe(album => {
      this.ngOnInit();
      this.showSuccess();
    },
    error=> {
      if(error.statusText === "UNAUTHORIZED"){
        this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if(error.statusText === "UNPROCESSABLE ENTITY"){
        this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else{
        this.showError("Ha ocurrido un error. " + error.message)
      }
    })
    this.ngOnInit()
  }

  showError(error: string){
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string){
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`El album fue eliminado`, "Eliminado exitosamente");
  }
}
