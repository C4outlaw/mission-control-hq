export default function VideoBreak() {
  return (
    <section style={{ height: "160vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <video
          src="/assets/work/beach-bucket/beachbucket-featured.mp4"
          poster="/assets/work/beach-bucket/lifestyle.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ width: "100%", height: "100%", objectFit: "cover", background: "#1b1b1b" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(27,27,27,0.12)",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: "14vh",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Mouse Memoirs', sans-serif",
            textTransform: "uppercase",
            color: "#fff",
            fontSize: "clamp(26px,3vw,54px)",
            textShadow: "0 0.2vw 0 rgba(27,27,27,.4)",
            whiteSpace: "nowrap",
          }}
        >
          REAL WORK. REAL CUSTOMERS.
        </span>
      </div>
    </section>
  );
}
