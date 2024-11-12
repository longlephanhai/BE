let count = 0;
const createTree = (arr, parentId = "") => {
  const tree = [];
  arr.forEach((item) => {
    if (item.parent_id === parentId) {
      count++;
      const newItem = {
        ...item.toObject(), // Chuyển đổi Mongoose document thành đối tượng thuần
        index: count,
        children: [] // Khởi tạo children
      };
      newItem.index = count;
      const children = createTree(arr, item._id.toString());
      if (children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    }
  });
  return tree;
}
const createTreeExport = (arr, parentId = "") => {
  count = 0; // Reset count về 0
  return createTree(arr, parentId);
}
module.exports = createTreeExport