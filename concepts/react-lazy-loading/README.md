# Lazy Loading and Code Splitting with React Suspense

Objective:

- Learn how to improve the performance of your React application by lazy loading components
  using React.lazy and Suspense.
- This ensures that only the necessary components are loaded when required, reducing the initial load time.

What You'll Learn:

- How to use React.lazy to dynamically load components.
- How to use Suspense to show a fallback UI while components load.

Test the Lazy Loading Behavior:

- Start your app (npm start).
- Navigate to different routes like /about or /profile/1.
- Notice the fallback UI (Loading...) briefly appears before the component is rendered.

What You Achieve:

- Improved Performance: Only loads the components that are needed, reducing the initial bundle size.
- User-Friendly Experience: Provides a smoother UI with fallback content during lazy loading.
