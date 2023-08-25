import { Injectable, inject } from "@angular/core";
import { Firestore, addDoc, collection, collectionChanges, doc, getDoc } from "@angular/fire/firestore";
import { map } from "rxjs";
import { environment } from "src/environments/environment";
import * as dataMicroHabilidades from './../../../assets/static/dataMicroHabilidades.json';
import * as dataMacroHabilidades from './../../../assets/static/dataMacroHabilidades.json';

@Injectable({
    providedIn: 'root'
  })
export class GetService {

  private firestore: Firestore = inject(Firestore);

  constructor(){
    // this.loadItems();
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

  private loadItems(){
    (dataMicroHabilidades as any).default.forEach( async (item: any) => {
      await addDoc(collection(this.firestore, environment.storage.micro), item);
    });
    (dataMacroHabilidades as any).default.forEach( async (item: any) => {
      await addDoc(collection(this.firestore, environment.storage.macro), item);
    });
  }

}