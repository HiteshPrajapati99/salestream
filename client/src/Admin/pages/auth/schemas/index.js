import * as Yup from "yup";

//  Register validation

export const RegisterSchema = Yup.object({
  firstname: Yup.string().min(3).max(12).required("Please Enter First Name"),
  lastname: Yup.string().min(3).max(12).required("Please Enter Last Name"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please Enter Email"),
  password: Yup.string()
    .min(8, "Please Use Strong Password")
    .max(16)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Please  Enter Password"),
  c_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password Does Not Match")
    .required("Please Enter Conform password"),
});

// Login Validatin

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Please Enter Email"),
  password: Yup.string()
    .max(16)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Please Enter Password"),
});
