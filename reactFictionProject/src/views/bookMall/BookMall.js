import React, { Component } from "react";
import { WingBlank, Icon, List, SwipeAction } from 'antd-mobile';
import "./bookMall.scss";
import { Link } from 'react-router-dom'
import { defaultValue, store } from "../../store/index.js"
class BookMall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookImg: require("../../images/index/book.png"),
            collectData: []
        }
    }
    componentWillMount() {
        this.setState({
            collectData: store.getState().collect
        })
    }
    render() {
        const { bookImg, collectData } = this.state;
        return (
            <div className="bookMall">
                <div className="header-search-box">
                    <WingBlank size="lg">
                        <Link to="/search">
                            <div className="header-search-input">
                                <Icon className="header-search-input-searchIcon" type="search" size="xs" />
                                <span className="header-search-input-text">请输入书名或作者名</span>
                            </div>
                        </Link>
                    </WingBlank>
                </div>
                {collectData.length == 0 && <div className="bookImg">
                    <div className="bookBox">
                        <img className="image-area" src={bookImg} alt="" />
                        <div className="primary-label">把生命浪费在美好的事物上</div>
                        <div className="primary-label">书架还没有书,去书城看看吧!</div>
                        {/* <Link to="/" className="primary-button">
                            去书城
                        </Link> */}
                    </div>
                </div>}
                {collectData.length > 0 &&
                    collectData.map((item, index) => (
                        <div key={index}>

                            <SwipeAction
                                style={{ backgroundColor: 'gray' }}
                                autoClose
                                right={[
                                    {
                                        text: '取消',
                                        onPress: () => { },
                                        style: { backgroundColor: '#ddd', color: 'white' },
                                    },
                                    {
                                        text: '删除',
                                        onPress: () => {
                                            // console.log(item._id);
                                            store.dispatch({
                                                type: "REMOVE_COLLECT",
                                                id: item._id
                                            })
                                            this.setState({
                                                collectData: store.getState().collect
                                            })
                                            return;
                                        },
                                        style: { backgroundColor: '#F4333C', color: 'white' },
                                    },
                                ]}
                            >
                                <List.Item
                                    extra="delete"
                                    arrow="horizontal"
                                    onClick={e => console.log(e)}
                                >
                                    <Link to={`/detail/${item._id}`}>

                                        <div>
                                            <img className="collect-img" src={item.cover && `https://statics.zhuishushenqi.com${item.cover}`} alt="" />
                                        </div>
                                        <div className="collect-text">
                                            <div className="collect-title">
                                                {item.title}
                                            </div>
                                            <div className="collect-author">
                                                {item.author}
                                            </div>
                                        </div>
                                    </Link>
                                </List.Item>
                            </SwipeAction>
                        </div>
                    ))
                }

            </div>
        )
    }

}


export default BookMall