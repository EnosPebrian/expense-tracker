export const FetchList = ({ val, index }) => {
  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{val.name}</td>
      <td className="text-end">IDR{val.nominal.toLocaleString(`id-ID`)}</td>
      <td className={val.category == "food" ? "bg-primary" : null}>
        {val.category}
      </td>
      <td>{val.date}</td>
    </tr>
  );
};
