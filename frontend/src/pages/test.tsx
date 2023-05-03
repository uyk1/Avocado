import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import { Line, Chart } from "react-chartjs-2";
import { useState } from "react";

import { Pie, Doughnut } from "react-chartjs-2";
import { Bubble } from "react-chartjs-2";
import { IconButton } from "@mui/material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { BlockText, InlineText } from "../components/atoms";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//그래프 옵션
export const options = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};


//성별 구매정보 더미 데이터
const gender_data = [
  { type: "man", value: 300 },
  {
    type: "woman",
    value: 503,
  },
];



const PersonalColorChart = () => {

  //그래프에 들어갈 데이터
  function dataFormat() {
    //데이터 모양
    let data = {
      labels: ["성별 구매 현황"],
      datasets: [
        {
          label: "남자",
          data: [gender_data[0].value],
          backgroundColor: "rgb(53, 162, 235)",
        },
        {
          label: "여자",
          data: [gender_data[1].value],
          backgroundColor: "rgb(255, 131, 157)",
        },
      ],
    };

    return data;
  }

  return (
    <Background>
      <Bar options={options} data={dataFormat()} />
    </Background>
  );
};

export default PersonalColorChart;

const Background = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  border-radius: 10px;
`;
