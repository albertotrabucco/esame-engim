import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/interfaces/contact';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  contact!: Contact;
  id !: number;

  getContactbyId?: any;
  addContact?: any;
  saveChanges?: any;
  deleteContact?: any;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if(this.id == 0) {
      this.contact = {
        id: this.id,
        firstname: '',
        lastname: '',
        email: '',
        type: '',
        imageUrl: ''
      } as Contact;
    }else{
      this.getContactbyId = this.getContactById();
    }
  }

  ngOnDestroy() : void {
    this.getContactbyId?.unsubscribe();
    this.saveChanges?.unsubscribe();
    this.addContact?.unsubscribe();
    this.deleteContact?.unsubscribe();
  } 
  
  goBack(): void{
    this.location.back();
  }


  getContactById(): void {
    this.contactService.getContact(this.id).subscribe(contact => {
      this.contact = contact;
      console.log("Il contatto cliccato ha id: "+this.id);
    });
  }

  add(firstname: string, lastname: string, email: string, type: string, imageUrl: string): void{
    let contact : Contact ={
      firstname: firstname,
      lastname: lastname,
      email: email,
      type: type,
      imageUrl: imageUrl
    } as Contact;
    
    this.addContact = this.contactService.addContact(contact).subscribe(()=>{this.goBack()});
  }

  delete(id: number) : void{
    this.deleteContact = this.contactService.deleteContact(id).subscribe(()=>{this.goBack()});
  }

 
  save(): void{
    if (this.contact) {
      this.saveChanges = this.contactService.updateContact(this.contact)
        .subscribe(() => this.goBack());
    }
  }
}
