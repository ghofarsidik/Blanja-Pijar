export const handleApiRequest = async (
  url,
  method,
  body,
  dispatch,
  loginAction,
  navigate
) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    dispatch(loginAction(data.user, data.token));
    navigate("/");
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
