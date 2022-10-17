import React, { useContext, useState } from "react";
import { UserContext } from "../../../Context/UserContext/UserContext";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, styled } from "@mui/system";
import { LoadingButton } from '@mui/lab';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';


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
//Add color to button
const theme = createTheme({
  palette: {
    primary: {
      main: '#2A254B'
    },
  },
});
//Style CSS End

// admin login info
const initialValues = {
  email: 'admin@gmail.com',
  password: '',
  remember: true,
};

// form field validation
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const Login = () => {
  let history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogin } = useContext(UserContext);
  const { signIn } = useContext(AuthContext);
  const handleLogin = () => {
    setIsLogin(true)
    history("/", { replace: true });
      // postLogin(email, password).then((res) => { 
      // if (res.status === 401)
      //     alert("Error: Wrong email or password, please enter again");
      //   else if (res.status === 500)
      //     alert(
      //       "Error: Account has not verified yet, please check register mail again"
      //     );
      //   else{
      //     setIsLogin(true)
      //     history("/", { replace: true });
        // if(res.is_staff)
        // {
        //   signIn(res.tokens, res.id);
        //   setIsLogin(true)
        //   history("/", { replace: true });
        // }
        // else
        // alert(
        //   "you must login by admin account"
        // );
    //   }
    // });
  };
  return (
    <JWTRoot>
    <Card className="card">
      <div className="main-contain">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src="../../../dreamer.svg" width="100%" alt="" />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
            <JustifyBox p={4} height="45%" sx={{ minWidth: 320 }}>
              <img src="../../../logo.svg" width="45%" alt="" />
            </JustifyBox>
              <Formik
                onSubmit={handleLogin}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <ThemeProvider theme={theme}>
                    <FlexBox justifyContent="space-between">
                      <FlexBox gap={1}>
                        <Checkbox
                          size="small"
                          color="primary"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{ padding: 0 }}
                        />

                        <p>Remember Me</p>
                      </FlexBox>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      variant="contained"
                      sx={{ my: 2,marginLeft: 30 }}
                      onClick={handleLogin}
                    >
                      Login
                    </LoadingButton>
                    </ThemeProvider>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </div>
    </Card>
  </JWTRoot>
  );
};

export default Login;
