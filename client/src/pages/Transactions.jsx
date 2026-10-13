import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import API from "../services/api";


function Transactions() {

    const [transactions, setTransactions] = useState([]);

    const [loading, setLoading] = useState(true);



    const fetchTransactions = async () => {

        try {

            const token = localStorage.getItem("token");


            const response = await API.get(
                "/transactions",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            setTransactions(
                response.data.transactions || []
            );


        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        fetchTransactions();

    }, []);




    return (

        <DashboardLayout>

            <h1
                style={{
                    fontSize: "34px",
                    marginBottom: "10px"
                }}
            >
                Transaction History
            </h1>


            <p
                style={{
                    color: "#94A3B8",
                    marginBottom: "30px"
                }}
            >
                View all your stock buying and selling activity.
            </p>




            {
                loading ? (

                    <h3>
                        Loading transactions...
                    </h3>

                )

                :

                transactions.length === 0 ? (

                    <div
                        style={{
                            background: "#111827",
                            padding: "40px",
                            borderRadius: "18px",
                            border: "1px solid #1E293B",
                            textAlign: "center"
                        }}
                    >

                        <h2>
                            No Transactions Found
                        </h2>


                        <p
                            style={{
                                color: "#94A3B8",
                                marginTop: "10px"
                            }}
                        >
                            Your buy and sell history will appear here.
                        </p>


                    </div>

                )

                :

                transactions.map((transaction)=>(


                    <div
                        key={transaction._id}
                        style={{
                            background:"#111827",
                            padding:"25px",
                            borderRadius:"18px",
                            marginBottom:"20px",
                            border:"1px solid #1E293B"
                        }}
                    >


                        <div
                            style={{
                                display:"flex",
                                justifyContent:"space-between",
                                alignItems:"center"
                            }}
                        >

                            <div>

                                <h2>
                                    {transaction.companyName}
                                </h2>


                                <p
                                    style={{
                                        color:"#94A3B8"
                                    }}
                                >
                                    {transaction.symbol}
                                </p>

                            </div>



                            <h3
                                style={{
                                    color:
                                    transaction.type === "BUY"
                                    ?
                                    "#22C55E"
                                    :
                                    "#EF4444"
                                }}
                            >
                                {transaction.type}
                            </h3>


                        </div>




                        <div
                            style={{
                                display:"grid",
                                gridTemplateColumns:"repeat(3,1fr)",
                                gap:"20px",
                                marginTop:"25px"
                            }}
                        >

                            <div>

                                <p
                                    style={{
                                        color:"#94A3B8"
                                    }}
                                >
                                    Quantity
                                </p>

                                <h3>
                                    {transaction.quantity}
                                </h3>

                            </div>



                            <div>

                                <p
                                    style={{
                                        color:"#94A3B8"
                                    }}
                                >
                                    Price
                                </p>

                                <h3>
                                    ₹{transaction.price}
                                </h3>

                            </div>



                            <div>

                                <p
                                    style={{
                                        color:"#94A3B8"
                                    }}
                                >
                                    Date
                                </p>

                                <h3>
                                    {
                                        new Date(
                                            transaction.createdAt
                                        ).toLocaleDateString()
                                    }
                                </h3>

                            </div>


                        </div>


                    </div>


                ))

            }


        </DashboardLayout>

    );

}


export default Transactions;