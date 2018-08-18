import React from 'react';
import './App.css';
import {
  Add
} from './components/Add';
import {
  News
} from './components/News';
import newsDate from './data/newsData';

class App extends React.Component {
  state = {
    news: null,
    isLoading: false
  }

  handleAddNews = (data) => {
    const nextNews = [data, ...this.state.news];

    this.setState({
      news: nextNews
    })
  }

  static getDerivedStateFromProps(props, state) {
    let nextFilteredNews
    if (Array.isArray(state.news)) {
      nextFilteredNews = [...state.news]
      nextFilteredNews.forEach((item, index) => {
        if (item.bigText.toLowerCase().indexOf('pubg') !== -1) {
          item.bigText = 'СПАМ'
        }
      })
      return {
      filteredNews: nextFilteredNews,
      }
    }
    return null;
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('http://localhost:3000/data/newsData.json')
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          this.setState({ isLoading: false, news: data });
        }, 1000)
      })
  }

  render() {
    const { news, isLoading } = this.state;

    return (
      <React.Fragment>
          <Add onAddNews={this.handleAddNews} />
          <h3>Новости</h3>
          {isLoading && <p>Загружаю...</p>}
          {Array.isArray(news) && <News data={news} />}
      </React.Fragment>
    )
  }
}

export default App;