export const FetchList = ({ val, index }) => {
  const color = {
    food: "bg-info",
    groceries: "bg-success",
    sport: "bg-primary",
    entertainment: "bg-danger",
    transportation: "bg-secondary text-light",
  };
  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{val.name}</td>
      <td className="text-end">IDR{val.nominal.toLocaleString(`id-ID`)}</td>
      <td className={color[val.category]}>{val.category}</td>
      <td>{val.date}</td>
    </tr>
  );
};
