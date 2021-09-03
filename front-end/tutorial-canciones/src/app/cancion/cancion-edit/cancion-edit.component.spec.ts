/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CancionEditComponent } from './cancion-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CancionService } from '../cancion.service';
import { Cancion } from '../cancion';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('CancionEditComponent', () => {
  let component: CancionEditComponent;
  let fixture: ComponentFixture<CancionEditComponent>;

  let cancionService = jasmine.createSpyObj('CancionService', ['getCancion']);
  cancionService.getCancion.and.returnValue(of(new Cancion(1, 'prueba', 3, 35, 'interprete', false, [])));

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
      declarations: [ CancionEditComponent ],
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
    fixture = TestBed.createComponent(CancionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creación del componente', () => {
    expect(component).toBeTruthy();
  });

  it('Valor inicial de favorita', () => {
    expect(component.cancionForm.get('favorita')?.value).toBe(false);
  });

  it('Cambiar valor de favorita', () => {
    component.establecerFavoria();
    expect(component.cancionForm.get('favorita')?.value).toBe(true);
  });
});
