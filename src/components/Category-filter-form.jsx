import { Form } from "react-bootstrap";

export default function CategoryFilterForm({ cat, idx, formikSideBar }) {
  return (
    <>
      <Form.Label key={idx} className="m-0 p-0">
        <input
          type="checkbox"
          name="category"
          value={cat}
          onChange={formikSideBar.handleChange}
          id={`${cat}-checkbox`}
        />
        <span className="mx-2">{cat}</span>
      </Form.Label>
    </>
  );
}
