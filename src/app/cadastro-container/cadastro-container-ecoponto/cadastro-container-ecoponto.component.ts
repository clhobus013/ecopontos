import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CadastroContainerComponent } from '../cadastro-container.component';
import { EcopontoService } from 'src/app/services/ecoponto.service';
import { ToastrService } from 'ngx-toastr';
import { Ecoponto } from 'src/app/models/ecoponto';
import { Residuo } from 'src/app/models/residuo';
import { Categoria } from 'src/app/models/categoria';
import { IconName } from '@fortawesome/fontawesome-common-types';

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
  residuos: Residuo[] = [];

  constructor(public formContainer: CadastroContainerComponent, private ecopontoService: EcopontoService, private toastr: ToastrService) {}

  ngOnInit() {
    this.form = this.formContainer.getEcopontoForm();
    this.formLocalizacao = this.formContainer.getLocalizacaoForm();

    this.empresaId = localStorage.getItem('empresaId');

    if (this.formContainer.ehEdicao()) {
      this.ecopontoId = localStorage.getItem('ecopontoId');
    }

    this.buscarResiduos();
  }

  proximo() {
    this.formContainer.proximoPasso();
  }

  public buscaEcoponto() {

    this.ecopontoService.getEcopontoPorId(parseInt(this.ecopontoId!))
      .subscribe(
        (data: any) => {

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
          })

          data.values.residuo.map((residuo: Residuo) => {
            let index = this.residuos.map((todosResiduos)=> todosResiduos.id).indexOf(residuo.id)
            this.residuos[index].ativo = residuo.ativo;
          })

          console.log("Id do form", this.form.get("id"));

        },
        (error: any) => {
          console.log(error);
        }
      );

  }

  public async salvarEcoponto() {
    await this.ecopontoService.postEcoponto(new Ecoponto({empresa: {id: this.empresaId}, residuos: this.residuos, ...this.form.value}))
      .subscribe(
        (data: any) => {
          this.ecopontoId = data.value.id;
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

  public async editarEcoponto() {
    await this.ecopontoService.putEcoponto(new Ecoponto({id: this.ecopontoId, empresa: {id: this.empresaId}, residuos: this.residuos, ...this.form.value}))
      .subscribe(
        (data: any) => {          
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

          if (this.ecopontoId) {
            this.buscaEcoponto()
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

}
