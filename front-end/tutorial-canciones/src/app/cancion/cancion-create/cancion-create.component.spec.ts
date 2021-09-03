/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import { CancionCreateComponent } from './cancion-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('CancionCreateComponent', () => {
  let component: CancionCreateComponent;
  let fixture: ComponentFixture<CancionCreateComponent>;

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
      declarations: [ CancionCreateComponent ],
      providers: [
        ToastrService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: {userId: '123'}}
          }
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creación del componente', () => {
    expect(component).toBeTruthy();
  });

  it('Valor inicial de favorita', () => {
    expect(component.cancionForm.get('favorita')?.value).toBe(false);
  });

  it('Establece el valor a favorita', () => {
    component.establecerFavoria();
    expect(component.cancionForm.get('favorita')?.value).toBe(true);
  });
});
