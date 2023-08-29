import React from 'react';
import Layout from '../components/Layout/Layout';

const About = () => {
  return (
    <Layout title={'About us - Ecommerce'}>
       <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2 about-text">
          Embark on a shopping journey like no other at our exceptional online store. We present an expansive array of offerings encompassing fashion, electronics, home embellishments, and beyond . Join us in embracing the art of shopping as you embark on a transformative journey of discovery , where each selection reflects your unique identity and aspirations.
          </p>
        </div>
      </div>
      
    </Layout>
  );
}

export default About;
