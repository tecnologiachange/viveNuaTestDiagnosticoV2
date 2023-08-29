export interface Hability {
    name: string;
    description: string;
    aditionalDescription?: string;
    percent: number;
    isGraphic: boolean;
    subhabilities: Subhability[]
  }
  
  export interface Subhability {
    name: string
    descripcion: string
    badge: Badge
    percent: number
  }
  
  export interface Badge {
    color: string
    text: string
  }
  
  export interface IScore{
    high: string;
    low: string;
    medium: string;
    id: string;
  }

  export interface IType{
    name: string;
    weigh: number;
  }

  export interface IAttribute{
    id: string;
    positive: boolean;
    type:IType[]
  }

  type Type = "text" | "email" | "number" | "choice";

  export type TypeFormResponse = {
    total_items: number;
    page_count: number;
    items: Item[];
  };

  export type Item = {
    landing_id: string;
    token: string;
    response_id: string;
    landed_at: Date;
    submitted_at: Date;
    calculated: {
      score: number;
    };
    answers: Answer[];
  }
  
  export type Answer = {
    field: { ref: string , id: string, type: string };
    type: Type;
    text: string;
    email: string;
    number: number;
  };

  export interface IType{
    question: string;
    name: string;
    descripcion: string;
    weigh: number;
  }

  export interface IHability{
      name: string;
      descripcion: string;
      isGraphic: boolean;
      types: IType[];
  }

  export interface ITransformResponseTransform{
    name: string;
    value: number;
  }

  export interface IExtraLoadding{ 
    results: Hability[];
    name: string;
    email: string;
    burnout?: Hability;
    financieras?: Hability;
    fisicas?: Hability ;
    id: string;
    recommend: IRecommend;
  }

  export interface IRecommend{
    cursos: string[];
    herramientas: string[];
    habilidades: { name: string , value: number}[];
  }

  export interface IScoreItem{
    low: string; 
    high: string; 
    medium: string
  }