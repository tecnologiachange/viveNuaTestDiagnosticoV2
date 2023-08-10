import { Injectable, inject } from "@angular/core";
import { Firestore, addDoc, collection, collectionChanges } from "@angular/fire/firestore";
import { map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class GetService {

  private firestore: Firestore = inject(Firestore);

  constructor(){
    // this.loadItems();
  }

  public get(collectionName: string){
    const collectionInstance =  collection(this.firestore, collectionName);
    return collectionChanges(collectionInstance).pipe( map( this.recordsItems ));
  }

  private recordsItems(items: any){
    return items.map((item: any) => {
      const data = item.doc.data();
      const id = item.doc.id;
      return { id , ...data };
    })
  }

  private loadItems(){
    this.dataMicroHabilidades.forEach( async (item: any) => {
      await addDoc(collection(this.firestore, environment.storage.micro), item);
    });
    this.dataMacroHabilidades.forEach( async (item: any) => {
      await addDoc(collection(this.firestore, environment.storage.macro), item);
    });
  }

  private dataMicroHabilidades = [
    {
      name: 'APRENDIENTE',
      type: [
        {
          question: '8bc5bea4-1c0d-4902-a4d4-fa931358f439',
          weigh: 1
        }
      ],
    },
    {
      name: 'ADAPTABILIDAD',
      type: [
        {
          question: '7bc8d7e3-a30c-45d1-be3b-79e57118f6b5',
          weigh: 0.5
        },
        {
          question: '8bc5bea4-1c0d-4902-a4d4-fa931358f439',
          weigh: 0.5
        }
      ],
    },
    {
      name: 'COMPROMISO',
      type: [
        {
          question: '60dd6649-6ca8-4e61-8c9a-4279e505b9f7',
          weigh: 0.33333
        },
        {
          question: '7bc8d7e3-a30c-45d1-be3b-79e57118f6b5',
          weigh: 0.33333
        },
        {
          question: '8bc5bea4-1c0d-4902-a4d4-fa931358f439',
          weigh: 0.33333
        }
      ],
    },
    {
      name: "CREENCIA",
      type: [
        {
          question: '60dd6649-6ca8-4e61-8c9a-4279e505b9f7',
          weigh: 0.25
        },
        {
          question: '7bc8d7e3-a30c-45d1-be3b-79e57118f6b5',
          weigh: 0.25
        },
        {
          question: '8bc5bea4-1c0d-4902-a4d4-fa931358f439',
          weigh: 0.25
        },
        {
          question: '7c61f94d-7983-41de-9646-b940e5cf2100',
          weigh: 0.25
        }
      ],
    }
  ]

  private dataMacroHabilidades = [
    {
      name: 'AUTOCONOCIMIENTO',
      descripcion: 'Capacidad de reconocer la propia invidivualidad, los pensamientos, las emociones y las conductas, teniendo en cuenta las capacidades y limitaciones.',
      types: [
        {
          name: 'ADAPTABILIDAD',
          descripcion: 'Capacidad de modificar los planes debido a cambios internos o externos sin que repercuta negativamente en la persona o el objetivo',
          weigh: 0.5
        },
        {
          name: 'APRENDIENTE',
          descripcion: 'El proceso de aprendizaje, más que el resultado, los emociona.',
          weigh: 0.5
        }
      ]
    },
    {
      name: 'COMUNICACIÓN',
      descripcion: 'Intercambio de información entre dos o más participantes con el fin de transmitir o recibir información, considerando las particularidades de las partes para lograr un mensaje efectivo y claro.',
      types: [
        {
          name: 'ADAPTABILIDAD',
          descripcion: 'Capacidad de modificar los planes debido a cambios internos o externos sin que repercuta negativamente en la persona o el objetivo',
          weigh: 0.3333
        },
        {
          name: 'APRENDIENTE',
          descripcion: 'El proceso de aprendizaje, más que el resultado, los emociona.',
          weigh: 0.3333
        }
        ,
        {
          name: 'COMPROMISO',
          descripcion: 'El grado de esfuerzo que realmente hace para cumplir una obligación que ha asumido.',
          weigh: 0.3333
        }
      ]
    },
    {
      name: 'LIDERAZGO',
      descripcion: 'Conjunto de habilidades para supervisar, dirigir, guiar e influenciar a individuos y grupos en la realización de tareas y cumplimiento de objetivos comunes.',
      types: [{
        name: 'CREENCIA',
        descripcion: 'Valores de las personas de los que surge un propósito definido para sus vidas.',
        weigh: 1 
      }]
    },
    {
      name: 'MANEJO CONFLICTO',
      descripcion: 'Capacidad de reacción ante dificultades internas o externas procurando evitar una escalada de tensiones con el objetivo de llegar a un equilibrio.',
      types: [{
        name: 'CREENCIA',
        descripcion: 'Valores de las personas de los que surge un propósito definido para sus vidas.',
        weigh: 1
      }]
    },
    {
      name: 'MENTALIDAD DE DIVERSIDAD',
      descripcion: 'Capacidad de reconocer, valorar y fomentar la inclusión de diferentes perspectivas, experiencias y culturas para impulsar la creatividad y el crecimiento colectivo.',
      types: [
          {
            name: 'ADAPTABILIDAD',
            descripcion: 'Tienen la capacidad de pensar en todos los factores que podrían afectar una situación.',
            weigh: 0.25 
          },
          {
            name: 'APRENDIENTE',
            descripcion: 'El proceso de aprendizaje, más que el resultado, los emociona.',
            weigh: 0.25 
          },
          {
            name: 'COMPROMISO',
            descripcion: 'El grado de esfuerzo que realmente hace para cumplir una obligación que ha asumido.',
            weigh: 0.25 
          },
          {
            name: 'CREENCIA',
            descripcion: 'Valores de las personas de los que surge un propósito definido para sus vidas.',
            weigh: 0.25 
          }
      ]
    },
    {
      name: 'NEGOCIACIÓN',
      descripcion: 'Proceso de deliberación que se establece entre las partes, cuyo objetivo es el de llegar a un acuerdo aceptable para todos.',
      types: [
        {
          name: 'ADAPTABILIDAD',
          descripcion: 'Tienen la capacidad de pensar en todos los factores que podrían afectar una situación.',
          weigh: 0.5 
        },
        {
          name: 'APRENDIENTE',
          descripcion: 'El proceso de aprendizaje, más que el resultado, los emociona.',
          weigh: 0.25 
        },
        {
          name: 'COMPROMISO',
          descripcion: 'El grado de esfuerzo que realmente hace para cumplir una obligación que ha asumido.',
          weigh: 0.25 
        },
      ]
    },
    {
      name: 'REGULACIÓN EMOCIONAL',
      descripcion: 'Identificación y comprensión de las emociones propias, reconociendo su conexión con los pensamientos y las conductas.',
      types: [
        {
          name: 'APRENDIENTE',
          descripcion: 'El proceso de aprendizaje, más que el resultado, los emociona.',
          weigh: 0.3 
        },
        {
          name: 'COMPROMISO',
          descripcion: 'El grado de esfuerzo que realmente hace para cumplir una obligación que ha asumido.',
          weigh: 0.7 
        },
      ]
    },
    {
      name: 'RELACIONES INTERPERSONALES',
      descripcion: 'Habilidades sociales que genera facilita la interacción y convivencia sana entre personas, teniendo en cuenta los distintios tipos de vínculos y contextos.',
      types: [
        {
          name: 'ADAPTABILIDAD',
          descripcion: 'Tienen la capacidad de pensar en todos los factores que podrían afectar una situación.',
          weigh: 0.4 
        },
        {
          name: 'APRENDIENTE',
          descripcion: 'El proceso de aprendizaje, más que el resultado, los emociona.',
          weigh: 0.6 
        }
      ]
    },
    {
      name: 'RESOLUCIÓN PROBLEMAS',
      descripcion: 'Abordar situaciones y tomar decisiones usando estrategias de razonamiento, teniendo en cuenta las limitaciones, enfocado en el resultado.',
      types: [
        {
          name: 'ADAPTABILIDAD',
          descripcion: 'Tienen la capacidad de pensar en todos los factores que podrían afectar una situación.',
          weigh: 0.25 
        },
        {
          name: 'APRENDIENTE',
          descripcion: 'El proceso de aprendizaje, más que el resultado, los emociona.',
          weigh: 0.75 
        },
      ]
    },
    {
      name: 'SENTIDO PERTENENCIA',
      descripcion: 'Sentimiento de identificación con los valores de la empresa que le permite la satisfacción personal de formar parte de un grupo o equipo.',
      types: [
        {
          name: 'ADAPTABILIDAD',
          descripcion: 'Tienen la capacidad de pensar en todos los factores que podrían afectar una situación.',
          weigh: 0.1 
        },
        {
          name: 'APRENDIENTE',
          descripcion: 'El proceso de aprendizaje, más que el resultado, los emociona.',
          weigh: 0.1 
        },
        {
          name: 'COMPROMISO',
          descripcion: 'El grado de esfuerzo que realmente hace para cumplir una obligación que ha asumido.',
          weigh: 0.8 
        }
      ]
    },
    {
      name: 'TRABAJO EN EQUIPO ',
      descripcion: 'Habilidad de interacción y acuerdos entre un grupo de personas para lograr un objetivo en común.',
      types: [
        {
          name: 'ADAPTABILIDAD',
          descripcion: 'Tienen la capacidad de pensar en todos los factores que podrían afectar una situación.',
          weigh: 0.5 
        },
        {
          name: 'CREENCIA',
          descripcion: 'Valores de las personas de los que surge un propósito definido para sus vidas.',
          weigh: 0.5 
        }
      ]
    },
    {
      name: 'FINANCIERAS',
      descripcion: '',
      types: [
        {
          name: 'ADAPTABILIDAD',
          descripcion: 'Tienen la capacidad de pensar en todos los factores que podrían afectar una situación.',
          weigh: 0.3 
        },
        {
          name: 'APRENDIENTE',
          descripcion: 'El proceso de aprendizaje, más que el resultado, los emociona.',
          weigh: 0.3
        },
        {
          name: 'COMPROMISO',
          descripcion: 'El grado de esfuerzo que realmente hace para cumplir una obligación que ha asumido.',
          weigh: 0.2 
        },
        {
          name: 'CREENCIA',
          descripcion: 'Valores de las personas de los que surge un propósito definido para sus vidas.',
          weigh: 0.2
        }
      ]
    },
    {
      name: 'FISICAS',
      descripcion: '',
      types: [
        {
          name: 'ADAPTABILIDAD',
          descripcion: 'Tienen la capacidad de pensar en todos los factores que podrían afectar una situación.',
          weigh: 0.2 
        },
        {
          name: 'APRENDIENTE',
          descripcion: 'El proceso de aprendizaje, más que el resultado, los emociona.',
          weigh: 0.2
        },
        {
          name: 'COMPROMISO',
          descripcion: 'El grado de esfuerzo que realmente hace para cumplir una obligación que ha asumido.',
          weigh: 0.3 
        },
        {
          name: 'CREENCIA',
          descripcion: 'Valores de las personas de los que surge un propósito definido para sus vidas.',
          weigh: 0.3 
        }
      ]
    },
    {
      name: 'BURNOUT',
      descripcion: '',
      types: [
        {
          name: 'ADAPTABILIDAD',
          descripcion: 'Tienen la capacidad de pensar en todos los factores que podrían afectar una situación.',
          weigh: 1 
        }
      ]
    },
  ]
}