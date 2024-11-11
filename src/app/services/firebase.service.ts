import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc ,getDoc, DocumentReference} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore,
    
  ) {}
    
  getCollectionChanges<tipo>(path:string){
    const itemCollection = collection(this.firestore, path)
    return collectionData(itemCollection) as Observable<tipo[]>;
  }

  createDocumentID(data:any, enlace: string, idDoc:string){
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return setDoc(document, data)
  }
    
  async updateDocumentoID(data:any, enlace: string, idDoc:string){
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return updateDoc(document, data)
    }
  createIdDoc(){
    return uuidv4();
  }
  
}
