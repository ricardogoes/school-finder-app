import { CensoEscola } from "./censo-escola.model";
import { ContatosEscola } from "./contatos-escola.model";
import { EnderecoEscola } from "./endereco-escola.model";

export interface EscolaDetalhada {
  id: number;
  nome: string;
  cnpj: string;
  tipo_escola_id: number;
  tipo_escola: string;
  tipo_localizacao_id: number;
  tipo_localizacao: string;
  status_id: number;
  status: string;
  endereco: EnderecoEscola;
  contatos: ContatosEscola;
  dados_censo: CensoEscola;
}
