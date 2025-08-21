import React from 'react';
import s from './About.module.css';

const About = () => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1 className={s.heading}>About Us</h1>
        <p className={s.subheading}>
          Welcome to <span className={s.highlight}>MNQ</span> — Your Trusted Resale Marketplace.
        </p>
        <p className={s.paragraph}>
          At <span className={s.highlight}>MNQ</span>, we believe every item has a second story to tell. Our platform connects buyers and sellers, offering a simple, secure, and reliable space to buy, sell, and discover products and services. Whether it's selling your old car, buying furniture, or offering services, MNQ is here for you.
        </p>

        <h2 className={s.sectionTitle}>Our Mission</h2>
        <p className={s.paragraph}>
          We aim to empower individuals and businesses to buy and sell with confidence by creating a seamless and trustworthy marketplace experience.
        </p>

        <h2 className={s.sectionTitle}>What We Offer</h2>
        <ul className={s.list}>
          <li>Wide Range of Categories: Cars, Properties, Furniture, Bikes, Mobiles, Appliances, Services, and more.</li>
          <li>User-Friendly Interface for easy navigation and quick postings.</li>
          <li>Verified Listings ensuring genuine and high-quality ads.</li>
          <li>Secure and transparent platform for safe transactions.</li>
        </ul>

        <h2 className={s.sectionTitle}>Our Vision</h2>
        <p className={s.paragraph}>
          We envision a world where everyone can buy smart and sell smarter. MNQ is committed to building a community-driven marketplace that promotes sustainability, affordability, and innovation.
        </p>

        <p className={s.finalLine}>
          Start your journey with <span className={s.highlight}>MNQ</span> today — where great deals meet great people!
        </p>
      </div>
    </div>
  );
};

export default About;
