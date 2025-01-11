import React from "react"
import Layout from "../components/Layout";
import Seo from "../components/SEO";
import { getGlobalData } from '../utils/global-data';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Advertiser = (globalData) => {

    return (
<Layout>
  {/* <Seo title={globalData.name} description={globalData.blogTitle} /> */}
      <Header name={globalData.name} />

      <main>

     <h1>Amazon Affiliate Disclosure</h1> 
<p>Aging.com is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
</p>
<h1>Advertising Policy</h1>
        Our reviews are intended to guide you in choosing the best pest control services for you and your family, and we use an established rating process that is free of bias or influence. To keep these services free, we do accept affiliate commissions from some of the companies mentioned on this site.

        In each of our reviews or comparisons, we transparently list all of the products and services a company is offering and link to them so our readers can easily receive more information. When we establish an affiliate partnership with a company, it doesn’t affect our writing, ranking, or listing of products and services. However, when readers click on affiliated product links and follow through with a lead or sale, we may receive a commission from the company. These referrals are only tracked on affiliate company websites, and we do not receive any compensation when readers click on links from non-affiliated companies.

        This advertising policy is in compliance with the Federal Trade Commission’s guidelines. These guidelines are laid out in order to protect the consumer from deception and to ensure they’re receiving what they pay for when purchasing any product or service. Aging.com is dedicated to maintaining transparency for its readers and making it clear and conspicuous that we have affiliate relationships with some of the brands mentioned throughout our site.
            </main>

</Layout>
 
    )
}

export default Advertiser;