import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./sex.scss";
function getPlayCount(count) {
    if (count > 10000) {
        return Math.floor(count / 1000)/10 + '万'
    }  else{
        return count;
    }
}
class Sex extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { data,sex } = this.props;
        return (
            <div className="classBox">
                {data && data.map((item, index) => (
                    <Link to={`/category/${item.name}?${sex}`}  className="book-list" key={index}>
                        <div className="book-list-n">
                            <div className="info">
                                <div className="title">{item.name}</div>
                                <div className="book">{getPlayCount(item.bookCount)}本</div>
                            </div>
                            <div className="cover">
                                {
                                    item.bookCover.map((val, i) => (
                                        <img key={i} src={`https://statics.zhuishushenqi.com${val}`} />
                                    ))
                                }
                            </div>
                        </div>
                    </Link>
                ))
                }
            </div>
        )
    }

}


export default Sex