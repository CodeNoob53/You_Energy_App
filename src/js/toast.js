import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Get target selector for toast - use open dialog if exists (top layer), otherwise default (viewport)
const getTarget = () => {
  const openDialog = document.querySelector('dialog[open]');
  if (openDialog) {
    // Return selector for the open dialog
    if (openDialog.id) return `#${openDialog.id}`;
    if (openDialog.className) return `dialog.${openDialog.className.split(' ')[0]}`;
    return 'dialog[open]';
  }
  // Return empty string for default behavior - fixed positioning relative to viewport
  return '';
};

const defaultOptions = {
  position: 'topRight',
  timeout: 5000,
};

export const toast = {
  success(message) {
    iziToast.success({
      ...defaultOptions,
      title: 'Success',
      message,
      target: getTarget(),
    });
  },

  error(message) {
    iziToast.error({
      ...defaultOptions,
      title: 'Error',
      message,
      target: getTarget(),
    });
  },

  warning(message) {
    iziToast.warning({
      ...defaultOptions,
      title: 'Warning',
      message,
      target: getTarget(),
    });
  },

  info(message) {
    iziToast.info({
      ...defaultOptions,
      title: 'Info',
      message,
      target: getTarget(),
    });
  },
};
