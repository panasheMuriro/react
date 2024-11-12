# React Hooks

`useState`: Manages local state in a functional component. Ideal for simple, interactive data (like form inputs or counters) that changes over time.

`useEffect`: Handles side effects such as data fetching, subscriptions, or modifying the DOM after renders. It’s useful for actions that need to happen outside the render cycle.

`useCallback`: Memoizes a function to prevent it from being recreated on every render, which is particularly useful when passing callbacks to child components that rely on stable references.

`useContext`: Shares data across the component tree without prop drilling. Great for global state, like themes or user authentication status.

`useMemo`: Memoizes a computed value, recalculating it only when dependencies change. Useful for expensive calculations that don’t need to rerun on every render.

