import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { ImUpload } from "react-icons/im";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { ConformModal } from "../../../components";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
  position: "relative",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default function ImgDropzone({ Images, setImages, Preview }) {
  const [files, setFiles] = useState([]);

  const { id } = useParams();
  // console.log(Images);

  useEffect(() => {
    if (Preview.length !== 0) {
      setFiles(Preview);
    }
  }, [Preview]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const link = acceptedFiles.map((file) => URL.createObjectURL(file));
      setFiles((pre) => pre.concat(link));

      const imgList = acceptedFiles.map((item) => item);
      setImages((pre) => pre.concat(imgList));
    },
  });

  const location = useLocation();
  const handleDeleteApi = async (file, e) => {
    if (location.pathname === `/admin/product/edit/${id}`) {
      const newFiles = Images.filter((item, index) => {
        const data = index === e && item;
        return data;
      });
      const url = `http://localhost:5000/store/product/edit/delete/image/${id}`;
      const token = localStorage.getItem("x-access-token");
      const { data } = await axios.delete(url, {
        data: { file: file, image: newFiles[0] },
        headers: { "x-access-token": token },
      });
      // console.log(data);
      if (data.success) {
        const newPreview = files.filter((item, index) => index !== e);
        setFiles(newPreview);
        const newimage = Images.filter((item, index) => index !== e);
        setImages(newimage);
      } else {
        alert(data.message);
      }
    }

    if (location.pathname === `/admin/banner/edit/${id}`) {
      alert("this is Not avaineble");
    } else {
      alert("this is Not avaineble");
    }
  };

  const handleDeleteImage = async (e) => {
    const newPreview = files.filter((item, index) => index !== e);
    setFiles(newPreview);
    const newimage = Images.filter((item, index) => index !== e);

    setImages(newimage);
  };

  const thumbs = files?.map((file, index) => (
    <div style={thumb} key={file}>
      <div style={thumbInner}>
        <ConformModal
          DeleteImage={
            id
              ? () => handleDeleteApi(file, index)
              : () => handleDeleteImage(index)
          }
        />
        <img
          src={file}
          style={img}
          alt="Product images"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files?.forEach((file) => URL.revokeObjectURL(file.preview));
  });

  return (
    <Wrapper>
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <ImUpload className="dropzone-icon" />
          <p style={{ marginTop: "12px" }}>Drop files or Upload</p>
          <p style={{ color: "rgba(0,0,0,0.3)", marginBottom: "1rem" }}>
            Allowed *.jpeg, *.jpg, *.png, max size of 3 MB
          </p>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .dropzone {
    border: 1px dashed #d6d6d6;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background-color: hsla(261, 28%, 60%, 0.03);

    &:hover {
      background-color: hsla(261, 28%, 60%, 0.08);
    }
  }
  .dropzone-icon {
    font-size: 3rem;
    margin-top: 16px;
    color: rgba(0, 0, 0, 0.2);
  }
  .dropzone:hover {
    cursor: pointer;
  }
  .delete-icon {
    position: absolute;
    top: -8px;
    right: -10px;
    color: #979797 !important;
    z-index: 0 !important;
    background: #ffffff;
    z-index: 101;
    box-shadow: 0px 0px 5px 1px rgb(0 0 0 / 10%);
    padding: 0px;
  }
`;
