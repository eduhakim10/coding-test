export const fetchSalesData = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/sales-reps");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    // Make sure data is an object containing a salesReps array property.
    return {
      salesReps: Array.isArray(data.salesReps) ? data.salesReps : [],
    };
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return { salesReps: [] };
  }
};


export const handleAskQuestion = async (question) => {
  try {
    const res = await fetch("http://localhost:8000/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching AI response:", err);
    return { error: "Failed to get AI response" };
  }
};
