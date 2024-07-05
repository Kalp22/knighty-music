// next.config.mjs
const nextConfig = {
  images: {
    domains: [
      "i.ytimg.com", // For thumbnails and other image assets
      "yt3.ggpht.com", // For channel images and other Google-hosted images
      "lh3.googleusercontent.com", // For additional images hosted by Google
      "yt3.googleusercontent.com", // For additional images hosted by Google
      "www.gstatic.com", // For additional images hosted by Google
      "music.youtube.com", // For additional images hosted by Google
    ],
  },
};

export default nextConfig;
