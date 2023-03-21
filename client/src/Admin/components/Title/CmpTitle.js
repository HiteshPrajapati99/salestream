import React from "react";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingButton from "@mui/lab/LoadingButton";

export default function CmpTitle({
  handleClick,
  text,
  breadcrumbs,
  buttonname,
  navigate,
  navlink,
  isLodding,
}) {
  const usenavigate = useNavigate();

  const nav = navigate === true && navlink;

  return (
    <BoxData>
      <Typography
        variant="h4"
        sx={{ lineHeight: "1.5", fontWeight: "bold", fontSize: "1.5rem" }}
        mb={!breadcrumbs && 2}
        mt={!breadcrumbs && 2}
      >
        {text}
        {breadcrumbs && (
          <Box>
            <Breadcrumbs separator={<span className="bred-dot"></span>}>
              <Link className="bredcrumb-links" to="/admin" key="1">
                Admin
              </Link>
              {breadcrumbs.one && (
                <Link
                  className="bredcrumb-links"
                  to={breadcrumbs.oneLink}
                  key="2"
                >
                  {breadcrumbs.one}
                </Link>
              )}
              <Link
                key="3"
                style={{
                  lineHeight: "1.57143",
                  fontSize: "12px",
                  fontFamily: "sans-serif",
                  fontWeight: "500",
                  cursor: "inherit",
                  textDecoration: "none",
                  color: "black",
                }}
                // className="bredcrumb-links"
              >
                {breadcrumbs.last}
              </Link>
            </Breadcrumbs>
          </Box>
        )}
      </Typography>
      <Box>
      { buttonname && <LoadingButton
        onClick={nav === false ? handleClick : () => usenavigate(navlink)}
        className={isLodding ? "" : "button-1"}
        color="success"
        variant="contained"
        loading={isLodding}
        disabled={isLodding}
      >
        {buttonname}
      </LoadingButton>}
      </Box>
    </BoxData>
  );
}

const BoxData = styled.div`
  margin-left: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .bred-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: rgb(145, 158, 171);
    margin-top: 3px;
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
`;
