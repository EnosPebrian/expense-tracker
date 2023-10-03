import { Form } from "react-bootstrap";
import "../components/style.css";

export default function CategoryFilterForm({ cat, idx, formikSideBar }) {
  return (
    <>
      <Form.Label key={idx} className="m-0 p-0">
        <input
          type="checkbox"
          name="category"
          value={cat.category}
          onChange={formikSideBar.handleChange}
          id={`${cat.category}-checkbox`}
          checked={
            formikSideBar.values.category.findIndex(
              (val) => val === cat.category
            ) !== -1
          }
        />
        <span className="mx-2">{cat.category}</span>
      </Form.Label>
    </>
  );
}
