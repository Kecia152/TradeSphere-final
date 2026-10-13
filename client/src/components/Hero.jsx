import { Link } from "react-router-dom";


function Hero() {

    const scrollTo = (id) => {

        const section =
            document.getElementById(id);

        if (section) {

            section.scrollIntoView({
                behavior: "smooth"
            });

        }

    };


    return (

        <div
            style={{
                background: "#020617",
                color: "#F8FAFC",
                minHeight: "100vh",
                overflowX: "hidden"
            }}
        >

            {/* NAVBAR */}

            <nav
                style={{
                    height: "72px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 30px",
                    boxSizing: "border-box"
                }}
            >

                <div
                    style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        letterSpacing: "-0.5px"
                    }}
                >
                    Trade<span
                        style={{
                            color: "#3B82F6"
                        }}
                    >
                        Sphere
                    </span>
                </div>


                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "28px"
                    }}
                >

                    <button
                        onClick={() =>
                            scrollTo("features")
                        }
                        style={{
                            background: "none",
                            border: "none",
                            color: "#CBD5E1",
                            cursor: "pointer",
                            fontSize: "14px"
                        }}
                    >
                        Features
                    </button>


                    <button
                        onClick={() =>
                            scrollTo("how-it-works")
                        }
                        style={{
                            background: "none",
                            border: "none",
                            color: "#CBD5E1",
                            cursor: "pointer",
                            fontSize: "14px"
                        }}
                    >
                        How It Works
                    </button>


                    <Link
                        to="/login"
                        style={{
                            color: "#CBD5E1",
                            textDecoration: "none",
                            fontSize: "14px"
                        }}
                    >
                        Log In
                    </Link>


                    <Link
                        to="/signup"
                        style={{
                            textDecoration: "none"
                        }}
                    >

                        <button
                            style={{
                                background: "#2563EB",
                                color: "white",
                                border: "none",
                                padding: "10px 18px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "600"
                            }}
                        >
                            Get Started
                        </button>

                    </Link>

                </div>

            </nav>


            {/* HERO */}

            <section
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "95px 30px 80px",
                    boxSizing: "border-box"
                }}
            >

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "1fr 1fr",
                        gap: "70px",
                        alignItems: "center"
                    }}
                >

                    <div>

                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "7px 13px",
                                borderRadius: "20px",
                                background: "#0F172A",
                                border:
                                    "1px solid #1E293B",
                                color: "#60A5FA",
                                fontSize: "13px",
                                marginBottom: "25px"
                            }}
                        >

                            <span
                                style={{
                                    width: "7px",
                                    height: "7px",
                                    background: "#22C55E",
                                    borderRadius: "50%"
                                }}
                            />

                            Your smarter investment workspace

                        </div>


                        <h1
                            style={{
                                fontSize:
                                    "clamp(44px, 5vw, 68px)",
                                lineHeight: "1.04",
                                letterSpacing: "-2.5px",
                                margin: "0 0 25px",
                                fontWeight: "700"
                            }}
                        >
                            Your investments.
                            <br />

                            <span
                                style={{
                                    color: "#3B82F6"
                                }}
                            >
                                One smarter view.
                            </span>
                        </h1>


                        <p
                            style={{
                                color: "#94A3B8",
                                fontSize: "18px",
                                lineHeight: "1.7",
                                maxWidth: "600px",
                                marginBottom: "35px"
                            }}
                        >
                            Track your portfolio, explore market
                            data, visualize performance, and get
                            AI-powered insights — all in one place.
                        </p>


                        <div
                            style={{
                                display: "flex",
                                gap: "14px",
                                flexWrap: "wrap"
                            }}
                        >

                            <Link
                                to="/signup"
                                style={{
                                    textDecoration: "none"
                                }}
                            >

                                <button
                                    style={{
                                        background: "#2563EB",
                                        color: "white",
                                        border: "none",
                                        padding:
                                            "14px 25px",
                                        borderRadius: "9px",
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        cursor: "pointer"
                                    }}
                                >
                                    Get Started
                                </button>

                            </Link>


                            <button
                                onClick={() =>
                                    scrollTo("features")
                                }
                                style={{
                                    background: "#0F172A",
                                    color: "#E2E8F0",
                                    border:
                                        "1px solid #334155",
                                    padding:
                                        "14px 25px",
                                    borderRadius: "9px",
                                    fontSize: "15px",
                                    cursor: "pointer"
                                }}
                            >
                                Explore TradeSphere
                            </button>

                        </div>


                        <div
                            style={{
                                display: "flex",
                                gap: "25px",
                                marginTop: "35px",
                                color: "#64748B",
                                fontSize: "13px",
                                flexWrap: "wrap"
                            }}
                        >

                            <span>
                                ✓ Portfolio tracking
                            </span>

                            <span>
                                ✓ Market data
                            </span>

                            <span>
                                ✓ AI insights
                            </span>

                        </div>

                    </div>


                    {/* PRODUCT PREVIEW */}

                    <div
                        style={{
                            position: "relative"
                        }}
                    >

                        <div
                            style={{
                                background: "#0F172A",
                                border:
                                    "1px solid #1E293B",
                                borderRadius: "18px",
                                padding: "18px",
                                boxShadow:
                                    "0 25px 70px rgba(0,0,0,0.35)"
                            }}
                        >

                            {/* fake browser top */}

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    marginBottom: "18px"
                                }}
                            >

                                <span
                                    style={{
                                        width: "7px",
                                        height: "7px",
                                        borderRadius: "50%",
                                        background: "#334155"
                                    }}
                                />

                                <span
                                    style={{
                                        width: "7px",
                                        height: "7px",
                                        borderRadius: "50%",
                                        background: "#334155"
                                    }}
                                />

                                <span
                                    style={{
                                        width: "7px",
                                        height: "7px",
                                        borderRadius: "50%",
                                        background: "#334155"
                                    }}
                                />

                            </div>


                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "1fr 1fr",
                                    gap: "12px"
                                }}
                            >

                                <div
                                    style={{
                                        gridColumn:
                                            "1 / -1",
                                        background:
                                            "#111827",
                                        border:
                                            "1px solid #1E293B",
                                        borderRadius: "12px",
                                        padding: "18px"
                                    }}
                                >

                                    <p
                                        style={{
                                            color: "#64748B",
                                            margin: "0 0 8px",
                                            fontSize: "12px"
                                        }}
                                    >
                                        Portfolio Value
                                    </p>

                                    <div
                                        style={{
                                            fontSize: "27px",
                                            fontWeight: "700"
                                        }}
                                    >
                                        ₹1,24,580
                                    </div>

                                    <span
                                        style={{
                                            color: "#22C55E",
                                            fontSize: "12px"
                                        }}
                                    >
                                        +4.82% today
                                    </span>

                                </div>


                                <div
                                    style={{
                                        background:
                                            "#111827",
                                        border:
                                            "1px solid #1E293B",
                                        borderRadius: "12px",
                                        padding: "16px"
                                    }}
                                >

                                    <p
                                        style={{
                                            color: "#64748B",
                                            margin: "0 0 8px",
                                            fontSize: "11px"
                                        }}
                                    >
                                        Holdings
                                    </p>

                                    <strong>
                                        08
                                    </strong>

                                </div>


                                <div
                                    style={{
                                        background:
                                            "#111827",
                                        border:
                                            "1px solid #1E293B",
                                        borderRadius: "12px",
                                        padding: "16px"
                                    }}
                                >

                                    <p
                                        style={{
                                            color: "#64748B",
                                            margin: "0 0 8px",
                                            fontSize: "11px"
                                        }}
                                    >
                                        Watchlist
                                    </p>

                                    <strong>
                                        05
                                    </strong>

                                </div>


                                <div
                                    style={{
                                        gridColumn:
                                            "1 / -1",
                                        background:
                                            "#111827",
                                        border:
                                            "1px solid #1E293B",
                                        borderRadius: "12px",
                                        padding: "18px"
                                    }}
                                >

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent:
                                                "space-between",
                                            marginBottom:
                                                "20px"
                                        }}
                                    >

                                        <span
                                            style={{
                                                fontSize: "13px",
                                                fontWeight: "600"
                                            }}
                                        >
                                            Portfolio Performance
                                        </span>

                                        <span
                                            style={{
                                                color:
                                                    "#22C55E",
                                                fontSize: "12px"
                                            }}
                                        >
                                            +8.41%
                                        </span>

                                    </div>


                                    <div
                                        style={{
                                            height: "110px",
                                            display: "flex",
                                            alignItems:
                                                "flex-end",
                                            gap: "7px"
                                        }}
                                    >

                                        {[35, 48, 42, 62, 55, 72, 68, 82, 75, 95].map(
                                            (height, index) => (

                                                <div
                                                    key={index}
                                                    style={{
                                                        flex: 1,
                                                        height:
                                                            `${height}%`,
                                                        background:
                                                            index === 9
                                                                ? "#3B82F6"
                                                                : "#1D4ED8",
                                                        borderRadius:
                                                            "4px 4px 0 0",
                                                        opacity:
                                                            index === 9
                                                                ? 1
                                                                : 0.45
                                                    }}
                                                />

                                            )
                                        )}

                                    </div>

                                </div>


                                <div
                                    style={{
                                        background:
                                            "#111827",
                                        border:
                                            "1px solid #1E293B",
                                        borderRadius: "12px",
                                        padding: "15px"
                                    }}
                                >

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent:
                                                "space-between"
                                        }}
                                    >

                                        <span
                                            style={{
                                                fontWeight:
                                                    "600",
                                                fontSize: "13px"
                                            }}
                                        >
                                            TCS
                                        </span>

                                        <span
                                            style={{
                                                color:
                                                    "#22C55E",
                                                fontSize:
                                                    "12px"
                                            }}
                                        >
                                            +2.41%
                                        </span>

                                    </div>

                                </div>


                                <div
                                    style={{
                                        background:
                                            "#111827",
                                        border:
                                            "1px solid #1E293B",
                                        borderRadius: "12px",
                                        padding: "15px"
                                    }}
                                >

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent:
                                                "space-between"
                                        }}
                                    >

                                        <span
                                            style={{
                                                fontWeight:
                                                    "600",
                                                fontSize: "13px"
                                            }}
                                        >
                                            INFY
                                        </span>

                                        <span
                                            style={{
                                                color:
                                                    "#22C55E",
                                                fontSize:
                                                    "12px"
                                            }}
                                        >
                                            +1.83%
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* FEATURES */}

            <section
                id="features"
                style={{
                    padding:
                        "95px 30px",
                    background:
                        "#0F172A"
                }}
            >

                <div
                    style={{
                        maxWidth:
                            "1150px",
                        margin:
                            "0 auto"
                    }}
                >

                    <div
                        style={{
                            maxWidth:
                                "650px",
                            marginBottom:
                                "50px"
                        }}
                    >

                        <p
                            style={{
                                color:
                                    "#3B82F6",
                                fontSize:
                                    "13px",
                                fontWeight:
                                    "600",
                                textTransform:
                                    "uppercase",
                                letterSpacing:
                                    "1px",
                                marginBottom:
                                    "12px"
                            }}
                        >
                            Everything in one place
                        </p>


                        <h2
                            style={{
                                fontSize:
                                    "38px",
                                margin:
                                    "0 0 15px",
                                letterSpacing:
                                    "-1px"
                            }}
                        >
                            Built around your portfolio.
                        </h2>


                        <p
                            style={{
                                color:
                                    "#94A3B8",
                                lineHeight:
                                    "1.7",
                                margin:
                                    0
                            }}
                        >
                            The tools you need to keep track of your
                            investments, understand market movements,
                            and make sense of your portfolio data.
                        </p>

                    </div>


                    <div
                        style={{
                            display:
                                "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(250px, 1fr))",
                            gap:
                                "16px"
                        }}
                    >

                        {[
                            {
                                icon: "◈",
                                title: "Portfolio Tracking",
                                text:
                                    "Track your holdings, quantities, current values, transactions, and portfolio performance."
                            },
                            {
                                icon: "↗",
                                title: "Market Data",
                                text:
                                    "Search stocks, view current prices, explore historical data, and analyze charts."
                            },
                            {
                                icon: "✦",
                                title: "AI Insights",
                                text:
                                    "Get AI-powered portfolio analysis and ask questions through the TradeSphere assistant."
                            },
                            {
                                icon: "☆",
                                title: "Watchlist",
                                text:
                                    "Keep the stocks you care about in one place and quickly access them when you need them."
                            },
                            {
                                icon: "⌁",
                                title: "Charts & Analysis",
                                text:
                                    "Visualize stock performance through historical and candlestick charts."
                            },
                            {
                                icon: "♢",
                                title: "Notifications",
                                text:
                                    "Stay informed about portfolio activity, watchlist changes, and AI insights."
                            }
                        ].map((item) => (

                            <div
                                key={item.title}
                                style={{
                                    background:
                                        "#111827",
                                    border:
                                        "1px solid #1E293B",
                                    borderRadius:
                                        "14px",
                                    padding:
                                        "25px"
                                }}
                            >

                                <div
                                    style={{
                                        width:
                                            "42px",
                                        height:
                                            "42px",
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        justifyContent:
                                            "center",
                                        background:
                                            "#172554",
                                        color:
                                            "#60A5FA",
                                        borderRadius:
                                            "10px",
                                        fontSize:
                                            "20px",
                                        marginBottom:
                                            "20px"
                                    }}
                                >
                                    {item.icon}
                                </div>


                                <h3
                                    style={{
                                        margin:
                                            "0 0 9px",
                                        fontSize:
                                            "17px"
                                    }}
                                >
                                    {item.title}
                                </h3>


                                <p
                                    style={{
                                        color:
                                            "#94A3B8",
                                        fontSize:
                                            "14px",
                                        lineHeight:
                                            "1.65",
                                        margin:
                                            0
                                    }}
                                >
                                    {item.text}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* HOW IT WORKS */}

            <section
                id="how-it-works"
                style={{
                    padding:
                        "100px 30px"
                }}
            >

                <div
                    style={{
                        maxWidth:
                            "1050px",
                        margin:
                            "0 auto"
                    }}
                >

                    <div
                        style={{
                            textAlign:
                                "center",
                            marginBottom:
                                "60px"
                        }}
                    >

                        <p
                            style={{
                                color:
                                    "#3B82F6",
                                fontSize:
                                    "13px",
                                fontWeight:
                                    "600",
                                textTransform:
                                    "uppercase",
                                letterSpacing:
                                    "1px"
                            }}
                        >
                            Simple by design
                        </p>


                        <h2
                            style={{
                                fontSize:
                                    "38px",
                                margin:
                                    "10px 0 15px"
                            }}
                        >
                            How TradeSphere works
                        </h2>


                        <p
                            style={{
                                color:
                                    "#94A3B8",
                                maxWidth:
                                    "600px",
                                margin:
                                    "0 auto",
                                lineHeight:
                                    "1.6"
                            }}
                        >
                            Everything is designed to give you a
                            clearer view of your investments.
                        </p>

                    </div>


                    <div
                        style={{
                            display:
                                "grid",
                            gridTemplateColumns:
                                "repeat(3, 1fr)",
                            gap:
                                "25px"
                        }}
                    >

                        {[
                            {
                                number: "01",
                                title: "Track",
                                text:
                                    "Add your holdings and keep your portfolio organized with transactions and current values."
                            },
                            {
                                number: "02",
                                title: "Explore",
                                text:
                                    "Search stocks, follow your watchlist, and explore market prices and historical charts."
                            },
                            {
                                number: "03",
                                title: "Understand",
                                text:
                                    "Use portfolio analytics and AI-powered insights to better understand your investment data."
                            }
                        ].map((item) => (

                            <div
                                key={item.number}
                                style={{
                                    padding:
                                        "28px",
                                    borderTop:
                                        "1px solid #334155"
                                }}
                            >

                                <div
                                    style={{
                                        color:
                                            "#3B82F6",
                                        fontSize:
                                            "13px",
                                        fontWeight:
                                            "700",
                                        marginBottom:
                                            "25px"
                                    }}
                                >
                                    {item.number}
                                </div>


                                <h3
                                    style={{
                                        fontSize:
                                            "22px",
                                        margin:
                                            "0 0 12px"
                                    }}
                                >
                                    {item.title}
                                </h3>


                                <p
                                    style={{
                                        color:
                                            "#94A3B8",
                                        lineHeight:
                                            "1.7",
                                        fontSize:
                                            "14px",
                                        margin:
                                            0
                                    }}
                                >
                                    {item.text}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* AI SECTION */}

            <section
                style={{
                    padding:
                        "80px 30px",
                    background:
                        "#0F172A"
                }}
            >

                <div
                    style={{
                        maxWidth:
                            "1050px",
                        margin:
                            "0 auto",
                        background:
                            "#111827",
                        border:
                            "1px solid #1E293B",
                        borderRadius:
                            "20px",
                        padding:
                            "55px",
                        display:
                            "grid",
                        gridTemplateColumns:
                            "1fr 1fr",
                        gap:
                            "60px",
                        alignItems:
                            "center",
                        boxSizing:
                            "border-box"
                    }}
                >

                    <div>

                        <p
                            style={{
                                color:
                                    "#60A5FA",
                                fontSize:
                                    "13px",
                                fontWeight:
                                    "600",
                                textTransform:
                                    "uppercase",
                                letterSpacing:
                                    "1px"
                            }}
                        >
                            AI-powered
                        </p>


                        <h2
                            style={{
                                fontSize:
                                    "36px",
                                margin:
                                    "12px 0 18px",
                                lineHeight:
                                    "1.2"
                            }}
                        >
                            Understand your portfolio beyond the numbers.
                        </h2>


                        <p
                            style={{
                                color:
                                    "#94A3B8",
                                lineHeight:
                                    "1.7",
                                margin:
                                    0
                            }}
                        >
                            TradeSphere's AI can analyze your portfolio
                            and help you explore your investment data
                            through a conversational assistant.
                        </p>

                    </div>


                    <div
                        style={{
                            background:
                                "#020617",
                            border:
                                "1px solid #1E293B",
                            borderRadius:
                                "14px",
                            padding:
                                "20px"
                        }}
                    >

                        <div
                            style={{
                                color:
                                    "#60A5FA",
                                fontSize:
                                    "12px",
                                fontWeight:
                                    "700",
                                marginBottom:
                                    "12px"
                            }}
                        >
                            TRADESPHERE AI
                        </div>


                        <div
                            style={{
                                background:
                                    "#172554",
                                borderRadius:
                                    "10px",
                                padding:
                                    "14px",
                                color:
                                    "#DBEAFE",
                                fontSize:
                                    "14px",
                                lineHeight:
                                    "1.6",
                                marginBottom:
                                    "10px"
                            }}
                        >
                            Your portfolio is currently diversified
                            across multiple holdings. Here are some
                            areas worth reviewing...
                        </div>


                        <div
                            style={{
                                background:
                                    "#1E293B",
                                borderRadius:
                                    "10px",
                                padding:
                                    "14px",
                                color:
                                    "#F8FAFC",
                                fontSize:
                                    "14px"
                            }}
                        >
                            What should I look at first?
                        </div>

                    </div>

                </div>

            </section>


            {/* FINAL CTA */}

            <section
                style={{
                    padding:
                        "110px 30px",
                    textAlign:
                        "center"
                }}
            >

                <div
                    style={{
                        maxWidth:
                            "700px",
                        margin:
                            "0 auto"
                    }}
                >

                    <h2
                        style={{
                            fontSize:
                                "42px",
                            margin:
                                "0 0 18px",
                            letterSpacing:
                                "-1px"
                        }}
                    >
                        A clearer view of your investments.
                    </h2>


                    <p
                        style={{
                            color:
                                "#94A3B8",
                            lineHeight:
                                "1.7",
                            marginBottom:
                                "30px"
                        }}
                    >
                        Start exploring your portfolio, the market,
                        and your investment insights with TradeSphere.
                    </p>


                    <Link
                        to="/signup"
                        style={{
                            textDecoration:
                                "none"
                        }}
                    >

                        <button
                            style={{
                                background:
                                    "#2563EB",
                                color:
                                    "white",
                                border:
                                    "none",
                                padding:
                                    "15px 30px",
                                borderRadius:
                                    "9px",
                                fontSize:
                                    "15px",
                                fontWeight:
                                    "600",
                                cursor:
                                    "pointer"
                            }}
                        >
                            Get Started
                        </button>

                    </Link>

                </div>

            </section>


            {/* FOOTER */}

            <footer
                style={{
                    borderTop:
                        "1px solid #1E293B",
                    padding:
                        "30px",
                    color:
                        "#64748B",
                    fontSize:
                        "13px"
                }}
            >

                <div
                    style={{
                        maxWidth:
                            "1200px",
                        margin:
                            "0 auto",
                        display:
                            "flex",
                        justifyContent:
                            "space-between",
                        alignItems:
                            "center",
                        gap:
                            "20px",
                        flexWrap:
                            "wrap"
                    }}
                >

                    <div
                        style={{
                            color:
                                "#CBD5E1",
                            fontWeight:
                                "600"
                        }}
                    >
                        Trade<span
                            style={{
                                color:
                                    "#3B82F6"
                            }}
                        >
                            Sphere
                        </span>
                    </div>


                    <div>
                        Portfolio tracking • Market data • AI insights
                    </div>


                    <div>
                        Built as a portfolio project.
                    </div>

                </div>

            </footer>

        </div>

    );

}


export default Hero;