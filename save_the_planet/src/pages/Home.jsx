function Home() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          backgroundColor: "#576133",
          height: 200,
          width: "100%",
          borderRadius: "0px 0px 20px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          color: "white",
          textAlign: "start",
          padding: 10
        }}
      >
        <h2>Save planet together</h2>
        <p>
          Separate garbage into mixed waste and recyclables at the one touch{" "}
        </p>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <input style={{width: "70%", height: 30, opacity: .5}}></input>
          <button></button>
        </div>
      </div>
    </div>
  );
}

export default Home;
