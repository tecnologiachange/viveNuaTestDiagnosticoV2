import { Injectable } from "@angular/core";
import { HttpService } from "../api/http.service";
import { GetService } from "../firebase/get.service";
import { Utils } from "../utils/utils.service";
import { Answer, Hability,  IHability,IScore, ITransformResponseTransform, IType, Item, Subhability, TypeFormResponse } from "src/app/models/i.models";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class ProcessService {
    constructor(private http: HttpService , private getService: GetService ) {
    }

    public async get(id: string): Promise<any> {
        try{
            // const score = await Utils.transformObservableToPromise(this.getService.get('score')) as IScore[];
            // score.forEach((hability: any) => {
            //     this.results.push({
            //         percent: 0,
            //         name: hability.id,
            //         description: '',
            //         subhabilities: []
            //     });
            // });
            const resultTest:ITransformResponseTransform[] = this.transformResult( 
                await Utils.transformObservableToPromise(this.http.get(id)) as TypeFormResponse 
            );
            const macro = await Utils.transformObservableToPromise(this.getService.get(environment.storage.macro)) as IHability[];
            const micro = await Utils.transformObservableToPromise(this.getService.get(environment.storage.micro)) as IHability[];
            
            let results = this.setMacroHability(macro);
            results = this.setValuePercent(results , micro , resultTest, macro);
            return results;
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

    private transformResult(result: TypeFormResponse): ITransformResponseTransform[]{
        let response: ITransformResponseTransform[] = [];
        result.items.forEach((item: Item) => {
            item.answers.forEach((answer: Answer) => {
                if(answer.type === 'number'){
                    response.push({
                        name: answer.field.ref,
                        value: answer.number
                    });
                }
            });
        });
        return response;
    }
}
