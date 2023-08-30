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

    public static getStatus( percent: number): { text: string, color: string , background: string}{
        if (percent < 0 && percent > 100) return { text: 'N.E.', color: '#311868', background: '#319ea2'};
        if( percent >=0 && percent <= 30 ) return { text: 'Bajo', color: '#311868', background: '#92d5ce'};
        if( percent >=31  && percent <= 70 ) return { text: 'Medio', color: 'white', background: '#9f7eee'};
        return { text: 'Alto', color: 'white', background: '#311868'};
    }

    public static getvalueByScore( hability: Hability, score: IScoreItem): string{
        if( hability.percent >=0 && hability.percent <= 30 ) return score.low;
        if( hability.percent >=31  && hability.percent <= 70 ) return score.medium;
        return score.high;
    }

    public static getNumberByOneDecimal( value: number): number{
        return Math.round(value * 100);
    }
}