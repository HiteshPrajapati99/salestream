import React from "react";
import NavBar from "./components/NavBar";
import "./assets/css/main.css";
import { useLocation, useParams } from "react-router-dom";

export default function TempRoutes2() {
  const location = useLocation();
  const { title } = useParams();
  return <>{location.pathname === "/" + title && <NavBar />}</>;
}
