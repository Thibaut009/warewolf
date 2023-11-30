import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {
  constructor(private router: Router) {}

  generateRandomRoomId() {
    const roomId = Math.random().toString(36).substring(2);
    this.router.navigate(['/room', roomId]);
  }
}
