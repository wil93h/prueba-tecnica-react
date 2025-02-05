import { getValidationError } from "../src/utilities/getValidationError.utility";
import { SnackbarUtilities } from "../src/utilities/snackbarManager.utility";

export const PrivateInterceptor = () => {
  const headers = {
    'Content-Type': "application/json",
  }
  request.headers = headers;
  return request;
}

axios.interceptors.request.use(request => {
  return updateHeader(request);
});

axios.interceptors.response.use(
(response) => {
  return response;
},
(error) => {
  SnackbarUtilities.error(getValidationError(error));
}
)