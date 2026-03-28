import Image from "next/image";

const LOGO_PATH = "/logos/Logo 13.png";

export default function Logo() {
  return (
    <Image
      src={LOGO_PATH}
      alt="Dollhouse Studios"
      width={160}
      height={40}
      className="site-logo"
      priority
      sizes="160px"
      style={{ width: "auto", height: 40, display: "block" }}
    />
  );
}
