
import { Component } from 'react';

import './styles.css';


import { Post } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';


export class Home extends Component {
  state = {
    posts: [],
    allPost: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ''
  }


  async componentDidMount() {
    // this.handledTimeOut();
    await this.loadPosts();

  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPost: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      posts,
      allPost,
      page,
      postsPerPage
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPost.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage })
  }
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value })
  }


  // handledTimeOut = () => {
  //   this.timeOutUpdate = setTimeout(() => {
  //     this.setState({date: new Date().toLocaleString()});
  //   }, 1000)

  // }
  render() {
    const { posts, page, postsPerPage, allPost, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPost.length;
    const filteredPosts = !!searchValue ?
      allPost.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLocaleLowerCase()
        );
      })
      :
      posts;
    return (
      <section className='container'>
        <div className='search-container'>

          {!!searchValue && (
            <h1> Search Value: {searchValue}</h1>
          )}

          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && (
          <Post posts={filteredPosts} />

        )}
        {filteredPosts.length === 0 && (
          <h2>Não existem posts =( </h2>

        )}

        <div className='button-container'>
          {!searchValue && (

            <Button
              text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
