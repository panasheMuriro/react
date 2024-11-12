function Welcome() {
  return (
    <div
      style={{
        backgroundColor: "#576133",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div></div>
      <div>
        <img src="./logo.png" width={300}></img>
      </div>
      <div>
        <button style={{ width: "90%", margin: 10 }}>Start</button>
      </div>
    </div>
  );
}

export default Welcome;
