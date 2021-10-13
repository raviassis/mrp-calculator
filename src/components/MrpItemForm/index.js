import {
    Card,
    CardContent,
    CardHeader,
    TextField,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';
import CellInput from '../CellInput';
import TableCellRight from '../TableCellRight';
import './style.css';

export default function MrpItemForm(props) {
    const {
        nome,
        leadTime,
        lote,
        estoqueSeguranca,
        estoqueInicial,
        recebimentosProgramados,
        necessidadesBrutas,
    } = props.value || { recebimentosProgramados: [], necessidadesBrutas: []};
    const arrays = {
        recebimentosProgramados,
        necessidadesBrutas,
    };
    function handleOnChange(event){
        const onChange = props.onChange;
        if ( onChange ) {
            const name = event.target.name;
            const value = parseFloat(event.target.value);            
            onChange(name, value);
        }
    }
    function handleOnChangeArray(event) {
        const onChange = props.onChange;
        if ( onChange ) {
            let arr = event.target.name.split('_');
            const name = arr[0];
            const i = arr[1];
            const value = arrays[name];
            value[i] = parseFloat(event.target.value);
            onChange(name, value);
        }
    }
    return (
        <Card>
            <CardHeader title={nome}/>
            <CardContent>
                <div className="formContainer">
                    <TextField
                        fullWidth
                        size="small"
                        label="Lote Mínimo"
                        type="number"
                        value={lote}
                        name="lote"
                        onChange={handleOnChange}
                    />
                    <TextField
                        fullWidth
                        size="small"
                        label="Lead Time"
                        type="number"
                        value={leadTime}
                        name="leadTime"
                        onChange={handleOnChange}
                    />
                    <TextField
                        fullWidth
                        size="small"
                        label="Estoque de Segurança"
                        type="number"
                        value={estoqueSeguranca}
                        name="estoqueSeguranca"
                        onChange={handleOnChange}
                    />
                    <TextField
                        fullWidth
                        size="small"
                        label="Estoque inicial"
                        type="number"
                        value={estoqueInicial}
                        name="estoqueInicial"
                        onChange={handleOnChange}
                    />
                </div>
                
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCellRight>1</TableCellRight>
                            <TableCellRight>2</TableCellRight>
                            <TableCellRight>3</TableCellRight>
                            <TableCellRight>4</TableCellRight>
                            <TableCellRight>5</TableCellRight>
                            <TableCellRight>6</TableCellRight>
                            <TableCellRight>7</TableCellRight>
                            <TableCellRight>8</TableCellRight>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Necessidades Brutas</TableCell>
                            <CellInput 
                                type="number" 
                                value={necessidadesBrutas[0]}
                                name="necessidadesBrutas_0"
                                onChange={handleOnChangeArray}
                            />
                            <CellInput 
                                type="number" 
                                value={necessidadesBrutas[1]}
                                name="necessidadesBrutas_1"
                                onChange={handleOnChangeArray}
                            />
                            <CellInput 
                                type="number" 
                                value={necessidadesBrutas[2]}
                                name="necessidadesBrutas_2"
                                onChange={handleOnChangeArray}
                            />
                            <CellInput 
                                type="number" 
                                value={necessidadesBrutas[3]}
                                name="necessidadesBrutas_3"
                                onChange={handleOnChangeArray}
                            />
                            <CellInput 
                                type="number" 
                                value={necessidadesBrutas[4]}
                                name="necessidadesBrutas_4"
                                onChange={handleOnChangeArray}
                            />
                            <CellInput 
                                type="number" 
                                value={necessidadesBrutas[5]}
                                name="necessidadesBrutas_5"
                                onChange={handleOnChangeArray}
                            />
                            <CellInput 
                                type="number" 
                                value={necessidadesBrutas[6]}
                                name="necessidadesBrutas_6"
                                onChange={handleOnChangeArray}
                            />
                            <CellInput 
                                type="number" 
                                value={necessidadesBrutas[7]}
                                name="necessidadesBrutas_7"
                                onChange={handleOnChangeArray}
                            />
                        </TableRow>
                        <TableRow>
                            <TableCell>Recebimentos Programados</TableCell>
                            <CellInput 
                                type="number" 
                                value={recebimentosProgramados[0]}
                                name="recebimentosProgramados_0"
                                onChange={handleOnChangeArray}
                            />
                            <CellInput 
                                type="number" 
                                value={recebimentosProgramados[1]}
                                name="recebimentosProgramados_1"
                                onChange={handleOnChangeArray} 
                            />
                            <CellInput 
                                type="number" 
                                value={recebimentosProgramados[2]}
                                name="recebimentosProgramados_2"
                                onChange={handleOnChangeArray} 
                            />
                            <CellInput 
                                type="number" 
                                value={recebimentosProgramados[3]}
                                name="recebimentosProgramados_3"
                                onChange={handleOnChangeArray} 
                            />
                            <CellInput 
                                type="number" 
                                value={recebimentosProgramados[4]}
                                name="recebimentosProgramados_4"
                                onChange={handleOnChangeArray} 
                            />
                            <CellInput 
                                type="number" 
                                value={recebimentosProgramados[5]}
                                name="recebimentosProgramados_5"
                                onChange={handleOnChangeArray} 
                            />
                            <CellInput 
                                type="number" 
                                value={recebimentosProgramados[6]}
                                name="recebimentosProgramados_6"
                                onChange={handleOnChangeArray} 
                            />
                            <CellInput 
                                type="number" 
                                value={recebimentosProgramados[7]}
                                name="recebimentosProgramados_7"
                                onChange={handleOnChangeArray} 
                            />
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}