import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import {Fire} from "../../types";
import { useAppSelector } from "../../redux/hooks";

export default function ReactVirtualizedTable() {

  const info = useAppSelector(state => state.fires.firesFiltered);

  interface ColumnData {
    dataKey: keyof Fire;
    label: string;
    width: number;
  }

  const columns: ColumnData[] = [
    {
      width: 100,
      label: "Fecha",
      dataKey: "date",
    },
    {
      width: 150,
      label: "Longitud",
      dataKey: "x",
    },
    {
      width: 150,
      label: "Latitud",
      dataKey: "y",
    },
    {
      width: 100,
      label: "Satelite",
      dataKey: "sat",
    },
  ];

  const VirtuosoTableComponents: TableComponents<Fire> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={"center"}
            style={{ width: column.width }}
            sx={{
              backgroundColor: "#EBEBEB",

            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index: number, row: Fire) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={"left"}
            sx={{
                backgroundColor: "white",
              }}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  return (
    <Paper style={{ height: 420, width: "100%" }}>
      <TableVirtuoso
        data={info}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
