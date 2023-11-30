// gateway.services.ts

import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  private socket: any;
  private leaveSubject = new Subject<string>(); // Ajoutez cette ligne

  constructor() {
    // Connexion au serveur Socket.IO
    this.socket = io('http://localhost:3000'); // Remplacez avec l'URL de votre serveur
  }

  joinRoom(roomId: string, playerName: string): Observable<any[]> {
    return new Observable(observer => {
      this.socket.emit('join', roomId, playerName);
  
      // Listen for the 'updateRoomUsers' event to get the updated user list
      this.socket.on('updateRoomUsers', (updatedUserList: any[]) => {
        observer.next(updatedUserList);
      });
    });
  }

  leaveRoom(roomId: string, playerName: string): void {
    // Quitter une room avec un identifiant
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
}
