import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EcopontoService } from '../services/ecoponto.service';
import { Residuo } from '../models/residuo';
import { IconName } from '@fortawesome/fontawesome-common-types';
import { Categoria } from '../models/categoria';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  @Output() filtros = new EventEmitter();

  form!: FormGroup;

  residuos: Residuo[] = [];

  constructor(private ecopontoService: EcopontoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      localizacao: [""],
      residuos: this.formBuilder.array([])
    });

    this.buscarResiduos();
  }

  public async geraFormulario() {

    const residuosFormArray = this.form.get('residuos') as FormArray;
  
    await this.residuos.forEach((option: any) => {
      residuosFormArray.push(this.formBuilder.control(option.id))
    });

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

          this.geraFormulario();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  public filtrar() {

    const residuosFiltrados = this.form.value.residuos
      .map((checked: boolean, index: number) => checked ? this.residuos[index].id : null)
      .filter((id: number | null) => id !== null);
    
    this.filtros.emit({"localizacao": this.form.get("localizacao")?.value, "residuos": residuosFiltrados})
  }

}
