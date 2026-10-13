import DashboardLayout from "../layouts/DashboardLayout";



function News(){


    const sources = [


        {
            name:"NSE India",

            description:
            "Official National Stock Exchange website for market data, indices and announcements.",

            link:"https://www.nseindia.com"

        },


        {
            name:"BSE India",

            description:
            "Official Bombay Stock Exchange website for stock information and corporate announcements.",

            link:"https://www.bseindia.com"

        },


        {
            name:"SEBI Investor",

            description:
            "Investor education, guidelines and market awareness resources.",

            link:"https://investor.sebi.gov.in"

        },


        {
            name:"RBI Financial Education",

            description:
            "Financial literacy and banking awareness resources.",

            link:"https://www.rbi.org.in/financialeducation"

        },


        {
            name:"Moneycontrol",

            description:
            "Market news, stock analysis and business updates.",

            link:"https://www.moneycontrol.com"

        },


        {
            name:"Economic Times Markets",

            description:
            "Business news, market updates and economic analysis.",

            link:"https://economictimes.indiatimes.com/markets"

        },


        {
            name:"Yahoo Finance",

            description:
            "Global stocks, market trends and financial information.",

            link:"https://finance.yahoo.com"

        }


    ];





    return(


        <DashboardLayout>


            <h1

            style={{

                fontSize:"34px",

                marginBottom:"10px"

            }}

            >

                Financial News & Resources

            </h1>





            <p

            style={{

                color:"#94A3B8",

                marginBottom:"30px"

            }}

            >

                Trusted market sources and investor education platforms.

            </p>







            <div

            style={{

                display:"grid",

                gridTemplateColumns:
                "repeat(auto-fit,minmax(300px,1fr))",

                gap:"20px"

            }}

            >



            {

                sources.map((item,index)=>(


                    <div

                    key={index}

                    style={{

                        background:"#111827",

                        padding:"25px",

                        borderRadius:"18px",

                        border:"1px solid #1E293B"

                    }}

                    >



                        <h2>
                            {item.name}
                        </h2>




                        <p

                        style={{

                            color:"#94A3B8",

                            lineHeight:"1.6",

                            marginTop:"10px"

                        }}

                        >

                            {item.description}

                        </p>







                        <a

                        href={item.link}

                        target="_blank"

                        rel="noopener noreferrer"

                        style={{

                            display:"inline-block",

                            marginTop:"20px",

                            background:"#2563EB",

                            color:"white",

                            padding:"10px 20px",

                            borderRadius:"10px",

                            textDecoration:"none"

                        }}

                        >

                            Read More

                        </a>



                    </div>


                ))

            }



            </div>





        </DashboardLayout>


    );


}


export default News;