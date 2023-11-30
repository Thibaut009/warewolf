import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  private socket: any;
  private leaveSubject = new Subject<string>();
  private nameTakenSubject = new Subject<string>();

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  joinRoom(roomId: string, playerName: string): Observable<any[]> {
    return new Observable(observer => {
      this.socket.emit('join', roomId, playerName);

      // Listen for the 'updateRoomUsers' event to get the updated user list
      const updateRoomUsersHandler = (updatedUserList: any[]) => {
        observer.next(updatedUserList);
      };

      this.socket.on('updateRoomUsers', updateRoomUsersHandler);

      // Listen for the 'nameTaken' event
      const nameTakenHandler = (takenPlayerName: string) => {
        this.nameTakenSubject.next(takenPlayerName);
        // Unsubscribe from 'updateRoomUsers' since we won't need it anymore
        this.socket.off('updateRoomUsers', updateRoomUsersHandler);
      };

      this.socket.on('nameTaken', nameTakenHandler);
    });
  }

  leaveRoom(roomId: string, playerName: string): void {
    this.socket.emit('leave', roomId, playerName);
  }

  onJoin(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('join', (playerName: string) => {
        observer.next(playerName);
      });
    });
  }

  onLeave(): Observable<string> {
    return this.leaveSubject.asObservable();
  }

  onNameTaken(): Observable<string> {
    return this.nameTakenSubject.asObservable();
  }
}
