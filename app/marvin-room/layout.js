import "../globals.css";

// The Mission Control dashboard theme (globals.css) loads only for this
// segment — marketing pages no longer ship its ~40KB of dashboard styles.
export default function MarvinRoomLayout({ children }) {
  return children;
}
