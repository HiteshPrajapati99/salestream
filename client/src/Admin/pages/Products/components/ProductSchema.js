import * as Yup from "yup";

export const ProducSchema = Yup.object({
  name: Yup.string().required("Please Enter Title").min(3),
  price: Yup.number().required("Please Enter price"),
  quantity: Yup.number().required("Please Enter Quantity"),
  // activeId: Yup.string().required("Please Select Category"),
  // brand: Yup.string().required("Please Select Brand"),
});
