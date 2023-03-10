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
  Snackbar,
  Menu,
  MenuItem,
} from "@mui/material";

import { Search, Edit, Delete, ArrowDropDown } from "@mui/icons-material";
import { customStyle } from "../style/Custom";
import baseurl from "../BaseUrl";
import { DataGrid, GridRowParams, GridSelectionModel } from "@mui/x-data-grid";


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
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [editid, setEditId] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);
  const [menu, setMenu] = React.useState<null | HTMLElement>(null);
  const menuopen = Boolean(menu);
  const handleBulkAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(event.currentTarget);
  }
 
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
            setOpen(false);
            setDepartment({
              ...department,
              name: "",
            });
          });
        })
      : alert("Please enter name");
  };
  const deleteDepartment = (id: number) => {
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
          setDeleteSuccess(true);
          setDeleteError(false);
        });
      });
    } else {
      setDeleteSuccess(false);
      setDeleteError(true);
    }
  };
  const handleBulkDelete = () => {
    //   console.log(selectionModel)
    for (let i in selectionModel) {
      if (
        data.find(
          (item: any) => item.id === selectionModel[i] && item.user.length === 0
        )
      ) {
        fetch(`${baseurl}/${selectionModel[i]}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then((resp) => {
          resp.json().then((result) => {
            // console.log(result);
            displayDepartment();
            if (result) {
              setDeleteSuccess(true);
              setDeleteError(false);
            }
          });
        });
      } else {
        setDeleteSuccess(false);
        setDeleteError(true);
      }
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
            setEditOpen(false);
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
      {noData ? <Alert severity="error">Data not Found</Alert> : ""}
      {deleteError ? (
        <Alert
          severity="warning"
          onClose={() => {
            setDeleteError(false);
          }}
        >
          Sorry !!! You can't delete department with user.
        </Alert>
      ) : (
        ""
      )}

      <Snackbar
        open={deleteSuccess}
        autoHideDuration={2000}
        onClose={() => {
          setDeleteSuccess(false);
        }}
      >
        <Alert
          onClose={() => {
            setDeleteSuccess(false);
          }}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Deleted Successfully
        </Alert>
      </Snackbar>
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
                onClick={handleBulkAction}
              >
                More Action
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={menu}
                open={menuopen}
                onClose={() => setMenu(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleBulkDelete}>Delete</MenuItem>
              </Menu>
              <Button
                variant="outlined"
                sx={customStyle.button}
                onClick={handleOpen}
              >
                Create Department
              </Button>
              <Modal open={open} onClose={handleClose}>
                <Box sx={customStyle.modal}>
                  <Typography variant="inherit" style={{fontWeight:'bold'}} >
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
                   
                  </Typography>
                {data.map((item: any) =>
                      item.id === editid ? <Typography  variant="caption"
                      style={{overflow:'auto', padding:'5px' }}>{item.user +''}</Typography> : ""
                    )}
                  <Typography style={{ marginTop:'5px',fontWeight:'bold',}} variant="inherit">
                    Edit Department Name
                  </Typography>

                  <TextField
                    style={{ fontSize: 6 }}
                    onChange={getDepartment}
                    name={props.name}
                    size="small"
                    margin="normal"
                    required
                    // defaultValue={data.map((person: any) =>
                    //   person.id === editid ? person.name : ""
                    // )}
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
            height: "450px",
          }}
        >
          <DataGrid
            rows={data}
            getRowId={(row: any) => row.id}
            columns={[
              { field: "id", headerName: "ID", width: 90 },
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
            onSelectionModelChange={(newSelectionModel) => {
              console.log(newSelectionModel);
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
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
