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
    idTypeSuggestions: yup.array().required(),
    idNumber: yup.string().required(t("idNumber.required")),
    department: yup.string().required(t("department.required")),
    departmentSuggestions: yup.array().required(),
    municipality: yup.string().required(t("municipality.required")),
    municipalitySuggestions: yup.array().required(),
    address: yup.string().required(t("address.required")),
    monthlyIncome: yup
      .number()
      .typeError(t("monthlyIncome.invalid"))
      .positive(t("monthlyIncome.positive"))
      .required(t("monthlyIncome.required")),
    stepsPosition: yup.number().required(),
    fileId: yup
    .mixed()
    .required(t("fileUpload.validation.required"))
    .test(
      "fileSize",
      t("fileUpload.validation.fileSize"),
      (value) =>
        value && value.length > 0
          ? value.every((file) => file.size <= 5 * 1024 * 1024) // 5MB
          : true
    )
    .test(
      "fileType",
      t("fileUpload.validation.fileType"),
      (value) =>
        value &&
        value.every((file) =>
          ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
        )
    ),
  });