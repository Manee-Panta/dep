import React, { useState, useEffect } from "react";
import { Footer } from "./Footer";
import Navbar from "./Navbar";
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
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Checkbox,
  Modal,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { customStyle } from "../style/Custom";
import baseurl from "../BaseUrl";

type DepartmentProps = {
  id?: number;
  name?: string;
  user?: string[];
  value?: string;
};
const Department = (props: DepartmentProps) => {
  const [department, setDepartment] = useState({
    name: "",
    user: [],
  });

  const [data, setData] = useState([]);
  // const[editDep, setEditDep]=useState('')
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
  const deleteDepartment = (id: number) => {
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
      });
    });
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

  return (
    <div>
      <Navbar />
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

        <Box sx={{ py: 3, display: "flex" }}>
          <Paper
            component="form"
            sx={{
              flexGrow: 1,
              p: "0 2px",
              display: "flex",
              alignItems: "center",
              width: " 30px",
              ml: 3,
              border: "1px solid #BABABA",
              height: "35px",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px", color: "#18A0FB;" }}
              aria-label="search"
            >
              <SearchIcon />
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
                endIcon={<ArrowDropDownIcon />}
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
                      item.id === editid ? item.user + " " : ''
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
          }}
        >
          <TableContainer component={Paper}>
            <Table
              arial-label="simple table"
              sx={{ border: "1px solid #BABABA" }}
            >
              <TableHead
                style={{
                  fontSize: "4px",
                  fontWeight: "bold",
                }}
              >
                <TableCell>
                  <Checkbox size="small" />
                </TableCell>
                <TableCell>SN</TableCell>
                <TableCell>Name</TableCell>
                <TableCell sx={{ textAlign: "right" }}>No of Users</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
              </TableHead>
              <TableBody>
                {data.map((row: any, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox size="small" />
                    </TableCell>
                    <TableCell>{row["id"]}</TableCell>
                    <TableCell>{row["name"]}</TableCell>
                    <TableCell sx={{ textAlign: "right" }}>
                      {row.user?.length}
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" sx={{ justifyContent: "center" }}>
                        <IconButton
                          sx={customStyle.iconButton}
                          onClick={() => editDepartment(row["id"])}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          sx={customStyle.iconButton}
                          onClick={() => deleteDepartment(row["id"])}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* Table End  */}
      </div>
      <Footer />
    </div>
  );
};

export default Department;
