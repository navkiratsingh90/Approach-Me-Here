// import React from 'react'
// import Header from '../../Components/Header.jsx'
// import ActionSection from './ActionSection.jsx'
// import Benefits from './Benefits.jsx'
// import Testimonials from './Testimonials.jsx'
// import Categories from './Categories.jsx'

// const Home = () => {
// 	return (
// 		<>
// 			<Header/>
// 			<ActionSection/>
// 			<Benefits/>
// 			<Categories/>
// 			<Testimonials/>
// 		</>
// 	)
// }

// export default Home

// import mkt from '../../assets/images/marketplace-hero.png'
// import mkt1 from '../../assets/images/sell-icon.png'
// import mkt2 from '../../assets/images/buy-icon.png'
// import mkt3 from '../../assets/images/service-icon.png'
// import mkt4 from '../../assets/images/cars-category.jpg'
// import mkt5 from '../../assets/images/furniture-category.jpg'
// import mkt6 from '../../assets/images/mobiles-category.jpg'
// import mkt7 from '../../assets/images/services-category.jpg'

// import React from 'react';
// import s from './Home.module.css';
// import car from '../../assets/Categories/car.png'
// import phone from '../../assets/Categories/phone.png'
// import sofa2 from '../../assets/Categories/sofa.png'
// import app from '../../assets/Categories/app.png'
// import Resale from '../../assets/Resale.jpg'
// const Home = () => {
//   return (
//     <div className={s.container}>

//       {/* Hero Section */}
//       <section className={s.hero}>
//         <div className={s.heroContent}>
//           <h1>Welcome to MNQ Marketplace</h1>
//           <p>Find the best deals, sell your products faster, and connect with trusted buyers and sellers.</p>
//           <button className={s.heroButton}>Get Started</button>
//         </div>
//         <img src="/images/marketplace-hero.png" alt="Marketplace Banner" className={s.heroImage} />
//       </section>

//       {/* About MNQ */}
//       <section className={s.about}>
//         <h2>Why MNQ?</h2>
//         <p>At MNQ Marketplace, we believe in simple, fast, and secure buying and selling. Our platform connects thousands of people every day with great deals and trusted services.</p>
//       </section>

//       {/* Categories */}
//       <section className={s.categories}>
//         <h2>Top Categories</h2>
//         <div className={s.categoryGrid}>
//           <div className={s.categoryCard}>
//             <img src={car} alt="Cars" />
//             <h3>Cars</h3>
//           </div>
//           <div className={s.categoryCard}>
//             <img src={sofa2} alt="Furniture" />
//             <h3>Furniture</h3>
//           </div>
//           <div className={s.categoryCard}>
//             <img src={phone} alt="Mobiles" />
//             <h3>Mobiles</h3>
//           </div>
//           <div className={s.categoryCard}>
//             <img src={app} alt="Services" />
//             <h3>Services</h3>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className={s.features}>
//         <h2>Why Choose MNQ?</h2>
//         <div className={s.featureCards}>
//           <div className={s.featureCard}>
//             <img src={Resale} alt="Sell Fast" />
//             <h4>Sell Fast</h4>
//             <p>List your products quickly and connect with buyers across the country.</p>
//           </div>
//           <div className={s.featureCard}>
//             <img src="/images/buy-icon.png" alt="Buy Smart" />
//             <h4>Buy Smart</h4>
//             <p>Discover verified listings and get the best deals for your money.</p>
//           </div>
//           <div className={s.featureCard}>
//             <img src="/images/service-icon.png" alt="Trusted Platform" />
//             <h4>Trusted Platform</h4>
//             <p>Shop and sell with confidence, knowing MNQ protects your transactions.</p>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default Home;
import styles from './Home.module.css';

function Greeting() {
  return (
    <div className={styles.greeting}>
      <h1>Welcome to MNQ Marketplace</h1>
      <p className={styles.slogan}>
        Discover the best deals, sell your items swiftly, and connect with a trusted community of buyers and sellers across India. Join us today!
      </p>
      <button className={styles.exploreButton}>Explore Now</button>
    </div>
  );
}

function WhyMNQ() {
  return (
    <div className={styles.whyMnq}>
      <h2>Why Choose MNQ Marketplace?</h2>
      <p className={styles.description}>
        At MNQ, we prioritize simplicity, speed, and security. Our platform hosts over 50,000 active users daily, offering a seamless experience with verified transactions and top-notch customer support available 24/7 as of June 27, 2025, 03:15 PM IST.
      </p>
    </div>
  );
}

function Categories() {
  const categories = [
    { name: 'Cars', icon: '🚗' },
    { name: 'Bikes', icon: '🏍️' },
    { name: 'Electronics', icon: '💻' },
    { name: 'Mobiles', icon: '📱' },
    { name: 'Furniture', icon: '🛋️' },
    { name: 'Others', icon: '🌐' },
  ];
  return (
    <div className={styles.categories}>
      <h2>Explore Our Categories</h2>
      <div className={styles.categoryGrid}>
        {categories.map((cat) => (
          <div key={cat.name} className={styles.categoryCard}>
            <span className={styles.categoryIcon}>{cat.icon}</span>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhyChooseMNQ() {
  const options = [
    {
      title: 'Sell Fast',
      description: 'List your products in minutes and reach buyers nationwide with our advanced marketing tools.',
    },
    {
      title: 'Buy Smart',
      description: 'Access verified listings, compare prices, and enjoy exclusive discounts tailored for you.',
    },
    {
      title: 'Secure Transactions',
      description: 'Benefit from encrypted payments and a dedicated support team to ensure your safety.',
    },
  ];
  return (
    <div className={styles.whyChooseMnq}>
      <h2>Why MNQ Stands Out</h2>
      <div className={styles.chooseGrid}>
        {options.map((item, idx) => (
          <div key={idx} className={styles.chooseCard}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Benefits() {
  return (
    <div className={styles.benefits}>
      <h2>Benefits of MNQ Resale Marketplace</h2>
      <div className={styles.benefitsGrid}>
        <div className={styles.benefitItem}>
          <h3>Wide Selection</h3>
          <p>Over 10,000 products listed daily across various categories.</p>
        </div>
        <div className={styles.benefitItem}>
          <h3>Fast Delivery</h3>
          <p>Partnered with top logistics for quick and reliable shipping.</p>
        </div>
        <div className={styles.benefitItem}>
          <h3>Customer Support</h3>
          <p>24/7 assistance via chat, email, and phone as of June 27, 2025, 03:15 PM IST.</p>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className={styles.appContainer}>
      <Greeting />
      <WhyMNQ />
      <Categories />
      <WhyChooseMNQ />
      <Benefits />
    </div>
  );
}

export default Home;