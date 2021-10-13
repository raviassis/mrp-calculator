import { 
    TextField
} from '@material-ui/core';
import TableCellRight from './TableCellRight';

export default function CellInput(props) {
    const inputStyle = {
        display: 'block',
        width: '100%',
        heigth: '100%'
    }
    const cellStyle = {
        padding: '5px'
    };
    return (
        <TableCellRight style={cellStyle}>
            <TextField size="small" style={inputStyle} {...props}/>
        </TableCellRight>
    );
}