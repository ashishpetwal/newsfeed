import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let {title,description,imageUrl,newsUrl,author,date,source} = this.props;

        return (
            <div>
                <div className="card">
                    <img src={!imageUrl?"https://gumlet.assettype.com/greaterkashmir%2F2022-10%2Fd1e2fa2f-245b-4bb2-a226-2db19723cc56%2FIMG_20221026_165504.jpg?rect=0%2C203%2C1024%2C576&auto=format%2Ccompress&fit=max&format=webp&w=768&dpr=1.3":imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <div style={{display: "flex",
                                        justifyContent: "flex-end",
                                        position: "absolute",
                                        top: "-10px",
                                        right: "0"}}>
                                <span className="badge rounded-pill bg-danger">{source}</span>
                            </div>
                            <h5 className="card-title">{title}...
                            </h5>
                            <p className="card-text">{description}...</p>
                            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()} </small></p>
                            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem