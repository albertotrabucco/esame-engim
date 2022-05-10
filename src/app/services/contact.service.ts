import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  private contactsUrl = 'api/contacts';
  
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
    return this.http.get<Contact[]>(this.contactsUrl).pipe(
      tap(_ => console.log('fetched contacts')),
      catchError(this.handleError<Contact[]>('getContacts',[]))
    );
  }

  //GET by ID
  getContact(id: number): Observable<Contact>{
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      tap(_ => console.log(`fetched contact id=${id}`)),
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

  //PUT (update)
  updateContact(contact: Contact): Observable<any>{
    return this.http.put(this.contactsUrl, contact, this.httpOptions).pipe(
      tap(_ => console.log(`updated contact id=${contact.id}`)),
      catchError(this.handleError<Contact>('updateContact'))
    );
  }
  //POST (Add)
  addContact(contact : Contact) : Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact, this.httpOptions).pipe(
      tap((newContact : Contact) => console.log(`added new contact with id=${newContact.id}`)),
      catchError(this.handleError<Contact>('addContact'))
    );
  }
  //DELETE 
  deleteContact(id: number) : Observable<Contact> {
    return this.http.delete<Contact>(`api/contacts/${id}`).pipe(
      tap(_ => console.log(`deleted contact id=${id}`)),
      catchError(this.handleError<Contact>('deleteContact'))
    );
  }

  //SEARCH BARS by Nome e Cognome:

  searchContactByFirstname(search: string) : Observable<Contact[]>{
    if(!search.trim()){
      return of([]);
    }
    return this.http.get<Contact[]>(`api/contacts/?firstname=${search}`)
  }
  
  searchContactByLastname(search: string): Observable<Contact[]> {
    if(!search.trim()) {
      return of([]);
    }
    return this.http.get<Contact[]>(`api/contacts/?lastname=${search}`)
  }
}
