import axios, { AxiosResponse }  from "axios";

export function getMovieById(id: string | number): string {
    // post to omdbapi with imdb id and api key
    axios.get("http://www.omdbapi.com/?i=" + id + "&apikey=" + process.env["OMDB_API_KEY"])
    .then((apiRes: AxiosResponse) => {
        console.log(apiRes);
        return apiRes.data;
    })
    .catch((err: Error) => {
        console.log(err);
        console.log(err.stack);
        return err;
    });
    return "";
};