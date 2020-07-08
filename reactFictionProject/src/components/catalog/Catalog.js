import React, { Component } from "react";
import "./catalog.scss"
import { Icon } from 'antd-mobile';
import { Link } from 'react-router-dom';
class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catalogData: [
                "第一章 生日噩梦",
                "第二章 最后一餐",
                "第三章 不得好死",
                "第四章 帮我化解",
                "第五章 害死师父",
                "第六章 他是魔鬼",
                "第七章 真当我死了是吧？",
                "第八章 祸害回来了",
                "第九章 瑶瑶亲侄女",
                "第十章 你是猪吗",
                "第十一章 七月十五",
                "第十二章 我大娘活了",
                "第十三章 你等死吧",
                "第十四章 僵尸村",
                "第十五章 闭嘴，松手",
                "第十六章 永绝后患",
            ]
        }
        this.goBack = this.goBack.bind(this);
    }
    goBack() {
        this.props.history.push("/");
    }
    render() {
        const { catalogData } = this.state
        return (
            <div>
                <div className="detailHead">
                    <Icon onClick={this.goBack} className="icon" type="left" />  目录
                </div>
                <div className="catalog-box">
                    {catalogData.map((item, index) => (
                        <Link to={`/reader/${index}`} key={index} className="catalog-item" >
                            {item}
                        </Link>
                    ))}
                </div>
            </div>
        )
    }

}


export default Catalog