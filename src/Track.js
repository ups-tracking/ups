import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Button, Container, Row, Col, ProgressBar } from 'react-bootstrap';


const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    setShipment(null);
    setError('');
    try {
      const res = await fetch(`http://localhost:5005/api/shipments/track/${trackingNumber}`);
      const data = await res.json();
      if (res.ok) {
        setShipment(data);
      } else {
        setError(data.error || 'Not found');
      }
    } catch (err) {
      setError('Network error');
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
    <div>
      <Navbar bg="grey" variant="grey" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://res.cloudinary.com/drbiup2zg/image/upload/v1745030247/ups_yfdjww.png"
              alt="UPS Logo"
              className="img-fluid"
              style={{ height: '50px', objectFit: 'contain' }}
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#shipping">Shipping</Nav.Link>
            <Nav.Link href="#tracking">Tracking</Nav.Link>
            <Nav.Link href="#products">Products & Services</Nav.Link>
            <Nav.Link href="#store">The UPS Store</Nav.Link>
          </Nav>
          <Button variant="warning" className="ms-auto">Log In</Button>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Row>
          <Col md={8}>
            <div className="p-4 border rounded">
              <h4>Track</h4>
              <Form>
                <Form.Group className="mb-3" controlId="trackingNumber">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter up to 25 tracking numbers, one per line"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                </Form.Group>
                <p>Need to Change a Delivery? You can access available options by tracking the package and then selecting "Change My Delivery".</p>
                <Button variant="warning" onClick={handleTrack}>Track</Button>
              </Form>
              {error && <p className="text-danger mt-3">{error}</p>}
              {shipment && (
                <div className="mt-4 border-top pt-3">
                  <h5 className="mb-2 text-dark">Tracking #: {shipment.trackingNumber}</h5>
                  <p><strong>Sender:</strong> {shipment.sender}</p>
                  <p><strong>Recipient:</strong> {shipment.recipient}</p>
                  <p><strong>Origin:</strong> {shipment.origin}</p>
                  <p><strong>Destination:</strong> {shipment.destination}</p>
                  {shipment.image && (
                    <img
                      src={shipment.image}
                      alt="Shipment"
                      className="img-fluid rounded mt-2"
                      style={{ maxHeight: '250px', objectFit: 'contain' }}
                    />
                  )}
                  {shipment.status && (
                    <ProgressBar now={getProgress(shipment.status)} label={`${shipment.status} (${getProgress(shipment.status)}%)`} className="mt-3" />
                  )}
                </div>
              )}
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 border rounded">
              <h5>Track by Reference Number</h5>
              <p><a href="#help">Help</a></p>
              <p>Import Tracking Numbers</p>
              <p>Other Tracking Services</p>
            </div>
            <div className="p-4 border rounded mt-4">
              <h5>Stay Safe - Avoid Fraud and Scams</h5>
              <p>Received a text, call, or email that seems suspicious? Don’t respond to it.</p>
              <Button variant="outline-primary">Tips to Avoid Fraud</Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <div className="p-4 border rounded">
              <h5>Recently Tracked</h5>
              <p><a href="#login">Log in or Sign up to view your recently tracked shipments.</a></p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Track;