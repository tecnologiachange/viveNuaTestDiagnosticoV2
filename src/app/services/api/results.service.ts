import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor() { }

  public getHability(): any {
    const hability = {
      name: 'Macro Habilidad 1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      subhabilities: [
        {
          name: 'Micro Habilidad 1',
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
          badge: {
            color: '#2f9ea2',
            text: 'Bajo'
          },
          percent: 30
        },
        {
          name: 'Micro Habilidad 2',
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
          badge: {
            color: '#9f7eee',
            text: 'Medio'
          },
          percent: 40
        }
      ],
    }
    const hability2 = {
      name: 'Macro Habilidad 2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      subhabilities: [
        {
          name: 'Micro Habilidad 1',
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
          badge: {
            color: '#5325a0',
            text: 'Alto'
          },
          percent: 60
        },
        {
          name: 'Micro Habilidad 2',
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
          badge: {
            color: '#311868',
            text: 'Muy Alto'
          },
          percent: 90
        }
      ],
    }
    return of([hability, hability2]);
  }
}
