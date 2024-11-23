/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
const HOCwithAuthCheck = (WrappedComponent) => {
  return ({ isAuthenticated, ...props }) => {
    if (!isAuthenticated) {
      return <div>Please log in to access this content.</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default HOCwithAuthCheck;
