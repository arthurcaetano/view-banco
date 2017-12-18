import { Banco } from "./banco";

export class Conta {

    constructor() { }

    public Id: number;
    public Numero: number;
    public Titular: string;
    public Banco: Banco;
    public Saldo: number;
}