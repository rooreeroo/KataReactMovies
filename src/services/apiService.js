import apiKey from './apiKey';

class ApiService {
  baseUrl = 'https://api.themoviedb.org/3';

  sendRequest = async (url, payload = undefined, page = undefined, body = undefined) => {
    const fetchUrl = new URL(`${this.baseUrl}${url}`);

    fetchUrl.searchParams.append('api_key', apiKey);

    if (page) {
      fetchUrl.searchParams.append('page', Number(page));
    }

    if (payload) {
      Object.keys(payload).forEach((key) => {
        fetchUrl.searchParams.append(key, payload[key]);
      });
      // for (const key in payload) {
      //   fetchUrl.searchParams.append(key, payload[key]);
      // }
    }

    let res;

    if (body) {
      res = await fetch(fetchUrl, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          ...body,
        }),
      });
    } else {
      res = await fetch(fetchUrl);
    }

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, recieved ${res.status}`);
    }

    const data = await res.json();

    return data;
  };

  createGuestSession = () => this.sendRequest('/authentication/guest_session/new');

  getGenres = () => this.sendRequest('/genre/movie/list');

  getRatedMovies = (page, guestKey) => {
    const pl = {
      sort_by: 'created_at.desc',
    };

    return this.sendRequest(`/guest_session/${guestKey}/rated/movies`, pl, page);
  };

  rateMovie = (movieId, rate, guestKey) => {
    const url = `/movie/${movieId}/rating`;
    const pl = {
      guest_session_id: guestKey,
    };
    const body = { value: Number(rate) };

    return this.sendRequest(url, pl, undefined, body);
  };

  requestMovies = (text, page = 1) => {
    const pl = {
      query: text.trim(),
    };

    const url = pl.query ? '/search/movie' : '/movie/popular';

    const movies = this.sendRequest(url, pl, page);

    return movies;
  };

  buildMoviesListWithRate = (moviesList, ratedList) => {
    const movies = moviesList.results;
    const ratedMovies = ratedList.results;

    const resultList = movies.map((sMovie) => {
      const isRated = ratedMovies.some((rMovie) => rMovie.id === sMovie.id);
      if (isRated) {
        const ratedMovie = ratedMovies.find((rMovie) => rMovie.id === sMovie.id);

        sMovie.rating = ratedMovie.rating;
      }

      return sMovie;
    });

    return new Promise((resolve) => {
      moviesList.results = resultList;
      resolve(moviesList);
    });
  };

  searchMovies = async (text, page = 1, guestKey = false) => {
    const movies = await this.requestMovies(text, page);

    if (!guestKey) return movies;

    const ratedMovies = await this.getRatedMovies(1, guestKey);
    if (ratedMovies.total_pages > 1) {
      for (let pag = 2; pag <= ratedMovies.total_pages; pag += 1) {
        const newPage = this.getRatedMovies(pag, guestKey);
        ratedMovies.results.push(...newPage.results);
      }
    }

    return this.buildMoviesListWithRate(movies, ratedMovies);
  };
}

export default ApiService;
