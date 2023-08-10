import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { GetService } from './get.service';

describe('GetService', () => {
  let service: GetService;
  let firestoreSpy: jasmine.SpyObj<Firestore> | any;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Firestore', ['collection']);
    TestBed.configureTestingModule({
      providers: [
        GetService,
        { provide: Firestore, useValue: spy }
      ]
    });
    service = TestBed.inject(GetService);
    firestoreSpy = TestBed.inject(Firestore) as jasmine.SpyObj<Firestore>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call collection with the correct collection name', () => {
    const collectionName = 'myCollection';
    service.get(collectionName);
    expect(firestoreSpy.collection).toHaveBeenCalledWith(collectionName);
  });

  it('should map the items correctly', (done) => {
    const items = [
      { doc: { id: '1', data: () => ({ name: 'John' }) } },
      { doc: { id: '2', data: () => ({ name: 'Jane' }) } }
    ];
    const expectedOutput = [
      { id: '1', name: 'John' },
      { id: '2', name: 'Jane' }
    ];
    firestoreSpy.collection.and.returnValue({ valueChanges: () => ({ subscribe: (fn: any) => fn(items) }) });
    service.get('myCollection').subscribe((result) => {
      expect(result).toEqual(expectedOutput);
      done();
    });
  });
});