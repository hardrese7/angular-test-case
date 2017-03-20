import { JobInfo } from '../models/job-info.model';
import { Subscription } from 'rxjs/Rx';
import { Client } from '../models/client.model';
import { HttpModule } from '@angular/http';
import { ClientsService } from '../clients.service';
import { ClientsListComponent } from './';
import { AppService } from '../app.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe(`clients-list`, () => {
  let comp: ClientsListComponent;
  let fixture: ComponentFixture<ClientsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ClientsListComponent],
      schemas: [],
      providers: [AppService, ClientsService]
    })
      .compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges(); // trigger initial data binding
  });

  it('should has clients on ngOnInit', () => {
    comp.ngOnInit().add(() => {
      expect(comp.filteredClients.length).toBeGreaterThan(0);
      expect(comp.errorMessage).toBeUndefined();
    });
  });

  it('should gets clients on getClients', () => {
    comp.getClients().add(() => {
      expect(comp.clients.length).toBeGreaterThan(0);
      expect(comp.filteredClients.length).toBeGreaterThan(0);
    });
  });

  it('should found term in object', () => {
    comp.term = 'maga';
    const obj = { users: { user1: 'Vasya', user2: 'Maga' }, users2: null };
    const found = comp.searchTermInObject(obj);
    expect(found).toBe(true);
  });

  it('should not found term in object', () => {
    comp.term = 'Nikolay';
    const obj = { users: { user1: 'Vasya', user2: 'Maga' }, users2: null };
    const found = comp.searchTermInObject(obj);
    expect(found).toBe(false);
  });

  it('should has notification true', () => {
    comp.filteredClients = [];
    checkResultsNotification(true);
  });

  it('should has notification false', () => {
    comp.filteredClients = [new Client()];
    checkResultsNotification(false);
  });

  it('should select client', () => {
    const client = new Client();
    const subscribe = comp.clientsService.clientSelected$.subscribe(
      (val) => expect(val).toBe(client),
      (error) => {
        subscribe.unsubscribe();
        throw Error(error);
      }
    );
    comp.selectClient(client);
  });

  it('should throw error on empty client select', () => {
    const client = null;
    const subscribe = comp.clientsService.clientSelected$.subscribe(
      (val) => {
        throw new Error('it shouldn`t happens');
      },
      (error) => {
        subscribe.unsubscribe();
        throw Error(error);
      }
    );
    expect(() => comp.selectClient(client)).toThrow();
  });

  it('should no filter clients', () => {
    comp.term = '';
    comp.clients = [getClient(), getClient2()];
    comp.filterClients();
    expect(comp.filteredClients.length).toBe(2);
  });

  it('should no filter clients', () => {
    comp.term = 'VelV';
    comp.clients = [getClient(), getClient2()];
    comp.filterClients();
    expect(comp.filteredClients.length).toBe(1);
  });

  function getClient() {
    const client = new Client();
    client.job = new JobInfo();
    client.job.company = 'eastbanc';
    client.job.title = '1234';
    return client;
  }

  function getClient2() {
    const client = new Client();
    client.job = new JobInfo();
    client.job.company = 'velvetech';
    client.job.title = '3214';
    return client;
  }

  function checkResultsNotification(shouldBe) {
    const subscribe: Subscription = comp.clientsService.clientsNotFound$.subscribe(
      (val) => {
        expect(val).toBe(shouldBe);
        subscribe.unsubscribe();
      },
      (error) => {
        subscribe.unsubscribe();
        throw Error(error);
      }
    );
    comp.notifyAboutFoundClients();
  }
});
