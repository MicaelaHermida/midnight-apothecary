import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bruja } from 'src/app/interfaces/brujas.interface';
import { BrujasService } from 'src/app/services/brujas.service';
import { ComentariosService } from 'src/app/services/comentarios.service';

@Component({
  selector: 'app-bruja-info',
  templateUrl: './bruja-info.component.html',
  styleUrls: ['./bruja-info.component.css']
})
export class BrujaInfoComponent implements OnInit {

  bruja!: Bruja;
  brujaCargada: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private brujasService: BrujasService,
    private comentariosService: ComentariosService
  ) {  }

  ngOnInit(): void {
    this.initBio();
  }

  initBio() {
    this.route.params.subscribe(params => {
      const brujaId = +params['id'];

      if (!isNaN(brujaId)) {
        this.brujasService.getBruja(brujaId).subscribe({
          next: (bruja) => {
            console.log(bruja);
            if (bruja) {
                this.bruja = bruja;
                this.comentariosService.brujaId = this.bruja.id;
                this.brujaCargada = true;
            }
          }
        })
      }else{
        console.log("error al cargar el ID");
      }
    })
  }
}
