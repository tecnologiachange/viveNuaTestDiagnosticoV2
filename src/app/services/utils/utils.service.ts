import { Observable } from "rxjs";
import { Hability, IScoreItem } from "src/app/models/i.models";

export class Utils {
    
    public static getPropertiesForHost(): boolean{
        return ((window.location.host != undefined) && (window.location.host.indexOf('vivenua') > -1));
    }

    public static transformObservableToPromise( obs: Observable<any>): Promise<any>{
        return new Promise((resolve, reject) => {
            obs.subscribe((res: any) => {
                resolve(res);
            }, (err: any) => {
                console.error('err', err);
                reject(err);
            });
        });
    }

    public static getHost(): string{
        const host = (window.location != window.parent.location)
            ? document.referrer
            : document.location.href;
        return (host.indexOf('localhost') > -1) ? 'https://vive-nua-test-diagnostico-git-qa.vercel.app/' : host;
    }

    public static transformCapitalizeToString(_str: string): string{
        return _str.charAt(0).toUpperCase() + _str.slice(1).toLowerCase();
    }

    public static isDevice(): boolean {
        var ua = navigator.userAgent;
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua))
           return true;
        return false;
    }

    public static getStatus( percent: number , isLabel: boolean = false): { text: string, color: string , background: string}{
        percent = (percent >= 0 && percent <= 1 ) ? percent * 100 : percent;
        // if (percent < 0 && percent > 100) return { text: 'N.E.', color: '#311868', background: '#319ea2'};
        if( percent >=0 && percent <= 40 ) return { text: ( isLabel ? 'Muy Bajo' :percent +'%') , color: '#311868', background: '#92d5ce'};
        if( percent >=41 && percent <= 50 ) return { text: ( isLabel ? 'Bajo' :percent +'%') , color: '#311868', background: '#2f9ea2'};
        if( percent >=51 && percent <= 60 ) return { text: ( isLabel ? 'Medio' :percent +'%') , color: 'white', background: '#9f7eee'};
        if( percent >=61  && percent <= 80 ) return { text: ( isLabel ? 'Medio Alto' :percent +'%') , color: 'white', background: '#5325a0'};

        return { text: ( isLabel ? 'Alto' :percent +'%') , color: 'white', background: '#311868'};
    }

    public static getvalueByScore( hability: Hability, score: IScoreItem): string{
        if( hability.percent >=0 && hability.percent <= 50 ) return score.low;
        if( hability.percent >=51  && hability.percent <= 80 ) return score.medium;
        return score.high;
    }

    public static getNumberByOneDecimal( value: number): number{
        return Math.round(value * 100);
    }

    public static standartText(text: string){
        text = text.trim().toLowerCase();
        text = text.replace('á', 'a');
        text = text.replace('é', 'e');
        text = text.replace('í', 'i');
        text = text.replace('ó', 'o');
        text = text.replace('ú', 'u');
        text = text.replace('\n', '');
        text = text.replace('\t', '');
        text = text.replace(/\s/g, '');
        text = text.replace('.', '');
        text = text.replace(',', '');
        text = text.replace(';', '');
        text = text.replace(':', '');
        return text;
    }
}