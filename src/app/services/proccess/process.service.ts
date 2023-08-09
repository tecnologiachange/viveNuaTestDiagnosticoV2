import { Injectable } from "@angular/core";
import { HttpService } from "../api/http.service";
import { GetService } from "../firebase/get.service";
import { Utils } from "../utils/utils.service";
import { Answer, Hability, IAttribute, IScore, IType, Item, TypeFormResponse } from "src/app/models/i.models";

@Injectable({
    providedIn: 'root'
  })
export class ProcessService {

    private results: Hability[] = [];

    constructor(private http: HttpService , private getService: GetService ) {
    }

    public async get(id: string): Promise<any> {
        try{
            const score = await Utils.transformObservableToPromise(this.getService.get('score')) as IScore[];
            score.forEach((hability: any) => {
                this.results.push({
                    percent: 0,
                    name: hability.id,
                    description: '',
                    subhabilities: []
                });
            });
            const resultTest = await Utils.transformObservableToPromise(this.http.get(id)) as TypeFormResponse;
            const attributes = await Utils.transformObservableToPromise(this.getService.get('attributes')) as IAttribute[];
            this.dataResultTest(resultTest, attributes);
            return this.results;
        }catch(_e){
            console.error(_e);
        }
    }

    private dataResultTest(resultTest: TypeFormResponse , attributes: IAttribute[]){
        resultTest.items.forEach((item: Item ) => {
            this.getItem(item, attributes);
        });
    }

    private getItem(item: Item, attributes: IAttribute[]){
        item.answers.forEach((answer: Answer) => {
            this.searchItemIntoAttributes(answer, attributes);
        });
    }

    private searchItemIntoAttributes(answer: Answer, attributes: IAttribute[]){
        attributes.forEach((attribute: IAttribute) => {
            if(attribute.id === answer.field.ref){
                attribute.type.forEach((type: IType) => {
                    this.setResultsOfValue(type.name, (type.weigh * answer.number) );
                });
            }
        });
    }

    private setResultsOfValue(property: string , value: number): void {
        const index = this.results.findIndex((hability: Hability) => { return hability.name === property });
        if(index !== -1){
            this.results[index].percent += value;
        }
    }

}
