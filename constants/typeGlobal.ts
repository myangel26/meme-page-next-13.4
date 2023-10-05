import { iNotification } from 'react-notifications-component';

const NotificationType: iNotification = {
    title: "Wonderful!",
    message: "teodosii@react-notifications-component",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
        duration: 5000,
        onScreen: true,
        showIcon: true
    }
}

export {
    NotificationType
}