import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';
import { Message } from '../interfaces/message';
import { Answer } from '../interfaces/answer';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {


  private messageUrl = 'api/mesages';
  private answerUrl = 'api/answers';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation = "operation", result?: T){
    return (error: any): Observable<T> =>{
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  //GET
  getMessages(id: number): Observable<Message[]>{
    const url = `${this.messageUrl}/${id}`;
    return this.http.get<Message[]>(this.messageUrl).pipe(
      tap(_ => console.log('fetched messages')),
      catchError(this.handleError<Message[]>('getMessagesm',[]))
    );
  }

  randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //GET by ID (random)
  getRandomMessage(): Observable<Answer>{
    const id = this.randomInteger(1,100);
    const url = `${this.answerUrl}/${id}`;
    return this.http.get<Answer>(url).pipe(
      tap(_ => console.log(`fetched message id=${id}`)),
      catchError(this.handleError<Answer>(`getRandomMessage id=${id}`))
    );
  }

  //POST
  addMessage(message: Message): Observable<Message>{
    return this.http.post<Message>(this.messageUrl, message, this.httpOptions).pipe(
      tap((newMessage: Message) => console.log(`added message w/ id=${newMessage.id}`)),
      catchError(this.handleError<Message>('addMessage'))
    );
  }
}
