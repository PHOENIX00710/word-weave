import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'

function AllPosts() {


  // To style Table Data
  const tableHead =
  {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "whitesmoke",
  }

  const tableBody = {
    fontWeight: "600",
    bgcolor: "#bac5cc",
    color: "#36454F",
    fontSize: "1.07rem"
  }

  // Sample Data for table
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <div id='table-wrapper' className='p-4'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, width: "100%" }} aria-label="simple table">
          <TableHead sx={{ width: "100%", textWrap: "nowrap" }}>
            <TableRow sx={{ bgcolor: "#2b343b" }}>
              <TableCell sx={tableHead}>DATA UPDATED</TableCell>
              <TableCell sx={tableHead} >POST IMAGE</TableCell>
              <TableCell sx={tableHead}>POST TITLE</TableCell>
              <TableCell sx={tableHead} >CATEGORY</TableCell>
              <TableCell sx={tableHead} >EDIT </TableCell>
              <TableCell sx={tableHead} >DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, textWrap: "nowrap" }}
              >
                <TableCell sx={tableBody} >
                  {row.name}
                </TableCell>
                <TableCell sx={tableBody}>{row.calories}</TableCell>
                <TableCell sx={tableBody}>{row.fat}</TableCell>
                <TableCell sx={tableBody}>{row.carbs}</TableCell>
                <TableCell sx={tableBody}>{row.protein}</TableCell>
                <TableCell sx={tableBody}>{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div >
  )
}

export default AllPosts