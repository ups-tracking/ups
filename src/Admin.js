import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5005';

const Admin = () => {
  const [formData, setFormData] = useState({
    sender: '',
    recipient: '',
    origin: '',
    destination: '',
    image: null,
  });

  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/shipments`);
        const normalizedShipments = res.data.map(shipment => ({
          ...shipment,
          additionalImages: shipment.additionalImages || []
        }));
        setShipments(normalizedShipments);
      } catch (err) {
        console.error(err);
        alert('Error fetching shipments');
      }
    };
    fetchShipments();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'image' || e.target.name === 'newImage') {
      const setter = e.target.name === 'image' ? setFormData : setNewImage;
      setter(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
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

      const res = await axios.post(`${API_URL}/api/shipments`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setShipments(prev => [...prev, { ...res.data, additionalImages: [] }]);
      alert('Shipment created! Tracking Number: ' + res.data.trackingNumber);
      setFormData({ sender: '', recipient: '', origin: '', destination: '', image: null });
    } catch (err) {
      console.error(err);
      alert('Error creating shipment: ' + err.response?.data?.error || err.message);
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!newImage || !selectedShipment) return alert('Please select an image and a shipment');

    try {
      const formData = new FormData();
      formData.append('image', newImage);

      const res = await axios.post(`${API_URL}/api/shipments/${selectedShipment._id}/add-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setShipments(prev => 
        prev.map(s => s._id === selectedShipment._id ? { ...s, additionalImages: [...(s.additionalImages || []), res.data.image] } : s)
      );
      setNewImage(null);
      alert('Image added successfully');
    } catch (err) {
      console.error(err);
      alert('Error adding image: ' + err.response?.data?.error || err.message);
    }
  };

  const handleStatusUpdate = async (shipmentId, newStatus) => {
    try {
      const res = await axios.patch(
        `${API_URL}/api/shipments/${shipmentId}/status`,
        { status: newStatus },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setShipments(prev => prev.map(s => s._id === shipmentId ? { ...res.data, additionalImages: s.additionalImages || [] } : s));
      alert('Status updated to ' + newStatus);
    } catch (err) {
      console.error(err);
      alert('Error updating status: ' + err.response?.data?.error || err.message);
    }
  };

  const getProgress = (status) => {
    switch (status) {
      case 'pending': return 25;
      case 'in transit': return 50;
      case 'delivered': return 100;
      case 'cancelled': return 75;
      default: return 0;
    }
  };

  return (
    <div className="container mt-4">
      <h3>Create Shipment (Admin)</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-50">
        <input
          type="text"
          name="sender"
          placeholder="Sender"
          onChange={handleChange}
          value={formData.sender}
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          name="recipient"
          placeholder="Recipient"
          onChange={handleChange}
          value={formData.recipient}
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          name="origin"
          placeholder="Origin"
          onChange={handleChange}
          value={formData.origin}
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          onChange={handleChange}
          value={formData.destination}
          className="form-control mb-2"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="form-control mb-3"
         
        />
        <button type="submit" className="btn btn-success mb-3">Submit</button>
      </form>

      {shipments.length > 0 && (
        <div className="mt-5">
          <h3>Manage Shipments</h3>
          {shipments.map((shipment) => (
            <div key={shipment._id} className="mt-3 p-3 border border-success rounded">
              <h4>Shipment Details</h4>
              <p><strong>Tracking Number:</strong> {shipment.trackingNumber}</p>
              <p><strong>Sender:</strong> {shipment.sender}</p>
              <p><strong>Recipient:</strong> {shipment.recipient}</p>
              <p><strong>Origin:</strong> {shipment.origin}</p>
              <p><strong>Destination:</strong> {shipment.destination}</p>
              <p><strong>Status:</strong> {shipment.status}</p>
              {shipment.image && (
                <div>
                  <strong>Initial Image:</strong><br />
                  <img
                    src={shipment.image}
                    alt="shipment"
                    style={{ maxWidth: '200px', marginTop: '10px', borderRadius: '5px' }}
                  />
                </div>
              )}
              {(shipment.additionalImages || []).length > 0 && (
                <div>
                  <strong>Additional Images:</strong>
                  {(shipment.additionalImages || []).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`additional-${index}`}
                      style={{ maxWidth: '200px', marginTop: '10px', borderRadius: '5px' }}
                    />
                  ))}
                </div>
              )}
              <ProgressBar now={getProgress(shipment.status)} label={`${shipment.status} (${getProgress(shipment.status)}%)`} className="mt-3" />

              <div className="mt-3">
                <h5>Add New Image</h5>
                <form onSubmit={handleAddImage}>
                  <input
                    type="file"
                    name="newImage"
                    accept="image/*"
                    onChange={handleChange}
                    className="form-control mb-2"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedShipment(shipment);
                      handleAddImage(e);
                    }}
                  >
                    Add Image
                  </button>
                </form>
              </div>

              <div className="mt-3">
                <h5>Update Status</h5>
                <select
                  className="form-select mb-2"
                  value={shipment.status || 'pending'}
                  onChange={(e) => handleStatusUpdate(shipment._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;