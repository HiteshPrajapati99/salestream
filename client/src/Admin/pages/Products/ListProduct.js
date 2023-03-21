import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CmpTitle, Toast } from "../../components";
import SearchIcon from "@mui/icons-material/Search";
import {
  getProduct,
  deleteProductById,
  deleteMultipleProducts,
} from "../../Api";
// import {debounce} from "lodash"


export default function ViewProduct() {
  //  Toast
  const tostRef = useRef(null);
  const [tostData, settostData] = useState({
    success: false,
    message: "",
  });
  const navigate = useNavigate();

  const [isLoading, setisLoading] = useState(true);
  const [Products, setProducts] = useState([]);
  // console.log(Products);

  const getproducts = async () => {
    const data = await getProduct();
    if (data.success) {
      setProducts(data.products);
      setisLoading(false);
    } else {
      setisLoading(false);
      setProducts([]);
    }
  };

  useEffect(() => {
    getproducts();
  }, []);

  // Handle search Start

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleSearch = (e) => {
    const Query = e.target.value.toLowerCase();
    // console.log(Query);
    const newProducts = Products.filter((item) => {
      return (
        item.name.toLowerCase().includes(Query) ||
        item.status.toLowerCase().includes(Query) ||
        item.price === parseInt(Query)
      );
    });

    if (Query) {
      setProducts(newProducts);
    } else {
      getproducts();
    }
  };
  const optimizedFn = useCallback(debounce(handleSearch), []);

  const [SearchFilter, setSearchFilter] = useState([]);
  const handleFilter = (e) => {
    const value = e.target.value;
    setSearchFilter(value);
  };
  useEffect(() => {
    var filterProducts = Products.filter((item) =>
      SearchFilter.includes(item.status)
    );
    if (SearchFilter.length > 0) {
      setProducts(filterProducts);
    } else {
      getproducts();
    }
  }, [SearchFilter]);

  // Handle Seacrch End

  // selected Products Data
  const [SelectedData, setSelectedData] = useState([]);

  const handleMultiDelete = async () => {
    const data = await deleteMultipleProducts(SelectedData);
    settostData({ success: data.success, message: data.message });
    if (data.success) {
      tostRef.current.show();
      getproducts();
    } else {
      tostRef.current.show();
    }
  };

  const handledelete = async (_id) => {
    const data = await deleteProductById(_id);
    settostData({ success: data.success, message: data.message });
    if (data.success) {
      tostRef.current.show();
      getproducts();
    } else {
      tostRef.current.show();
    }
  };

  const columns = [
    {
      field: "Name",
      headerName: "Product",
      headerAlign: "center",
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" alignItems="center" gap={3}>
          <Avatar variant="square" src={params?.row?.product_img_path[0]} />
          <Link
            className="edit-link"
            to={`/admin/product/edit/${params.row._id}`}
          >
            <Typography> {params.row.name} </Typography>
          </Link>
        </Box>
      ),
      width: 250,
      sortable: false ,
      disableColumnMenu: true,
    },

    // {
    //   field: "brand",
    //   headerName: "Brand",
    //   width: 100,

    //   renderCell: (params) => params?.row?.brand[0]?.title,
    // },
    {
      field: "categoty",
      headerName: "Category",
      width: 130,
      sortable: false ,
      disableColumnMenu: true,
      renderCell: (params) =>
        params?.row?.category[0]?.name ? params?.row?.category[0]?.name : "-",
    },
    {
      field: "Status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        return (
          <Box>
            {params.row.status === "public" && (
              <Chip
                size="small"
                label={params.row.status}
                sx={{
                  color: "rgb(27, 128, 106)",
                  bgcolor: "rgba(54, 179, 126, 0.16)",
                  fontWeight: 700,
                  textTransform: "capitalize",
                  p: 1.6,
                }}
              />
            )}
            {params.row.status === "draft" && (
              <Chip
                size="small"
                label={params.row.status}
                sx={{
                  color: "blue",
                  bgcolor: "#e3edfb",
                  fontWeight: 700,
                  textTransform: "capitalize",
                  p: 1.6,
                }}
              />
            )}
            {params.row.status === "pending" && (
              <Chip
                size="small"
                label={params.row.status}
                sx={{
                  color: "rgb(183, 29, 24)",
                  bgcolor: "rgba(255, 86, 48, 0.16)",
                  fontWeight: 700,
                  textTransform: "capitalize",
                  p: 1.6,
                }}
              />
            )}
          </Box>
        );
      },
      // editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "Number",
      width: 100,
    },
    {
      field: "quantity",
      headerName: "Stock",
      width: 100,
    },

    {
      field: "isfeatured",
      headerName: "Is Featured",
      type: "boolean",
      width: 100,
      // editable: true,
    },
    // {
    //   field: "sku",
    //   headerName: "SKU",
    //   type: "string",
    //   width: 100,
    //   align: "center",
    // },
    // {
    //   field: "createdAt",
    //   headerName: "Create Date",
    //   width: 100,
    //   renderCell: (params) => moment(params.row.createdAt).format("DD-MM-YYYY"),
    // },
    // {
    //   field: "updatedAt",
    //   headerName: "Update Date",
    //   width: 100,
    //   renderCell: (params) => moment(params.row.updatedAt).format("DD-MM-YYYY"),
    // },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 120,
      renderCell: (params) => {
        return (
          <Box width="100%" ml={2}>
            <IconButton
              size="small"
              // color="success"
              onClick={() => navigate(`/admin/product/edit/${params.row._id}`)}
            >
              <MdEdit />
            </IconButton>

            <IconButton
              size="small"
              // color="error"
              onClick={() => handledelete(params.row._id)}
              sx={{ fontWeight: "bold", ml: 1 }}
            >
              <RiDeleteBin5Line />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Div>
      <Box className="top-title">
        <CmpTitle
          navigate={true}
          navlink="/admin/product/create"
          text=" All Products List"
          breadcrumbs={{ last: "Product" }}
          buttonname="Add New"
        />
        <Toast
          message={tostData.message}
          success={tostData.success}
          tostRef={tostRef}
        />
      </Box>

      <Box display="flex" justifyContent="center">
        <Box
          sx={{
            height: 500,
            width: "100%",
            p: { xs: 0, md: 4 },
            pt: { xs: 4 },
          }}
        >
          <Box className="table-upper-box" gap={3}>
            {/* <FormControl sx={{ width: "20rem" }}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                sx={{ borderRadius: "20px" }}
                value={SearchFilter}
                onChange={handleFilter}
                multiple
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="draft"> Draft </MenuItem>
              </Select>
            </FormControl> */}
            <TextField
              type="search"
              placeholder="Search"
              fullWidth
              onChange={optimizedFn}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                borderRadius: "20px",
              }}
            />
            {SelectedData.length > 0 && (
              <IconButton onClick={handleMultiDelete}>
                <RiDeleteBin5Line />
              </IconButton>
            )}
          </Box>
          <DataGrid
            getRowId={(row) => row._id}
            rows={Products}
            columns={columns}
            loading={isLoading}
            pageSize={10}
            rowsPerPageOptions={[10]}
            hideFooter={Products.length > 10 ? false : true}
            density="comfortable"
            components={{
              NoRowsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                >
                  No Products Available
                </Stack>
              ),
            }}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            onSelectionModelChange={(pramas) => {
              setSelectedData(pramas);
            }}
            getRowSpacing={(pramas) => ({
              top: pramas.isFirstVisible ? 0 : 5,
              bottom: pramas.isLastVisible ? 0 : 4,
            })}
            sx={{
              border: "0px",
              borderRadius: "0px 0px 20px  20px",
              bgcolor: "#fff",
              boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            }}
          />
          <Toast
            message={tostData.message}
            success={tostData.success}
            tostRef={tostRef}
          />
        </Box>
      </Box>
    </Div>
  );
}

const Div = styled.div`
  margin-bottom: 8rem;
  .bred-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: rgb(145, 158, 171);
  }
  .edit-link {
    color: #000;
    text-decoration: none;
    & :hover {
      text-decoration: underline;
    }
  }
  .bredcrumb-links {
    cursor: pointer;
    text-decoration: none;
    color: black;
    line-height: 1.57143;
    font-size: 12px;
    font-family: "Public Sans", sans-serif;
    font-weight: 400;
    &:hover {
      text-decoration: underline;
    }
  }
  /*  table csss start */
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: rgba(0, 0, 0, 0.5);
  }
  .table-upper-box {
    border-radius: 20px 20px 0px 0px;
    background-color: rgb(244, 246, 248);
    padding: 24px;
    display: flex;
    box-shadow: rgb(145 158 171 / 16%) 0px 4px 8px 0px;
  }
  .css-f3jnds-MuiDataGrid-columnHeaders {
    background-color: rgb(244, 246, 248);
  }
  .css-1yydnm7-MuiDataGrid-root .MuiDataGrid-cell {
    border-bottom: 0;
  }
  .MuiDataGrid-root .MuiDataGrid-row:hover,
  .MuiDataGrid-root .MuiDataGrid-row.Mui-hovered {
    background-color: rgb(244, 246, 248) !important;
  }

  .MuiDataGrid-root .MuiDataGrid-cell {
    border-bottom: none;
  }
  .css-8j6b76-MuiInputBase-root-MuiOutlinedInput-root {
    border-radius: 20px;
  }
`;
