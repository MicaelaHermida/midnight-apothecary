import { Component } from '@angular/core';
import { PlantasService } from 'src/app/services/plantas.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(private plantasService: PlantasService) { 
  }

  ngOnInit(): void {
    this.plantasService.getEdiblePlantList().subscribe(
    (data) => {
      console.log(data);
    },
    (error)=> {
      console.error(error);
    });
  }
}
