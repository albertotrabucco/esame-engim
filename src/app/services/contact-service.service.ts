import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  private contactUrl = 'api/contacts';
  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
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
  getContacts(): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.contactUrl).pipe(
      tap(_ => console.log('fetched contacts')),
      catchError(this.handleError<Contact[]>('getContacts',[]))
    );
  }

  //GET by ID
  getContact(id: number): Observable<Contact>{
    const url = `${this.contactUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      tap(_ => console.log(`fetched contact id=${id}`)),
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

  //PUT (update)
  updateContact(contact: Contact): Observable<any>{
    return this.http.put(this.contactUrl, contact, this.httpOptions).pipe(
      tap(_ => console.log(`updated contact id=${contact.id}`)),
      catchError(this.handleError<Contact>('updateContact'))
    );
  }
}
