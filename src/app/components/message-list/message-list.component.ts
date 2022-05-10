import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  contacts: Contact[] = [];

  title="WhatsApp"

  constructor(
    private location: Location,
    private contactService: ContactService) { }

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
