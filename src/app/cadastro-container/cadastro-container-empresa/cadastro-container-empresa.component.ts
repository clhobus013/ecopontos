import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CadastroContainerComponent } from '../cadastro-container.component';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-container-empresa',
  templateUrl: './cadastro-container-empresa.component.html',
  styleUrls: ['./cadastro-container-empresa.component.scss']
})
export class CadastroContainerEmpresaComponent implements OnInit {

  form!: FormGroup;

  constructor(private formContainer: CadastroContainerComponent, private empresaService: EmpresaService, private toastr: ToastrService) {}

  ngOnInit() {
    this.form = this.formContainer.getEmpresaForm();
  }

  public salvar(){

    if (!this.form.valid) {
      this.toastr.error('Preencha corretamente', 'Formulário inválido', {
        positionClass: 'toast-bottom-right'
      });
      return;
    } 

    this.empresaService.postEmpresa(new Empresa(this.form.value))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.toastr.success('Hello world!', 'Toastr fun!');
          this.toastr.error('Realize o cadastro dos ecopontos!', 'Empresa salva com sucesso', {
            timeOut: 1500,
            positionClass: 'toast-bottom-right'
          });
          this.proximo();
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

  proximo() {
    this.formContainer.proximoPasso();
  }
}
