import React, { Component } from "react";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button";
import ImageGallery from "./components/ImageGallery";
import apiImage from "./helpers/apiImage";
import Modal from "./components/Modal";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class App extends Component {
  state = {
    images: [],
    page: 1,
    searchQuery: "",
    isLoading: false,
    error: null,
    largeImageURL: "",
  };

  //Запрос на бэкэнд только в случае изменения searchQuery(происходит при сабмите формы поиска):
  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (searchQuery !== prevState.searchQuery) {
      this.fetchImages();
    }
    if (page !== prevState.page && page !== 2) {
      window.scrollBy({
        top: document.documentElement.clientHeight - 150,
        behavior: "smooth",
      });
    }
  }

  fetchImages = () => {
    const { page, searchQuery } = this.state;
    const options = { searchQuery, page };
    this.setState({ isLoading: true });
    apiImage
      .fetchImg(options)
      .then((images) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }));
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  // Сброс значений images и page, и добавление значения поиска в searchQuery при новом запросе
  //(значение забирается при сабмите из  Searchbar=>state=>query ф-я handleSubmit):
  onChangeQuery = (query) => {
    this.setState({
      images: [],
      page: 1,
      searchQuery: query,
      error: null,
    });
  };

  /*======        Открыть (showModal) и закрыть (closeModal) модальное окно.    =========*/
  //Добавляет значение в  largeImageURL при клике на картинку:
  showModal = (e) => {
    if (e.target.tagName === "IMG") {
      const { images } = this.state;
      const currentImgId = Number(e.target.id);
      const currentImg = images.find((img) => img.id === currentImgId);

      this.setState({
        largeImageURL: currentImg.largeImageURL,
      });
    }
  };

  closeModal = () => {
    this.setState({ largeImageURL: "" });
  };

  render() {
    const { images, isLoading, error, largeImageURL } = this.state;
    return (
      <>
        {error && <p>Somethingth goes wrong!</p>}
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} onClick={this.showModal} />
        {isLoading && (
          <Loader
            className="Loader"
            type="Circles"
            color="#00BFFF"
            height={80}
            width={80}
          />
        )}

        {/* Рендер кнопки  LoadMore после окончания рендера изображений с бекенда:*/}
        {images.length > 0 && !isLoading && (
          <Button onLoadMore={this.fetchImages} />
        )}

        {/* Если в largeImageURL есть свойство, то загружается модальное окно.
        (Свойство в largeImageURL добавляется при клике на картинку - showModal):*/}
        {largeImageURL.length > 0 && (
          <Modal onClose={this.closeModal}>
            <img src={largeImageURL} alt={images.tags} />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
