function Home() {
  return (
    <div style={{ display: "flex", height: "100vh", width:"100%", flexDirection: "column" }}>
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
          // padding: 10
        }}
      >
        <h2>Save planet together</h2>
        <p>
          Separate garbage into mixed waste and recyclables at the one touch{" "}
        </p>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <input style={{width: "70%", height: 30, opacity: .3, border: "0px"}}></input>
          <button></button>
        </div>
      </div>

<div style={{display: "flex"}}>
<h2>Popular Themes</h2>
<p>see all</p>
</div>
     


      <div style={{}}></div>
      <img height={200} width={100} src="./bag.png"/>

      
    </div>
  );
}

export default Home;
