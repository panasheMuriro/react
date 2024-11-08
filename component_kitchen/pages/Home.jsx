import { useState } from "react";

export default function HomePage() {
  const [st, setSt] = useState({ width: 100, maxHeight: 700, maxWidth: 1000 });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr 10fr",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div>Nav and logo</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 4fr 2fr",
          width: "100vw",
        }}
      >
        <div style={{ borderRadius: 20, border: "4px solid", padding: 10,  margin: 10 }}>
          col1
        </div>
        <div style={{ gridTemplateRows: "1fr 2fr", display: "grid",  margin: 10, }}>
          <div style={{ borderRadius: 20, border: "4px solid", padding: 10, display: "flex", justifyContent: "center", alignItems:"center", }}>
            {" "}
            <button style={st}>click me</button>
          </div>

          <div
            style={{ marginTop: 10,
               
              borderRadius: 20,
              border: "4px solid",
              padding: 10,
            }}
          >
            <button>
              Width
              <input
                style={{ width: 25, marginLeft: 10 }}
                onChange={(e) => {
                  const newWidth = Number(e.target.value);
                  setSt((prev) => ({ ...prev, width: newWidth }));
                }}
              />
            </button>

            <button>
              Height
              <input
                style={{ width: 25, marginLeft: 10 }}
                onChange={(e) => {
                  const newHeight = Number(e.target.value);
                  setSt((prev) => ({ ...prev, height: newHeight }));
                }}
              />
            </button>
          </div>
        </div>
        <div style={{ borderRadius: 20, border: "4px solid", padding: 10, margin: 10, }}>
          Inline Code
          <br />
          {JSON.stringify(st)}
          Block Code
          <br />
          {JSON.stringify(st)}
        </div>
      </div>
    </div>
  );
}
