import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bruja } from 'src/app/interfaces/brujas.interface';
import { BrujasService } from 'src/app/services/brujas.service';

@Component({
  selector: 'app-bruja-info',
  templateUrl: './bruja-info.component.html',
  styleUrls: ['./bruja-info.component.css']
})
export class BrujaInfoComponent implements OnInit {

  bruja: Bruja | any;

  constructor(
    private route: ActivatedRoute,
    private brujasService: BrujasService
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
            }
          }
        })
      }else{
        console.log("error al cargar el ID");
      }
    })
  }





}
