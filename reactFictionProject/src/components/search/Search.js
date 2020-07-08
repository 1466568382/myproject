import React, { Component } from "react";
import { Icon, WingBlank } from 'antd-mobile';
import { Link } from 'react-router-dom'
import "./search.scss";
import { HOT_SEARCH, HOT_WORDS, SEARCH_DATA } from "../../api/index.js"
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

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotSearchData: [],
            hotWordsData: [],
            inputText: "",
            showHotWords: true,
            searchData: [],
            searchDataShow: true,
            hotWordsShow: true,
            historyData: [],
            loading: true,
            // delShow:false,
        }
        this.getSearchData = this.getSearchData.bind(this);
        this.goBack = this.goBack.bind(this);
        this.getHotWordsData = this.getHotWordsData.bind(this);
        this.getHotWords = this.getHotWords.bind(this);
        this.searchData = this.searchData.bind(this);
        this.historyEmpty = this.historyEmpty.bind(this);
        // this.delSearchData = this.delSearchData.bind(this);
    }
    async getSearchData() {
        let data = await HOT_SEARCH();
        console.log(data);
        this.setState({
            hotSearchData: data.searchHotWords.slice(0, 10),
            loading:false
        })
    }
    async getHotWordsData(val) {
        let data = await HOT_WORDS(val);
        this.setState({
            hotWordsData: data.keywords,
        })
    }
    async searchData(val) {
        this.setState({
            loading:true
        })
        let data = await SEARCH_DATA(val);
        if (!this.state.historyData.includes(val)) {
            this.setState({
                historyData: [val, ...this.state.historyData],
                loading:false
            })
            localStorage.setItem("search_history", JSON.stringify([...this.state.historyData]));
        }
        this.setState({
            showHotWords: false,
            searchDataShow: true,
            inputText: val,
            searchData: data.books,
            hotWordsShow: false,
            loading:false
        })
    }
    getHotWords(e) {
        let val = e.target.value
        if (e.target.value.length > 0) {
            this.setState({
                showHotWords: false,
                searchDataShow: false,
                hotWordsShow: true,
                delShow: true
            })
        } else {
            this.setState({
                showHotWords: true,
                hotWordsShow: false,
                delShow: false
            })
        }
        this.getHotWordsData(val)
        this.setState({
            inputText: val
        })
    }
    // delSearchData(){
    //     this.setState({
    //         inputText: "",
    //         showHotWords: true,
    //         hotWordsShow: false,
    //         delShow:false
    //     })
    // }
    componentWillMount() {
        this.getSearchData();
        if (localStorage.getItem("search_history")) {
            this.setState({
                historyData: JSON.parse(localStorage.getItem("search_history"))
            })
        }

    }
    goBack() {
        this.props.history.goBack();
    }
    historyEmpty() {
        this.setState({
            historyData: []
        })
        localStorage.setItem("search_history", JSON.stringify([]));
    }
    render() {
        const { hotSearchData, hotWordsData, inputText, showHotWords, searchData, searchDataShow, hotWordsShow, historyData, delShow,loading } = this.state
        return (
            <div className="search-page">
                {
                    loading && <div className="loading"><img className="loading-img" src={require("../../images/public/loading.svg")} alt="" /></div>
                }
                <div className="search-box">
                    <div className="search-input">
                        <Icon className="search-input-searchIcon" type="search" size="xs" />
                        <input
                            onChange={this.getHotWords}
                            value={inputText}
                            className="search-input-text search-input-box" type="text" placeholder="请输入书名或作者名" />
                        {/* {delShow&&<i className="search-del" onClick={this.delSearchData}></i>} */}
                    </div>
                    <div className="search-cancel" onClick={this.goBack}>取消</div>
                </div>

                {/* 搜索出来的内容 */}
                <div className="search-data-box">
                    {/* 搜索建议 */}
                    <div className="hot-words">
                        <ul className="hot-words-list">
                            {
                                hotWordsShow && hotWordsData && hotWordsData.map((item, index) => (
                                    <li key={index} className="hot-words-item" onClick={() => this.searchData(item)}>{item}</li>
                                ))
                            }
                        </ul>
                    </div>
                    {/* 热门搜索 */}
                    {
                        showHotWords && <div className="hot-search">
                            <h2>热门搜索</h2>
                            <ul className="hot-search-list">
                                {
                                    hotSearchData && hotSearchData.map((item, index) => (
                                        <li key={index} className="hot-search-item"
                                            onClick={() => this.searchData(item.word)}
                                        >{item.word}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    }
                    {/* 搜索历史 */}
                    {
                        showHotWords && historyData.length > 0 && <div className="history-search">
                            <h2>搜索历史</h2>
                            <div className="history-empty"
                                onClick={this.historyEmpty}
                            >清空</div>
                            <ul className="history-search-list">
                                {
                                    historyData && historyData.map((item, index) => (
                                        <li key={index} className="history-search-item"
                                            onClick={() => this.searchData(item)}
                                        >{item}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    }
                    {
                        searchDataShow && searchData.length > 0 && searchData.map((item, index) => (
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
                                                {item.author} |
                                                <span className="num">{getPlayCount(item.latelyFollower)}</span>人气
                                            <div className="type">{item.cat}</div>
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


export default Search