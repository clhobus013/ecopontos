import { Component, OnInit } from '@angular/core';
import { EcopontoService } from '../services/ecoponto.service';
import { Residuo } from '../models/residuo';
import { IconName } from '@fortawesome/fontawesome-common-types';
import { Categoria } from '../models/categoria';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  form!: FormGroup;

  localizacao: string = "";
  residuos: Residuo[] = [];

  constructor(private ecopontoService: EcopontoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      localizacao: [""],
      residuos: this.formBuilder.array(
        this.residuos.map(() => {
          return this.formBuilder.group({
            ativo: [true],
          })
        })
      )
    });

    this.buscarResiduos();
  }

  public async buscarResiduos() {
    await this.ecopontoService.getResiduos()
      .subscribe(
        (data: any) => {
          this.residuos = data.values.map((residuo: any) => 
              new Residuo({
                id: residuo.id,
                descricao: residuo.descricao,
                icone: residuo.icone as IconName,
                urlMidia: residuo.url_midia,
                recolhidoEcoponto: residuo.recolhido_em_ecoponto,
                ativo: false,
                categorias: residuo.categoria.map((categ: any) => new Categoria({descricao: categ.descricao, icone: categ.icone}))
              })
          );
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  public filtrar() {
    console.log(" FILTROU >> localizacao", this.localizacao, this.residuos)
  }

}
