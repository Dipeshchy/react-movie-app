import React, { Component } from "react";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE
} from "../../config";
import "./Home.css";
import HeroImage from "../elements/HeroImage/HeroImage";
import SearchBar from "../elements/SearchBar/SearchBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import Spinner from "../elements/Spinner/Spinner";
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";

class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    searchTerm: "",
    currentPage: 0,
    totalPage: 0
  };

  componentDidMount() {
    this.setState({ loading: true });
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    this.fetchItems(endPoint);
  }

  loadMoreItem = () => {
    let endPoint = "";
    this.setState({ loading: true });
    if (this.state.searchTerm === "") {
      endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this
        .state.currentPage + 1}`;
    } else {
      endPoint = `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${
        this.state.searchTerm
      }&page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(endPoint);
  };

  searchItems = (searchTerm) => {
    let endPoint = '';
    this.setState({
      movies: [],
      loading: true,
      searchTerm: searchTerm
    })
    if(searchTerm === '') {
      endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endPoint = `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endPoint);
  }

  fetchItems = endPoint => {
    fetch(endPoint)
      .then(result => result.json())
      .then(result => {
        this.setState({
          movies: [...this.state.movies, ...result.results],
          heroImage: this.state.heroImage || result.results[0],
          loading: false,
          currentPage: result.page,
          totalPage: result.total_pages
        });
      });
  };

  render() {
    // ES6 Destructuring the state
    const { movies, heroImage, loading, currentPage, totalPages, searchTerm } = this.state;
    return (
      <div className="rmdb-home">
        {heroImage ?
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
              title={heroImage.original_title}
              text={heroImage.overview}
            />
            <SearchBar callback={this.searchItems}/>
          </div> : null }

        <FourColGrid />
        <Spinner />
        <LoadMoreBtn />
      </div>
    );
  }
}

export default Home;
