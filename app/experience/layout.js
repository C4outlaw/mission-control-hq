import { Modak, Mouse_Memoirs } from "next/font/google";
import "./experience.css";

const modak = Modak({ weight: "400", subsets: ["latin"], variable: "--font-modak" });
const mouse = Mouse_Memoirs({ weight: "400", subsets: ["latin"], variable: "--font-mouse" });

export const metadata = {
  title: "MyrieHQ — The Experience",
  description:
    "Bold brands, fresh websites, and content that travels. The MyrieHQ scroll experience.",
};

export default function ExperienceLayout({ children }) {
  return (
    <div className={`xp ${modak.variable} ${mouse.variable}`}>{children}</div>
  );
}
