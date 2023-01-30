
import { Component } from 'react';

import './styles.css';


import { Post } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts'
import { Button } from '../../components/Button';


export class Home extends Component {
  state = {
    posts: [],
    allPost: [],
    page: 0,
    postsPerPage: 30
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


  // handledTimeOut = () => {
  //   this.timeOutUpdate = setTimeout(() => {
  //     this.setState({date: new Date().toLocaleString()});
  //   }, 1000)

  // }
  render() {
    const { posts, page, postsPerPage, allPost } = this.state;
    const noMorePosts = page + postsPerPage >= allPost.length;
    return (
      <section className='container'>
        <Post posts={posts} />
        <div className='button-container'>
          <Button
            text="Load more posts"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
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
