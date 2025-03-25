# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# ShoppyGlobe


# ShoppyGlobe

ShoppyGlobe is a modern e-commerce application built with React, Redux, and Tailwind CSS. It allows users to browse products, add items to their cart, and proceed to checkout seamlessly.

## Features

- 🛒 Browse products fetched from an API
- 🔍 Search functionality to find products easily
- 📦 Add, remove, and update product quantities in the cart
- 💾 Cart persistence using local storage
- 💳 Checkout page to simulate purchase flow
- 🚀 Smooth UI animations with Framer Motion

## Tech Stack

- **Frontend:** React, React Router, Redux Toolkit, Tailwind CSS
- **State Management:** Redux Toolkit
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **API:** DummyJSON API for mock product data

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/pradeepchandrakar/ShoppyGlobe
   cd ShoppyGlobe
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

## Deployment

To build the project for production, run:

```sh
npm run build
```

## Troubleshooting

If you encounter errors like missing dependencies, ensure they are installed:

```sh
npm install framer-motion lucide-react react-redux @reduxjs/toolkit react-router-dom
```

## Contributing

Contributions are welcome! Feel free to fork the repo, create a new branch, and submit a pull request.

## License

This project is licensed under the MIT License.

