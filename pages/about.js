import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getGlobalData } from '../utils/global-data';

const About = ({ globalData }) => {
  return (
    <Layout>
      <SEO title="About" description="Learn more about us" />
      <Header name={globalData.name} />
      <main className="w-full">
        <h1 className="mb-12 text-3xl text-center lg:text-5xl">About Us</h1>
        <p className="text-lg text-center">
          Welcome to our blog! We are dedicated to providing you with the latest news and insights on various topics.
        </p>
        <p className="text-lg text-center">
          Our team is passionate about delivering high-quality content to our readers. Thank you for visiting our site!
        </p>
      </main>
      <Footer copyrightText={globalData.footerText} />
    </Layout>
  );
};

export function getStaticProps() {
  const globalData = getGlobalData();

  return { props: { globalData } };
}

export default About;