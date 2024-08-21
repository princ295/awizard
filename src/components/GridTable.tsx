import { DataGrid } from "@mui/x-data-grid";
import React, { ReactElement } from "react";

// { field: 'Row', headerName: 'Row', width: 90, type: 'number' },
import { Select, MenuItem, Box, TableContainer, Table, Paper, TableCell, TableRow, TableHead, TableBody, Typography } from '@mui/material';

export default function GridTable({ column, row }: { column: any[], row: any[] }): ReactElement {

  return (
    <TableContainer
      sx={{ border: '1px solid #ede7e7', borderRadius: "3px" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              React.Children.toArray(
                column.map(({ type, name }) => <TableCell>
                  <Typography fontWeight={600}>
                    {name}
                  </Typography>
                  <Box>{type}</Box>
                </TableCell>)
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            React.Children.toArray(
              row.map((item: any[]) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {
                    React.Children.toArray(
                      item.map(el =>

                        <TableCell component="th" scope="row">
                          {el}
                        </TableCell>
                      )
                    )
                  }
                </TableRow>
              ))
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}