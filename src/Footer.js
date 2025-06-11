import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-4 pb-2">
      <div className="container">
        <div className="row">
          {/* This Site */}
          <div className="col-md-3">
            <h6>This Site</h6>
            <ul className="list-unstyled">
              <li><Link className="text-white" to="/tracking">Tracking</Link></li>
              <li><Link className="text-white" to="/shipping">Shipping</Link></li>
              <li><Link className="text-white" to="/support">Support</Link></li>
              <li><Link className="text-white" to="/recognize">Recognize a UPS Employee</Link></li>
              <li><Link className="text-white" to="/preferences">Communication Preferences</Link></li>
            </ul>
          </div>

          {/* UPS Sites */}
          <div className="col-md-3">
            <h6>UPS Sites</h6>
            <ul className="list-unstyled">
              <li><Link className="text-white" to="/about">About UPS</Link></li>
              <li><Link className="text-white" to="/jobs">UPS Jobs</Link></li>
              <li><Link className="text-white" to="/healthcare">UPS Healthcare</Link></li>
              <li><Link className="text-white" to="/supply-chain">UPS Supply Chain Solutions</Link></li>
              <li><Link className="text-white" to="/store">The UPS Store</Link></li>
            </ul>
          </div>

          {/* UPS Companies */}
          <div className="col-md-3">
            <h6>UPS Companies</h6>
            <ul className="list-unstyled">
              <li><Link className="text-white" to="/happy-returns">Happy Returns</Link></li>
              <li><Link className="text-white" to="/roadie">Roadie</Link></li>
              <li><Link className="text-white" to="/insure-shield">InsureShield Shipping Insurance</Link></li>
              <li><Link className="text-white" to="/parcel-pro">Parcel Pro</Link></li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="col-md-3">
            <h6>Connect with Us</h6>
            <ul className="list-unstyled">
              <li><a className="text-white" href="https://facebook.com/ups" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a className="text-white" href="https://x.com/ups" target="_blank" rel="noopener noreferrer">X</a></li>
              <li><a className="text-white" href="https://instagram.com/ups" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a className="text-white" href="https://linkedin.com/company/ups" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a className="text-white" href="https://youtube.com/ups" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            </ul>
          </div>
        </div>

        <hr className="bg-light" />
        <p className="text-center small">©1994-2025 United Parcel Service of America, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
