import { Component, OnInit } from '@angular/core';
import { CadastroContainerComponent } from '../cadastro-container.component';
import { FormArray, FormGroup } from '@angular/forms';
import { DiasFuncionamento } from 'src/app/models/diasFuncionamento';
import { Router } from '@angular/router';
import { Funcionamento } from 'src/app/models/funcionamento';
import { FuncionamentoService } from 'src/app/services/funcionamento.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private formContainer: CadastroContainerComponent, private router: Router, private funcionamentoService: FuncionamentoService, private toastr: ToastrService) {}

  ngOnInit() {
    this.form = this.formContainer.getHorarioForm();
    this.ecopontoId = localStorage.getItem('ecopontoId');
    this.horarios = this.form.get('horarios') as FormArray;
    this.diasSemana = this.formContainer.diasFuncionamento;
  }

  getHorario(itemIndex: number) {
    return this.horarios.at(itemIndex) as FormGroup;
  }

  salvar() {
    console.log(">> SALVANDO HORARIO ", this.form);

    this.salvaFuncionamento();
    
  }

  public salvaFuncionamento() {
    this.funcionamentoService.postFuncionamento(parseInt(this.ecopontoId!), this.form.value.horarios.map((value: any) => new Funcionamento(value)))
      .subscribe(
        (data: any) => {
          console.log(">> >> RESULTADO ", data);

          // localStorage.setItem('horarios', data.value.id);
          
          // this.toastr.success('Realize o cadastro dos ecopontos!', 'Empresa salva com sucesso', {
          //   timeOut: 1500,
          //   positionClass: 'toast-bottom-right'
          // });
          this.router.navigate(["/cadastro/conclusao"]);
        },
        (error: any) => {
          console.log(error);
          this.toastr.error('Erro: ' + error.error.message, 'Não foi possível salvar a empresa', {
            timeOut: 2000,
            positionClass: 'toast-bottom-right'
          });
        }
      );
  }

}
