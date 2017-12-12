import { Conta } from "./conta";

export class Movimentacao {

    constructor() { }

    public Id: number;
    public Descricao: string;
    public Tipo: string;
    public Data: Date;
    public Valor: number;
    public Conta: Conta;
}