import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Stack,
  Divider,
  Box,
  Dialog,
  Slide,
  AppBar,
  IconButton,
  Toolbar,
} from "@mui/material";
import { CommercialItem } from "../../molecues";
import router from "next/router";
import { useSnackbar } from "notistack";
import {
  useGetMyCommercialListQuery,
  useRemoveCommercialMutation,
} from "@/src/features/commercial/commercialApi";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import TotalCommercialGraph from "./TotalCommercialGraph";
import CloseIcon from "@mui/icons-material/Close";

const MyCommercial = () => {
  //광고 리스트 출력
  const { data, isLoading, error, refetch } = useGetMyCommercialListQuery();

  //알림창
  const { enqueueSnackbar } = useSnackbar();

  //모달 옵션
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //통계페이지에 props으로 내려서 사용할 것들
  const [merchandiseName, setMerchandiseName] = useState("");
  const [commercialId, setCommercialId] = useState(0);

  //광고 삭제
  const [removeCommercial] = useRemoveCommercialMutation();

  //광고 삭제
  function deleteHandler(commercial_id: number) {
    //삭제 함수 불러오기
    removeCommercial(commercial_id)
      .unwrap()
      .then((res) => {
        enqueueSnackbar(`성공적으로 제거했습니다.`, {
          variant: "success",
          anchorOrigin: {
            horizontal: "center",
            vertical: "top",
          },
        });
        refetch();
      })
      .catch((err) => {
        enqueueSnackbar(`요청이 실패했습니다.`, {
          variant: "error",
          anchorOrigin: {
            horizontal: "center",
            vertical: "top",
          },
        });
      });
  }

  console.log(data);

  return (
    <>
      <Stack direction="column" spacing={5}>
        {/* 로딩중 */}
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* 광고 리스트 */}
        {data &&
          data.map((item, i) => (
            <>
              {/* 광고 표시 */}
              <CommercialItem data={item} key={i} />
              <Stack direction={"row"} spacing={1}>
                <Button
                  style={{
                    marginTop: "10px",
                    backgroundColor: "black",
                    color: "white",
                    padding: "10px",
                  }}
                  fullWidth
                  onClick={() => {
                    // 이름셋팅
                    handleOpen();
                    setMerchandiseName(item.merchandise_name);
                    setCommercialId(item.id);
                  }}
                >
                  통계 보기
                </Button>
                <Button
                  style={{
                    marginTop: "10px",
                    backgroundColor: "red",
                    color: "white",
                    padding: "10px",
                  }}
                  fullWidth
                  onClick={() => {
                    deleteHandler(item.id);
                  }}
                >
                  삭제 하기
                </Button>
              </Stack>
              <Divider />
            </>
          ))}
      </Stack>

      {/* 통계 모달창 */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        scroll="body"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        TransitionComponent={Transition}
        style={{ padding: "50px 0" }}
      >
        <AppBar
          sx={{ position: "fixed", backgroundColorL: "black", color: "white" }}
        >
          <Toolbar>
            <Stack
              style={{ width: "100%" }}
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {merchandiseName}
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
        <TotalCommercialGraph commercialId={commercialId} />
        <Button
          style={{
            width: "100%",
            color: "black",
            margin: "10px 0px 10px 0px",
            padding: "20px",
          }}
          onClick={handleClose}
        >
          확인
        </Button>
      </Dialog>
    </>
  );
};

export default MyCommercial;

const RegistButton = styled.button`
  position: fixed;
  border-radius: 50px;
  right: 30px;
  bottom: 10%;
  background-color: black;
  color: white;
  font-size: 1rem;
  box-shadow: 3px 3px 10px grey;
  padding: 20px;
  box-sizing: border-box;
`;

//풀스크린 모달창을 위한 옵션
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
