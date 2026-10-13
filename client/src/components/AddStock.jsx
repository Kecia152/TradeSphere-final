import { useState } from "react";
import API from "../services/api";

import {
  addNotificationIfEnabled
} from "../services/notificationService";


function AddStock({ refresh }) {

  const [stock, setStock] = useState({
    symbol: "",
    companyName: "",
    quantity: "",
    buyPrice: "",
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    setStock({
      ...stock,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    if (
      !stock.symbol ||
      !stock.companyName ||
      !stock.quantity ||
      !stock.buyPrice
    ) {

      alert("Please fill all fields.");

      return;

    }


    try {

      setLoading(true);


      const token =
        localStorage.getItem("token");


      await API.post(
        "/stocks",
        stock,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      addNotificationIfEnabled({

        setting:
          "portfolioUpdates",

        title:
          "Stock Added",

        message:
          `${stock.symbol.toUpperCase()} was added to your portfolio.`,

        type:
          "portfolio"

      });


      await refresh();


      setStock({
        symbol: "",
        companyName: "",
        quantity: "",
        buyPrice: "",
      });


      alert(
        "Stock added successfully."
      );


    } catch (error) {

      console.log(error);

      alert(
        "Failed to add stock."
      );


    } finally {

      setLoading(false);

    }

  };


  const inputStyle = {

    width: "100%",

    padding: "14px 16px",

    background: "#0F172A",

    color: "#F8FAFC",

    border:
      "1px solid #1E293B",

    borderRadius: "12px",

    outline: "none",

    fontSize: "15px",

  };


  return (

    <div
      className="card"
      style={{
        padding: "30px",
        marginBottom: "35px",
      }}
    >

      <div
        style={{
          marginBottom: "28px",
        }}
      >

        <h2
          style={{
            marginBottom: "8px",
          }}
        >
          Add New Stock
        </h2>


        <p
          style={{
            color: "#94A3B8",
          }}
        >
          Add an investment to your portfolio.
        </p>

      </div>


      <form onSubmit={handleSubmit}>

        <div
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",

            gap: "18px",
          }}
        >

          <input
            type="text"
            name="symbol"
            placeholder="Stock Symbol"
            value={stock.symbol}
            onChange={handleChange}
            style={inputStyle}
          />


          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={stock.companyName}
            onChange={handleChange}
            style={inputStyle}
          />


          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={stock.quantity}
            onChange={handleChange}
            style={inputStyle}
          />


          <input
            type="number"
            name="buyPrice"
            placeholder="Buy Price"
            value={stock.buyPrice}
            onChange={handleChange}
            style={inputStyle}
          />

        </div>


        <div
          style={{
            display:
              "flex",

            justifyContent:
              "flex-end",

            marginTop:
              "28px",
          }}
        >

          <button
            type="submit"
            disabled={loading}
            style={{
              background:
                loading
                  ? "#475569"
                  : "#2563EB",

              color:
                "#FFFFFF",

              border:
                "none",

              padding:
                "14px 32px",

              borderRadius:
                "12px",

              fontSize:
                "15px",

              fontWeight:
                "600",

              cursor:
                loading
                  ? "not-allowed"
                  : "pointer",

              transition:
                ".25s",
            }}
          >

            {
              loading
                ? "Adding..."
                : "Add Stock"
            }

          </button>

        </div>

      </form>

    </div>

  );

}


export default AddStock;
