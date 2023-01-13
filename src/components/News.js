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

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5b32ce71a952430eb0cd82dec765c0be&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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

    handlePrev = async ()=>{
        let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5b32ce71a952430eb0cd82dec765c0be&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page -1,
            loading: false
        });
    }
    handleNext = async ()=>{
        if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5b32ce71a952430eb0cd82dec765c0be&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({
                loading: true
            })
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
                loading: false
            });
        }
    }

    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center">NewsFeed - Headlines of the Day</h2>
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