import logo from "../../images/react.png";

export default function Header() {
  return (
    <div className="pt-3 pl-2" style={{ borderBottom: "1px solid #777" }}>
      <img
        src={logo}
        alt="react"
        style={{ height: "55px", vertigalAlign: "top" }}
      />
      <span className="h2 pt-4 text-white-50">Cyclopedia</span>
    </div>
  );
}
