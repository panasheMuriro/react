import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          placeItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: 100 }}>
          <button onClick={()=> navigate(-1)}>Back</button>
        </div>
        <div style={{ width: 100 }}>Logo</div>
        <div style={{ width: 100 }}></div>
      </div>
    </>
  );
}
