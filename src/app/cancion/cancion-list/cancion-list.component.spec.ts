/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CancionListComponent } from './cancion-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { CancionService } from '../cancion.service';
import { of } from 'rxjs';
import { Cancion } from '../cancion';
import { Generos } from 'src/app/album/album';

describe('CancionListComponent', () => {
  let component: CancionListComponent;
  let fixture: ComponentFixture<CancionListComponent>;

  let cancionService = jasmine.createSpyObj('CancionService', ['getCanciones', 'getAlbumesCancion']);
  cancionService.getCanciones.and.returnValue(of([new Cancion(1, 'prueba', 3, 35, 'interprete', true, [])]));
  cancionService.getAlbumesCancion.and.returnValue(of([]));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot({
          positionClass :'toast-bottom-right'
        })
      ],
      declarations: [ CancionListComponent ],
      providers: [
        ToastrService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: {userId: '123'}}
          }
        },
        {provide : CancionService, useValue: cancionService}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creación del componente', () => {
    expect(component).toBeTruthy();
  });

  it('Verificación de favorita', () => {
    expect(component.mostrarCanciones[0].favorita).toBe(true);
  });

  it('Busqueda por nombre', () => {
    component.buscarCancion('prue');
    expect(component.mostrarCanciones[0].titulo).toBe('prueba');
  });

  it('Busqueda por interprete', () => {
    component.buscarCancion('inter');
    expect(component.mostrarCanciones[0].titulo).toBe('prueba');
  });
});
