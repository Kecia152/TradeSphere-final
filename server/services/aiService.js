const GROQ_API_URL =
    "https://api.groq.com/openai/v1/chat/completions";

const GROQ_MODEL =
    "openai/gpt-oss-20b";


const callGroq = async (messages) => {

    if (!process.env.GROQ_API_KEY) {
        throw new Error(
            "GROQ_API_KEY is not configured"
        );
    }


    const response = await fetch(
        GROQ_API_URL,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",

                "Authorization":
                    `Bearer ${process.env.GROQ_API_KEY}`
            },

            body: JSON.stringify({

                model: GROQ_MODEL,

                messages,

                temperature: 0.3,

                reasoning_effort: "low",

                max_completion_tokens: 1000

            })
        }
    );


    const data = await response.json();


    if (!response.ok) {

        console.error(
            "Groq API error:",
            data
        );

        throw new Error(
            data?.error?.message ||
            "Groq API request failed"
        );

    }


    const answer =
        data?.choices?.[0]?.message?.content;


    if (!answer || !answer.trim()) {

        console.error(
            "Groq returned no content:",
            data
        );

        throw new Error(
            "AI returned an empty response"
        );

    }


    return answer.trim();

};


export const generateAIInsight = async (
    portfolio
) => {

    if (
        !portfolio ||
        portfolio.length === 0
    ) {

        return (
            "Add stocks to your portfolio to receive AI based investment insights."
        );

    }


    const portfolioData =
        portfolio.map((stock) => ({

            symbol: stock.symbol,

            companyName:
                stock.companyName,

            quantity:
                stock.quantity,

            averageBuyPrice:
                Number(stock.buyPrice),

            currentPrice:
                Number(stock.currentPrice),

            currentValue:
                Number(stock.currentValue),

            profitLoss:
                Number(stock.profitLoss),

            profitLossPercent:
                Number(stock.profitLossPercent),

            todayProfitLoss:
                Number(stock.todayProfitLoss)

        }));


    const prompt = `
Analyze this user's TradeSphere stock portfolio.

Portfolio data:
${JSON.stringify(
    portfolioData,
    null,
    2
)}

Provide a concise portfolio analysis.

Discuss:
- Overall portfolio position
- Best and weakest performing holdings
- Diversification and concentration
- Important risks or observations
- 2 or 3 practical suggestions

Use the actual numbers supplied.

Do not invent data.

Do not predict future prices.

Do not give guaranteed returns.

Do not give definitive buy or sell instructions.

This is educational analysis, not financial advice.

Formatting rules:
- Use short paragraphs.
- Use simple bullet points when useful.
- Do NOT use markdown tables.
- Do NOT use **bold** markdown.
- Keep it under 250 words.
`;


    return await callGroq([

        {
            role: "system",

            content:
                "You are TradeSphere's portfolio analysis assistant. Give concise, data-driven and cautious educational analysis."
        },

        {
            role: "user",

            content: prompt
        }

    ]);

};


export const generateAIChatResponse =
    async (
        message,
        portfolio
    ) => {

        const portfolioData =
            (portfolio || []).map(
                (stock) => ({

                    symbol:
                        stock.symbol,

                    companyName:
                        stock.companyName,

                    quantity:
                        stock.quantity,

                    averageBuyPrice:
                        Number(stock.buyPrice),

                    currentPrice:
                        Number(stock.currentPrice),

                    currentValue:
                        Number(stock.currentValue),

                    profitLoss:
                        Number(stock.profitLoss),

                    profitLossPercent:
                        Number(
                            stock.profitLossPercent
                        ),

                    todayProfitLoss:
                        Number(
                            stock.todayProfitLoss
                        )

                })
            );


        const prompt = `
User question:
${message}

User's current TradeSphere portfolio:
${JSON.stringify(
    portfolioData,
    null,
    2
)}

Answer the user's question using the portfolio data when relevant.

If the question is about a specific holding, use the supplied numbers.

If there is no relevant portfolio data, answer generally.

Do not invent prices, holdings or financial data.

Do not guarantee returns.

Do not give definitive buy or sell instructions.

Formatting rules:
- Use short paragraphs.
- Use bullet points when useful.
- Do NOT use markdown tables.
- Do NOT use **bold** markdown.
- Keep the answer concise and easy to read.
`;


        return await callGroq([

            {
                role: "system",

                content:
                    "You are TradeSphere AI, an educational investment assistant. Be helpful, concise, cautious and transparent about limitations."
            },

            {
                role: "user",

                content: prompt
            }

        ]);

    };