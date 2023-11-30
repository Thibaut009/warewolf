import { Component } from '@angular/core';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent {
  cards = [
    {
      role: 'Loup-garou',
      description: 'Les loups-garous sont des créatures de la nuit qui tentent de dévorer les villageois.',
      image: 'assets/imgs/cards/warewolf.jpg'
    },
    {
      role: 'Villageois',
      description: 'Les villageois sont des habitants du village qui cherchent à éliminer les loups-garous.',
      image: 'assets/imgs/cards/villagers.jpg'
    },
    {
      role: 'Sorcière',
      description: 'La sorcière possède des potions magiques pour sauver ou tuer des joueurs la nuit.',
      image: 'assets/imgs/cards/witch.jpg'
    },
    {
      role: 'Cupidon',
      description: 'Cupidon est un personnage qui unit deux joueurs en amour, ils doivent survivre ensemble.',
      image: 'assets/imgs/cards/cupidon.jpg'
    },
    {
      role: 'Voyante',
      description: 'La voyante peut découvrir le rôle d\'un joueur chaque nuit.',
      image: 'assets/imgs/cards/clairvoyant.jpg'
    },
    {
      role: 'Chasseur',
      description: 'Le chasseur peut éliminer un joueur de son choix s\'il est éliminé.',
      image: 'assets/imgs/cards/hunter.jpg'
    },
    {
      role: 'Petite Fille',
      description: 'La petite fille peut espionner la nuit sans être découverte.',
      image: 'assets/imgs/cards/litlegirl.jpg'
    }
  ];
}
