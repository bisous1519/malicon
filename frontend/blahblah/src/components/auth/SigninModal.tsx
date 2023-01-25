import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../../redux/configStore.hooks";
import { signinAction } from "../../redux/modules/user";
import BasicModal from "../ui/BasicModal";

const buttonBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "32px",
};

export default function SigninModal({ open, setOpen }: any): JSX.Element {
  const dispatch = useAppDispatch();

  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("로그인하려고해");
    dispatch(
      signinAction({
        userId: id,
        password: pw,
      })
    );

    console.log("로그인됐나?");
  };

  return (
    <BasicModal open={open} setOpen={setOpen}>
      <Box
        component="form"
        sx={{
          "& .MuiFormControl-root": { m: 1, width: "25ch", display: "flex" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <FormControl variant="standard">
          <InputLabel htmlFor="id">ID</InputLabel>
          <Input id="id" value={id} onChange={onChangeId} required />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="pw">Password</InputLabel>
          <Input
            id="pw"
            value={pw}
            onChange={onChangePw}
            type="password"
            required
          />
        </FormControl>
        <Box sx={buttonBoxStyle}>
          <Button variant="contained" type="submit">
            Signin
          </Button>
        </Box>
      </Box>
    </BasicModal>
  );
}

