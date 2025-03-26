import axios from "axios";

export const fetchServices = async () => {
    try {
        const response = await axios.post("https://api.thenotary.app/customer/login", {
            email: "nandhakumar1411@gmail",
        });

        console.log("Full API Response:", response.data.data.availableServices); // Debugging

        return response.data?.data?.availableServices?.services || []; // Extracting availableServices safely
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
};
