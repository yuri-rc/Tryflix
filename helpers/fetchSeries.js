const fetchSeries = async () => {
  const url = 'https://api.tvmaze.com/shows';
  const request = await fetch(url);
  const data = await request.json();
  // console.log(data);
  return data;
};

// fetchSeries();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchSeries,
  };
}
