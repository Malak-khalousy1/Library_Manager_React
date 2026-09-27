const BaseUrl = "http://localhost:3000";

export const add = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("My Server Error", error);
  }
};

export const update = async (url, data, id) => {
  try {
    const response = await fetch(url + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("My Server Error", error);
  }
};

export const get = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.status);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("My Server Error", error);
  }
};

export const remove = async (url, id) => {
  try {
    const response = await fetch(url + "/" + id, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("My Server Error", error);
  }
};