function TableCategory({ index, category }) {
  return (
    <>
      <tr>
        <td scope="row">{index}</td>
        <td className="fw-bold">{category.name}</td>
      </tr>
    </>
  );
}

export default TableCategory;
