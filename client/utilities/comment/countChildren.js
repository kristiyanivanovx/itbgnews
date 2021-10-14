const countChildren = (comment, count = 0) => {
  if (!comment || !comment.children) {
    return 0;
  }

  count = comment.children.length;

  comment.children.forEach((child) => {
    count += countChildren(child, count);
  });

  return count;
};

export default countChildren;
