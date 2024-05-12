import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CadastroContainerComponent } from '../cadastro-container.component';
import { EcopontoService } from 'src/app/services/ecoponto.service';
import { ToastrService } from 'ngx-toastr';
import { Ecoponto } from 'src/app/models/ecoponto';

@Component({
  selector: 'app-cadastro-container-ecoponto',
  templateUrl: './cadastro-container-ecoponto.component.html',
  styleUrls: ['./cadastro-container-ecoponto.component.scss']
})
export class CadastroContainerEcopontoComponent implements OnInit {

  form!: FormGroup;
  formLocalizacao!: FormGroup;
  ecopontoId: string|null = null;
  empresaId: string|null = null;

  constructor(public formContainer: CadastroContainerComponent, private ecopontoService: EcopontoService, private toastr: ToastrService) {}

  ngOnInit() {
    this.form = this.formContainer.getEcopontoForm();
    this.formLocalizacao = this.formContainer.getLocalizacaoForm();

    this.ecopontoId = localStorage.getItem('ecopontoId');
    this.empresaId = localStorage.getItem('empresaId');

    console.log("Id Empresa >>>", parseInt(this.empresaId!));
    console.log("Id Ecoponto >>>", parseInt(this.ecopontoId!));

    if (this.ecopontoId) {
      this.buscaEcoponto()
    }
  }

  proximo() {
    this.formContainer.proximoPasso();
  }

  public buscaEcoponto() {

    this.ecopontoService.getEcopontoPorId(parseInt(this.ecopontoId!))
      .subscribe(
        (data: any) => {
          console.log(data);

          this.formLocalizacao.setValue({
            cep: data.values.localizacao[0].cep,
            estado: data.values.localizacao[0].estado,
            cidade: data.values.localizacao[0].cidade,
            bairro: data.values.localizacao[0].bairro,
            rua: data.values.localizacao[0].rua,
            numero: data.values.localizacao[0].numero,
            latitude: data.values.localizacao[0].latitude,
            longitude: data.values.localizacao[0].longitude,
          }),

          this.form.setValue({
            id: data.values.id,
            nome: data.values.nome,
            localizacao: this.formLocalizacao.value,
            abertoPublico: data.values.aberto_publico,
            residuos: null,
          })

          console.log("Id do form", this.form.get("id"));

        },
        (error: any) => {
          console.log(error);
        }
      );

  }

  public salvarEcoponto() {
    this.ecopontoService.postEcoponto(new Ecoponto({empresa: {id: this.empresaId}, ...this.form.value}))
      .subscribe(
        (data: any) => {
          console.log(data);

          localStorage.setItem('ecopontoId', data.value.id);
          
          this.toastr.success('Realize o cadastro do horário de funcionamento!', 'Ecoponto salvo com sucesso', {
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

  public editarEcoponto() {
    this.ecopontoService.putEcoponto(new Ecoponto({id: this.ecopontoId, empresa: {id: this.empresaId}, ...this.form.value}))
      .subscribe(
        (data: any) => {
          console.log(data);
          
          this.toastr.success('Realize o cadastro do horário de funcionamento!', 'Ecoponto salvo com sucesso', {
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

    if (!this.form.valid) {
      console.log("Tentou enviar formulario: ", this.form);
      this.toastr.error('Preencha corretamente', 'Formulário inválido', {
        positionClass: 'toast-bottom-right'
      });
      return;
    } 

    if (this.ecopontoId) {
      this.editarEcoponto();
    } else {
      this.salvarEcoponto();
    }

  }

}
