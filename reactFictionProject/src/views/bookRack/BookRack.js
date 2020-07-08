import React, { Component } from "react";
import { WingBlank, Icon, Carousel, Toast } from 'antd-mobile';
import Man from "./man/Man"
import { INDEX_FICTION } from '../../api/index'
import { Link } from 'react-router-dom'
import "./bookRack.scss"


class BookRack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgHeight: 110,
            loading: true,
            banner: [
                {
                    _id: "5bc06d0bf7634e0d9cb4b31b",
                    img: require("../../images/banner/banner.png")
                },
                {
                    _id: "5ea505c98f0082227954a787",
                    img: require("../../images/banner/banner1.png")
                }
            ],
            manData: {},
            manHead: {
                id: "54d42d92321052167dfb75e3",
                img: require("../../images/index/man.png"),
                text: "男频主编推荐"
            },
            womanData: {},
            womanHead: {
                id: "54d43437d47d13ff21cad58b",
                img: require("../../images/index/woman.png"),
                text: "女频主编推荐"
            }
        }
    }
    // 获取男女推荐
    async getRecommendData() {
        let man = await INDEX_FICTION("54d42d92321052167dfb75e3");
        let woman = await INDEX_FICTION("54d43437d47d13ff21cad58b");
        this.setState({
            manData: man.ranking.books.slice(0, 5),
            womanData: woman.ranking.books.slice(0, 5),
            loading: false

        })

    }
    toRender() {
        // console.log(11);
    }
    //生命周期
    componentDidMount() {
        this.getRecommendData();
    }
    render() {
        const { banner, manData, manHead, womanHead, womanData, loading } = this.state
        return (
            <div>
                {/* 头部搜索 */}
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
                {/* 轮播图 */}
                <div className="carousel">
                    <Carousel
                        autoplay={false}
                    >
                        {banner.map((val, index) => (
                            <Link to={`/detail/${val._id}`} key={index} >
                                <div
                                    key={index}
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        className="carousel-img"
                                        src={val.img}
                                        alt=""
                                        style={{ width: '100%', verticalAlign: 'top' }}
                                    />
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                </div>

                {/* 男推荐 */}
                <Man manHead={manHead} manData={manData} />
                {/* 女推荐 */}
                <Man manHead={womanHead} manData={womanData} />
                {
                    loading && <div className="loading"><img className="loading-img" src={require("../../images/public/loading.svg")} alt=""/></div>
                }
            </div>
        )
    }

}


export default BookRack