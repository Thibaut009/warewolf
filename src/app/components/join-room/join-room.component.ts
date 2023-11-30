import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent {
  roomId: string = '';
  playerName: string = '';
  playerRole: string = ''; // Nouvelle propriété pour stocker le rôle du joueur

  constructor(private router: Router) {}

  createRoom() {
    if (this.playerName) {
      this.roomId = Math.random().toString(36).substring(2);
      this.playerRole = 'host'; // attribuer le rôle "host" à celui qui crée la room
      this.router.navigate(['/room', this.roomId], { queryParams: { playerName: this.playerName, playerRole: this.playerRole }});
    } else {
      console.error('Player Name is required.');
    }
  }

  joinRoom() {
    if (this.roomId && this.playerName) {
      this.playerRole = 'guest'; // attribuer le rôle "guest" à ceux qui rejoignent la room
      this.router.navigate(['/room', this.roomId], { queryParams: { playerName: this.playerName, playerRole: this.playerRole }});
    } else {
      console.error('Room ID and Player Name are required.');
    }
  }
}
