const getMoreArticles = async (setArticles, articles, ENDPOINT, target) => {
  const response = await fetch(ENDPOINT + target);

  const { posts } = await response.json();
  setArticles((articles) => [...articles, ...posts]);
};

export default getMoreArticles;
