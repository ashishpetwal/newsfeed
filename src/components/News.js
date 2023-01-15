import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

    static defaultProps = {
        country: "in",
        category: "general",
        pageSize: 6
        // totalResults: 0
    }
    
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
    }

    capitalize = (str) =>{
        return str.charAt(0).toUpperCase()+str.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsFeed - ${this.capitalize(this.props.category)}`;
    }

    async updateNews(){
        this.props.setProgress(10);
        const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d4fff29456c9465ba15344124771d502&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    async componentDidMount(){
        this.updateNews();
    }

    fetchMoreData = async () =>{
        this.setState({
            page: this.state.page + 1
        })
        const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d4fff29456c9465ba15344124771d502&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        });
    }

    render() {
        return (
            <>
                <h2 className="text-center">NewsFeed - Top {this.capitalize(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner/>}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                        <div className="row my-5">
                            {this.state.articles.map((element)=>{
                                return <div className='col-md-4 my-3' key={element.url}>
                                    <NewsItem title={element.title?element.title.slice(0,44):""} source={element.source.name} description={element.description?element.description.slice(0,88):""} author={element.author} date={element.publishedAt} imageUrl={element.urlToImage} newsUrl={element.url}/>
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News