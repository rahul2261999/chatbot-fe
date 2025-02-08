const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@lib/*": path.resolve(__dirname, "./src/lib/*"),
      "@hooks/*": path.resolve(__dirname, "./src/hooks/*"),
      "@helper/*": path.resolve(__dirname, "./src/helper/*"),
      "@/*": path.resolve(__dirname, "./src/*"),
    },
  },
};
