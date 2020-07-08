import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Icon } from 'antd-mobile';
import { Link } from 'react-router-dom'
import "./man.scss";
//数组转成xx万
function getPlayCount(count) {
    let num = count / 10000
    if (num < 1) {
        return num*10000
    } else if (num >= 1 && num < 10000) {
        return Math.floor(num * 10) / 10 + '万'
    } else {
        return Math.floor(num / 1000) / 10 + '亿'
    }
}

class Man extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount() {

    }
    // goMore(){
    //     this.props.history.push("/more");
    // }
    render() {
        const { manData, manHead } = this.props;
        return (

            <div>
                <div className="man">
                    <div className="head">
                        <img className="head-img" src={manHead.img} alt="" /><span className="head-text"> {manHead.text}</span>
                        <Link to={`/more/${manHead.id}`}>
                            <span className="head-more">查看更多<Icon type="right" className="icon" /></span>
                        </Link>
                    </div>

                    {
                        manData.length > 0 && manData.map((item, index) => (
                            <Link key={index} to={`/detail/${item._id}`}>
                                <div className="content" >
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

Man.propTypes = {
    manHead: PropTypes.object
};


export default Man