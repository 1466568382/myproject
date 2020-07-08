import React, { Component } from "react";
import { INDEX_FICTION } from '../../api/index';
import { Icon } from 'antd-mobile';
import { Link } from 'react-router-dom'
import "./more.scss"
//数组转成xx万
function getPlayCount(count) {
    let num = count / 10000
    if (num < 1) {
        return Math.floor(num * 10000)
    } else if (num >= 1 && num < 10000) {
        return Math.floor(num * 10) / 10 + '万'
    } else {
        return Math.floor(num / 1000) / 10 + '亿'
    }
}
class More extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moreData: [],
            loading:true
        }
        this.goBack = this.goBack.bind(this);
    }
    async getMoreData() {
        let data = await INDEX_FICTION(this.props.match.params.id);

        this.setState({
            moreData: data.ranking.books,
            loading:false
        })
    }
    goBack() {
        this.props.history.goBack();
    }
    componentDidMount() {
        this.getMoreData();
    }
    render() {
        const { moreData ,loading} = this.state;
        return (
            <div>
                {/* loading */}
                {
                    loading && <div className="loading"><img className="loading-img" src={require("../../images/public/loading.svg")} alt="" /></div>
                }
                <div className="moreHead">
                    <Icon onClick={this.goBack} className="icon" type="left" />  更多
                </div>
                <div className="moreContentBox">
                    {
                        moreData.map((item, index) => (
                            <Link to={`/detail/${item._id}`} key={index}>
                                <div className="moreContent">
                                    <div >
                                        <div className="left">
                                            <img src={`https://statics.zhuishushenqi.com${item.cover}`} alt="" />
                                        </div>
                                        <div className="right">
                                            <div className="title">{item.title}</div>
                                            <p className="into">{item.shortIntro}</p>
                                            <div className="message">
                                                {item.minorCate} |
                                <span className="num">{getPlayCount(item.latelyFollower)}</span>人气
                                <div className="type">{item.majorCate}</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        )
    }

}


export default More