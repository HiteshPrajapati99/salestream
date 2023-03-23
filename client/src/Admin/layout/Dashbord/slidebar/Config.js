import {
  Box,
  Typography,
  IconButton,
  ListItemIcon,
  List,
  ListItemButton,
  Collapse,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { FaRegUserCircle } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BiCategory, BiEdit } from "react-icons/bi";
import {
  MdFeaturedPlayList,
  MdModeEdit,
  MdModeEditOutline,
  MdOutlineModeEdit,
} from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { AiOutlinePlus } from "react-icons/ai";
import { TbRadar2 } from "react-icons/tb";
import { FaStoreAlt } from "react-icons/fa";
import { ImBlogger } from "react-icons/im";
import { GiKnightBanner } from "react-icons/gi";
import { useSelector } from "react-redux";
import { GrEdit } from "react-icons/gr";

export default function Config({ mobileview, setmobileview }) {
  const userStore = useSelector((store) => store.userStore);
  const Management = [

    {
      title: "Product",
      icon: <InventoryIcon className="list-icon" />,
      value: false,
      items: [
        {
          name: "Create Product",
          icon: <span className="list-item-dot"> </span>,
          path: "/admin/product/create",
          value: false,
        },
        {
          name: "List",
          icon: <ListAltIcon className="list-icon" />,
          path: "/admin/products",
          value: false,
        },
      ],
    },
    {
      title: "Customers",
      icon: <FaRegUserCircle className="list-icon" />,
      value: false,
      items: [
        {
          name: "List",
          icon: <FiUsers className="list-icon" />,
          path: "/admin/users",
          value: false,
        },
      ],
    },
    {
      title: "Order",
      icon: <ShoppingCartCheckoutIcon className="list-icon" />,
      value: false,
      items: [
        {
          name: "Order",
          icon: <DeliveryDiningIcon className="list-icon" />,
          path: "/admin/orders",
          value: false,
        },
      ],
    },
    {
      title: "Categories",
      icon: <BiCategory className="list-icon" />,
      items: [
        {
          name: "Create",
          icon: <AiOutlinePlus className="list-icon" />,
          path: "/admin/category/create",
          value: false,
        },
        {
          name: "Categories List",
          icon: <MdFeaturedPlayList className="list-icon" />,
          path: "/admin/categories",
          value: false,
        },
      ],
    },
    {
      title: "Brands",
      icon: <TbRadar2 className="list-icon" />,
      items: [
        {
          name: "Brand List",
          icon: <SiBrandfolder className="list-icon" />,
          path: "/admin/brand",
          value: false,
        },
      ],
    },
    {
      title: "Banner",
      icon: <GiKnightBanner className="list-icon" />,
      items: [
        {
          name: "Create Banner",
          icon: <AiOutlinePlus className="list-icon" />,
          path: "/admin/banner/create",
          value: false,
        },
        {
          name: "Banner List",
          icon: <GiKnightBanner className="list-icon" />,
          path: "/admin/banners",
          value: false,
        },
      ],
    },
    {
      title: "Blog",
      icon: <ImBlogger className="list-icon" />,
      items: [
        {
          name: "Create Blog",
          icon: <AiOutlinePlus className="list-icon" />,
          path: "/admin/blog/create",
          value: false,
        },
        {
          name: "Blog List",
          icon: <ImBlogger className="list-icon" />,
          path: "/admin/blogs",
          value: false,
        },
      ],
    },
  ];
  const [mystate, setMystate] = useState(Management);

  const handleClick = (e) => {
    setMystate(() => {
      let myNewState = mystate.map((item) => {
        if (e.title === item.title) {
          let mynewObject = { ...item, value: !item.value };
          return mynewObject;
        } else {
          return item;
        }
      });
      return myNewState;
    });
  };

  const Genral = [
    {
      name: "Home",
      icon: <HomeIcon />,
      path: "/admin/home",
      id: "home",
    },

    // {
    //   name: "Profile",
    //   icon: <AccountCircleIcon />,
    //   path: "/admin/user",
    //   id: "profile",
    // },
  ];

  useEffect(() => {}, [userStore]);
  return (
    <Box
      sx={{
        padding: mobileview === true && "2rem",
        width: mobileview === true ? { xs: "100vw", sm: "50vw" } : null,
      }}
    >
      <IconButton
        sx={{ marginLeft: "90%", display: { md: "none" } }}
        onClick={() => setmobileview(false)}
      >
        <CloseIcon />
      </IconButton>

      <Box>
        {/*  Genreal */}
        <Div>
          <List>
            <Typography className="subheder">GENERAL </Typography>

            {Genral.map((item) => {
              return (
                <Box key={item.name}>
                  <ListItemButton
                    className="list-button-1"
                    component={NavLink}
                    to={item.path}
                  >
                    <Box display="flex" >
                         <div style={{marginRight :'16px'}}> {item.icon} </div> 
                        <Typography>{item.name}</Typography>
                      </Box>
                  </ListItemButton>
                </Box>
              );
            })}
          </List>
        </Div>

        {/*  Magement */}
        <Div>
          <List>
            <Typography className="subheder"> MANAGEMENT</Typography>
            {mystate?.map((item) => {
              return (
                <Box key={item.title}>
                  <ListItemButton
                    className="list-button"
                    onClick={() => handleClick(item)}
                  >
                    <Box display="flex">
                       <div style={{marginRight :'16px'}}> {item.icon} </div> 
                      <Typography>{item.title}</Typography>
                    </Box>
                    <Box>
                    <ListItemIcon>
                      {item.value ? (
                        <ExpandMoreIcon style={{ color: "rgb(0, 171, 85)" }} />
                      ) : (
                        <ChevronRightIcon style={{ color: "#e6e6e6" }} />
                      )}
                    </ListItemIcon>
                    </Box>
                  </ListItemButton>

                  <Collapse
                    in={item.value}
                    timeout="auto"
                    key={item.name}
                    unmountOnExit
                  >
                    {item?.items?.map((data) => (
                      <ListItemButton
                        key={data.name}
                        component={NavLink}
                        to={data.path}
                        className="list-button-1"
                        sx={{ margin: "3px 20px"  }}
                      >
                      <Box display="flex" alignItems="center" px={2}>
                      <span className="list-item-dot" ></span>
                      <Typography>{data.name}</Typography>
                      </Box>
                      </ListItemButton>
                    ))}
                  </Collapse>
                </Box>
              );
            })}
          </List>

          {/* Store Management */}
          {userStore.success ? (
            <List>
              <Typography className="subheder"> Store </Typography>
              <ListItemButton
                className="list-button-1"
                component={NavLink}
                to={`/admin/store/theme/${userStore.storeData._id}`}
              >
                <ListItemIcon className="list-icon">
                  <BiEdit />
                </ListItemIcon>
                <Typography> Themes </Typography>
              </ListItemButton>

              <ListItemButton
                className="list-button-1"
                component={NavLink}
                to={`/admin/store/edit/${userStore.storeData._id}`}
              >
                <Box display="flex">
                       <div style={{marginRight :'16px'}}>  <FaStoreAlt /> </div> 
                      <Typography> Manage Store </Typography>
                    </Box>
              </ListItemButton>
            </List>
          ) : (
            <List>
              <Typography className="subheder"> Store </Typography>
              <ListItemButton
                className="list-button-1"
                component={NavLink}
                to="/admin/store/create"
              >
                <ListItemIcon className="list-icon">
                  <FaStoreAlt />
                </ListItemIcon>
                <Typography> Online Store </Typography>
              </ListItemButton>
            </List>
          )}
        </Div>
      </Box>
    </Box>
  );
}

const Div = styled.div`
  .list-button-1 {
    border-radius: 8px;
    color: rgb(99, 115, 129);
    /* margin-top: 8px; */
    padding: 8px 12px 8px 16px;
  }
  .active {
    color: rgb(0, 171, 85);
    font-weight: bold;

    background-color: rgb(0 145 72 / 5%);
    .list-item-dot {
      width:6px ;
      height:6px ;
      background-color:rgb(0, 171, 85) ;
    }
  }
  
  .list-button {
    border-radius: 8px;
    color: rgb(99, 115, 129);
    margin-top: 8px;
    justify-content: space-between;
  }
  .list-item-dot {
   width: 4px;
   height: 4px;
    border-radius: 50%;
   background-color: rgb(145, 158, 171);
   margin-right: 10px;
  }

  .subheder {
    border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
    font-weight: 600;
    font-size: 12px;
    margin-left: 12px;
    padding-bottom: 10px;
    color: rgba(0, 0, 0, 0.6);
  }
`;
