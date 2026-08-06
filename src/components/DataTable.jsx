export function DataTable({ caption, rows, percent = false, selectableDenominator, selectedValue, onSelect }) {
  return (
    <div className="table-scroll">
      <table className="data-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Exercise</th>
            <th scope="col">Normal BP</th>
            <th scope="col">Elevated BP</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.exercise}>
              <th scope="row">{row.exercise}</th>
              {["normal", "elevated", "total"].map((key) => {
                const value = row[key];
                const canSelect = Boolean(selectableDenominator) && !percent;
                return (
                  <td key={key}>
                    {canSelect ? (
                      <button
                        className={[
                          "cell-button",
                          selectedValue === String(value) && String(value) === selectableDenominator ? "correct" : "",
                          selectedValue === String(value) && String(value) !== selectableDenominator ? "incorrect" : ""
                        ].join(" ")}
                        type="button"
                        onClick={() => onSelect(String(value))}
                      >
                        {value}
                      </button>
                    ) : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
