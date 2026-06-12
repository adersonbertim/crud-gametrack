import { Injectable } from '@angular/core';
import { 
  addDoc, 
  collection, 
  collectionData, 
  deleteDoc, 
  doc, 
  docData, 
  Firestore, 
  updateDoc 
} from '@angular/fire/firestore';
import { Jogo } from '../models/jogo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JogoService {
  constructor(private firestore: Firestore) { }

  salvarJogo(jogo: Jogo){
    if(jogo.id){
      const jogoDocEdit = doc(this.firestore, 'jogos', jogo.id);
      return updateDoc(jogoDocEdit, {...jogo});
    }else {
      const jogosRef = collection(this.firestore, 'jogos');
      return addDoc(jogosRef, jogo);
    }
  }

  listarJogos() : Observable<Jogo[]> {
      const jogoRef = collection(this.firestore, 'jogos');
      return collectionData(jogoRef, { idField: 'id' }) as Observable<Jogo[]>;
  }

  excluirJogo(id: string) {
    const jogoDocRef = doc(this.firestore, 'jogos', id);
    return deleteDoc(jogoDocRef);
  }

  buscarJogoPorId(id: string) : Observable<Jogo> {
    const jogoDocRef = doc(this.firestore, 'jogos', id);
    return docData(jogoDocRef, { idField: 'id' }) as Observable<Jogo>;
  }
}
