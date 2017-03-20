import { AppService } from '../app.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StartPageComponent } from './';

describe(`start-page`, () => {
    let comp: StartPageComponent;
    let fixture: ComponentFixture<StartPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StartPageComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [AppService]
        })
            .compileComponents();
    }));

    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(StartPageComponent);
        comp = fixture.componentInstance;

        fixture.detectChanges(); // trigger initial data binding
    });

    it('should log ngOnInit', () => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();

        comp.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    });

});
