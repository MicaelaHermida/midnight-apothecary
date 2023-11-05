import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantaInfo } from 'src/app/interfaces/planta-info.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { PlantasService } from 'src/app/services/plantas.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-info-producto',
  templateUrl: './info-producto.component.html',
  styleUrls: ['./info-producto.component.css']
})
export class InfoProductoComponent implements OnInit{

    producto!: Producto;
    plantaInfo! : PlantaInfo;
  
    constructor(private activatedRoute: ActivatedRoute, private productosService: ProductosService, private plantasService: PlantasService) { }

    ngOnInit(): void {
      this.mostrarInfoProducto();
    }

    async mostrarInfoProducto() {
      this.activatedRoute.params.subscribe(async params =>{
        const productoID= params['key'];
        this.producto= await this.productosService.getProducto(productoID);
        if(this.producto){
          this.plantasService.getPlantDetails(this.producto.id_planta).subscribe(data => {
            this.plantaInfo = data;
            console.log(this.plantaInfo);
          });
        }
      })
    }
}
