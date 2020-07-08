import React, { Component } from "react";
import { Tabs, WhiteSpace } from 'antd-mobile';
import {CLASSIFY_FICTION} from "../../api/index";
import Sex from "./sex/sex"
import "./classify.scss"
class Classify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maleData:[],
            femaleData:[]
        }
    }
    async getClassifyData(){
        const data=await CLASSIFY_FICTION();
        this.setState({
         maleData:data.male,
         femaleData:data.female
        })
     }
     componentWillMount(){
         this.getClassifyData()
     }
    render() {
        const tabs = [
            { title: '男' },
            { title: '女' },
        ];
        const {maleData,femaleData} =this.state;

        return (
            <div>
                {
                    <div>
                        <Tabs tabs={tabs} initialPage={0} animated={false} 
                         tabBarUnderlineStyle={{
                            borderColor: '#23b383'
                        }}
                        tabBarActiveTextColor="#23b383"
                        >
                            <Sex data={maleData} sex="male"/>
                            <Sex data={femaleData} sex="female"/>
                    </Tabs>

                    </div>
                }
            </div>
        )
    }
}


export default Classify