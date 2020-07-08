import React, { Component } from "react";
import "./detail.scss";
import { DETAIL_FICTION, RECOMMEND_FICTION } from '../../api/index'
import { Icon, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom'
import { store } from '../../store/index.js'
function getPlayCount(count) {
    let num = count / 10000
    if (num < 1) {
        return Math.floor(num * 10000)
    } else if (num >= 1 && num < 10000) {
        return Math.floor(num * 10 / 10) + '万'
    } else {
        return Math.floor(num / 1000) / 10 + '亿'
    }
}
// 加入书架成功  轻提升
function successToast() {
    Toast.success('加书架成功', 1);
}
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailData: {},
            recommendData: [],
            count1: 0,
            count2: 1,
            recommendDataTotal: [],
            showAdd: true,
            loading: true
        }
        this.goBack = this.goBack.bind(this);
        this.editShow = this.editShow.bind(this);
        this.getRecommend = this.getRecommend.bind(this);
        this.changeRecommend = this.changeRecommend.bind(this);
        this.toRender = this.toRender.bind(this);
        this.collectBook = this.collectBook.bind(this);
    }
    collectBook() {
        successToast();
        store.dispatch({
            type: "ADD_COLLECT",
            collectData: this.state.detailData
        })
        this.setState({
            showAdd: false
        })
    }
    async getDetailData(id) {
        let data = await DETAIL_FICTION(id);

        let recommend = await RECOMMEND_FICTION(id);
        this.getRecommend(recommend.books);
        this.setState({
            detailData: data,
            isShow: true,
            recommendDataTotal: recommend.books,
            loading: false
        })
    }
    getRecommend(data = this.state.recommendDataTotal) {
        this.setState({
            count1: this.state.count1 += 1,
            count2: this.state.count2 += 1,
            recommendData: data.slice(0, 3)
        })
    }
    toRender(id) {
        // console.log(id)
        this.getDetailData(id)
        this.props.history.push(`/detail/${id}`);
        this.forceUpdate();//强制刷新
        window.scrollTo(0, 0);//置顶
        this.setState({
            showAdd: true,
            loading: true
        })

    }
    changeRecommend() {
        if (this.state.count1 == 6) {
            this.setState({
                count1: 1,
                count2: 2,
                recommendData: this.state.recommendDataTotal.slice(0, 3)
            })
            return;
        }
        this.setState({
            recommendData: this.state.recommendDataTotal.slice(this.state.count1 * 3, this.state.count2 * 3),
            count1: this.state.count1 += 1,
            count2: this.state.count2 += 1,
        })
    }
    componentWillMount() {
        this.getDetailData(this.props.match.params.id)

    }

    goBack() {
        this.props.history.push('/');
    }
    editShow(e) {
        this.setState({
            isShow: !this.state.isShow
        })
    }
    render() {
        const { detailData, isShow, recommendData, showAdd ,loading} = this.state;
        return (
            <div>
                {/* loading */}
                {
                    loading && <div className="loading"><img className="loading-img" src={require("../../images/public/loading.svg")} alt=""/></div>
                }
                {/* 头部 */}
                <div className="detailHead">
                    <Icon onClick={this.goBack} className="icon" type="left" />  详情
                </div>
                <div className="detailContent">
                    {/* 图片+基本信息 */}
                    <div className="cover-info">
                        <div className="cover">
                            <img src={detailData.cover && `https://statics.zhuishushenqi.com${detailData.cover}`} alt="" />
                        </div>
                        <div className="info">
                            <div className="title">{detailData.title}</div>
                            <div className="author">{detailData.author}</div>
                            {/* 人气 */}
                            <div className="count">
                                连载 {getPlayCount(detailData.wordCount)}字&nbsp;&nbsp;
                                日/{getPlayCount(detailData.serializeWordCount)}字
                            </div>
                        </div>
                    </div>
                    <div className="analysis">
                        <div className="item">
                            <div className="text">
                                最近人气
                            </div>
                            <div className="num"> {getPlayCount(detailData.latelyFollower)}</div>
                        </div>
                        <div className="item">
                            <div className="text">
                                读者留存率
                            </div>
                            <div className="num"> {detailData.retentionRatio}%</div>
                        </div>
                        <div className="item">
                            <div className="text">
                                评分
                            </div>
                            <div className="num"> {detailData.rating && detailData.rating.score}分</div>
                        </div>
                    </div>
                    {/* 简介 */}
                    <div className="cover-intro">
                        <div className="titlebar">
                            内容简介
                        </div>
                        <div className={isShow ? "text" : " text unfold"}>
                            {detailData.longIntro}
                            <Icon className={isShow ? "up-icon hide" : "up-icon"} type="up" onClick={this.editShow} />
                        </div>
                        <div className={isShow ? "show" : "hide"} ><Icon className="show-icon" type="down" onClick={this.editShow} /></div>
                    </div>

                    {/* 标签 */}
                    <div className="cover-tags">
                        {
                            detailData.tags && detailData.tags.map((item, index) => (
                                <span key={index}>{item}</span>
                            ))
                        }
                    </div>
                    {/* 最新 */}
                    <Link  to="/reader/15" className="config-item">
                        <h2>最新</h2>
                        <div className="icon-text">{detailData.lastChapter}</div>
                        <Icon className="config-icon" type="right" />
                    </Link>
                    {/* 目录 */}
                    <Link to="/catalog">
                        <div className="config-item">
                            <h2>目录</h2>
                            <div className="icon-text">共{detailData.chaptersCount}章</div>
                            <Icon className="config-icon" type="right" />
                        </div>
                    </Link>
                    <div className="recommend-books">
                        <div className="titlebar">
                            <h2>相关推荐</h2>
                            <div className="right" onClick={this.changeRecommend}>换一换</div>
                        </div>
                        <div className="booklist-n3">
                            {
                                recommendData.map((item, index) => (
                                    // <Link to={`/detail/${item._id}`}
                                    //     key={index}
                                    //     className="booklist-item"
                                    //     onClick={this.toRender}
                                    // >
                                    <div key={index}
                                        className="booklist-item"
                                        onClick={()=>this.toRender(item._id)}>
                                        <img src={detailData.cover && `https://statics.zhuishushenqi.com${item.cover}`} alt="" />
                                        <div className="text">{item.title}</div>
                                        <div className="sub-text">{item.author}</div>
                                    </div>
                                    // </Link>
                                ))
                            }

                        </div>

                        <div className="btns">
                            {showAdd && <div className="addBook" onClick={this.collectBook}>加入书架</div>}
                            {!showAdd && <div className="yetAddBook">已加书架</div>}
                            <Link to="/reader/0" className="startRead">开始阅读</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default Detail