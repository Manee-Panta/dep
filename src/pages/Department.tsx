import React, { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  Box,
  Typography,
  Breadcrumbs,
  TextField,
  Stack,
  Paper,
  IconButton,
  InputBase,
  Button,
  Modal,
  Alert,
} from "@mui/material";

import { Search, Edit, Delete, ArrowDropDown, Rowing } from "@mui/icons-material";
import { customStyle } from "../style/Custom";
import baseurl from "../BaseUrl";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";

type DepartmentProps = {
  id?: number;
  name?: string;
  user?: string[];
  value?: string;
};

function getUserNo(params: any) {
  return `${params.row.user.length}`;
}
const Department = (props: DepartmentProps) => {
  const [department, setDepartment] = useState({
    name: "",
    user: [],
  });

  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [editid, setEditId] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);
  const getDepartment = (e: any) => {
    setDepartment(() => {
      return {
        ...department,
        name: e.target.value,
      };
    });
  };

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
  const addDepartment = () => {
    department.name
      ? fetch(`${baseurl}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(department),
        }).then((resp) => {
          resp.json().then((result) => {
            // console.log(result)
            displayDepartment();
            setDepartment({
              ...department,
              name: "",
            });
          });
        })
      : alert("Please enter name");
  };
  const deleteDepartment = (id: any) => {

    if (data.find((item: any) => item.id === id && item.user.length === 0)) {
      fetch(`${baseurl}/` + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        resp.json().then((result) => {
          // console.log(result);
          displayDepartment();
          setDeleteError(false);
        });
      });
    } else {
      setDeleteError(true);
    }
  };
  const update = (editid: number) => {
    department.name
      ? fetch(`${baseurl}/` + editid, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(department),
        }).then((resp) => {
          resp.json().then((result) => {
            // console.log(result)
            displayDepartment();
            setDepartment({
              ...department,
              name: "",
            });
          });
        })
      : alert("This field cannot be empty");
  };
  const editDepartment = (id: number) => {
    setEditOpen(true);
    setEditId(id);
  };
  function searchData(key: string) {
    fetch(`${baseurl}/?q=` + key).then((resp) => {
      resp.json().then((result) => {
        // console.log("result" + result);
        if (result.length > 0) {
          setData(result);
          setNoData(false);
        } else {
          setNoData(true);
        }
      });
    });
  }

  return (
    <div>
      <Navbar />
      {noData?  <Alert severity="error">Data not Found</Alert>:''}
      {deleteError ? (
        <Alert severity="warning" onClose={() => {setDeleteError(false)}}>Sorry !!! You can't delete this</Alert>
      ) : (
        ""
      )}
      <div>
        <Box sx={{ border: "1px solid #BABABA" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography
              color="text.primary"
              sx={{
                height: "40px",
                fontFamily: "Poppins",
                fontWeight: 400,
                display: "flex",
                alignItems: "center",
                ml: 5,
                color: "#000000",
                boxSizing: "border-box",
              }}
            >
              Department
            </Typography>
          </Breadcrumbs>
        </Box>

        <Box sx={{ py: 3, display: { md: "flex" } }}>
          <Paper
            component="form"
            sx={{
              display: { xs: "block", md: "flex" },
              flexGrow: 1,
              p: "0 2px",
              // border:'2px solid green',
              alignItems: "center",
              width: " 300px",
              ml: 3,
              border: "1px solid #BABABA",
              height: "35px",
            }}
          >
            <InputBase
              sx={{ p: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => searchData(e.target.value)}
            />
            <IconButton
              type="button"
              sx={{ p: "10px", color: "#18A0FB;" }}
              aria-label="search"
            >
              <Search />
            </IconButton>
          </Paper>
          <Box sx={{ flexGrow: 1 }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
                mr: 5,
              }}
            >
              <Button
                variant="outlined"
                endIcon={<ArrowDropDown />}
                sx={customStyle.button}
              >
                More Action
              </Button>

              <Button
                variant="outlined"
                sx={customStyle.button}
                onClick={handleOpen}
              >
                Create Department
              </Button>
              <Modal open={open} onClose={handleClose}>
                <Box sx={customStyle.modal}>
                  <Typography variant="subtitle1" component="h2">
                    Enter Department Name
                  </Typography>
                  <TextField
                    onChange={getDepartment}
                    name={props.name}
                    size="small"
                    margin="normal"
                    required
                  />

                  <Stack
                    direction="row"
                    sx={{ gap: "5px", justifyContent: "center" }}
                  >
                    <Button
                      variant="contained"
                      sx={{ mt: 2, fontSize: 12 }}
                      onClick={addDepartment}
                      size="small"
                    >
                      Add
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ mt: 2, fontSize: 12 }}
                      onClick={handleClose}
                      size="small"
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              </Modal>

              <Modal open={editopen} onClose={handleEditClose}>
                <Box sx={customStyle.modal}>
                  <Typography
                    display={"flex"}
                    variant="body2"
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    User :
                    {data.map((item: any) =>
                      item.id === editid ? item.user + " " : ""
                    )}
                  </Typography>

                  <Typography component="h2" variant="subtitle1">
                    Edit Department Name
                  </Typography>

                  <TextField
                    style={{ fontSize: 6 }}
                    onChange={getDepartment}
                    name={props.name}
                    size="small"
                    margin="normal"
                    required
                    defaultValue={data.map((person: any) =>
                      person.id === editid ? person.name : ""
                    )}
                  />
                  <Stack
                    direction="row"
                    sx={{ gap: "5px", justifyContent: "center" }}
                  >
                    <Button
                      variant="contained"
                      sx={{ mt: 2, fontSize: 12 }}
                      onClick={() => update(editid)}
                      size="small"
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ mt: 2, fontSize: 12 }}
                      onClick={handleEditClose}
                      size="small"
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </Stack>
          </Box>
        </Box>

        {/* Table Start */}
        <div
          style={{
            padding: "0 15px",
            alignItems: "center",
            height: "500px",
          }}
        >
          <DataGrid
            rows={data}
            getRowId={(row: any) => row.id}
            columns={[
              { field: "id", headerName: "ID", width: 90,},
              {
                field: "name",
                headerName: "Name",
                minWidth: 200,
                flex: 1,
                editable: false,
                sortable: true,
              },
              {
                field: "user",
                headerName: "No of User",
                width: 90,
                valueGetter: getUserNo,
              },
              {
                field: "action",
                headerName: "Action",
                width: 120,

                renderCell: ({ row }: Partial<GridRowParams>) => (
                  <>
                    <IconButton
                      sx={customStyle.iconButton}
                      onClick={() => editDepartment(row["id"])}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      sx={customStyle.iconButton}
                      onClick={() => deleteDepartment(row["id"])}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </>
                ),
              },
            ]}
            pageSize={7}
            rowsPerPageOptions={[7]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            // initialState={{
            //   sorting: {
            //     sortModel: [{ field: "name", sort: "asc" }],
            //   },
            // }}
          />
        </div>
        {/* Table End  */}
      </div>
      <Footer />
    </div>
  );
};

export default Department;
