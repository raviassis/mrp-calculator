class ItemMrp {
    constructor(
        nome, 
        lote, 
        leadTime, 
        estoqueSeguranca,
        estoqueInicial, 
        recebimentosProgramados,
        necessidadesBrutas,
        multiplicador,
        itensFilhos
    ) {
        this.nome = nome;
        this.lote = lote < 1 ? 1 : lote;
        this.leadTime = leadTime || 0;
        this.estoqueSeguranca = estoqueSeguranca < 0 ? 0 : estoqueSeguranca;
        this.estoqueInicial = estoqueInicial;
        this.recebimentosProgramados = recebimentosProgramados;
        this.necessidadesBrutas = necessidadesBrutas || [];
        this.multiplicador = multiplicador < 1 ? 1 : multiplicador ;        
        this.atrasoLiberacao = 0;
        this.estoqueProjetado = [];
        this.recebimentoOrdensPlanejadas = [];
        this.liberacaoOrdensPlanejadas = [];
        this.itensFilhos = itensFilhos || [];
        this.setRecebimentoOrdensPlanejadas(necessidadesBrutas);
        this.calcular();
    }
    setRecebimentoOrdensPlanejadas(value) {
        value = value || [];
        this.necessidadesBrutas = value.map(n => n * this.multiplicador);
        for (let i = 0; i < this.necessidadesBrutas.length; i++) {
            this.estoqueProjetado[i] = 0;
            this.recebimentoOrdensPlanejadas[i] = 0;
            this.liberacaoOrdensPlanejadas[i] = 0;
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
            filho.setRecebimentoOrdensPlanejadas(this.liberacaoOrdensPlanejadas);
            filho.calcular();
        }
    }
}


const R1063 = new ItemMrp(
    "R1063",
    350,
    2,
    200,
    900,
    [],
    [],
    2
);
const m21 = new ItemMrp(
    "m21",
    600,
    1,
    0,
    500,
    [0, 600, 0, 0, 0, 0, 0, 0],
    [200, 200, 200, 200, 200, 200, 200, 200],
    1,
    [R1063]
);

console.log(m21)