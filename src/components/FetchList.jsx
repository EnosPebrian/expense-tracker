import { ModalEditExpense } from "./ModalEditExpense";

export const FetchList = ({
  val,
  index,
  fetch,
  handleClose,
  handleShowEditExpense,
  show,
  anyreq,
}) => {
  const color = {
    food: "bg-info",
    groceries: "bg-success",
    sport: "bg-primary",
    entertainment: "bg-danger",
    transportation: "bg-secondary text-light",
  };
  return (
    <>
      <tr
        key={index}
        onClick={() => handleShowEditExpense(val.id)}
        style={{ cursor: "pointer" }}
      >
        <td>{index + 1}</td>
        <td>{val.name}</td>
        <td className="text-end">IDR{val.nominal.toLocaleString(`id-ID`)}</td>
        <td className={color[val.category]}>{val.category}</td>
        <td>{val.date}</td>
      </tr>
      <ModalEditExpense
        handleClose={handleClose}
        show={show}
        fetch={fetch}
        val={val}
        anyreq={anyreq}
      />
    </>
  );
};
