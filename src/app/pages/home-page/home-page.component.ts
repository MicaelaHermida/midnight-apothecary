import { Component } from '@angular/core';
import { PlantaInfo } from 'src/app/interfaces/planta-info.interface';
import { Planta } from 'src/app/interfaces/planta.interface';
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
    this.plantasService.getEdiblePlantList().subscribe({
      next: (data: Planta[]) => console.log(data),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });

    this.plantasService.getPlantDetails('1').subscribe({
      next: (data : PlantaInfo) => console.log(data),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
  /*onMostrarClientes() {
    this.clienteService.getClientesHttp()
      .subscribe(
        {
          next: (cli) => {
            this.listaClientes = cli
          },
          error: (error) => {
            console.error(error)
          }
        }
      )

  }*/
}
