import { Component, OnInit } from '@angular/core';
import { Cancion } from '../cancion';
import { CancionService } from '../cancion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Generos } from '../cancion'

@Component({
  selector: 'app-cancion-list',
  templateUrl: './cancion-list.component.html',
  styleUrls: ['./cancion-list.component.css']
})
export class CancionListComponent implements OnInit {

  constructor(
    private cancionService: CancionService,
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  userId: number
  token: string
  canciones: Array<Cancion>
  mostrarCanciones: Array<Cancion>
  cancionSeleccionada: Cancion
  indiceSeleccionado: number = 0
  generoSeleccionado: string
  nombreInterpreteSeleccionado: string

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

  /**
   * Inicializa la información del componente
   */
  ngOnInit() {
    if(!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.getCanciones();
    }
  }

  /**
   * Invoca el servicio que retorna el listado de canciones
   */
  getCanciones():void{
    this.cancionService.getCanciones()
    .subscribe(canciones => {
      this.canciones = canciones
      this.mostrarCanciones = canciones
      this.onSelect(this.mostrarCanciones[0], 0)
    })
  }

  /**
   * Responde el evento de seleccionar una canción de la lista
   *
   * @param cancion Información de la canción
   * @param indice Indice de la canción en la lista
   */
  onSelect(cancion: Cancion, indice: number){
    this.indiceSeleccionado = indice
    this.cancionSeleccionada = cancion
    if(cancion !== undefined) {
      this.cancionService.getAlbumesCancion(cancion.id)
      .subscribe(albumes => {
        this.cancionSeleccionada.albumes = albumes
      },
      error => {
        this.showError(`Ha ocurrido un error: ${error.message}`)
      })
    }
  }

  /**
   * Recibe el evento cuando cambia el valor del género seleccionado e invoca
   * la función para buscar canciones
   *
   * @param event Información del evento generado
   */
  onChangeGenero(event: any){
    this.generoSeleccionado = event.target.value
    this.buscarCancion(this.nombreInterpreteSeleccionado ? this.nombreInterpreteSeleccionado : "")
  }

  /**
   * Busca las canciones por el nombre, interprete y género si fue seleccionado
   *
   * @param busqueda nombre y/o interprete de la canción
   */
  buscarCancion(busqueda: string) {
    let cancionesBusqueda: Array<Cancion> = []
    this.nombreInterpreteSeleccionado = busqueda

    if(this.generoSeleccionado) {
      this.canciones.map( cancion => {
        if((cancion.titulo.toLocaleLowerCase().includes(this.nombreInterpreteSeleccionado.toLocaleLowerCase()) ||
        cancion.interprete.toLocaleLowerCase().includes(this.nombreInterpreteSeleccionado.toLocaleLowerCase())) &&
        cancion.genero.llave === this.generoSeleccionado){
          cancionesBusqueda.push(cancion)
        }
      })
    }else {
      this.canciones.map( cancion => {
        if(cancion.titulo.toLocaleLowerCase().includes(this.nombreInterpreteSeleccionado.toLocaleLowerCase()) ||
        cancion.interprete.toLocaleLowerCase().includes(this.nombreInterpreteSeleccionado.toLocaleLowerCase())){
          cancionesBusqueda.push(cancion)
        }
      })
    }

    this.mostrarCanciones = cancionesBusqueda;
  }

  /**
   * Invoca el servicio para eliminar una canción
   */
  eliminarCancion(){
    this.cancionService.eliminarCancion(this.cancionSeleccionada.id)
    .subscribe(cancion => {
      this.ngOnInit()
      this.showSuccess()
    },
    error=> {
      this.showError("Ha ocurrido un error. " + error.message)
    })
  }

  /**
   * Cambia el valor de favorita para una canción dada e invoca
   * el servicio para actualiar la información de la canción
   *
   * @param cancion a modificar el valor de favorita
   * @param indice de la posición de la canción en el listado
   */
  seleccionarFavoria(cancion: Cancion, indice: number) {
    cancion.favorita = !cancion.favorita
    this.mostrarCanciones[indice].favorita = cancion.favorita

    this.cancionService.editarCancion(cancion, cancion.id)
    .subscribe(() => {
      this.ngOnInit()
    },
    error=> {
      this.showError("Ha ocurrido un error. " + error.message)
    })
  }

  irCrearCancion(){
    this.routerPath.navigate([`/canciones/create/${this.userId}/${this.token}`])
  }

  showError(error: string){
    this.toastr.error(error, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`La canción fue eliminada`, "Eliminada exitosamente");
  }

}
