import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GatewayService } from 'src/services/gateway.services';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
  roomId: string = '';
  playerName: string = '';
  players: any[] = [];

  constructor(private route: ActivatedRoute, private gatewayService: GatewayService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.roomId = params['roomId'];
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.playerName = queryParams['playerName'];
    });

    if (this.roomId && this.playerName) {
      this.gatewayService.joinRoom(this.roomId, this.playerName).subscribe(updatedUserList => {
        console.log('Updated user list in the room:', updatedUserList);
        this.players = updatedUserList.map(user => user.playerName);
      });    
    }
  }

  ngOnDestroy(): void {
    this.gatewayService.leaveRoom(this.roomId, this.playerName);
  }
}
