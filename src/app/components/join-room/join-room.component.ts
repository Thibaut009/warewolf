import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GatewayService } from 'src/services/gateway.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent {
  roomId: string = '';
  playerName: string = '';

  constructor(private router: Router) {}

  joinRoom() {
    if (this.roomId && this.playerName) {
      // Rediriger vers la page RoomComponent avec le nom d'utilisateur en tant que paramètre
      this.router.navigate(['/room', this.roomId], { queryParams: { playerName: this.playerName }});
    } else {
      // Affichez un message d'erreur ou prenez une autre action appropriée
      console.error('Both Room ID and Player Name are required.');
    }
  }
  
}
