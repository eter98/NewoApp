/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewoAppTestModule } from '../../../test.module';
import { HostSedeDetailComponent } from 'app/entities/host-sede/host-sede-detail.component';
import { HostSede } from 'app/shared/model/host-sede.model';

describe('Component Tests', () => {
    describe('HostSede Management Detail Component', () => {
        let comp: HostSedeDetailComponent;
        let fixture: ComponentFixture<HostSedeDetailComponent>;
        const route = ({ data: of({ hostSede: new HostSede(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NewoAppTestModule],
                declarations: [HostSedeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HostSedeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HostSedeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.hostSede).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
