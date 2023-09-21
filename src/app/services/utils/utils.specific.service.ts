import { Hability, IDefinitionRecommend, IRecommend } from "src/app/models/i.models";
import { Utils } from "./utils.service";

export class UtilsSpecific{

    public static getRecommendTohability(recommend: IRecommend[] , hability: Hability): IRecommend{
        let recommendSelect: IRecommend = { cursos : [] , habilidades: [] , herramientas : [] , coaches: [] } as IRecommend;
        recommend.forEach( recommendInput => {
            const percent = Utils.getNumberByOneDecimal(hability.percent);
            recommendSelect.cursos = recommendSelect.cursos.concat(this.getRecommend(recommendInput.cursos || [] , percent ));
            recommendSelect.herramientas = recommendSelect.herramientas.concat(this.getRecommend(recommendInput.herramientas || [] , percent ));
            recommendSelect.coaches = recommendSelect.coaches!.concat(this.getRecommend(recommendInput.coaches || [] , percent ));
        });

        return recommendSelect;
    }

    public static getRecommend( arrayRecommend: IDefinitionRecommend[], valueToCompare: number): IDefinitionRecommend[] {
        arrayRecommend.sort( (a , b) => a.value - b.value);
        return arrayRecommend
        .filter( item => {
            if( Utils.standartText(item.rule) == 'menor' && valueToCompare <= item.value) return true;
            if( Utils.standartText(item.rule) == 'mayor' && valueToCompare >= item.value) return true;
            return false;
        });
    }
}