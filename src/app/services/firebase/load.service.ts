import { environment } from "src/environments/environment";

// import * as dataMicroHabilidades from './../../../assets/static/dataMicroHabilidades.json';
// import * as dataMacroHabilidades from './../../../assets/static/dataMacroHabilidades.json';

import * as dataMicroHabilidades from './../../../assets/static/microhabilidades.json';
import * as dataMacroHabilidades from './../../../assets/static/macrohabilidades.json';
import * as recommend from './../../../assets/static/recommend.json';
import * as score from './../../../assets/static/score.json';

import * as dataMacroJSON from './../../../assets/static/data_macro.json';
import * as dataPreguntasJSON from './../../../assets/static/id_preguntas.json';

import * as dataMacroDef from './../../../assets/static/data_macro_defi.json';
import * as dataMacroRel from './../../../assets/static/data_macro_rel.json';

import { Firestore, addDoc, collection, doc, setDoc } from "@angular/fire/firestore";
import { inject } from "@angular/core";
import { IHability } from "src/app/models/i.models";
import { Utils } from "../utils/utils.service";
import { GetService } from "./get.service";

export class LoadService{

    private firestore: Firestore = inject(Firestore);
    constructor(private getService: GetService){
        if(environment.isLoad){
            // this.loadItems();
        }
    }

    private loadItems(){
        // const _collectionMicro = collection(this.firestore, environment.storage.micro);
        // const _collectionMacro = collection(this.firestore, environment.storage.micro);
        // const _collectionRecommend = collection(this.firestore, environment.storage.recommend);
        const _collectionScore = collection(this.firestore, environment.storage.score);

        // (dataMicroHabilidades as any).default.forEach( async (item: any) => {
        //     await this.setDocumentToCollection(_collectionMicro, item);
        // });
        // (dataMacroHabilidades as any).default.forEach( async (item: any) => {
        //    await this.setDocumentToCollection(_collectionMacro, item);
        // });
        // (recommend as any).default.forEach( async (item: any) => {
        //     await this.setDocumentToCollection(_collectionRecommend, item);
        // });
        const objectScore = (score as any).default;
        Object.keys( objectScore ).forEach( async (key: any) => {
            const item = { id: key , ...objectScore[key] };
            await this.setDocumentToCollection(_collectionScore, item);
        });
    }

    private async setDocumentToCollection(_collection: any, item: any){
        if(item.hasOwnProperty('id')){
            const id = item.id;
            delete item.id;
            await setDoc(doc(_collection, id), item)
        } else {
            await addDoc( _collection, item);
        }
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
                    Utils.standartText(item.SHORT_PREGUNTA) == Utils.standartText( (itemPreguntas.COMPARE)));
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


}