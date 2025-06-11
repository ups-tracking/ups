// src/Admin.js
import { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [formData, setFormData] = useState({
    sender: '',
    recipient: '',
    origin: '',
    destination: '',
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const res = await axios.post('http://localhost:5005/api/shipments', data);
      alert('Shipment created! Tracking Number: ' + res.data.trackingNumber);
    } catch (err) {
      console.error(err);
      alert('Error creating shipment');
    }
  };

  return (
    <div>
      <h2>Create Shipment (Admin)</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="sender" placeholder="Sender" onChange={handleChange} className="form-control mb-2" required />
        <input type="text" name="recipient" placeholder="Recipient" onChange={handleChange} className="form-control mb-2" required />
        <input type="text" name="origin" placeholder="Origin" onChange={handleChange} className="form-control mb-2" required />
        <input type="text" name="destination" placeholder="Destination" onChange={handleChange} className="form-control mb-2" required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} className="form-control mb-3" required />
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
};

export default Admin;
