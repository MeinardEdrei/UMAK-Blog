/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { // ALLOW IMAGES FROM CLOUD TO BE DISPLAYED
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/**`, // This allows all images under this path
          },
        ],
      },
};

export default nextConfig;
