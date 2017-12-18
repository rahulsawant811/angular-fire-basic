import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Note{
  content: string,
  hearts: number,
  id?: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notesCollection: AngularFirestoreCollection<Note>;
  notes: Observable<Note[]>;

  constructor(private afs: AngularFirestore){ }

  ngOnInit(){
    this.notesCollection = this.afs.collection('notes', (ref)=>{
      return ref.orderBy('hearts', 'desc').limit(2).orderBy('content');
      // return ref.where('hearts', '>=', 13);
    });
    this.notes = this.notesCollection.valueChanges();
  }
}
