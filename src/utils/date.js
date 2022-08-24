export const getFormattedDate = (params) => {
  const { createdAt } = params.row;
  return <p>{createdAt.slice(0, 10)}</p>;
};
