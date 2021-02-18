export default function Loading() {
  return (
    <div>
      <style jsx>{`
        div {
          text-align: center;
          padding: 2rem 0;
        }
        div::after {
          content: "|";
          display: inline-block;
          animation: spin 0.7s infinite;
        }

        @keyframes spin {
          25% {
            content: "/";
          }
          50% {
            content: "―";
          }
          75% {
            content: "\\";
          }
          100% {
            content: "|";
          }
        }
      `}</style>
    </div>
  );
}
