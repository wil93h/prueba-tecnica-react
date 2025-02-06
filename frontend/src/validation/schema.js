import * as yup from "yup";

export const getRegistrationSchema = (t) =>
  yup.object().shape({
    firstName: yup.string().required(t("firstName.required")),
    lastName: yup.string().required(t("lastName.required")),
    email: yup.string().email(t("email.invalid")).required(t("email.required")),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, t("phoneNumber.invalid"))
      .required(t("phoneNumber.required")),
    idType: yup.string().required(t("idType.required")),
    idNumber: yup.string().required(t("idNumber.required")),
    department: yup.string().required(t("department.required")),
    municipality: yup.string().required(t("municipality.required")),
    address: yup.string().required(t("address.required")),
    monthlyIncome: yup
      .number()
      .positive(t("monthlyIncome.positive"))
      .required(t("monthlyIncome.required")),
  });