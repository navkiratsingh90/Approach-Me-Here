🛒 Market-Square
Overview

Resale Marketplace is a comprehensive full-stack web platform meticulously architected to facilitate peer-to-peer trading of pre-owned assets across a spectrum of categories including automobiles, electronics, furniture, and more. The system is designed to foster a secure, transparent, and user-centric environment, enabling individuals to effortlessly list, discover, and acquire second-hand products through an elegant and responsive interface.

The project integrates geospatial intelligence, image cloud management, and automated communication workflows, ensuring a seamless and professional e-commerce experience.

⚙️ Tech Stack

Frontend: React.js, Redux Toolkit, Tailwind CSS, React Router

Backend: Node.js, Express.js

Database: MongoDB with Mongoose ODM

Authentication: JSON Web Tokens (JWT) & Bcrypt for encryption

Image Storage: Cloudinary for optimized image hosting and CDN delivery

Map Integration: Leaflet.js for precise geolocation visualization

Email Services: Nodemailer for transactional notifications and verification codes

🚀 Core Features

🔐 User Authentication System: Secure registration, login, and token-based authorization using JWT.

🧾 Product Lifecycle Management: Add, update, or remove listings enriched with images and detailed specifications.

🗺️ Location Mapping: Real-time product location rendering using Leaflet, enhancing buyer proximity awareness.

✉️ Smart Notification System: Automated emails via Nodemailer to notify sellers when users express interest or for account verification.

❤️ Wishlist Functionality: Save and revisit favorite listings for quick access.

🔍 Advanced Search & Filter Engine: Filter listings by category, brand, price, or fuel type with intelligent sorting options.

🧑‍💼 Role-Based Dashboard: Admins can oversee users, products, and categories through an intuitive, analytics-driven interface.

🧠 Architectural Highlights

The application follows the Model–View–Controller (MVC) paradigm, promoting modularity and separation of concerns. Backend services employ RESTful APIs optimized through asynchronous event handling and middleware pipelines. The frontend leverages Redux Toolkit for deterministic state management and reactivity, ensuring a smooth and coherent user experience.

Integration of Leaflet enriches spatial interaction, while Cloudinary offloads heavy media processing to the cloud, and Nodemailer introduces reliable, event-driven email automation.

🔒 Security Implementations

Password hashing using Bcrypt before storage.

JWT-based authorization to secure protected routes and user sessions.

Secure environment variables for sensitive API keys and credentials.

🧰 Installation & Setup
# Clone the repository
git clone https://github.com/navkiratsingh90/Approach-Me-Here.git

# Navigate to project directory
cd Approach-Me-Here

# Install dependencies
npm install

# Run backend server
cd backend
npm start

# Run frontend development server
cd ../frontend
npm start
