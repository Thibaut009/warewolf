import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GatewayService } from 'src/services/gateway.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
  roomId: string = '';
  playerName: string = '';
  playerRole: string = '';
  players: any[] = [];
  nameTakenSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private gatewayService: GatewayService) { }

  ngOnInit(): void {
    this.extractRouteParams();

    if (this.roomId && this.playerName) {
      this.subscribeToNameTakenEvent();
      this.joinRoom();
    }
  }

  private extractRouteParams(): void {
    this.route.params.subscribe((params) => {
      this.roomId = params['roomId'];
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.playerName = queryParams['playerName'];
      this.playerRole = queryParams['playerRole'];
    });
  }

  private subscribeToNameTakenEvent(): void {
    this.nameTakenSubscription = this.gatewayService.onNameTaken().subscribe(takenPlayerName => {
      console.error(`Player name '${takenPlayerName}' is already taken. Redirecting to home.`);
      this.router.navigate(['/']);
    });
  }

  private joinRoom(): void {
    this.gatewayService.joinRoom(this.roomId, this.playerName).subscribe(updatedUserList => {
      console.log('Updated user list in the room:', updatedUserList);
      this.players = updatedUserList.map(user => user.playerName);
    });
  }

  private unsubscribeFromNameTakenEvent(): void {
    if (this.nameTakenSubscription) {
      this.nameTakenSubscription.unsubscribe();
    }
  }

  private leaveRoom(): void {
    this.gatewayService.leaveRoom(this.roomId, this.playerName);
  }

  ngOnDestroy(): void {
    this.unsubscribeFromNameTakenEvent();
    this.leaveRoom();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    this.leaveRoom();
  }
}
