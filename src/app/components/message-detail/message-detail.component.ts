import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/interfaces/contact';
import { Message } from 'src/app/interfaces/message';
import { MessageService } from 'src/app/services/message.service';



@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {

  contact?: Contact;
  messages?: Message[] = [];
  userId !: number;
  messageDeleted: string = "Messaggio eliminato!"

  getContact?: any;
  getMsgs?: any;
  addMsg?: any;
  getRandomMsg?: any;
  updateMsg?: any;
  searchMsgs?: any;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private messageService: MessageService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.getContactbyId();
    this.getMessages();
  }

  ngOnDestroy():void {
    console.log("message-details DESTROY");
    this.getContact?.unsubscribe();
    this.getMsgs?.unsubscribe();
    this.addMsg?.unsubscribe();
    this.getRandomMsg?.unsubscribe();
    this.updateMsg?.unsubscribe();
    this.searchMsgs?.unsubscribe();
  }
  goBack(): void{
    this.location.back();
  }

  getContactbyId(): void{
    this.getContact = this.contactService.getContact(this.userId).subscribe(contact => this.contact = contact)
  }  

  getMessages(): void{
    this.getMsgs = this.messageService.getMessages().subscribe(messages =>{
      this.messages = messages.filter(x => x.userId == this.userId);
    });
  }

  addMessage(message: string){
    let msg : Message ={
      type: 'outcoming',
      userId: this.userId,
      message: message,
      deleted: false
    } as Message;

    this.addMsg = this.messageService.addMessage(msg).subscribe(text => {
      this.messages?.push(text);
      this.getRandomMsg = this.messageService.getRandomMessage().subscribe(data => {
        let msg2 : Message = {
          type: 'incoming',
          userId: this.userId,
          message: data.answer
        } as Message;

        this.addMsg = this.messageService.addMessage(msg2).subscribe(text2 => {
          this.messages?.push(text2);
        });
      });
    })
  }

  updateMessage(message: Message): void{
    message.deleted = true;
    this.updateMsg = this.messageService.updateMessage(message).subscribe(message => {});
  }
  
  searchMsg (msg : string): void {
    this.searchMsgs = this.messageService.searchMessage(msg).subscribe(text => {
      this.messages = text.filter(x => x.userId == this.userId)
    })
  }
  

}
