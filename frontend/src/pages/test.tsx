import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Image from "next/image";
import Rating from "@mui/material/Rating";

import { useState } from "react";

import { Pie, Doughnut } from "react-chartjs-2";
import { Bubble } from "react-chartjs-2";
import { IconButton } from "@mui/material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { BlockText, InlineText } from "../components/atoms";
import { ProductDetailImage, ProductCardsRow } from "../components/oranisms";
import { ChartPersonalColor } from "../components/oranisms/charts";

import FormControl from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";
import { ReviewInput, Review } from "../components/molecues";


import {ProductCard} from "../components/molecues";

type ProductInfo = {
  id: number;
  img_url: string;
  price: number;
  discount: number;
  isBookmark: boolean;
  tags: string[];
  brand: string;
};

const ProductCardsGrid = (props: any) => {
  // 더미 데이터
  const data: ProductInfo[] = [
    {
      id: 123123,
      img_url:
        "https://img.freepik.com/free-photo/japanese-business-concept-with-business-person_23-2149268012.jpg?w=740&t=st=1682738359~exp=1682738959~hmac=4714981d0d5d09c27675131f07ee4ca11b7d6b57c39febce3e83bb918d3e129b",
      price: 32000,
      discount: 10000,
      brand: "MUJI",
      isBookmark: true,
      tags: ["ESFP", "SPRING", "상의"],
    },
    {
      id: 123123,
      img_url:
        "https://img.freepik.com/free-photo/japanese-business-concept-with-business-person_23-2149268012.jpg?w=740&t=st=1682738359~exp=1682738959~hmac=4714981d0d5d09c27675131f07ee4ca11b7d6b57c39febce3e83bb918d3e129b",
      price: 32000,
      discount: 10000,
      brand: "MUJI",
      isBookmark: true,
      tags: ["ESFP", "SPRING", "상의"],
    },
    {
      id: 123123,
      img_url:
        "https://img.freepik.com/free-photo/japanese-business-concept-with-business-person_23-2149268012.jpg?w=740&t=st=1682738359~exp=1682738959~hmac=4714981d0d5d09c27675131f07ee4ca11b7d6b57c39febce3e83bb918d3e129b",
      price: 32000,
      discount: 10000,
      brand: "MUJI",
      isBookmark: true,
      tags: ["ESFP", "SPRING", "상의"],
    },
    {
      id: 123123,
      img_url:
        "https://img.freepik.com/free-photo/japanese-business-concept-with-business-person_23-2149268012.jpg?w=740&t=st=1682738359~exp=1682738959~hmac=4714981d0d5d09c27675131f07ee4ca11b7d6b57c39febce3e83bb918d3e129b",
      price: 32000,
      discount: 10000,
      brand: "MUJI",
      isBookmark: true,
      tags: ["ESFP", "SPRING", "상의"],
    },
    {
      id: 123123,
      img_url:
        "https://img.freepik.com/free-photo/japanese-business-concept-with-business-person_23-2149268012.jpg?w=740&t=st=1682738359~exp=1682738959~hmac=4714981d0d5d09c27675131f07ee4ca11b7d6b57c39febce3e83bb918d3e129b",
      price: 32000,
      discount: 10000,
      brand: "MUJI",
      isBookmark: true,
      tags: ["ESFP", "SPRING", "상의"],
    },
  ];
  return (
    <Grid container>
      {data &&
        data?.map((item: ProductInfo, i) => (
          <Grid item lg={3} md={3} sm={4} xs={6} key={i}>
            <ProductCard data={item} key={i} />
          </Grid>
        ))}
    </Grid>
  );
};

export default ProductCardsGrid;

const Background = styled.div`
  padding: 10px;
  box-sizing: border-box;
`;
