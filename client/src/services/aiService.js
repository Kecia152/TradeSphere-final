import API from "./api";


export const getAIInsight = async () => {

    const response =
        await API.get("/ai");

    return response.data.insight;

};


export const askAI = async (message) => {

    const response =
        await API.post(
            "/ai/chat",
            {
                message
            }
        );

    return response.data.answer;

};