import React, { useContext, useState } from "react";
import { UserContext } from "../../../Context/UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import { Box, styled } from "@mui/system";

const Login = () => {
  let history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogin } = useContext(UserContext);
  const handleLogin = () => {
    setIsLogin(true);
    history("/", { replace: true });
  };

  //Style CSS
  const FlexBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
  }));

  const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

  const ContentBox = styled(Box)(() => ({
    height: "100%",
    padding: "32px",
    position: "relative",
    background: "rgba(0, 0, 0, 0.01)",
  }));

  const JWTRoot = styled(JustifyBox)(() => ({
    background: "#1A2038",
    minHeight: "100% !important",
    height: "100vh",
    "& .card": {
      maxWidth: 1200,
      display: "grid",
      borderRadius: 30,
      alignItems: "center",
    },
    "& .grid": {
      maxHeight: 600,
      marginBottom: 2,
    },
  }));
  //Style CSS End
  return (
    <JWTRoot>
      <Card className="card">
        <Grid container className="grid">
          <Grid item sm={6} xs={12}>
            <JustifyBox p={8} height="100%" sx={{ minWidth: 320 }}>
              <img
                src="../../../dreamer.svg"
                width="100%"
                alt="dreamer"
                className="img"
              />
            </JustifyBox>
          </Grid>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <div className="Login">
                <div className="Login__container">
                  <form className="login__form">
                    <h1 className="login__form__h1">Admin Login</h1>
                    <div className="login__form__realtive">
                      <input
                        className="login__form__input"
                        type="email"
                        placeholder="Nhập email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <i className="bx bx-envelope login__form__i"></i>
                    </div>
                    <div className="login__form__realtive">
                      <input
                        className="login__form__input"
                        type="password"
                        placeholder="Nhập password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i className="bx bx-lock-alt login__form__i"></i>
                    </div>
                    <div className="login__form__button">
                      <div
                        className="login__form__button--btn"
                        onClick={handleLogin}
                      >
                        Đăng nhập
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default Login;
