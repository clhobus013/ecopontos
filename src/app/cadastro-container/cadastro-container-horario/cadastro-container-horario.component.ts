import { Component, OnInit } from '@angular/core';
import { CadastroContainerComponent } from '../cadastro-container.component';
import { FormArray, FormGroup } from '@angular/forms';
import { DiasFuncionamento } from 'src/app/models/diasFuncionamento';
import { Router } from '@angular/router';
import { Funcionamento } from 'src/app/models/funcionamento';
import { FuncionamentoService } from 'src/app/services/funcionamento.service';
import { ToastrService } from 'ngx-toastr';
import { EcopontoService } from 'src/app/services/ecoponto.service';

@Component({
  selector: 'app-cadastro-container-horario',
  templateUrl: './cadastro-container-horario.component.html',
  styleUrls: ['./cadastro-container-horario.component.scss']
})
export class CadastroContainerHorarioComponent implements OnInit {

  form!: FormGroup;
  ecopontoId: string|null = null;
  horarios!: FormArray;
  diasSemana!: DiasFuncionamento[];
  diasEdicao: string[] = [];

  constructor(private formContainer: CadastroContainerComponent, private router: Router, private funcionamentoService: FuncionamentoService, private ecopontoService: EcopontoService, private toastr: ToastrService) {}

  ngOnInit() {
    this.form = this.formContainer.getHorarioForm();
    this.ecopontoId = localStorage.getItem('ecopontoId');
    this.horarios = this.form.get('horarios') as FormArray;
    this.diasSemana = this.formContainer.diasFuncionamento;

    this.buscaHorarios();
  }

  getHorario(itemIndex: number) {
    return this.horarios.at(itemIndex) as FormGroup;
  }

  buscaHorarios() {
    this.ecopontoService.getEcopontoPorId(parseInt(this.ecopontoId!))
      .subscribe(
        (data: any) => {
          console.log(data);

          data.values.dia_funcionamento.map((func: any)=> {
            
            let index = this.diasSemana.map((dia) => dia.substring(0, 3).toLowerCase()).indexOf(func.dia_semana);
            
            this.diasEdicao.push(func.dia_semana);
            
            this.horarios.at(index)?.setValue({
              diaSemana: true,
              horaInicial: func.hora_inicial,
              horaFinal: func.hora_final,
            })
          })
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  async salvar() {

    let funcionamentos: Funcionamento[] = [];

    for(let i=0; i< this.form.value.horarios.length; i++) {
      if (this.form.value.horarios[i].diaSemana) {
        funcionamentos.push(new Funcionamento(
          {
            diaSemana: this.diasSemana[i].substring(0, 3).toLowerCase().replace("á", "a"),
            horaInicial: this.form.value.horarios[i].horaInicial,
            horaFinal: this.form.value.horarios[i].horaFinal,
          }
        ))
      }
    }

    await this.editaFuncionamento(funcionamentos);

    this.router.navigate(["/cadastro/conclusao"]);
    
  }

  public async editaFuncionamento(funcionamentos: Funcionamento[]) {
    
    if (funcionamentos.length <= 0) {
      return;
    }

    await this.funcionamentoService.putFuncionamento(parseInt(this.ecopontoId!), funcionamentos)
      .subscribe(
        (data: any) => {
          console.log(">> >> RESULTADO EDITAR ", data);
        },
        (error: any) => {
          console.log(error);
          this.toastr.error('Erro: ' + error.error.message, 'Não foi possível salvar o horário de funcionamento', {
            timeOut: 2000,
            positionClass: 'toast-bottom-right'
          });
        }
      );
  }

}
