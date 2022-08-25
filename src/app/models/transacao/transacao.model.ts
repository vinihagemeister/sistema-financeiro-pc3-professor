import { ETipoTransacao } from "./etipotransacao/etipotransacao.model";

export interface Transacao{
  id: number;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  tipo: ETipoTransacao;
  valor: number;
  saldo: number;
  descricao: string;
}
