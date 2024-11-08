

import PropTypes from 'prop-types';

export default function Category({title, inputChange}) {
  return (
    <div style={{marginTop:20}}>
      <div>{title}</div>
      <input
        placeholder="Enter"
        id={title.toLowerCase()}
        style={{ height: 40, width: "80vw", fontSize: 18, textAlign: "center" }}
        onChange={inputChange}
        autoComplete="off"
      />
    </div>
  );
}

Category.propTypes = {
    title: PropTypes.string.isRequired, // 'title' is a required string
    inputChange: PropTypes.func.isRequired
  };