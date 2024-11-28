# 🌟 **FrontendSpring-Proj** 🌟

Welcome to the **FrontendSpring-Proj**, the frontend application that seamlessly integrates with the **Spring Boot Backend API**. This app is built using **Next.js** and **Tailwind CSS** for a responsive and modern user interface.

---

### **📝 Project Overview**

This project serves as the **frontend** for managing **users** and **products**, with secure authentication and role-based access. It is designed with an emphasis on usability and security, leveraging **JWT** for authentication and **Tailwind CSS** for a sleek, modern UI.

---

### **🚀 Deployment**

**Frontend URL**:  
[FrontendSpring-Proj on Vercel](https://frontend-spring-proj.vercel.app/)

This frontend is deployed on **Vercel**, providing high availability and fast performance globally. It integrates with the **Spring Boot Backend API** hosted on Render, providing a complete full-stack solution.

---

### **⚡ Features**
- **User Authentication**: Register, login, and manage user sessions securely with **JWT tokens**.
- **Role-based Access**: Different functionality for **Admin** and **regular users**.
- **Product Management**: Create, read, and update products (admin-only actions for create and update).
- **Responsive UI**: Built with **Next.js** and **Tailwind CSS** for fast, mobile-friendly user interfaces.
- **State Management**: Uses **React Context API** to handle authentication states and user sessions.

---

### **🖥️ How It Works**

1. **User Authentication:**
   - Users can log in or register. Once authenticated, a JWT token is stored locally (in cookies or localStorage) for session management.
   - **Admin users** can perform actions like adding or updating products, while **regular users** can only view products.

2. **Product Management:**
   - The Admin user can create new products, update existing products, and delete them. Regular users can only **view** products.

---

### **🔧 Technologies Used**

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework to design responsive and modern UIs.
- **Axios**: For making HTTP requests to the backend API.
- **JWT (JSON Web Tokens)**: For securing the communication between frontend and backend.
- **React Context API**: To manage and share user authentication state across components.

---

### **📦 How to Test the Frontend**

1. **✨ Visit the Deployed App:**
   You can directly test the app at [FrontendSpring-Proj on Vercel](https://frontend-spring-proj.vercel.app/).

2. **🛠️ Testing Authentication:**
   - **Register a User**: Visit the `Register` page and enter the user details. Upon successful registration, you will be logged in.
   - **Login as Admin**: Use the credentials for an **admin user** (you can set `isAdmin: true` in the backend to create an admin).
   - **Login as Regular User**: Use the credentials for a **non-admin user** (set `isAdmin: false`).

3. **🔐 Role-based Access:**
   - Only an **Admin** user can access product management features (create, update, delete).
   - Regular users can only **view** products.

---

### **💡 Key Points to Remember**

- **JWT Token**: This app relies on **JWT** for authentication, and the token is required for accessing protected routes.
- **Admin Access**: Only admin users can manage (create, update, delete) products. Regular users are only able to view products.
- **State Management**: The app uses **React Context** to maintain the authentication state. Tokens are stored in the browser for subsequent requests.

---

### **📱 UI Demo**
- **Login Page**: A simple form to log in or register.
- **Dashboard**: Once logged in, users will be redirected to the dashboard, where they can see products and manage them if they're an admin.
- **Responsive Design**: The app is fully responsive, ensuring that it works seamlessly across desktop, tablet, and mobile devices.

---

### **❗ Troubleshooting**

1. **First-Time Load**:  
   As the app is deployed on Vercel’s free tier, the backend might take a few seconds to load if it hasn't been accessed recently. Please be patient during the first request.

2. **Authentication Issues**:  
   If you're facing issues with authentication, ensure that your JWT token is correctly stored (in cookies or localStorage) and that it's included in the headers for protected API calls.

---

### **🙌 Contributions**
Feel free to contribute by submitting issues or pull requests! I am always open to suggestions and improvements.

---

### **📜 License**
This project is open source and available under the [MIT License](LICENSE).

---

