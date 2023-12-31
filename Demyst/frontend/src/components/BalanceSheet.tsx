import { TableContainer, TableHead, TableRow, TableCell, TableBody, Table, TableFooter } from "@mui/material"
import { BalancePerMonthType, BalanceSheetType } from "../types/Balance"

const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

export const sort = (row1: BalancePerMonthType, row2: BalancePerMonthType) => {
    if (row1.year === row2.year) {
        return row1.month - row2.month
    }
    return row1.year - row2.year
}

export const BalanceSheetRow = ({ row }: { row: BalancePerMonthType }) => <TableRow

>
    <TableCell align="left">{row.year}</TableCell>
    <TableCell align="left">{month[row.month - 1]}</TableCell>
    <TableCell align="right">{row.profitOrLoss}</TableCell>
    <TableCell align="right">{row.assetsValue}</TableCell>
</TableRow>

const BalanceSheet = ({ sheet }: { sheet: BalanceSheetType | undefined }) =>
    <TableContainer >
        <Table >
            <TableHead>
                <TableRow>
                    <TableCell align="left">Year</TableCell>
                    <TableCell align="left">Month</TableCell>
                    <TableCell align="right">Profit</TableCell>
                    <TableCell align="right">Assets Value</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    sheet?.sort(sort).map(row => <BalanceSheetRow row={row} key={row.month} />)
                }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell align="right">{sheet?.reduce((sum, row) => sum + row.profitOrLoss, 0)}</TableCell>
                    <TableCell align="right">{sheet?.reduce((sum, row) => sum + row.assetsValue, 0)}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </TableContainer>

export default BalanceSheet;