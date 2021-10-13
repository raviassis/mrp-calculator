const UnidadeMedidaEnum = {
    UNIDADE: "unidade",
    GRAMAS: "gramas",
    CENTIMETROS: "centimetros"
}

const FornecimentoEnum = {
    COMPRADO: "comprado",
    PRODUZIDO: "produzido"
}

class ItemMrp {
    constructor({
        nome, 
        lote, 
        leadTime, 
        estoqueSeguranca,
        estoqueInicial, 
        recebimentosProgramados,
        necessidadesBrutas,
        multiplicador,
        unidadeMedida,
        itensFilhos
    }) {
        this.nome = nome;
        this.lote = lote < 1 ? 1 : lote;
        this.leadTime = leadTime || 0;
        this.estoqueSeguranca = estoqueSeguranca < 0 ? 0 : estoqueSeguranca;
        this.estoqueInicial = estoqueInicial;
        this.recebimentosProgramados = recebimentosProgramados;
        this.multiplicador = multiplicador < 1 ? 1 : multiplicador ;  
        this.unidadeMedida = unidadeMedida || UnidadeMedidaEnum.UNIDADE;      
        this.atrasoLiberacao = 0;
        this.estoqueProjetado = [];
        this.recebimentoOrdensPlanejadas = [];
        this.liberacaoOrdensPlanejadas = [];
        this.setItensFilhos(itensFilhos);
        this.setNecessidadesBrutas(necessidadesBrutas);
        this.calcular();
    }
    setNecessidadesBrutas(value) {
        value = value || [];
        this.necessidadesBrutas = value.map(n => n * this.multiplicador);
        for (let i = 0; i < this.necessidadesBrutas.length; i++) {
            this.estoqueProjetado[i] = 0;
            this.recebimentoOrdensPlanejadas[i] = 0;
            this.liberacaoOrdensPlanejadas[i] = 0;
        }
    }
    setItensFilhos(value){
        this.itensFilhos = value || [];
        for(let i = 0; i < this.itensFilhos.length; i++){
            let item = this.itensFilhos[i];
            this.itensFilhos[i] = new ItemMrp(item);
                
        }
    }
    calcular() {
        let estoque = this.estoqueInicial;
        for(let i = 0; i < this.necessidadesBrutas.length; i++) {
            const recebimentoProgramado = this.recebimentosProgramados[i] || 0;
            const necessidadeBruta = this.necessidadesBrutas[i] || 0;
            let recebimentoOrdemPlanejada = 0;
            estoque += recebimentoProgramado - necessidadeBruta;

            if (estoque < this.estoqueSeguranca) {
                const paraRepor = this.estoqueSeguranca - estoque;
                const lotesNecessarios = Math.ceil(paraRepor/this.lote);
                recebimentoOrdemPlanejada += lotesNecessarios * this.lote;
            }

            estoque += recebimentoOrdemPlanejada;

            this.estoqueProjetado[i] = estoque;
            this.recebimentoOrdensPlanejadas[i] = recebimentoOrdemPlanejada;
            const indexLiberacao = i - this.leadTime;
            if (indexLiberacao >= 0) 
                this.liberacaoOrdensPlanejadas[indexLiberacao] = recebimentoOrdemPlanejada;
            else 
                this.atrasoLiberacao += recebimentoOrdemPlanejada;
        }

        for(const filho of this.itensFilhos) {
            filho.setNecessidadesBrutas(this.liberacaoOrdensPlanejadas);
            filho.calcular();
        }
    }
}

// Exemplo estrutura para realizar o calculo do MRP
const lapiseira = {
    nome: "Lapiseira P207",
    leadTime: 1,
    lote: 500,
    estoqueSeguranca: 0,
    estoqueInicial: 500,
    recebimentosProgramados: [0, 600, 0, 0, 0, 0, 0, 0],
    necessidadesBrutas: [300, 300, 300, 300, 300, 300, 300, 300],
    multiplicador: 1,
    unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    itensFilhos: [
        {
            nome: "Presilha de bolso",
            leadTime: 1,
            lote: 50,
            estoqueSeguranca: 0,
            estoqueInicial: 500,
            recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
            multiplicador: 1,
            unidadeMedida: UnidadeMedidaEnum.UNIDADE,
        },
        {
            nome: "Corpo da ponteira",
            leadTime: 2,
            lote: 50,
            estoqueSeguranca: 0,
            estoqueInicial: 500,
            recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
            multiplicador: 1,
            unidadeMedida: UnidadeMedidaEnum.UNIDADE,
        },
        {
            nome: "Guia da ponteira",
            leadTime: 1,
            lote: 50,
            estoqueSeguranca: 0,
            estoqueInicial: 500,
            recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
            multiplicador: 1,
            unidadeMedida: UnidadeMedidaEnum.UNIDADE,
        },
        {
            nome: "Tampa",
            leadTime: 1,
            lote: 500,
            estoqueSeguranca: 0,
            estoqueInicial: 500,
            recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
            multiplicador: 1,
            unidadeMedida: UnidadeMedidaEnum.UNIDADE,
            itensFilhos: [
                {
                    nome: "Tira .1 mm",
                    leadTime: 1,
                    lote: 50,
                    estoqueSeguranca: 0,
                    estoqueInicial: 500,
                    recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
                    multiplicador: 2,
                    unidadeMedida: UnidadeMedidaEnum.GRAMAS,
                }
            ]
        },
        {
            nome: "Corpo Externo 207",
            leadTime: 2,
            lote: 500,
            estoqueSeguranca: 0,
            estoqueInicial: 500,
            recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
            multiplicador: 1,
            unidadeMedida: UnidadeMedidaEnum.UNIDADE,
            itensFilhos: [
                {
                    nome: "Plástico ABS",
                    leadTime: 1,
                    lote: 50,
                    estoqueSeguranca: 0,
                    estoqueInicial: 500,
                    recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
                    multiplicador: 10,
                    unidadeMedida: UnidadeMedidaEnum.GRAMAS,
                },
                {
                    nome: "Corante azul",
                    leadTime: 1,
                    lote: 50,
                    estoqueSeguranca: 0,
                    estoqueInicial: 500,
                    recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
                    multiplicador: 0.1,
                    unidadeMedida: UnidadeMedidaEnum.GRAMAS,
                }
            ]
        },
        {
            nome: "Miolo 207",
            leadTime: 1,
            lote: 500,
            estoqueSeguranca: 0,
            estoqueInicial: 500,
            recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
            multiplicador: 1,
            unidadeMedida: UnidadeMedidaEnum.UNIDADE,
            itensFilhos: [
                {
                    nome: "Grafite 0.7 mm",
                    leadTime: 2,
                    lote: 50,
                    estoqueSeguranca: 0,
                    estoqueInicial: 500,
                    recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
                    multiplicador: 4,
                    unidadeMedida: UnidadeMedidaEnum.UNIDADE,
                },
                {
                    nome: "Borracha",
                    leadTime: 1,
                    lote: 500,
                    estoqueSeguranca: 0,
                    estoqueInicial: 500,
                    recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
                    multiplicador: 1,
                    unidadeMedida: UnidadeMedidaEnum.UNIDADE,
                    itensFilhos: [
                        {
                            nome: "Fio de Borracha",
                            leadTime: 1,
                            lote: 50,
                            estoqueSeguranca: 0,
                            estoqueInicial: 500,
                            recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
                            multiplicador: 2,
                            unidadeMedida: UnidadeMedidaEnum.CENTIMETROS,
                        }
                    ]
                },
                {
                    nome: "Capa de borracha",
                    leadTime: 1,
                    lote: 500,
                    estoqueSeguranca: 0,
                    estoqueInicial: 500,
                    recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
                    multiplicador: 1,
                    unidadeMedida: UnidadeMedidaEnum.UNIDADE,
                    itensFilhos: [
                        {
                            nome: "Tira .1 mm",
                            leadTime: 1,
                            lote: 50,
                            estoqueSeguranca: 0,
                            estoqueInicial: 500,
                            recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
                            multiplicador: 2,
                            unidadeMedida: UnidadeMedidaEnum.GRAMAS,
                        }
                    ]
                },
                {
                    nome: "Miolo interno 207",
                    leadTime: 3,
                    lote: 500,
                    estoqueSeguranca: 0,
                    estoqueInicial: 500,
                    recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
                    multiplicador: 1,
                    unidadeMedida: UnidadeMedidaEnum.UNIDADE,
                    itensFilhos: [
                        {
                            nome: "Mola",
                            leadTime: 1,
                            lote: 50,
                            estoqueSeguranca: 0,
                            estoqueInicial: 500,
                            recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
                            multiplicador: 1,
                            unidadeMedida: UnidadeMedidaEnum.UNIDADE,
                        },
                        {
                            nome: "Suporte da garra",
                            leadTime: 2,
                            lote: 50,
                            estoqueSeguranca: 0,
                            estoqueInicial: 500,
                            recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
                            multiplicador: 1,
                            unidadeMedida: UnidadeMedidaEnum.UNIDADE,
                        },
                        {
                            nome: "Capa da garra",
                            leadTime: 3,
                            lote: 50,
                            estoqueSeguranca: 0,
                            estoqueInicial: 500,
                            recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
                            multiplicador: 1,
                            unidadeMedida: UnidadeMedidaEnum.UNIDADE,
                        },
                        {
                            nome: "Garras",
                            leadTime: 1,
                            lote: 50,
                            estoqueSeguranca: 0,
                            estoqueInicial: 500,
                            recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
                            multiplicador: 3,
                            unidadeMedida: UnidadeMedidaEnum.UNIDADE,
                        },
                        {
                            nome: "Corpo do miolo",
                            leadTime: 2,
                            lote: 500,
                            estoqueSeguranca: 0,
                            estoqueInicial: 500,
                            recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
                            multiplicador: 1,
                            unidadeMedida: UnidadeMedidaEnum.UNIDADE,
                            itensFilhos: [
                                {
                                    nome: "Plastico ABS",
                                    leadTime: 1,
                                    lote: 50,
                                    estoqueSeguranca: 0,
                                    estoqueInicial: 500,
                                    recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
                                    multiplicador: 7,
                                    unidadeMedida: UnidadeMedidaEnum.GRAMAS,
                                },
                                {
                                    nome: "Corante preto",
                                    leadTime: 2,
                                    lote: 50,
                                    estoqueSeguranca: 0,
                                    estoqueInicial: 500,
                                    recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
                                    multiplicador: 0.05,
                                    unidadeMedida: UnidadeMedidaEnum.GRAMAS,
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

const lapiseiraMRP = new ItemMrp(lapiseira);
console.log(lapiseiraMRP)

