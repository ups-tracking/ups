import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'

const Footer = () => {
  return (
    <footer className="footer text-white">
      <div className="container py-5">
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-3 mb-4">
            <h5>THIS SITE</h5>
            <p><Link to="/tracking">Tracking</Link></p>
            <p><Link to="/shipping">Shipping</Link></p>
            <p><Link to="/support">Support</Link></p>
            <p><Link to="/recognize">Recognize a UPS Employee</Link></p>
            <p><Link to="/preferences">Communication Preferences</Link></p>
          </div>

          {/* Column 2 */}
          <div className="col-md-3 mb-4">
            <h5>UPS SITES</h5>
            <p><Link to="/about">About UPS</Link></p>
            <p><Link to="/jobs">UPS Jobs</Link></p>
            <p><Link to="/healthcare">UPS Healthcare</Link></p>
            <p><Link to="/supply-chain">UPS Supply Chain Solutions</Link></p>
            <p><Link to="/store">The UPS Store</Link></p>
            <p><Link to="/capital">UPS Capital</Link></p>
            <p><Link to="/developer">UPS Developer Portal</Link></p>
          </div>

          {/* Column 3 */}
          <div className="col-md-3 mb-4">
            <h5>UPS COMPANIES</h5>
            <p><Link to="/happy-returns">Happy Returns</Link></p>
            <p><Link to="/roadie">Roadie</Link></p>
            <p><Link to="/insure">InsureShield Shipping Insurance</Link></p>
            <p><Link to="/parcel-pro">Parcel Pro</Link></p>
            <p><Link to="/delivery">Delivery Solutions</Link></p>
          </div>

          {/* Column 4 */}
          <div className="col-md-3 mb-4">
            <h5>CONNECT WITH US</h5>
            <div className="d-flex gap-2 social-icons mb-3">
              <a href="https://www.facebook.com/ups" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
              </a>
              <a href="https://twitter.com/ups" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
              </a>
              <a href="https://www.instagram.com/ups" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" />
              </a>
              <a href="https://www.linkedin.com/company/ups" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" />
              </a>
              <a href="https://www.youtube.com/ups" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733646.png" alt="YouTube" />
              </a>
            </div>
            <button className="btn btn-outline-light btn-sm">Ask UPS</button>
          </div>
        </div>

        <div className="footer-bottom text-center mt-4 pt-3 border-top border-secondary">
          <div className="mb-2 small">
            <Link to="/global-home">Global Home</Link> | 
            <Link to="/fraud-protection"> Protect Against Fraud</Link> | 
            <Link to="/terms"> Terms and Conditions</Link> | 
            <Link to="/website-terms"> Website Terms of Use</Link> | 
            <Link to="/privacy-rights"> Your California Privacy Rights</Link> | 
            <Link to="/privacy-notice"> Privacy Notice</Link> | 
            <Link to="/cookie-settings"> Cookie Settings</Link> | 
            <Link to="/do-not-sell"> Do Not Sell or Share My Personal Information</Link>
          </div>
          <p className="small mb-0">
            ©1994–2025 United Parcel Service of America, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
