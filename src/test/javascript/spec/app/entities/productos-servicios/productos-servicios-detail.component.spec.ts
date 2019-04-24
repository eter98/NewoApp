/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { ProductosServiciosDetailComponent } from 'app/entities/productos-servicios/productos-servicios-detail.component';
import { ProductosServicios } from 'app/shared/model/productos-servicios.model';

describe('Component Tests', () => {
    describe('ProductosServicios Management Detail Component', () => {
        let comp: ProductosServiciosDetailComponent;
        let fixture: ComponentFixture<ProductosServiciosDetailComponent>;
        const route = ({ data: of({ productosServicios: new ProductosServicios(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [ProductosServiciosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductosServiciosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductosServiciosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.productosServicios).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
