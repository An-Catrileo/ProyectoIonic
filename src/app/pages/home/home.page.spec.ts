import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GamesService } from '../../services/games.service';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let gamesServiceMock: any;

  beforeEach(() => {
    // Mock del servicio
    gamesServiceMock = {
      getGames: jasmine.createSpy('getGames').and.returnValue(of([
        {
          id: 582,
          title: "Tarisland",
          thumbnail: "https://www.freetogame.com/g/582/thumbnail.jpg",
          short_description: "A cross-platform MMORPG developed by Level Infinite and Published by Tencent.",
          game_url: "https://www.freetogame.com/open/tarisland",
          genre: "MMORPG",
          platform: "PC (Windows)",
          publisher: "Tencent",
          developer: "Level Infinite",
          release_date: "2024-06-22",
          freetogame_profile_url: "https://www.freetogame.com/tarisland"
        },
        {
          id: 540,
          title: "Overwatch 2",
          thumbnail: "https://www.freetogame.com/g/540/thumbnail.jpg",
          short_description: "A hero-focused first-person team shooter from Blizzard Entertainment.",
          game_url: "https://www.freetogame.com/open/overwatch-2",
          genre: "Shooter",
          platform: "PC (Windows)",
          publisher: "Activision Blizzard",
          developer: "Blizzard Entertainment",
          release_date: "2022-10-04",
          freetogame_profile_url: "https://www.freetogame.com/overwatch-2"
        },
      ]))
    };

    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: GamesService, useValue: gamesServiceMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('debe cargar los juegos desde el servicio', () => {
    component.ngOnInit();
    expect(component.games.length).toBe(2);
    expect(component.filteredGames.length).toBe(2);
    expect(gamesServiceMock.getGames).toHaveBeenCalledTimes(1);
  });

  it('debe filtrar los juegos correctamente', () => {
    component.ngOnInit();
    component.searchTerm = 'Overwatch';
    component.filterGames();
    expect(component.filteredGames.length).toBe(1);
    expect(component.filteredGames[0].title).toBe('Overwatch 2');
  });

  it('debe mostrar todos los juegos si el término de búsqueda está vacío', () => {
    component.ngOnInit();
    component.searchTerm = '';
    component.filterGames();
    expect(component.filteredGames.length).toBe(2);
  });
});
