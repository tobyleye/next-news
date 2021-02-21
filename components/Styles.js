export default function Styles({ isDarkMode = false }) {
  return isDarkMode ? (
    <style>{`
            html {
                --text-color: #f3f4f4;
                --bg-color: #222;
                --link-color: yellow;
            }
        `}</style>
  ) : (
    <style>{`
             html {
                --text-color: #000;
                --bg-color: #f4f4f4;
                --link-color: brown;
            }
        `}</style>
  );
}
