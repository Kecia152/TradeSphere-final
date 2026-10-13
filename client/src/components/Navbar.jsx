import { useEffect, useState } from "react";

import {
  Search,
  Bell,
  CircleUserRound,
  TrendingUp,
} from "lucide-react";

import useAuth from "../hooks/useAuth";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../services/notificationService";


function Navbar() {

  const { user } = useAuth();

  const [notifications, setNotifications] =
    useState([]);

  const [showNotifications, setShowNotifications] =
    useState(false);


  const loadNotifications = () => {

    setNotifications(
      getNotifications()
    );

  };


  useEffect(() => {

    loadNotifications();


    const interval =
      setInterval(
        loadNotifications,
        3000
      );


    return () => {
      clearInterval(interval);
    };

  }, []);


  const unreadCount =
    notifications.filter(
      notification =>
        !notification.read
    ).length;


  const handleNotificationClick = (
    notification
  ) => {

    if (!notification.read) {

      markNotificationRead(
        notification.id
      );

      loadNotifications();

    }

  };


  const handleMarkAllRead = () => {

    markAllNotificationsRead();

    loadNotifications();

  };


  return (

    <header
      style={{
        height: "78px",
        background: "rgba(15,23,42,0.95)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #1E293B",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >

        <div>

          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              color: "#F8FAFC",
              fontWeight: "700",
            }}
          >
            Dashboard
          </h2>

          <p
            style={{
              marginTop: "6px",
              color: "#94A3B8",
              fontSize: "14px",
            }}
          >
            Monitor your portfolio performance
          </p>

        </div>


        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "360px",
            background: "#111827",
            border: "1px solid #1E293B",
            borderRadius: "14px",
            padding: "12px 18px",
          }}
        >

          <Search
            size={18}
            color="#64748B"
          />

          <input
            type="text"
            placeholder="Search stocks..."
            style={{
              flex: 1,
              marginLeft: "12px",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "15px",
            }}
          />

        </div>

      </div>


      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#111827",
            border: "1px solid #1E293B",
            padding: "10px 16px",
            borderRadius: "12px",
          }}
        >

          <TrendingUp
            size={18}
            color="#22C55E"
          />

          <span
            style={{
              color: "#22C55E",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Market Open
          </span>

        </div>


        {/* Notification Bell */}

        <div
          style={{
            position: "relative"
          }}
        >

          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              background: "#111827",
              border: "1px solid #1E293B",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transition: ".25s",
            }}

            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }

            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "#1E293B";
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "#111827";
            }}
          >

            <Bell
              size={20}
              color="#CBD5E1"
            />


            {

              unreadCount > 0 && (

                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-2px",
                    minWidth: "18px",
                    height: "18px",
                    padding: "0 4px",
                    background: "#EF4444",
                    color: "white",
                    borderRadius: "20px",
                    fontSize: "10px",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border:
                      "2px solid #0F172A"
                  }}
                >
                  {
                    unreadCount > 9
                      ? "9+"
                      : unreadCount
                  }
                </span>

              )

            }

          </div>


          {

            showNotifications && (

              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "58px",
                  width: "360px",
                  background: "#111827",
                  border:
                    "1px solid #1E293B",
                  borderRadius: "14px",
                  boxShadow:
                    "0 20px 40px rgba(0,0,0,0.35)",
                  overflow: "hidden",
                  zIndex: 2000
                }}
              >

                <div
                  style={{
                    padding:
                      "16px 18px",
                    borderBottom:
                      "1px solid #1E293B",
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center"
                  }}
                >

                  <h3
                    style={{
                      margin: 0,
                      color:
                        "#F8FAFC",
                      fontSize:
                        "16px"
                    }}
                  >
                    Notifications
                  </h3>


                  {

                    unreadCount > 0 && (

                      <button
                        onClick={
                          handleMarkAllRead
                        }
                        style={{
                          background:
                            "transparent",
                          border:
                            "none",
                          color:
                            "#60A5FA",
                          cursor:
                            "pointer",
                          fontSize:
                            "12px"
                        }}
                      >
                        Mark all as read
                      </button>

                    )

                  }

                </div>


                <div
                  style={{
                    maxHeight:
                      "360px",
                    overflowY:
                      "auto"
                  }}
                >

                  {

                    notifications.length === 0

                      ?

                      <div
                        style={{
                          padding:
                            "30px 20px",
                          textAlign:
                            "center",
                          color:
                            "#64748B"
                        }}
                      >
                        No notifications
                      </div>

                      :

                      notifications.map(
                        notification => (

                          <div
                            key={
                              notification.id
                            }

                            onClick={() =>
                              handleNotificationClick(
                                notification
                              )
                            }

                            style={{
                              padding:
                                "15px 18px",
                              borderBottom:
                                "1px solid #1E293B",
                              background:
                                notification.read
                                  ? "transparent"
                                  : "#172554",
                              cursor:
                                "pointer"
                            }}
                          >

                            <div
                              style={{
                                display:
                                  "flex",
                                justifyContent:
                                  "space-between",
                                gap:
                                  "10px"
                              }}
                            >

                              <strong
                                style={{
                                  color:
                                    "#F8FAFC",
                                  fontSize:
                                    "14px"
                                }}
                              >
                                {
                                  notification.title
                                }
                              </strong>


                              {

                                !notification.read && (

                                  <span
                                    style={{
                                      width:
                                        "7px",
                                      height:
                                        "7px",
                                      background:
                                        "#3B82F6",
                                      borderRadius:
                                        "50%",
                                      marginTop:
                                        "5px",
                                      flexShrink:
                                        0
                                    }}
                                  />

                                )

                              }

                            </div>


                            <p
                              style={{
                                margin:
                                  "6px 0 0",
                                color:
                                  "#94A3B8",
                                fontSize:
                                  "13px",
                                lineHeight:
                                  "1.5"
                              }}
                            >
                              {
                                notification.message
                              }
                            </p>

                          </div>

                        )
                      )

                  }

                </div>

              </div>

            )

          }

        </div>


        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            background: "#111827",
            border: "1px solid #1E293B",
            borderRadius: "16px",
            padding: "10px 16px",
          }}
        >

          <CircleUserRound
            size={40}
            color="#3B82F6"
          />

          <div>

            <h4
              style={{
                margin: 0,
                color: "#F8FAFC",
                fontWeight: "600",
              }}
            >
              {user?.name || "User"}
            </h4>

            <p
              style={{
                marginTop: "4px",
                color: "#94A3B8",
                fontSize: "13px",
              }}
            >
              Premium Investor
            </p>

          </div>

        </div>

      </div>

    </header>

  );

}

export default Navbar;