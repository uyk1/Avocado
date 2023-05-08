import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InlineText } from "../../atoms";
import { useSnackbar } from "notistack";

const GenderAndAgeForm: React.FC<{ pageHandler: () => void }> = (props) => {
  const { pageHandler } = props;

  const { enqueueSnackbar } = useSnackbar();
  const [man, setMan] = useState(false);
  const [woman, setWoman] = useState(false);
  const [age, setAge] = useState("");

  const [open, setOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  //여기서 제출 함수 만들면 될 것 같음
  function submitHandler() {
    if (man === woman) {
      enqueueSnackbar(`성별을 선택해 주세요 `, {
        variant: "error",
        anchorOrigin: {
          horizontal: "center",
          vertical: "bottom",
        },
      });
      return;
    }

    if (age === "") {
      enqueueSnackbar(`나이대를 선택해 주세요 `, {
        variant: "error",
        anchorOrigin: {
          horizontal: "center",
          vertical: "bottom",
        },
      });
    }

    console.log({
      gender: man ? "man" : "woman",
      age: age,
    });
    pageHandler(); // 다음페이지로 이동하는 함수
  }

  return (
    <Background>
      {/* 성별 선택 버튼 */}
      <InlineText color="red" size="0.6rem">
        *필수
      </InlineText>
      <Stack
        direction="row"
        style={{ height: "50px" }}
        spacing={2}
        marginBottom={2}
      >
        <Button
          fullWidth
          style={
            man
              ? {
                  backgroundColor: "black",
                  color: "white",
                  border: "1px solid black",
                }
              : {
                  backgroundColor: "white",
                  color: "grey",
                  border: "1px solid grey",
                }
          }
          onClick={() => {
            if (man) {
              setMan(false);
            } else {
              setMan(true);
              setWoman(false);
            }
          }}
        >
          남자
        </Button>

        <Button
          fullWidth
          variant="outlined"
          style={
            woman
              ? {
                  backgroundColor: "black",
                  color: "white",
                  border: "1px solid black",
                }
              : {
                  backgroundColor: "white",
                  color: "grey",
                  border: "1px solid grey",
                }
          }
          onClick={() => {
            if (woman) {
              setWoman(false);
            } else {
              setMan(false);
              setWoman(true);
            }
          }}
        >
          여자
        </Button>

        {/* 나이 선택 */}
      </Stack>
      <InlineText color="red" size="0.6rem">
        *필수
      </InlineText>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="나이대"
          onChange={handleChange}
        >
          <MenuItem value={10}>10대</MenuItem>
          <MenuItem value={20}>20대</MenuItem>
          <MenuItem value={30}>30대</MenuItem>
          <MenuItem value={40}>40대</MenuItem>
          <MenuItem value={50}>50대</MenuItem>
          <MenuItem value={60}>60대 이상</MenuItem>
        </Select>
      </FormControl>

      {/* 확인 버튼 */}
      <Button
        fullWidth
        style={{
          color: "white",
          backgroundColor: "black",
          padding: "20px",
          marginTop: "40px",
        }}
        onClick={submitHandler}
      >
        확인
      </Button>
    </Background>
  );
};

export default GenderAndAgeForm;

const Background = styled.div`
  width: 100;
`;
