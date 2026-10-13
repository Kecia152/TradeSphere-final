const STORAGE_KEY =
    "tradesphere_notifications";

const SETTINGS_KEY =
    "tradesphere_notification_settings";


const defaultNotifications = [
    {
        id: "welcome",
        title: "Welcome to TradeSphere",
        message: "Your portfolio dashboard is ready to use.",
        type: "system",
        read: false,
        createdAt: new Date().toISOString()
    }
];


export const getNotifications = () => {

    try {

        const stored =
            localStorage.getItem(STORAGE_KEY);

        if (stored) {
            return JSON.parse(stored);
        }

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultNotifications)
        );

        return defaultNotifications;

    } catch (error) {

        console.log(
            "Notification load error:",
            error
        );

        return [];

    }

};


export const saveNotifications = (
    notifications
) => {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(notifications)
    );

};


export const addNotification = ({
    title,
    message,
    type = "system"
}) => {

    const notifications =
        getNotifications();

    const notification = {
        id: Date.now().toString(),
        title,
        message,
        type,
        read: false,
        createdAt:
            new Date().toISOString()
    };

    const updated = [
        notification,
        ...notifications
    ].slice(0, 20);

    saveNotifications(updated);

    return notification;

};


export const markNotificationRead = (
    id
) => {

    const notifications =
        getNotifications();

    const updated =
        notifications.map(
            notification =>
                notification.id === id
                    ? {
                        ...notification,
                        read: true
                    }
                    : notification
        );

    saveNotifications(updated);

};


export const markAllNotificationsRead =
    () => {

        const notifications =
            getNotifications();

        const updated =
            notifications.map(
                notification => ({
                    ...notification,
                    read: true
                })
            );

        saveNotifications(updated);

    };


export const clearNotifications = () => {

    localStorage.removeItem(
        STORAGE_KEY
    );

};


export const getNotificationSettings = () => {

    try {

        const stored =
            localStorage.getItem(
                SETTINGS_KEY
            );

        if (stored) {
            return JSON.parse(stored);
        }

    } catch (error) {

        console.log(
            "Notification settings error:",
            error
        );

    }

    return {
        portfolioUpdates: true,
        marketAlerts: true,
        aiInsights: true
    };

};


export const saveNotificationSettings = (
    settings
) => {

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );

};


/*
    Simple helper for creating notifications
    only when the corresponding setting is enabled.
*/

export const addNotificationIfEnabled = ({
    setting,
    title,
    message,
    type = "system"
}) => {

    const settings =
        getNotificationSettings();

    if (!settings[setting]) {
        return null;
    }

    return addNotification({
        title,
        message,
        type
    });

};
