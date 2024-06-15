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
  empresaId: string|null = null;

  constructor(public formContainer: CadastroContainerComponent, private empresaService: EmpresaService, private toastr: ToastrService) {}

  ngOnInit() {
    this.form = this.formContainer.getEmpresaForm();

    this.empresaId = localStorage.getItem('empresaId');

    if (this.empresaId) {
      this.buscaEmpresa()
    }

  }

  public buscaEmpresa() {

    this.empresaService.getEmpresaPorId(parseInt(this.empresaId!))
      .subscribe(
        (data: any) => {
          console.log(data);

          this.form.setValue({
            id: data.value.id,
            nomeFantasia: data.value.nome_fantasia,
            razaoSocial: data.value.razao_social,
            cnpj: data.value.cnpj,
            ramoAtuacao: data.value.ramo_atuacao,
            nomeContatoResponsavel: data.value.nome_contato_responsavel,
            telefone: data.value.telefone,
            redeSocial: data.value.rede_social,
            email: data.value.email,
            senha: null,
            descricaoOutrosProjetos: data.value.descricao_outros_projetos,
          })

          console.log("Id do form", this.form.get("id"));

        },
        (error: any) => {
          console.log(error);
        }
      );

  }

  public salvaEmpresa() {
    this.empresaService.postEmpresa(new Empresa(this.form.value))
      .subscribe(
        (data: any) => {
          console.log(data);

          localStorage.setItem('empresaId', data.value.id);
          
          this.toastr.success('Realize o cadastro dos ecopontos!', 'Empresa salva com sucesso', {
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

  public editaEmpresa() {
    console.log("form", this.form.value);
    this.empresaService.putEmpresa(new Empresa({id: this.empresaId, ...this.form.value}))
      .subscribe(
        (data: any) => {
          console.log(data);
          
          this.toastr.success('Realize o cadastro dos ecopontos!', 'Empresa salva com sucesso', {
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

  public salvar(){

    this.formContainer.enviado = true;

    console.log("Clicou em salvar empresa!!");

    if (!this.form.valid) {
      this.toastr.error('Preencha corretamente', 'Formulário inválido', {
        positionClass: 'toast-bottom-right'
      });
      return;
    } 

    if (this.empresaId) {
      this.editaEmpresa();
    } else {
      this.salvaEmpresa();
    }
    
  }

  proximo() {
    this.formContainer.proximoPasso();
  }
}
