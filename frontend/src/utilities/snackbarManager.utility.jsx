import { useSnackbar } from 'notistack';

let useSnackbarRef;
export const SnackbarUtilsConfigurator = () => { 
  useSnackbarRef = useSnackbar();
  // const showSnackbar = (message, options) => {
  //   useSnackbarRef.enqueueSnackbar(message, options);
  // };
  return null;
}

export const SnackbarUtilities = {
  toast(msg, variant) {
    useSnackbarRef.enqueueSnackbar(msg, { variant , anchorOrigin: { vertical: 'top', horizontal: 'right' }});
  },
  success(msg) {
    this.toast(msg, 'success');
  },
  error(msg) {
    this.toast(msg, 'error');
  },
  info(msg) {
    this.toast(msg, 'info');
  },
  warning(msg) {
    this.toast(msg, 'warning');
  }, 
}
