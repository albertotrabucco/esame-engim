import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ContactServiceService } from 'src/app/services/contact-service.service';
import { Contact } from 'src/app/interfaces/contact';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MessageServiceService } from 'src/app/services/message-service.service';


@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {

  contact!: Contact;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactServiceService,
    private messageService: MessageServiceService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getContact();
    this.getMessages();
  }
  
  getContact(): void{
    const id = Number(this.route.snapshot.paramMap.get('userId'));
    this.contactService.getContact(id).subscribe(contact => this.contact = contact)
  }

  goBack(): void{
    this.location.back();
  }

  getMessages(): void{
    const id = Number(this.route.snapshot.paramMap.get('userId'));
    this.messageService.getMessages(id).subscribe(contact => this.contact = contact)
  }


}
