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
  ecopontoId: string|null = null;
  empresaId: string|null = null;

  constructor(private formContainer: CadastroContainerComponent, private ecopontoService: EcopontoService, private toastr: ToastrService) {}

  ngOnInit() {
    this.form = this.formContainer.getEcopontoForm();

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

          this.form.setValue({
            id: data.value.id,
            nome: data.value.nome,
            cep: data.value.cep,
            estado: data.value.estado,
            cidade: data.value.cidade,
            bairro: data.value.bairro,
            rua: data.value.rua,
            numero: data.value.numero,
            latitude: data.value.latitude,
            longitude: data.value.longitude,
            abertoPublico: data.value.aberto_publico,
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
