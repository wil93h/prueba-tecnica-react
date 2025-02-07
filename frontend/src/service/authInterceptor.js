import axios from "axios";
import { getValidationError } from "../utilities/getValidationError.utility";
import { SnackbarUtilities } from "../utilities/snackbarManager.utility";

export const PrivateInterceptor = () => {
  const updateHeader = (request) => {
    const newHeader = {
      "Content-Type": "application/json",
    };
    request.headers = newHeader;
    return request;
  };

  axios.interceptors.request.use((request) => {
    return updateHeader(request);
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      SnackbarUtilities.error(getValidationError(error));
    }
  );
};
