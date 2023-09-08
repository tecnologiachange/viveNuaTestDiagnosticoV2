import { Injectable } from "@angular/core";
import { HttpService } from "../api/http.service";
import { GetService } from "../firebase/get.service";
import { Utils } from "../utils/utils.service";
import { Answer, Hability,  IHability,IRecommend,IScore, IScoreItem, ITransformResponseTransform, IType, Item, Subhability, TypeFormResponse } from "src/app/models/i.models";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class ProcessService {
    constructor(private http: HttpService , private getService: GetService ) {
    }

    public async get(id: string): Promise<any> {
        try{
            const resultTest = this.transformResult( 
                await Utils.transformObservableToPromise(this.http.get(id)) as TypeFormResponse 
            );
            const macro = await Utils.transformObservableToPromise(this.getService.get(environment.storage.macro)) as IHability[];
            const micro = await Utils.transformObservableToPromise(this.getService.get(environment.storage.micro)) as IHability[];
            let results = this.setMacroHability(macro);
            results = this.setValuePercent(results , micro , resultTest.transform, macro);
            const _env: any = environment;
            const area = Utils.standartText( resultTest.area );
            const recommend = await this.getDefinitionRecommend( _env.homologo[area] );
            return {results , name: resultTest.name , email: resultTest.email , recommend: recommend , id: id};
        }catch(_e){
            console.error(_e);
        }
    }

    private setValuePercent(result: Hability[] , micro: IHability[] , values: ITransformResponseTransform[] , macro: IHability[]):Hability[]{
        result.forEach((item: Hability) => {
            const itemMacro: any = macro.find((itemMacro: IHability) => Utils.transformCapitalizeToString(itemMacro.name) === item.name);
            item.subhabilities = this.setPercentSubhabilities(item.subhabilities , micro , values, itemMacro.types);
            item.percent = item.subhabilities.reduce((prev: number, current: Subhability) => prev + current.percent, 0);
        });
        return result;
    }

    private setPercentSubhabilities(subhabilities: Subhability[], microHabilities: IHability[] , values: ITransformResponseTransform[], sub: IType[]): Subhability[]{
        return subhabilities.map((subhability: Subhability) => {
            const objectHabilies: IHability | any = microHabilities.find((item: IHability) => Utils.transformCapitalizeToString(item.name) === subhability.name);
            const parent: any = sub.find((item: IType) => Utils.transformCapitalizeToString(item.name) === subhability.name);
            objectHabilies.type.forEach((type: IType) => {
                const trans: ITransformResponseTransform | any = values.find( (value: ITransformResponseTransform) =>  value.name === type.question);
                subhability.visualPercent = (trans.value / 5 ) * 100;
                subhability.percent += ((trans.value / 5 ) * type.weigh)*parent.weigh; 
            });
            return subhability;
        });
    }

    private setMacroHability(hability: IHability[]): Hability[]{
        let results: Hability[] = [];
        hability.forEach((hability: IHability) => {
            const name = Utils.transformCapitalizeToString( hability.name );
            const indexFind = results.findIndex((item: Hability) => item.name === name);
            if(indexFind === -1){
                results.push({
                    percent: 0,
                    name,
                    isGraphic: hability.isGraphic,
                    description: hability.descripcion,
                    subhabilities: this.setMicroHability(hability.types)
                });
            }
        });
        return results;
    }

    private setMicroHability(types: IType[]): Subhability[]{
        let response: Subhability[] = [];
        types.forEach((type: IType) => {
            response.push({
                badge: {
                    color: '',
                    text: ''
                },
                name: Utils.transformCapitalizeToString( type.name ),
                descripcion: type.descripcion,
                percent: 0
            });
        });
        return response;
    }

    private transformResult(result: TypeFormResponse): {transform: ITransformResponseTransform[], name: string , email: string, area: string}{
        let response: ITransformResponseTransform[] = [];
        let name: string = '';
        let email: string = '';
        let area: string = '';
        result.items.forEach((item: Item) => {
            item.answers.forEach((answer: Answer) => {
                if (answer.type === 'text' && answer.field.ref === environment.fields.name){
                    name = answer.text;
                }
                if (answer.type === 'email' && answer.field.ref === environment.fields.email){
                    email = answer.email;
                }
                if (answer.field.ref === environment.fields.cargo){
                    area = answer.choice!.label;
                }
                if(answer.type === 'number'){
                    response.push({
                        name: answer.field.ref,
                        value: answer.number
                    });
                }
            });
        });
        return {transform: response, name , email , area};
    }

    public async getDefinitionScore( data: { burnout: Hability , financieras: Hability , fisicas: Hability}): Promise<{ burnout: Hability , financieras: Hability , fisicas: Hability}>{
        data.burnout.aditionalDescription = Utils.getvalueByScore(data.burnout , { low: '' , medium: '' , high: ''});
        data.financieras.description = Utils.getvalueByScore(data.financieras , { low: '' , medium: '' , high: ''});
        data.fisicas.description = Utils.getvalueByScore(data.fisicas , { low: '' , medium: '' , high: ''});
        return data;
    }

    public async getDefinitionRecommend(profile: string): Promise<IRecommend>{
        try{
            if(profile) return (await this.getService.getOne(environment.storage.recommend , profile)).data() as IRecommend;
            return { cursos : [] , habilidades: [] , herramientas: [] };
        }catch(_e){
            return { cursos : [] , habilidades: [] , herramientas: [] };
        }
    }
}
