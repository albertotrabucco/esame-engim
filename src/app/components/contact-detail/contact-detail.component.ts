import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ContactServiceService } from 'src/app/services/contact-service.service';
import { Contact } from 'src/app/interfaces/contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {


  contact!: Contact;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactServiceService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getContact();
  }

  getContact(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contactService.getContact(id).subscribe(contact => this.contact = contact)
  }


  goBack(): void{
    this.location.back();
  }

  save(): void{
    if (this.contact) {
      this.contactService.updateContact(this.contact)
        .subscribe(() => this.goBack());
    }
  }
}
