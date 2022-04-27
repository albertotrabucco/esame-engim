import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Contact } from 'src/app/interfaces/contact';
import { ContactServiceService } from 'src/app/services/contact-service.service';

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
    private contactService: ContactServiceService
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


}
