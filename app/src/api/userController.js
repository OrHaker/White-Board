export const getAllSessionUsers = async () => {
  try {
    const res = await fetch("/getAllSessionUsers");
    if (res.status === 200) return await res.json();
  } catch (error) {
    console.log("getAllUsers ex", ex);
    return null;
  }
};
