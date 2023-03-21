import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Stack,
  Drawer,
  Popover,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import Config from "../slidebar/Config";
import { Link, useNavigate } from "react-router-dom";

//  Redux Store
import {  useSelector } from "react-redux";
import Loder from "../../../components/Loders/Loder";
export default function Header() {


  const navigate = useNavigate();
  const [open, setopen] = useState(false);

  const handleclose = () => setopen(false);

  const [info, setinfo] = useState(false);
  const handlecloseinfo = () => setinfo(false);

  const [mobileview, setmobileview] = useState(false);
  const [UserData, setUserData] = useState([]);

  const { profile, isLoading } = useSelector((store) => store.user);
  // console.log(profile);

  useEffect(() => {
   setTimeout(() => {
    
     if (profile.success === false && profile.message === "Token invalid") {
       localStorage.removeItem("x-access-token");
       navigate("/");
     }

     if (profile.length !== 0) {
       if (profile.length !== 0 && profile?.userdata?.role === "admin") {
         setUserData(profile?.userdata);
       } else {
         navigate("/");
       }
      }
   }, 800);

  }, [profile]);

  if (isLoading === true) {
    return <Loder />;
  }else{

    return (
      <Box
        sx={{
          // bgcolor: "#fdfdfd",
          bgcolor: "#fff",
          width: "100%",
          position: "fixed",
          height: "80px",
          padding: "10px 20px",
          zIndex: "11",
          borderBottom: "1px dashed rgba(0,0,0,.1)",
        }}
      >
        {/* Heder */}
        <Stack direction="row" justifyContent="space-between">
          {/*   Mobile View */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              onClick={() => {
                setmobileview(true);
                setopen(true);
              }}
            >
              <ListIcon />
            </IconButton>
            <Drawer
              open={open}
              onClose={handleclose}
              sx={{
                display: { md: "none" },
              }}
            >
              <Config mobileview={mobileview} setmobileview={setopen} />
            </Drawer>
          </Box>
  
          {/*  Dashbord  Heder */}
          <Box
            display="flex"
            width="60%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Link to="/admin">
                <img src="/admin/logo.png" alt="logo-img" width="160px" />
              </Link>
            </Box>
          </Box>
          {/* flex end */}
          <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }}>
            <IconButton
              sx={{ borderRadius: "8px" }}
              onClick={() => setinfo(true)}
            >
              <Avatar alt="" src={"/admin/avatar_default.jpg"} />
              <Box gap={0.5} ml={1} display="flex">
                <Typography> {UserData?.firstname} </Typography>
                <Typography> {UserData?.lastname} </Typography>
              </Box>
            </IconButton>
  
            <Popover
              open={info}
              onClose={handlecloseinfo}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  p: 2,
                  mt: "3.5rem",
                  width: 140,
                  "& .MuiMenuItem-root": {
                    typography: "body2",
                    borderRadius: 0.75,
                  },
                },
              }}
            >
              <Box
                sx={{
                  marginY: "1rem",
                  // padding: "1rem",
                }}
              >
                <MenuItem>Home</MenuItem>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("x-access-token");
                    navigate("/admin/login");
                  }}
                >
                  Log Out
                </MenuItem>
              </Box>
            </Popover>
          </Box>
        </Stack>
      </Box>
    );
  }
}
