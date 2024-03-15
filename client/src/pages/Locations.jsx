import React, { useState, useEffect } from "react";

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [travelTimes, setTravelTimes] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [newLocationId, setNewLocationId] = useState("");
  const [sourceLocation, setSourceLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [newTravelTime, setNewTravelTime] = useState("");

  useEffect(() => {
    fetchLocations();
    fetchTravelTimes();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch("/api/location/get");
      if (response.ok) {
        const data = await response.json();
        setLocations(data);
      } else {
        throw new Error("Failed to fetch locations");
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const fetchTravelTimes = async () => {
    try {
      const response = await fetch("/api/travelt/get");
      if (response.ok) {
        const data = await response.json();
        setTravelTimes(data);
      } else {
        throw new Error("Failed to fetch travel times");
      }
    } catch (error) {
      console.error("Error fetching travel times:", error);
    }
  };

  const handleAddLocation = async () => {
    try {
      const response = await fetch("/api/location/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location_id: newLocationId, name: newLocation }),
      });
      if (response.ok) {
        setNewLocation("");
        setNewLocationId("");
        fetchLocations();
      } else {
        throw new Error("Failed to add location");
      }
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  const handleDeleteLocation = async (locationId) => {
    try {
      const response = await fetch(`/api/location/delete?id=${locationId}`, {
        method: "GET",
      });
      if (response.ok) {
        fetchLocations();
        fetchTravelTimes();
      } else {
        throw new Error("Failed to delete location");
      }
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  const handleAddTravelTime = async () => {
    try {
      const response = await fetch("/api/travelt/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ origin_id: sourceLocation, destination_id: destinationLocation, travel_time: newTravelTime }),
      });
      if (response.ok) {
        setSourceLocation("");
        setDestinationLocation("");
        setNewTravelTime("");
        fetchTravelTimes();
      } else {
        throw new Error("Failed to add travel time");
      }
    } catch (error) {
      console.error("Error adding travel time:", error);
    }
  };

  const handleDeleteTravelTime = async (travelTimeId) => {
    try {
      const response = await fetch(`/api/travelt/delete?id=${travelTimeId}`, {
        method: "GET",
      });
      if (response.ok) {
        fetchTravelTimes();
      } else {
        throw new Error("Failed to delete travel time");
      }
    } catch (error) {
      console.error("Error deleting travel time:", error);
    }
  };
  const handleRefreshRoutes = async () => {
    try {
      const response = await fetch("/api/graph/update", {
        method: "GET",
      });
      if (response.ok) {
        fetchTravelTimes();
      } else {
        throw new Error("Failed to refresh routes");
      }
    } catch (error) {
      console.error("Error refreshing routes:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Add Location Form */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Add Location</h2>
          <input
            type="text"
            value={newLocationId}
            onChange={(e) => setNewLocationId(e.target.value)}
            placeholder="Enter new location ID"
            className="border border-gray-300 rounded-md py-2 px-4 mb-2 w-full"
          />
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Enter new location name"
            className="border border-gray-300 rounded-md py-2 px-4 mb-2 w-full"
          />
          <button
            onClick={handleAddLocation}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
          >
            Add Location
          </button>
        </div>

        {/* Add Travel Time Form */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Add Travel Time</h2>
          <select
            value={sourceLocation}
            onChange={(e) => setSourceLocation(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 mb-2 w-full"
          >
            <option value="">Select source location</option>
            {locations.map((location) => (
              <option key={location._id} value={location._id}>{location.name}</option>
            ))}
          </select>
          <select
            value={destinationLocation}
            onChange={(e) => setDestinationLocation(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 mb-2 w-full"
          >
            <option value="">Select destination location</option>
            {locations.map((location) => (
              <option key={location._id} value={location._id}>{location.name}</option>
            ))}
          </select>
          <input
            type="number"
            value={newTravelTime}
            onChange={(e) => setNewTravelTime(e.target.value)}
            placeholder="Enter travel time (in minutes)"
            className="border border-gray-300 rounded-md py-2 px-4 mb-2 w-full"
          />
          <button
            onClick={handleAddTravelTime}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
          >
            Add Travel Time
          </button>
        </div>
      </div>

      {/* Render locations and travel times */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Locations</h2>
        <ul className="list-disc pl-8">
          {locations.map((location) => (
            <li key={location._id}>
              {location.name}
              <button
                onClick={() => handleDeleteLocation(location._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md ml-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Travel Times</h2>
        <ul className="list-disc pl-8">
          {travelTimes.map((travelTime) => {
            // Find the origin location
            const originLocation = locations.find(location => location._id === travelTime.origin_id);
            // Find the destination location
            const destinationLocation = locations.find(location => location._id === travelTime.destination_id);

            return (
              <li key={travelTime._id}>
                {originLocation && destinationLocation && (
                  <>
                    {originLocation.name} to {destinationLocation.name}: {travelTime.travel_time} minutes
                    <button
                      onClick={() => handleDeleteTravelTime(travelTime._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md ml-2"
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <button
        onClick={handleRefreshRoutes}
        className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md"
      >
        Refresh Routes
      </button>
    </div>
  );
};

export default Location
