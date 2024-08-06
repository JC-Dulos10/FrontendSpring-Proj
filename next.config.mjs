/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true,
            },
        ]
    },

    images: {
        domains: [
          // General images
          'res.cloudinary.com',
        ]
      },

    env: {
        // baseURL: 'http://ec2-54-81-142-113.compute-1.amazonaws.com:8080/api/v1/',
        // registerURL: 'http://ec2-54-81-142-113.compute-1.amazonaws.com:8080/api/v1/auth/register',
        // authURL: 'http://ec2-54-81-142-113.compute-1.amazonaws.com:8080/api/v1/auth/authenticate',
        // getUserURL: 'http://ec2-54-81-142-113.compute-1.amazonaws.com:8080/api/v1/users',
        // changePassURL: 'http://ec2-54-81-142-113.compute-1.amazonaws.com:8080/api/v1/users/change-password',
        // productURL: 'http://ec2-54-81-142-113.compute-1.amazonaws.com:8080/api/v1/products',

        //test local server
        baseURL: 'http://localhost:8080/api/v1/',
        registerURL: 'http://localhost:8080/api/v1/auth/register',
        authURL: 'http://localhost:8080/api/v1/auth/authenticate',
        getUserURL: 'http://localhost:8080/api/v1/users',
        changePassURL: 'http://localhost:8080/api/v1/users/change-password',
        productURL: 'http://localhost:8080/api/v1/products',
    }
};

export default nextConfig;
