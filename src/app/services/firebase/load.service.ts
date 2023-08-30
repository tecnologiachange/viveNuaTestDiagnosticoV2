import { environment } from "src/environments/environment";
import * as dataMicroHabilidades from './../../../assets/static/dataMicroHabilidades.json';
import * as dataMacroHabilidades from './../../../assets/static/dataMacroHabilidades.json';
import * as dataMacroJSON from './../../../assets/static/data_macro.json';
import * as dataPreguntasJSON from './../../../assets/static/id_preguntas.json';

import * as dataMacroDef from './../../../assets/static/data_macro_defi.json';
import * as dataMacroRel from './../../../assets/static/data_macro_rel.json';

import { Firestore, addDoc, collection } from "@angular/fire/firestore";
import { inject } from "@angular/core";
import { IHability } from "src/app/models/i.models";

export class LoadService{

    private firestore: Firestore = inject(Firestore);
    constructor(){
        if(environment.isLoad){
            // this.loadItems();
            // this.generateJSONHabilidades();
        }
    }

    private loadItems(){
        (dataMicroHabilidades as any).default.forEach( async (item: any) => {
          await addDoc(collection(this.firestore, environment.storage.micro), item);
        });
        (dataMacroHabilidades as any).default.forEach( async (item: any) => {
          await addDoc(collection(this.firestore, environment.storage.macro), item);
        });
    }

    private generateJSONHabilidades(){
        this.generateJSONMicroHabilidades();
        this.generateJSONMacroDefiniciones();
    }
    /**
     * ARCHIVO MICRO HABIlIDADES
     * 
     */
    private generateJSONMicroHabilidades(){
        let _arrayMicroHabilidades : IHability[] = [];
        let preguntasSinHomologo: any[] = [];
        const _arrayDefaultMacro = (dataMacroJSON as any).default;
        const _arrayDefaultPreguntas = (dataPreguntasJSON as any).default;

        // Buscar en el JSON de preguntas las preguntas que no tienen homologo
        _arrayDefaultMacro.forEach( (item: {MICROHABILIDAD : string; PREGUNTA : string; SHORT_PREGUNTA : string;}) => {
            const filter = _arrayDefaultPreguntas
                .find((itemPreguntas: {ID:string; COMPARE: string}) =>  
                    this.standartText(item.SHORT_PREGUNTA) == this.standartText( (itemPreguntas.COMPARE)));
            if(!filter) {
                preguntasSinHomologo.push(item);
            } else {
                const index = _arrayMicroHabilidades
                    .findIndex( (itemMicroHabilidades: IHability) => 
                        itemMicroHabilidades.name == item.MICROHABILIDAD);
                if (index == -1 ){
                    _arrayMicroHabilidades.push({name: item.MICROHABILIDAD, descripcion: '', isGraphic: true , types: [{question: filter.ID, weigh: 0 , descripcion: '' , name: '' }]});
                } else {
                    _arrayMicroHabilidades[index].types.push({question: filter.ID, weigh: 0 , descripcion: '' , name: ''});
                }
            }
        } );

        // calcular pesos de las preguntas
        _arrayMicroHabilidades.forEach( (itemMicroHabilidades: IHability) => {
            const weigh = (itemMicroHabilidades.types.length != 0 ) ? 1 / itemMicroHabilidades.types.length : 0 ;
            itemMicroHabilidades.types.forEach( (itemType: {question: string; weigh: number}) => {
                itemType.weigh = weigh;
            });
        });
        // respuesta
        console.log( JSON.stringify(_arrayMicroHabilidades));
        // console.log( JSON.stringify(preguntasSinHomologo));
    }
    /**
     * ARCHIVO MACRO HABILIDADES
     * 
     */
    private generateJSONMacroDefiniciones(){
        const _arrayDefaultMacroDef = (dataMacroDef as any).default;
        const _arrayDefaultMacroRel = (dataMacroRel as any).default;

        let arrayMacroHabilidades: any[] = [];

        _arrayDefaultMacroRel.forEach( (item: {MICRO: string; MACRO: string[];}) => {
            const micro_def: {NOMBRE: string; DEFINICION: string } = _arrayDefaultMacroDef.find( (itemDef: {NOMBRE: string; DEFINICION: string }) => itemDef.NOMBRE == item.MICRO);
            const descripcion = (micro_def && micro_def.DEFINICION) ? micro_def.DEFINICION : '';
            item.MACRO.forEach( (itemMacro: string) => {
                const index = arrayMacroHabilidades.findIndex( itemMacroHabilidades => itemMacroHabilidades.name.indexOf(itemMacro) != -1 );
                if(index == -1){
                    arrayMacroHabilidades.push({name: itemMacro, types: [{name: item.MICRO, descripcion, weigh: 0 }]});
                } else {
                    arrayMacroHabilidades[index].types.push({name: item.MICRO, descripcion , weigh: 0});
                }
            });
        });
        
        arrayMacroHabilidades.forEach( (itemMacroHabilidades: {name: string; descripcion: string; types: { name: string;descripcion: string; weigh: number; }[] }) => {
            const weigh = (itemMacroHabilidades.types.length != 0 ) ? 1 / itemMacroHabilidades.types.length : 0 ;
            itemMacroHabilidades.types.forEach( (itemType: {name: string; descripcion: string; weigh: number}) => {
                itemType.weigh = weigh;
            });
        });
        // console.log(JSON.stringify(arrayMacroHabilidades));
    }

    private standartText(text: string){
        text = text.trim().toLowerCase();
        text = text.replace('.', '');
        text = text.replace(',', '');
        text = text.replace(';', '');
        text = text.replace(':', '');
        return text;
    }
}