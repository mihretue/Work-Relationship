// notifications.js
import { showNotification } from '@mantine/notifications';
// import { Check, X,AlertCircle } from 'lucide-react';
import { FaCheck,FaTimes, FaExclamationTriangle} from 'react-icons/fa';
export const showSuccessNotification = (message, title = 'Success') => {
  showNotification({
    title: title,
    message: message,
    color: 'green',
    icon: <FaCheck size={16} />,
  });
};

export const showErrorNotification = (message, title = 'Error') => {
  showNotification({
    title: title,
    message: message,
    color: 'red',
    icon: <FaTimes color='white' size={16} />,
  });
};


export const showAlertNotification = (message, title='Alert')=>{
    showNotification({
        title:title,
        message: message,
        color: 'yellow',
        icon: <FaExclamationTriangle size={16} />
    })
}