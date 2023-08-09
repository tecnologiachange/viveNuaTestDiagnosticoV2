import { Injectable, inject } from "@angular/core";
import { Firestore, collection, collectionChanges } from "@angular/fire/firestore";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class GetService {

  private firestore: Firestore = inject(Firestore);

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
}