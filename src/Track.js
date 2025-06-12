import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Button, Container, Row, Col, ProgressBar } from 'react-bootstrap';
import './App.css'

const Track = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    setShipment(null);
    setError('');
    try {
      const res = await fetch(`https://ups-api-f8j7.onrender.com/api/shipments/track/${trackingNumber}`);
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
    <div className="d-flex flex-column min-vh-100 bg-light p-2">
      {/* Navbar */}
 <Navbar bg="white" expand="lg" className={`py-2 ${window.innerWidth < 992 ? '' : 'sticky-top'}`}>
            <Container>
              <Navbar.Brand href="/">
                {/* logo */}
                <img
              src="https://res.cloudinary.com/drbiup2zg/image/upload/v1745030247/ups_yfdjww.png"
              alt="UPS Logo"
              style={{ height: '70px', objectFit: 'contain' }}
            />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="main-nav" />
              <Navbar.Collapse id="main-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#shipping">Shipping</Nav.Link>
                  <Nav.Link href="#tracking">Tracking</Nav.Link>
                  <Nav.Link href="#products">Products & Services</Nav.Link>
                  <Nav.Link href="#store">The UPS Store</Nav.Link>
                </Nav>
                <Button variant="warning">Log In</Button>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          
      {/* Main Content */}
      <Container fluid className="flex-grow-1 py-4">
        <Row>
          {/* Left Section */}
          <Col md={8}>
            <div className="p-4 border rounded bg-white shadow-sm">
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
                <p>
                  Need to Change a Delivery? You can access available options by tracking the package
                  and then selecting "Change My Delivery".
                </p>
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
                    <ProgressBar
                      now={getProgress(shipment.status)}
                      label={`${shipment.status} (${getProgress(shipment.status)}%)`}
                      className="mt-3"
                    />
                  )}
                </div>
              )}
            </div>
          </Col>

          {/* Right Section */}
          <Col md={4}>
            <div className="p-4 border rounded bg-white shadow-sm mb-4">
              <h5>Track by Reference Number</h5>
              <p><a href="#help">Help</a></p>
              <p>Import Tracking Numbers</p>
              <p>Other Tracking Services</p>
            </div>
            <div className="p-4 border rounded bg-white shadow-sm">
              <h5>Stay Safe - Avoid Fraud and Scams</h5>
              <p>Received a text, call, or email that seems suspicious? Don’t respond to it.</p>
              <Button variant="outline-primary">Tips to Avoid Fraud</Button>
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <Row className="mt-4">
          <Col>
            <div className="p-4 border rounded bg-white shadow-sm">
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
