import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];

  title="Rubrica"

  constructor(
    private location: Location,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void{
    this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
  }

  goBack(): void{
    this.location.back();
  }

  searchContactByNome(searchNome: string) : void {
    this.contactService.searchContactByFirstname(searchNome).subscribe(data => {
      this.contacts = data;
    });
  }

  searchContactByCognome(searchCognome: string) : void {
    this.contactService.searchContactByLastname(searchCognome).subscribe(data => {
      this.contacts = data;
    });
  }


}
