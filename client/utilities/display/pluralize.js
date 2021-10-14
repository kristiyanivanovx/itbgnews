const pluralizeReplies = (number) => {
  if (number === 1) {
    return 'отговор';
  }

  return 'отговора';
};

const pluralizeComments = (number) => {
  if (number === 1) {
    return 'коментар';
  }

  return 'коментара';
};

module.exports = {
  pluralizeReplies,
  pluralizeComments,
};
