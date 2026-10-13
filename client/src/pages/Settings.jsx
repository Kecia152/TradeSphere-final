import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import supabase from "../services/supabase";

import {
    getNotificationSettings,
    saveNotificationSettings
} from "../services/notificationService";


function Settings() {

    const [active, setActive] = useState("Profile");

    const [user, setUser] = useState(null);

    const [name, setName] = useState("");

    const [saved, setSaved] = useState(false);

    const [notificationSettings, setNotificationSettings] =
        useState({
            portfolioUpdates: true,
            marketAlerts: true,
            aiInsights: true
        });


    useEffect(() => {

        const loadUser = async () => {

            try {

                const { data } =
                    await supabase.auth.getUser();

                if (data?.user) {

                    setUser(data.user);

                    setName(
                        data.user.user_metadata?.name || ""
                    );

                }

            } catch (error) {

                console.log(
                    "Unable to load user:",
                    error
                );

            }

        };


        loadUser();

        setNotificationSettings(
            getNotificationSettings()
        );

    }, []);


    const saveProfile = async () => {

        try {

            const { error } =
                await supabase.auth.updateUser({
                    data: {
                        name: name.trim()
                    }
                });

            if (error) {
                throw error;
            }

            setSaved(true);

            setTimeout(
                () => setSaved(false),
                2500
            );

        } catch (error) {

            console.log(
                "Profile update error:",
                error
            );

        }

    };


    const updateNotificationSetting = (key) => {

        const updated = {
            ...notificationSettings,
            [key]: !notificationSettings[key]
        };

        setNotificationSettings(updated);

        saveNotificationSettings(updated);

    };


    const menu = [
        {
            name: "Profile",
            icon: "👤"
        },
        {
            name: "Security",
            icon: "🔒"
        },
        {
            name: "Notifications",
            icon: "🔔"
        }
    ];


    const notifications = [
        {
            key: "portfolioUpdates",
            title: "Portfolio Updates",
            description:
                "Stay informed about stocks added, sold, and portfolio activity."
        },
        {
            key: "marketAlerts",
            title: "Market Alerts",
            description:
                "Receive alerts about significant stock movements."
        },
        {
            key: "aiInsights",
            title: "AI Insights",
            description:
                "Get notified when new AI portfolio insights are available."
        }
    ];


    const Toggle = ({ setting }) => (

        <button
            onClick={() =>
                updateNotificationSetting(setting)
            }
            style={{
                width: "48px",
                height: "26px",
                border: "none",
                borderRadius: "20px",
                background:
                    notificationSettings[setting]
                        ? "#2563EB"
                        : "#334155",
                cursor: "pointer",
                position: "relative",
                flexShrink: 0
            }}
        >

            <span
                style={{
                    position: "absolute",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "white",
                    top: "3px",
                    left:
                        notificationSettings[setting]
                            ? "25px"
                            : "3px"
                }}
            />

        </button>

    );


    const Card = ({ children }) => (

        <div
            style={{
                background: "#0F172A",
                border: "1px solid #1E293B",
                borderRadius: "12px",
                padding: "20px"
            }}
        >
            {children}
        </div>

    );


    const renderContent = () => {

        if (active === "Profile") {

            return (

                <div>

                    <div
                        style={{
                            marginBottom: "30px"
                        }}
                    >

                        <h2
                            style={{
                                marginBottom: "8px"
                            }}
                        >
                            Profile Settings
                        </h2>

                        <p
                            style={{
                                color: "#94A3B8",
                                margin: 0
                            }}
                        >
                            Manage your personal information and account details.
                        </p>

                    </div>


                    <div
                        style={{
                            display: "grid",
                            gap: "22px"
                        }}
                    >

                        <div>

                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    color: "#CBD5E1",
                                    fontSize: "14px"
                                }}
                            >
                                Full Name
                            </label>

                            <input
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                placeholder="Enter your name"
                                style={{
                                    width: "100%",
                                    boxSizing: "border-box",
                                    padding: "13px 15px",
                                    background: "#0F172A",
                                    color: "#F8FAFC",
                                    border:
                                        "1px solid #334155",
                                    borderRadius: "10px",
                                    outline: "none",
                                    fontSize: "15px"
                                }}
                            />

                        </div>


                        <div>

                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    color: "#CBD5E1",
                                    fontSize: "14px"
                                }}
                            >
                                Email Address
                            </label>

                            <input
                                value={
                                    user?.email || ""
                                }
                                disabled
                                style={{
                                    width: "100%",
                                    boxSizing: "border-box",
                                    padding: "13px 15px",
                                    background: "#1E293B",
                                    color: "#94A3B8",
                                    border:
                                        "1px solid #334155",
                                    borderRadius: "10px",
                                    outline: "none",
                                    fontSize: "15px"
                                }}
                            />

                            <p
                                style={{
                                    color: "#64748B",
                                    fontSize: "12px",
                                    marginTop: "7px"
                                }}
                            >
                                Your email is managed through your authentication account.
                            </p>

                        </div>


                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "15px"
                            }}
                        >

                            <button
                                onClick={saveProfile}
                                style={{
                                    background: "#2563EB",
                                    color: "white",
                                    border: "none",
                                    padding: "12px 22px",
                                    borderRadius: "9px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: "600"
                                }}
                            >
                                Save Changes
                            </button>


                            {saved && (

                                <span
                                    style={{
                                        color: "#4ADE80",
                                        fontSize: "14px"
                                    }}
                                >
                                    Profile updated successfully.
                                </span>

                            )}

                        </div>

                    </div>

                </div>

            );

        }


        if (active === "Security") {

            return (

                <div>

                    <h2
                        style={{
                            marginBottom: "8px"
                        }}
                    >
                        Security
                    </h2>

                    <p
                        style={{
                            color: "#94A3B8",
                            marginBottom: "30px"
                        }}
                    >
                        Manage your account security and authentication.
                    </p>


                    <div
                        style={{
                            display: "grid",
                            gap: "15px"
                        }}
                    >

                        <Card>

                            <h3
                                style={{
                                    marginTop: 0,
                                    marginBottom: "7px"
                                }}
                            >
                                Password & Authentication
                            </h3>

                            <p
                                style={{
                                    color: "#94A3B8",
                                    fontSize: "14px",
                                    lineHeight: "1.6",
                                    margin: 0
                                }}
                            >
                                Your TradeSphere account is securely authenticated through Supabase. Password management and authentication are handled through your account.
                            </p>

                        </Card>


                        <Card>

                            <h3
                                style={{
                                    marginTop: 0,
                                    marginBottom: "7px"
                                }}
                            >
                                Account Protection
                            </h3>

                            <p
                                style={{
                                    color: "#94A3B8",
                                    fontSize: "14px",
                                    lineHeight: "1.6",
                                    margin: 0
                                }}
                            >
                                Never share your login credentials or authentication tokens with anyone.
                            </p>

                        </Card>

                    </div>

                </div>

            );

        }


        if (active === "Notifications") {

            return (

                <div>

                    <h2
                        style={{
                            marginBottom: "8px"
                        }}
                    >
                        Notifications
                    </h2>

                    <p
                        style={{
                            color: "#94A3B8",
                            marginBottom: "30px"
                        }}
                    >
                        Control how TradeSphere keeps you informed.
                    </p>


                    <div
                        style={{
                            display: "grid",
                            gap: "14px"
                        }}
                    >

                        {notifications.map(item => (

                            <Card key={item.key}>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >

                                    <div>

                                        <h3
                                            style={{
                                                margin: "0 0 6px"
                                            }}
                                        >
                                            {item.title}
                                        </h3>

                                        <p
                                            style={{
                                                margin: 0,
                                                color: "#94A3B8",
                                                fontSize: "14px"
                                            }}
                                        >
                                            {item.description}
                                        </p>

                                    </div>


                                    <Toggle
                                        setting={item.key}
                                    />

                                </div>

                            </Card>

                        ))}

                    </div>

                </div>

            );

        }

    };


    return (

        <DashboardLayout>

            <div>

                <h1
                    style={{
                        fontSize: "34px",
                        marginBottom: "8px"
                    }}
                >
                    Settings
                </h1>


                <p
                    style={{
                        color: "#94A3B8",
                        marginBottom: "30px"
                    }}
                >
                    Manage your TradeSphere account and preferences.
                </p>


                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "240px 1fr",
                        gap: "25px",
                        alignItems: "start"
                    }}
                >

                    <div
                        style={{
                            background: "#111827",
                            padding: "15px",
                            borderRadius: "16px",
                            border:
                                "1px solid #1E293B"
                        }}
                    >

                        {menu.map(item => (

                            <button
                                key={item.name}
                                onClick={() =>
                                    setActive(item.name)
                                }
                                style={{
                                    width: "100%",
                                    padding: "13px 14px",
                                    marginBottom: "7px",
                                    textAlign: "left",
                                    border: "none",
                                    borderRadius: "9px",
                                    cursor: "pointer",
                                    background:
                                        active === item.name
                                            ? "#2563EB"
                                            : "transparent",
                                    color:
                                        active === item.name
                                            ? "white"
                                            : "#CBD5E1",
                                    fontSize: "14px",
                                    fontWeight:
                                        active === item.name
                                            ? "600"
                                            : "400"
                                }}
                            >

                                <span
                                    style={{
                                        marginRight: "10px"
                                    }}
                                >
                                    {item.icon}
                                </span>

                                {item.name}

                            </button>

                        ))}

                    </div>


                    <div
                        style={{
                            background: "#111827",
                            padding: "30px",
                            borderRadius: "16px",
                            border:
                                "1px solid #1E293B",
                            minHeight: "360px"
                        }}
                    >

                        {renderContent()}

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}


export default Settings;