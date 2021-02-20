export default function Tab({ tabs = [], active, onChange }) {
  return (
    <nav>
      {tabs.map((tab, idx) => (
        <button
          key={idx}
          className={active === tab ? "active" : undefined}
          onClick={() => {
            onChange(tab);
          }}
        >
          {tab}
        </button>
      ))}
      <style jsx>{`
        nav {
          margin-bottom: 20px;
          display: flex;
          flex-wrap: wrap;
        }
        nav button {
          border: none;
          outline: none;
          cursor: pointer;
          margin-bottom: 5px;
          margin-right: 5px;
        }

        nav button.active {
          font-size: 18px;
        }
      `}</style>
    </nav>
  );
}
