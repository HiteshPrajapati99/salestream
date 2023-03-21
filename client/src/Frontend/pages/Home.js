import axios from "axios";
import React, { useEffect, useState, lazy } from "react";
import { useParams } from "react-router-dom";
import Page404 from "../../pages/Page404";
import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { getProducts } from "../store/reducers/Products";
import { getBrands } from "../store/reducers/Brands";
import { useDispatch } from "react-redux";

export default function Home() {
  const dishpatch = useDispatch();
  const { title } = useParams();

  const [Lodding, setLodding] = useState(true);

  const [Component, setComponent] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      const url = `http://localhost:5000/api/apiv1/${title}`;
      const { data } = await axios.get(url);
      if (data.success) {
        localStorage.setItem("store", data?.data?.user_id[0]);

        const { template } = data.data;
        import(`../../Templates/${template}/App`)
          .then((component) => {
            setComponent(() => component.default);
          })
          .then(() => dishpatch(getProducts()))
          .then(() => setLodding(false));
      } else {
        setLodding(false);
      }
    };
    getInfo();
  }, [title]);

  if (Lodding) {
    return (
      <Box width="50%" sx={{ position: "absolute", top: "50%", left: "23%" }}>
        <LinearProgress color="inherit" />
      </Box>
    );
  } else {
    return Component !== null ? <Component /> : <Page404 />;
  }
}
