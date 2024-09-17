import ContentLoader from "react-content-loader";

export default function PlaceholderCard() {
  return (
    <ContentLoader
      height={140}
      speed={1}
      backgroundColor={"#d9d9d9"}
      foregroundColor={"#ecebeb"}
      viewBox="0 0 300 70"
      style={{
        backgroundColor: "white",
        padding: "15px",
        maxWidth: "100%",
        borderRadius: "15px",
      }}
    >
      <rect x="0" y="8" rx="0" ry="0" width="240" height="15" />
      <rect x="0" y="30" rx="0" ry="0" width="240" height="15" />
      <rect x="0" y="52" rx="0" ry="0" width="240" height="15" />
      <rect x="250" y="8" rx="0" ry="0" width="100" height="100" />
      <rect x="250" y="120" rx="0" ry="0" width="100" height="10" />
    </ContentLoader>
  );
}
