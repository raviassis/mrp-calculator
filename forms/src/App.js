import { useState } from 'react';
import { 
    Container,
    Button,
    Dialog,
    DialogContent,
    Table,
    TableBody,
    TableRow,
    TableCell
} from '@material-ui/core';
import MrpItemForm from './components/MrpItemForm';
import UnidadeMedidaEnum from './services/UnidadeMedidaEnum';
import ItemMrp from './services/ItemMrp';
import './App.css';

function ShowItemMrp(props){
    const {item} = props;

    return (
        <Table>
            <TableBody>
                <TableRow>  
                    <TableCell rowSpan={6}>
                        <p>{item.nome}</p>
                        <p>Lote = {item.lote} </p>
                        <p>Lead Time = {item.leadTime} </p>
                        <p>Estoque de Segurança = {item.estoqueSeguranca} </p>
                        <p>Atraso Liberação = {item.atrasoLiberacao}</p>
                    </TableCell>
                    <TableCell colSpan={2}>Períodos</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>6</TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>8</TableCell>
                </TableRow>
                <TableRow>  
                    <TableCell colSpan={2}>Necessidades brutas</TableCell>
                    <TableCell>{item.necessidadesBrutas[0]}</TableCell>
                    <TableCell>{item.necessidadesBrutas[1]}</TableCell>
                    <TableCell>{item.necessidadesBrutas[2]}</TableCell>
                    <TableCell>{item.necessidadesBrutas[3]}</TableCell>
                    <TableCell>{item.necessidadesBrutas[4]}</TableCell>
                    <TableCell>{item.necessidadesBrutas[5]}</TableCell>
                    <TableCell>{item.necessidadesBrutas[6]}</TableCell>
                    <TableCell>{item.necessidadesBrutas[7]}</TableCell>
                </TableRow>
                <TableRow>  
                    <TableCell colSpan={2}>Recebimentos programados</TableCell>
                    <TableCell>{item.recebimentosProgramados[0]}</TableCell>
                    <TableCell>{item.recebimentosProgramados[1]}</TableCell>
                    <TableCell>{item.recebimentosProgramados[2]}</TableCell>
                    <TableCell>{item.recebimentosProgramados[3]}</TableCell>
                    <TableCell>{item.recebimentosProgramados[4]}</TableCell>
                    <TableCell>{item.recebimentosProgramados[5]}</TableCell>
                    <TableCell>{item.recebimentosProgramados[6]}</TableCell>
                    <TableCell>{item.recebimentosProgramados[7]}</TableCell>
                </TableRow>
                <TableRow>  
                    <TableCell>Estoque projetado</TableCell>
                    <TableCell>{item.estoqueInicial}</TableCell>
                    <TableCell>{item.estoqueProjetado[0]}</TableCell>
                    <TableCell>{item.estoqueProjetado[1]}</TableCell>
                    <TableCell>{item.estoqueProjetado[2]}</TableCell>
                    <TableCell>{item.estoqueProjetado[3]}</TableCell>
                    <TableCell>{item.estoqueProjetado[4]}</TableCell>
                    <TableCell>{item.estoqueProjetado[5]}</TableCell>
                    <TableCell>{item.estoqueProjetado[6]}</TableCell>
                    <TableCell>{item.estoqueProjetado[7]}</TableCell>
                </TableRow>
                <TableRow>  
                    <TableCell colSpan={2}>Recebimento ordens planejadas</TableCell>
                    <TableCell>{item.recebimentoOrdensPlanejadas[0]}</TableCell>
                    <TableCell>{item.recebimentoOrdensPlanejadas[1]}</TableCell>
                    <TableCell>{item.recebimentoOrdensPlanejadas[2]}</TableCell>
                    <TableCell>{item.recebimentoOrdensPlanejadas[3]}</TableCell>
                    <TableCell>{item.recebimentoOrdensPlanejadas[4]}</TableCell>
                    <TableCell>{item.recebimentoOrdensPlanejadas[5]}</TableCell>
                    <TableCell>{item.recebimentoOrdensPlanejadas[6]}</TableCell>
                    <TableCell>{item.recebimentoOrdensPlanejadas[7]}</TableCell>
                </TableRow>
                <TableRow>  
                    <TableCell colSpan={2}>Liberação ordens planejadas</TableCell>
                    <TableCell>{item.liberacaoOrdensPlanejadas[0]}</TableCell>
                    <TableCell>{item.liberacaoOrdensPlanejadas[1]}</TableCell>
                    <TableCell>{item.liberacaoOrdensPlanejadas[2]}</TableCell>
                    <TableCell>{item.liberacaoOrdensPlanejadas[3]}</TableCell>
                    <TableCell>{item.liberacaoOrdensPlanejadas[4]}</TableCell>
                    <TableCell>{item.liberacaoOrdensPlanejadas[5]}</TableCell>
                    <TableCell>{item.liberacaoOrdensPlanejadas[6]}</TableCell>
                    <TableCell>{item.liberacaoOrdensPlanejadas[7]}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export default function App() {
    const [open, setOpen] = useState(false);

    const [lapiseiraMRP, setLapiseiraMRP] = useState({});

    const [lapiseiraP207, setLapiseiraP207] = useState({
        nome: "Lapiseira P207",
        leadTime: 1,
        lote: 500,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 600, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [300, 300, 300, 300, 300, 300, 300, 300],
        multiplicador: 1,
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    });
    const [presilhaDeBolso, setPresilhaDeBolso] = useState({
        nome: "Presilha de bolso",
        leadTime: 1,
        lote: 50,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 1,
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    });
    const [corpoDaPonteira, setCorpoDaPonteira] = useState({
        nome: "Corpo da ponteira",
        leadTime: 2,
        lote: 50,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 1,
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    });
    const [guiaDaPonteira, setGuiaDaPonteira] = useState({
        nome: "Guia da ponteira",
        leadTime: 1,
        lote: 50,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 1,
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    });
    const [tampa, setTampa] = useState({
        nome: "Tampa",
        leadTime: 1,
        lote: 500,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 1,
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    });
    const [corpoExterno207, setCorpoExterno207] = useState({
        nome: "Corpo Externo 207",
        leadTime: 1,
        lote: 500,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 1,
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    });
    const [miolo207, setMiolo207] = useState({
        nome: "Miolo 207",
        leadTime: 1,
        lote: 500,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 1,
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    });
    const [tira1mm_1, setTira1mm_1] = useState({
        nome: "Tira .1 mm",
        leadTime: 1,
        lote: 50,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 2,
        unidadeMedida: UnidadeMedidaEnum.GRAMAS,
    });
    const [plasticoAbs_1, setPlasticoAbs_1] = useState({
        nome: "Plástico ABS",
        leadTime: 1,
        lote: 50,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 10,
        unidadeMedida: UnidadeMedidaEnum.GRAMAS,
    });
    const [coranteAzul, setCoranteAzul] = useState({
        nome: "Corante azul",
        leadTime: 1,
        lote: 50,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 0.1,
        unidadeMedida: UnidadeMedidaEnum.GRAMAS,
    });
    const [grafite07mm, setGrafite07mm] = useState({
        nome: "Grafite 0.7 mm",
        leadTime: 2,
        lote: 50,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 4,
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    });
    const [borracha, setBorracha] = useState({
        nome: "Borracha",
        leadTime: 1,
        lote: 500,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 1,
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    });
    const [fioDeBorracha, setFioDeBorracha] = useState({
        nome: "Fio de Borracha",
        leadTime: 1,
        lote: 50,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 2,
        unidadeMedida: UnidadeMedidaEnum.CENTIMETROS,
    });
    const [capaDeBorracha, setCapaDeBorracha] = useState({
        nome: "Capa de borracha",
        leadTime: 1,
        lote: 500,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 1,
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    });
    const [tira1mm_2, setTira1mm_2] = useState({
        nome: "Tira .1 mm",
        leadTime: 1,
        lote: 50,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 2,
        unidadeMedida: UnidadeMedidaEnum.GRAMAS,
    });
    const [mioloInterno207, setMioloInterno207] = useState({
        nome: "Miolo interno 207",
        leadTime: 3,
        lote: 500,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 1,
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    });
    const [mola, setMola] = useState({
        nome: "Mola",
        leadTime: 1,
        lote: 50,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 1,
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    });
    const [suporteDaGarra, setSuporteDaGarra] = useState({
        nome: "Suporte da garra",
        leadTime: 2,
        lote: 50,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 1,
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    });
    const [capaDaGarra, setCapaDaGarra] = useState({
        nome: "Capa da garra",
        leadTime: 3,
        lote: 50,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 1,
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    });
    const [garras, setGarras] = useState({
        nome: "Garras",
        leadTime: 1,
        lote: 50,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 3,
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    });
    const [corpoDoMiolo, setCorpoDoMiolo] = useState({
        nome: "Corpo do miolo",
        leadTime: 2,
        lote: 500,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 1,
        unidadeMedida: UnidadeMedidaEnum.UNIDADE,
    });
    const [plasticoAbs_2, setPlasticoAbs_2] = useState({
        nome: "Plastico ABS",
        leadTime: 1,
        lote: 50,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 7,
        unidadeMedida: UnidadeMedidaEnum.GRAMAS,
    });
    const [corantePreto, setCorantePreto] = useState({
        nome: "Corante preto",
        leadTime: 2,
        lote: 50,
        estoqueSeguranca: 0,
        estoqueInicial: 500,
        recebimentosProgramados: [0, 0, 0, 0, 0, 0, 0, 0],
        necessidadesBrutas: [0, 0, 0, 0, 0, 0, 0, 0],
        multiplicador: 0.05,
        unidadeMedida: UnidadeMedidaEnum.GRAMAS,
    });
    function renderMprItemForm(state, setState) {
        return (
            <MrpItemForm 
                    value={state} 
                    onChange={(name, value) => setState({...state, [name]: value})}
            />
        );
    }
    function handleOnClick() {
        const lapiseira = {
            ...lapiseiraP207,
            itensFilhos: [
                presilhaDeBolso,
                corpoDaPonteira,
                guiaDaPonteira,
                {
                    ...tampa,
                    itensFilhos: [
                        tira1mm_1
                    ]
                },
                {
                    ...corpoExterno207,
                    itensFilhos: [
                        plasticoAbs_1,
                        coranteAzul
                    ]
                },
                {
                    ...miolo207,
                    itensFilhos: [
                        grafite07mm,
                        {
                            ...borracha,
                            itensFilhos: [
                                fioDeBorracha
                            ]
                        },
                        {
                            ...capaDeBorracha,
                            itensFilhos: [
                                tira1mm_2
                            ]
                        },
                        {
                            ...mioloInterno207,
                            itensFilhos: [
                                mola,
                                suporteDaGarra,
                                capaDaGarra,
                                garras,
                                {
                                    ...corpoDoMiolo,
                                    itensFilhos: [
                                        plasticoAbs_2,
                                        corantePreto
                                    ]
                                }
                            ]
                        }

                    ]
                }
            ]
        };
        setLapiseiraMRP(new ItemMrp(lapiseira));
        setOpen(true);
    }
    function itemMrpToArray(item) {
        const arr = [item];
        if (!item.itensFilhos) return arr;
        for(const i of item.itensFilhos) {
            arr.push(...itemMrpToArray(i))
        }
        return arr;
    }
    return (
        <Container className="container" maxWidth="md">
            <h1>Calculadora MRP - Lapiseira P207</h1>
            <form>
                {renderMprItemForm(lapiseiraP207, setLapiseiraP207)}
                {renderMprItemForm(corpoExterno207, setCorpoExterno207)}
                {renderMprItemForm(presilhaDeBolso, setPresilhaDeBolso)}
                {renderMprItemForm(miolo207, setMiolo207)}
                {renderMprItemForm(corpoDaPonteira, setCorpoDaPonteira)}
                {renderMprItemForm(guiaDaPonteira, setGuiaDaPonteira)}
                {renderMprItemForm(tampa, setTampa)}
                {renderMprItemForm(plasticoAbs_1, setPlasticoAbs_1)}
                {renderMprItemForm(coranteAzul, setCoranteAzul)}
                {renderMprItemForm(tira1mm_1, setTira1mm_1)}
                {renderMprItemForm(borracha, setBorracha)}
                {renderMprItemForm(capaDeBorracha, setCapaDeBorracha)}
                {renderMprItemForm(mioloInterno207, setMioloInterno207)}
                {renderMprItemForm(grafite07mm, setGrafite07mm)}
                {renderMprItemForm(fioDeBorracha, setFioDeBorracha)}
                {renderMprItemForm(tira1mm_2, setTira1mm_2)}
                {renderMprItemForm(mola, setMola)}
                {renderMprItemForm(corpoDoMiolo, setCorpoDoMiolo)}
                {renderMprItemForm(suporteDaGarra, setSuporteDaGarra)}
                {renderMprItemForm(capaDaGarra, setCapaDaGarra)}
                {renderMprItemForm(garras, setGarras)}
                {renderMprItemForm(plasticoAbs_2, setPlasticoAbs_2)}
                {renderMprItemForm(corantePreto, setCorantePreto)}
                <Button onClick={handleOnClick} variant="contained">Calcular</Button>
            </form>    
            <Dialog
                fullWidth
                maxWidth="xl"
                open={open}
                onClose={() => setOpen(false)}

            >
                <DialogContent className="dialog" >
                    {
                        itemMrpToArray(lapiseiraMRP).map((item, k) => (
                            <ShowItemMrp key={k} item={item}/>
                        ))
                    }
                    {/* <ShowItemMrp item={lapiseiraMRP}/>
                    <ShowItemMrp item={lapiseiraMRP.itensFilhos[0]}/> */}
                </DialogContent>
            </Dialog>        
        </Container>
    );
}