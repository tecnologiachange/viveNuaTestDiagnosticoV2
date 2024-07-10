import { Injectable, inject } from "@angular/core";
import { Firestore, collection, collectionChanges, doc, getDoc } from "@angular/fire/firestore";
import { map } from "rxjs";
import { LoadService } from "./load.service";


@Injectable({
    providedIn: 'root'
  })
export class GetService {

  private firestore: Firestore = inject(Firestore);

  constructor(){
    const load: LoadService = new LoadService(this);
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

  public getOne(collectionName: string , id: string){
    const collectionInstance =  collection(this.firestore, collectionName);
    return getDoc( doc(collectionInstance, id));
  }
}