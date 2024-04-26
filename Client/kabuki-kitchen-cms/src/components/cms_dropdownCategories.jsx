function Dropdown({ category }) {
  return <option value={category.id}>{category.name}</option>;
}

export default Dropdown;
