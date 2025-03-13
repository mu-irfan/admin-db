// Function to return status styles
export const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-500 text-white";
    case "open":
      return "bg-green-600 text-white";
    case "closed":
      return "bg-red-600 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};
