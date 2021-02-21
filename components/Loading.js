export default function Loading() {
  return (
    <div>
      <span className="screen-reader">Loading...</span>
      <style jsx>{`
        .screen-reader {
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          height: 1px;
          overflow: hidden;
          position: absolute;
          white-space: nowrap;
          width: 1px;
        }
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
