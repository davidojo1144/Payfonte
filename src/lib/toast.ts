import Toast, { ToastShowParams } from 'react-native-toast-message';

export const showToast = {
  success: (params: Omit<ToastShowParams, 'type'>) => {
    Toast.show({
      type: 'success',
      ...params,
    });
  },
  error: (params: Omit<ToastShowParams, 'type'>) => {
    Toast.show({
      type: 'error',
      ...params,
    });
  },
  info: (params: Omit<ToastShowParams, 'type'>) => {
    Toast.show({
      type: 'info',
      ...params,
    });
  },
};
