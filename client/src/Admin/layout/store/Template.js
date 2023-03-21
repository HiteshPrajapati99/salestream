import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CmpTitle, Toast } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { getStoreInfo } from "../../redux-store/reducer/UserStore";
import { useDispatch, useSelector } from "react-redux";

let storeData = null;

export const getData = (data) => {
  storeData = data;
};

export default function Template() {
  const navigate = useNavigate();
  const dishpatch = useDispatch();
  const { id } = useParams();
  const defaultSelected = useSelector((store) => store.userStore);
  console.log(defaultSelected);
  //  Toast
  const tostRef = useRef(null);
  const [tostData, settostData] = useState({
    success: false,
    message: "",
  });

  const [Selected, setSelected] = useState("");
  const [themeName, setThemeName] = useState("");

  const images = [
    {
      images: "/admin/tamplate/tamplate1.png",
      name: "EShopper",
      id: "Temp1",
    },
    { images: "/admin/tamplate/tamplate2.png", name: "Famms", id: "Temp2" },
    {
      images: "/admin/tamplate/tamplate3.png",
      name: "FreshShop",
      id: "Temp3",
    },
    {
      images: "/admin/tamplate/tamplate4.png",
      name: "E-Commerce",
      id: "Temp4",
    },
  ];

  const handle_id = async (item) => {
    setSelected(item.id);
    setThemeName(item.name);
    storeData = { ...storeData, template: item.id };
  };

  useEffect(() => {
    if(defaultSelected.success){

      const updatethemeName = images.filter(
        (item) => item.id === defaultSelected?.storeData.template
      );
  
      setThemeName(updatethemeName[0]?.name);
      setSelected(updatethemeName[0]?.id);
    }
  }, [defaultSelected]);

  const handleSubmit = async () => {
    const url = "http://localhost:5000/store/store/create";
    const token = localStorage.getItem("x-access-token");
    // console.log(storeData);
    const { data } = await axios.post(url, storeData, {
      headers: { "x-access-token": token },
    });
    if (data.success) {
      dishpatch(getStoreInfo());
      setTimeout(() => {
        navigate("/admin/home");
      }, 800);
    }

    settostData({ success: data.success, message: data.message });
    tostRef.current.show();
  };

  const handleUpdate = async () => {
    const url = `http://localhost:5000/store/store/edit/${id}`;
    const token = localStorage.getItem("x-access-token");

    const { data } = await axios.put(
      url,
      { template: Selected },
      {
        headers: { "x-access-token": token },
      }
    );
    if (data.success) {
      dishpatch(getStoreInfo());
      setTimeout(() => {
        navigate("/admin/home");
      }, 800);
    }

    settostData({ success: data.success, message: data.message });
    tostRef.current.show();
  };

  return (
    <Wrapper>
      {/* <Box display="flex" justifyContent="space-between" mb={3}>
        <Box>
          {themeName && (
            <Typography fontWeight="bold">
              Template Name : {themeName}
            </Typography>
          )}
        </Box>
        <Box>
          <Button className="button-1" onClick={handleSubmit}>
            SUbmit
          </Button>
          <Toast
            message={tostData.message}
            success={tostData.success}
            tostRef={tostRef}
          />
        </Box>
      </Box> */}
      <Box className="top-title">
        <CmpTitle
          text={
            themeName ? `Selected Template : ${themeName}` : "Template List"
          }
          buttonname="submit"
          handleClick={id ? handleUpdate : handleSubmit}
        />
        <Toast
          message={tostData.message}
          success={tostData.success}
          tostRef={tostRef}
        />
      </Box>
      <Grid container spacing={3} mt={5}>
        {images.map((item) => (
          <Grid item xs={12} sm={6} key={item.id}>
            <Box
              key={item.name}
              sx={{ border: Selected === item.id ? "3px solid grey" : "none" }}
            >
              <Card
                component="button"
                sx={{ border: "none" }}
                onClick={() => handle_id(item)}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    // height="400"
                    // width="300"
                    image={item.images}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
`;
