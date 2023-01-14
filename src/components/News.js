import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        country: "in",
        category: "general",
        pageSize: 6
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
            loading: false,
            page: 1
        }
        document.title = `NewsFeed - ${this.capitalize(this.props.category)}`;
    }

    async updateNews(){
        const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5b32ce71a952430eb0cd82dec765c0be&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    async componentDidMount(){
        this.updateNews();
    }

    handlePrev = async ()=>{
        this.setState({
            page: this.state.page -1,
        });
        this.updateNews();
    }
    handleNext = async ()=>{
        this.setState({
            page: this.state.page + 1,
        });
        this.updateNews();
    }

    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center">NewsFeed - Top {this.capitalize(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner/>}
                <div className="row my-5">
                    {!this.state.loading && this.state.articles.map((element)=>{
                        return <div className='col-md-4 my-3' key={element.url}>
                            <NewsItem title={element.title?element.title.slice(0,44):""} source={element.source.name} description={element.description?element.description.slice(0,88):""} author={element.author} date={element.publishedAt} imageUrl={element.urlToImage} newsUrl={element.url}/>
                        </div>
                    })}
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Prev</button>
                    <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News