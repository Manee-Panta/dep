import React ,{useState,useEffect} from 'react';
import {Box,Button} from '@mui/material';
import { DataGrid, GridColDef,GridRowParams} from '@mui/x-data-grid';
import baseurl from "../BaseUrl";
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
     minWidth: 200,
   flex:1,
    editable: true,
    sortable:true
  },
  {
    field: 'count',
    headerName: 'No of User',
    // type: 'number',
    width: 90,
   
    valueGetter: getUserNo,
  },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: ({ row }: Partial<GridRowParams>) =>
      (
        <>
        <Button onClick={() => console.log('first')}>
        Action
      </Button>
      <Button onClick={() => console.log('second')}>
        Action
      </Button>
        </>
      )
  },
  
];
function getUserNo(params:any) {
  return `${params.row.user.length}`;
}
type DepartmentProps = {
  id?: number;
  name?: string;
  user?: string[];
  value?: string;
};

  


export default function Test() {
  const [data, setData] = useState([]);
  const [department, setDepartment] = useState({
    name: "",
    user: [],
  });

  useEffect(() => {
    displayDepartment();
  }, []);
  const displayDepartment = () => {
    fetch(`${baseurl}`).then((res) => {
      res.json().then((result) => {
        console.log(result);
        setData(result);
      });
    });
  };
  return (
    <Box sx={{ height: 500, width: '100%' }}>


    <DataGrid
        rows={ data}
        getRowId={(row: any) =>  row.id}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
        
      
 
      
    </Box>
  );
}