import UnidadeMedidaEnum from './UnidadeMedidaEnum';

export default class ItemMrp {
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