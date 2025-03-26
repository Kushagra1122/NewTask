import React, { useState, useEffect } from "react";
import { fetchServices } from "../api/Api";

const ServiceList = () => {
  const [services, setServices] = useState([]); // Ensure it's an array
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getServices = async () => {
      const fetchedServices = await fetchServices();
      console.log("Fetched Services:", fetchedServices); // Debugging
      setServices(fetchedServices || []); // Ensure it's an array
      setLoading(false);
    };
    getServices();
  }, []);

  const getServiceIdText = (serviceId) => {
    if (serviceId === "LSA_ONLINE") return "Real Estate Notarization";
    if (serviceId === "LSA_OFFLINE") return "Real Estate Offline Notarization";
    return serviceId;
  };

  const filteredServices = services.filter(
    (service) =>
      service.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      service.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Available Services</h1>

      <input
        type="text"
        placeholder="Search services..."
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading services...</p>
      ) : filteredServices.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredServices.map((service,index) => (
            <div
              key={index} // Use unique key
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <h2 className="text-lg font-semibold">{service.serviceName}</h2>
              <p className="text-gray-600">Cost: ${service.cost}</p>
              <p className="text-sm text-blue-600">
                {getServiceIdText(service.serviceId)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
