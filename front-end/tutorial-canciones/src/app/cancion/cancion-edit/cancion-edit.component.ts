import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cancion } from '../cancion';
import { CancionService } from '../cancion.service';
import { Generos } from '../cancion'

@Component({
  selector: 'app-cancion-edit',
  templateUrl: './cancion-edit.component.html',
  styleUrls: ['./cancion-edit.component.css']
})
export class CancionEditComponent implements OnInit {

  userId: number;
  token: string;
  cancionId: number;
  cancionForm!: FormGroup;

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

  constructor(
    private cancionService: CancionService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    if(!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }else{
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.cancionService.getCancion(this.router.snapshot.params.cancionId)
      .subscribe(cancion => {
        this.cancionId = cancion.id
        this.cancionForm = this.formBuilder.group({
          titulo: [cancion.titulo, [Validators.required, Validators.maxLength(128)]],
          minutos: [cancion.minutos, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(2)]],
          segundos: [cancion.segundos, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(2)]],
          interprete: [cancion.interprete, [Validators.required, Validators.maxLength(128)]],
          genero: [cancion.genero, [Validators.required]],
          favorita: [cancion.favorita]
        })
      })
    }
  }

  /**
   * Limpia el formulario y retorna a la página principal
   */
  cancelCreate(){
    this.cancionForm.reset()
    this.routerPath.navigate([`/canciones/${this.userId}/${this.token}`])
  }

  /**
   * Obtiene los valores de los campos e invoca el servicio para editar
   * una canción
   *
   * @param newCancion canción a editar
   */
  editarCancion(newCancion: Cancion){
    this.cancionForm.get('minutos')?.setValue(parseInt(this.cancionForm.get('minutos')?.value))
    this.cancionForm.get('segundos')?.setValue(parseInt(this.cancionForm.get('segundos')?.value))
    this.cancionService.editarCancion(newCancion, this.cancionId)
    .subscribe(cancion => {
      this.showSuccess(cancion)
      this.cancionForm.reset()
      this.routerPath.navigate([`/canciones/${this.userId}/${this.token}`])
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
  }

  /**
   * Modifica el valor del campo favorita. Si era true lo cambia a false y viceversa
   */
  establecerFavoria(){
    this.cancionForm.get('favorita')?.setValue(!this.cancionForm.get('favorita')?.value)
  }

  /**
   * @returns el valor actual del campo favorita
   */
  esFavorita(){
    return this.cancionForm.get('favorita')?.value;
  }

  showError(error: string){
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string){
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(cancion: Cancion) {
    this.toastr.success(`La canción ${cancion.titulo} fue editada`, "Edición exitosa");
  }

}
