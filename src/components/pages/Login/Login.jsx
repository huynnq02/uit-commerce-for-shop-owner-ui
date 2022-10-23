/**
 * Login pages
 * file: Login.jsx
 */
import React, { useContext,useState } from "react";
import { UserContext } from "../../../Context/UserContext/UserContext";
import { useAuth } from "../../../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, Grid, TextField } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config";
import { toast } from "react-toastify";
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
      main: "#2A254B",
    },
  },
});
//Style CSS End

// admin login hint info
const initialValues = {
  email: "admin@gmail.com",
  password: "",
};

// form field validation
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});

const Login = () => {
  let history = useNavigate();
  const { setIsLogin } = useContext(UserContext);
  const { setAdminInfo } = useAuth();
  const [admins, setAdmins] = useState([]);
  //function check admin status
  function statusUser(email, admins) {
    let checkAdmin = true;
    admins.forEach((admin) => {
      console.log(admin);
      if (admin.email === email) {
        checkAdmin = false;
        return;
      }
    });
    return checkAdmin;
  }

  const handleLogin = async (values) => {
    try {
      if (statusUser(values.email, admins) === false) {
        toast.error("Admin is not found");
        return;
      }
      await signInWithEmailAndPassword(auth, values.email, values.password);
      history("/");
    } catch (errors) {
      console.log(errors);
      toast.error("Your email or password is incorrect");
    }
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
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
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
                        <LoadingButton
                          type="submit"
                          color="primary"
                          variant="contained"
                          sx={{ my: 1, marginLeft: 30, width: 80 }}
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
