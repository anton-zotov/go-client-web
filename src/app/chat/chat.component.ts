import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from '../server.service';
import { SimpleChanges } from '@angular/core';
import { window } from 'rxjs/operator/window';
import { ViewChild, ElementRef } from '@angular/core';

export class Message {
	date;
	user;
	text;
	mine: boolean;
}

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	message_text: string;
	@Input() id_game: string;
	@Input() message: Message;
	@ViewChild('messagesDiv') messagesDiv: ElementRef;

	messages: Message[] = [];

	constructor(private server: ServerService) { }

	ngOnInit() {
		console.log(this.id_game);
		this.server.getMessage(this.id_game)
		.subscribe(
			res => {
				if (res.success) {
					this.messages = res.messages;
					this.scrollDown();
				}
			}
		)
	}

	ngOnChanges(changes: SimpleChanges) {
		for (let prop in changes) {
			let change = changes[prop];
			if (prop === "message" && change.firstChange === false && change.currentValue) {
				this.messages.push(change.currentValue);
				this.scrollDown();
			}
		}
	}

	sendMessage() {
		this.server.sendMessage(this.id_game, this.message_text)
		.subscribe(
			res => {
				if (res.success) {
					this.messages.push(res.message);
					this.message_text = "";
					this.scrollDown();
				}
		});
	}

	scrollDown() {
		setTimeout(() => {
			this.messagesDiv.nativeElement.scrollTop = this.messagesDiv.nativeElement.scrollHeight;
		}, 0);
	}
}
