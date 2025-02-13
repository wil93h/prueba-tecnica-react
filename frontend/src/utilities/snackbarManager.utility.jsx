import { enqueueSnackbar, useSnackbar } from 'notistack';

let useSnackbarRef;
export const SnackbarUtilsConfigurator = () => { 
  useSnackbarRef = useSnackbar();
  return null;
}

export const SnackbarUtilities = {
  toast(msg, variant="default") {
    enqueueSnackbar(msg, { variant , anchorOrigin: { vertical: 'top', horizontal: 'right' }});
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
