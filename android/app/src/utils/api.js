var api = {
    getCampaigns() {
        var url = `http://starlord.hackerearth.com/kickstarter`;
        return fetch(url).then((res) => res.json());
    }
};

export default api;