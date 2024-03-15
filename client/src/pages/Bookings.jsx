import React, { useState, useEffect } from "react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    booking_id: "",
    user_email: "",
    source_id: "",
    destination_id: "",
    cab_id: "",
    booked_time: new Date().toISOString().slice(0, 16), // Initialize with current date and time
    estimated_time: 0,
    estimated_cost: 0,
    // Add missing fields
    // Add additional fields here
  });
  const [locations, setLocations] = useState([]);
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    fetchBookings();
    fetchLocations();
    fetchCabs();
  }, []);

  useEffect(()=>{
    if(newBooking.source_id != "" && newBooking.destination_id != ""){
        fetchEstTIme(newBooking.source_id,newBooking.destination_id)
    }
    
    
  },[newBooking.source_id,newBooking.destination_id])
  useEffect(()=>{
    if(newBooking.estimated_time != 0 && newBooking.cab_id != ""){
        const rer = cabs.filter((item)=> item._id === newBooking.cab_id);
        handleInputChange({target:{name: "estimated_price",value: (newBooking.estimated_time*rer[0].price_per_minute)}})
    }
  },[newBooking.cab_id,newBooking.estimated_time])

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/booking/get");
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch("/api/location/get");
      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const fetchCabs = async () => {
    try {
      const response = await fetch("/api/cab/get");
      if (!response.ok) {
        throw new Error("Failed to fetch cabs");
      }
      const data = await response.json();
      setCabs(data);
    } catch (error) {
      console.error("Error fetching cabs:", error);
    }
  };
  const fetchEstTIme = async (source,dest) => {
    try {
      const response = await fetch("/api/graph/distance?source=" + source + "&dest=" + dest);
      if (!response.ok) {
        throw new Error("Failed to fetch cabs");
      }
      const data = await response.json();
      handleInputChange({target:{name: "estimated_time",value:data}})
      return data;
    } catch (error) {
      console.error("Error fetching cabs:", error);
      return 0;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBooking)
      });
      if (!response.ok) {
        alert("something went wrong")
        throw new Error("Failed to add booking");
      }
      setNewBooking({
        booking_id: "",
        user_email: "",
        source_id: "",
        destination_id: "",
        cab_id: "",
        booked_time: new Date().toISOString().slice(0, 16),
        estimated_time: 0,
        estimated_cost: 0
      });
      fetchBookings(); 
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add Booking</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="booking_id"
            value={newBooking.booking_id}
            onChange={handleInputChange}
            placeholder="Booking ID"
            className="border border-gray-400 p-2 mr-2"
            required
          />
          <input
            type="text"
            name="user_email"
            value={newBooking.user_email}
            onChange={handleInputChange}
            placeholder="User Email"
            className="border border-gray-400 p-2 mr-2"
            required
          />
          <select
            name="source_id"
            value={newBooking.source_id}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 mr-2"
            required
          >
            <option value="">Select Source</option>
            {locations.map((location) => (
              <option key={location._id} value={location._id}>{location.name}</option>
            ))}
          </select>
          <select
            name="destination_id"
            value={newBooking.destination_id}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 mr-2"
            required
          >
            <option value="">Select Destination</option>
            {locations.map((location) => (
              <option key={location._id} value={location._id}>{location.name}</option>
            ))}
          </select>
          <select
            name="cab_id"
            value={newBooking.cab_id}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 mr-2"
            required
          >
            <option value="">Select Cab</option>
            {cabs.map((cab) => (
              <option key={cab._id} value={cab._id}>{cab.type + " " +cab.cab_number}</option>
            ))}
          </select>
          <input
            type="datetime-local"
            name="booked_time"
            value={newBooking.booked_time}
            onChange={handleInputChange}
            min={new Date().toISOString().slice(0, 16)}
            className="border border-gray-400 p-2 mr-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add
          </button>
        </form>
        <div>time: {newBooking.estimated_time}</div>
        <div>price: {newBooking.estimated_price}</div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">All Bookings</h2>
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className="border-b border-gray-200 py-2">
              <p><strong>Booking ID:</strong> {booking.booking_id}</p>
              <p><strong>User Email:</strong> {booking.user_email}</p>
              <p><strong>Source:</strong> {booking.source_id}</p>
              <p><strong>Destination:</strong> {booking.destination_id}</p>
              <p><strong>Cab:</strong> {booking.cab_id}</p>
              <p><strong>Booked Time:</strong> {new Date(booking.booked_time).toLocaleString()}</p>
              <p><strong>Estimated Time:</strong> {booking.estimated_time}</p>
              <p><strong>Estimated Cost:</strong> {booking.estimated_cost}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Bookings;
