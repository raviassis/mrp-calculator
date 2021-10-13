import {
    TableCell
} from '@material-ui/core';

export default function TableCellRight(props) {
    return (
        <TableCell align="right" {...props}>
            {props.children}                
        </TableCell>
    );
}