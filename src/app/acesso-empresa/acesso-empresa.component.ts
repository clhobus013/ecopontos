import { Component, OnInit } from '@angular/core';
import { Empresa } from '../models/empresa';
import { Ecoponto } from '../models/ecoponto';
import { EmpresaService } from '../services/empresa.service';
import { EcopontoService } from '../services/ecoponto.service';
import { Localizacao } from '../models/localizacao';
import { Residuo } from '../models/residuo';
import { Funcionamento } from '../models/funcionamento';
import { faFileArrowDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Situacao } from '../models/situacao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acesso-empresa',
  templateUrl: './acesso-empresa.component.html',
  styleUrls: ['./acesso-empresa.component.scss']
})
export class AcessoEmpresaComponent implements OnInit {

  faPlus = faPlus;
  faArrowDown = faFileArrowDown;

  empresa: Empresa | undefined;
  ecopontos: Ecoponto[] = [];

  constructor(private empresaService: EmpresaService, ecopontoService: EcopontoService, private router: Router) {}

  ngOnInit(): void {
    let empresaId = localStorage.getItem('empresaId');

    if (!empresaId) {
      this.router.navigate(["/cadastro/empresa"]);
      return
    }
    
    if (parseInt(empresaId!)) {
      this.buscaEmpresa(parseInt(empresaId!));
    }
  }

  recebeAtualizacao(respostaEcoponto: any) {
    // Remove ecoponto
    if (respostaEcoponto.ecoponto == null) {
      this.empresa?.ecopontos.splice(respostaEcoponto.index, 1);
    }
  }

  private buscaEmpresa(id: number) {
    this.empresaService.getEmpresaPorId(id).subscribe(
      (data: any) => {
        this.empresa = new Empresa(
          {
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
            ecopontos: data.value.ecopontos.map((ecoponto: any)=> new Ecoponto({
                id: ecoponto.id,
                nome: ecoponto.nome,
                situacao: new Situacao({"situacao": ecoponto.situacao, "situacaoEnum": ecoponto.situacao_enum}),
                diasFuncionamento: ecoponto.dia_funcionamento.map((funcionamento: any)=> new Funcionamento({
                    diaSemana: funcionamento.dia_semana,
                    horaInicial: funcionamento.hora_inicial,
                    horaFinal: funcionamento.hora_final
                })),
                localizacao: ecoponto.localizacao.map((localizacao: any) => new Localizacao({
                  cep: localizacao.cep,
                  estado: localizacao.estado,
                  cidade: localizacao.cidade,
                  bairro: localizacao.bairro,
                  rua: localizacao.rua,
                  numero: localizacao.numero,
                  latitude: localizacao.latitude,
                  longitude: localizacao.longitude,
                })),
                abertoPublico: ecoponto.aberto_publico,
                residuo: ecoponto.residuo.map((residuo: any) => new Residuo({
                  id: residuo.id,
                  descricao: residuo.descricao,
                  icone: residuo.icone,
                  urlMidia: residuo.urlMidia,
                  recolhidoEcoponto: residuo.recolhido_em_ecoponto,
                  ativo: residuo.ativo,
                  categorias: residuo.categorias
                })),
            }) )
          }
        )
      },
      (error: any) => {
      }
    );
  }

  public novoEcoponto() {
    this.router.navigate(["/cadastro/ecoponto"]);
  }

}
