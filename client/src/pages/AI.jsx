import {
    useEffect,
    useRef,
    useState
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
    getAIInsight,
    askAI as askAIService
} from "../services/aiService";

import {
    addNotificationIfEnabled
} from "../services/notificationService";

import supabase from "../services/supabase";


function AI() {

    const [insight, setInsight] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [chat, setChat] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [chatLoading, setChatLoading] =
        useState(false);

    const [userId, setUserId] =
        useState(null);

    const chatEndRef =
        useRef(null);


    /*
     * Load the currently logged-in user's
     * AI chat history.
     */

    useEffect(() => {

        const loadUserChat = async () => {

            try {

                const {
                    data
                } = await supabase.auth.getUser();

                const currentUser =
                    data?.user;

                if (!currentUser) {

                    setUserId(null);

                    setChat([]);

                    return;

                }


                setUserId(
                    currentUser.id
                );


                const storageKey =
                    `tradesphere_ai_chat_${currentUser.id}`;


                const savedChat =
                    localStorage.getItem(
                        storageKey
                    );


                if (savedChat) {

                    try {

                        setChat(
                            JSON.parse(
                                savedChat
                            )
                        );

                    } catch (error) {

                        console.log(
                            "Unable to parse AI chat history:",
                            error
                        );

                        setChat([]);

                    }

                } else {

                    setChat([]);

                }

            } catch (error) {

                console.log(
                    "Unable to load user chat:",
                    error
                );

                setUserId(null);

                setChat([]);

            }

        };


        loadUserChat();


        const {
            data: authListener
        } = supabase.auth.onAuthStateChange(
            (event, session) => {

                if (
                    event === "SIGNED_IN" &&
                    session?.user
                ) {

                    const id =
                        session.user.id;

                    setUserId(id);


                    const storageKey =
                        `tradesphere_ai_chat_${id}`;


                    const savedChat =
                        localStorage.getItem(
                            storageKey
                        );


                    if (savedChat) {

                        try {

                            setChat(
                                JSON.parse(
                                    savedChat
                                )
                            );

                        } catch {

                            setChat([]);

                        }

                    } else {

                        setChat([]);

                    }

                }


                if (
                    event === "SIGNED_OUT"
                ) {

                    setUserId(null);

                    setChat([]);

                }

            }
        );


        return () => {

            authListener
                ?.subscription
                ?.unsubscribe();

        };

    }, []);


    /*
     * Load AI portfolio insight.
     */

    useEffect(() => {

        const loadInsight =
            async () => {

                try {

                    const data =
                        await getAIInsight();

                    setInsight(data);


                    if (
                        !sessionStorage.getItem(
                            "tradesphere_ai_notified"
                        )
                    ) {

                        addNotificationIfEnabled({

                            setting:
                                "aiInsights",

                            title:
                                "AI Insight Ready",

                            message:
                                "Your latest portfolio analysis is ready.",

                            type:
                                "ai"

                        });


                        sessionStorage.setItem(
                            "tradesphere_ai_notified",
                            "true"
                        );

                    }

                } catch (error) {

                    console.log(
                        "AI insight error:",
                        error
                    );

                    setInsight(
                        "Unable to generate investment insights."
                    );

                } finally {

                    setLoading(false);

                }

            };


        loadInsight();

    }, []);


    /*
     * Save chat only for the
     * currently logged-in user.
     */

    useEffect(() => {

        if (!userId) {
            return;
        }


        const storageKey =
            `tradesphere_ai_chat_${userId}`;


        localStorage.setItem(
            storageKey,
            JSON.stringify(chat)
        );

    }, [
        chat,
        userId
    ]);


    useEffect(() => {

        chatEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [
        chat,
        chatLoading
    ]);


    const askAI = async () => {

        if (
            !message.trim() ||
            chatLoading
        ) {

            return;

        }


        const userMessage =
            message.trim();


        setChat(prev => [

            ...prev,

            {
                role: "user",
                text: userMessage
            }

        ]);


        setMessage("");

        setChatLoading(true);


        try {

            const answer =
                await askAIService(
                    userMessage
                );


            setChat(prev => [

                ...prev,

                {
                    role: "ai",

                    text:
                        answer ||
                        "No response received."
                }

            ]);

        } catch (error) {

            console.log(
                "AI chat error:",
                error
            );


            setChat(prev => [

                ...prev,

                {
                    role: "ai",

                    text:
                        "Unable to answer right now. Please try again."
                }

            ]);

        } finally {

            setChatLoading(false);

        }

    };


    const clearChat = () => {

        setChat([]);


        if (userId) {

            localStorage.removeItem(
                `tradesphere_ai_chat_${userId}`
            );

        }

    };


    const handleKeyDown = (e) => {

        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {

            e.preventDefault();

            askAI();

        }

    };


    return (

        <DashboardLayout>


            <h1
                style={{
                    fontSize:
                        "34px",

                    marginBottom:
                        "10px"
                }}
            >
                AI Investment Insights
            </h1>


            <p
                style={{
                    color:
                        "#94A3B8"
                }}
            >
                AI powered portfolio analysis and TradeSphere assistant.
            </p>


            <div
                style={{
                    background:
                        "#111827",

                    padding:
                        "30px",

                    borderRadius:
                        "18px",

                    marginTop:
                        "30px",

                    lineHeight:
                        "1.7",

                    border:
                        "1px solid #1E293B"
                }}
            >

                <h2>
                    Portfolio Analysis
                </h2>


                <div
                    style={{
                        marginTop:
                            "15px",

                        color:
                            "#E2E8F0",

                        whiteSpace:
                            "pre-wrap",

                        lineHeight:
                            "1.7"
                    }}
                >

                    {

                        loading

                            ?

                            <span
                                style={{
                                    color:
                                        "#94A3B8"
                                }}
                            >
                                Analyzing portfolio...
                            </span>

                            :

                            insight

                    }

                </div>

            </div>


            <div
                style={{
                    background:
                        "#111827",

                    padding:
                        "30px",

                    borderRadius:
                        "18px",

                    marginTop:
                        "30px",

                    border:
                        "1px solid #1E293B"
                }}
            >

                <div
                    style={{
                        display:
                            "flex",

                        justifyContent:
                            "space-between",

                        alignItems:
                            "center"
                    }}
                >

                    <h2
                        style={{
                            margin:
                                0
                        }}
                    >
                        TradeSphere AI Assistant
                    </h2>


                    {

                        chat.length > 0 && (

                            <button
                                onClick={
                                    clearChat
                                }

                                style={{
                                    background:
                                        "transparent",

                                    color:
                                        "#94A3B8",

                                    border:
                                        "1px solid #334155",

                                    padding:
                                        "8px 14px",

                                    borderRadius:
                                        "8px",

                                    cursor:
                                        "pointer"
                                }}
                            >
                                Clear Chat
                            </button>

                        )

                    }

                </div>


                <div
                    style={{
                        height:
                            "300px",

                        overflowY:
                            "auto",

                        background:
                            "#0F172A",

                        padding:
                            "20px",

                        borderRadius:
                            "12px",

                        marginTop:
                            "20px",

                        border:
                            "1px solid #1E293B"
                    }}
                >

                    {

                        chat.length === 0

                            ?

                            <p
                                style={{
                                    color:
                                        "#64748B"
                                }}
                            >
                                Ask anything about your portfolio, stocks or investments.
                            </p>

                            :

                            chat.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <div
                                        key={
                                            index
                                        }

                                        style={{
                                            background:
                                                item.role ===
                                                "ai"
                                                    ? "#172554"
                                                    : "#1E293B",

                                            color:
                                                item.role ===
                                                "ai"
                                                    ? "#DBEAFE"
                                                    : "#F8FAFC",

                                            padding:
                                                "12px 15px",

                                            borderRadius:
                                                "10px",

                                            marginBottom:
                                                "12px",

                                            lineHeight:
                                                "1.6",

                                            fontSize:
                                                "15px",

                                            whiteSpace:
                                                "pre-wrap",

                                            border:
                                                "1px solid #334155"
                                        }}
                                    >

                                        <div
                                            style={{
                                                fontWeight:
                                                    "700",

                                                fontSize:
                                                    "13px",

                                                marginBottom:
                                                    "5px",

                                                color:
                                                    item.role ===
                                                    "ai"
                                                        ? "#60A5FA"
                                                        : "#CBD5E1"
                                            }}
                                        >

                                            {

                                                item.role ===
                                                "ai"

                                                    ?

                                                    "AI"

                                                    :

                                                    "You"

                                            }

                                        </div>


                                        <div>
                                            {
                                                item.text
                                            }
                                        </div>

                                    </div>

                                )
                            )

                    }


                    {

                        chatLoading && (

                            <div
                                style={{
                                    background:
                                        "#172554",

                                    color:
                                        "#93C5FD",

                                    padding:
                                        "12px 15px",

                                    borderRadius:
                                        "10px",

                                    border:
                                        "1px solid #334155"
                                }}
                            >
                                AI is thinking...
                            </div>

                        )

                    }


                    <div
                        ref={
                            chatEndRef
                        }
                    />

                </div>


                <div
                    style={{
                        display:
                            "flex",

                        gap:
                            "12px",

                        marginTop:
                            "20px"
                    }}
                >

                    <input
                        value={
                            message
                        }

                        onChange={(e) =>
                            setMessage(
                                e.target.value
                            )
                        }

                        onKeyDown={
                            handleKeyDown
                        }

                        placeholder=
                            "Ask about your investments..."

                        disabled={
                            chatLoading
                        }

                        style={{
                            flex:
                                1,

                            padding:
                                "14px",

                            background:
                                "#0F172A",

                            color:
                                "#F8FAFC",

                            border:
                                "1px solid #475569",

                            borderRadius:
                                "10px",

                            outline:
                                "none"
                        }}
                    />


                    <button
                        onClick={
                            askAI
                        }

                        disabled={
                            chatLoading
                        }

                        style={{
                            background:
                                chatLoading
                                    ? "#475569"
                                    : "#2563EB",

                            color:
                                "white",

                            border:
                                "none",

                            padding:
                                "14px 25px",

                            borderRadius:
                                "10px",

                            cursor:
                                chatLoading
                                    ? "not-allowed"
                                    : "pointer"
                        }}
                    >

                        {

                            chatLoading
                                ? "..."
                                : "Ask"

                        }

                    </button>

                </div>

            </div>


        </DashboardLayout>

    );

}


export default AI;