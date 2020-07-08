import React, {Component} from "react";
import { TabBar } from 'antd-mobile';
import BookMall from "../bookMall/BookMall"
import BookRack from "../bookRack/BookRack"
import Classify from "../classify/Classify"
// import My from "../my/My"
import "./index.scss";
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            fullScreen: true,
        }
    }
    render() {
        return (
            <div className="App" style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
            <TabBar
              unselectedTintColor="#949494"
              tintColor="#23b383"
              barTintColor="white"
            >
              <TabBar.Item
                title="书架"
                key="书架"
                icon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${require("../../images/tabbar/bookrack.svg")}) center center /  21px 21px no-repeat`
                }}
                />
                }
                selectedIcon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${require("../../images/tabbar/bookracka.svg")}) center center /  21px 21px no-repeat`
                }}
                />
                }
                selected={this.state.selectedTab === 'blueTab'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'blueTab',
                  });
                }}
                data-seed="logId"
                to="/sdf"
              >
                <BookMall />
              </TabBar.Item>
              <TabBar.Item
                icon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${require("../../images/tabbar/bookmall.svg")}) center center /  21px 21px no-repeat`
                  }}
                  />
                }
                selectedIcon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${require("../../images/tabbar/bookmalla.svg")}) center center /  21px 21px no-repeat`
                  }}
                  />
                }
                title="书城"
                key="书城"
                selected={this.state.selectedTab === 'redTab'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'redTab',
                  });
                }}
                data-seed="logId1"
              >
                <BookRack />
              </TabBar.Item>
              <TabBar.Item
                icon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${require("../../images/tabbar/classify.svg")}) center center /  21px 21px no-repeat`
                  }}
                  />
                }
                selectedIcon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${require("../../images/tabbar/classifya.svg")}) center center /  21px 21px no-repeat`
                  }}
                  />
                }
                title="分类"
                key="分类"
                selected={this.state.selectedTab === 'greenTab'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'greenTab',
                  });
                }}
              >
                <Classify />
              </TabBar.Item>
              {/* <TabBar.Item
                icon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${require("../../images/tabbar/my.svg")}) center center /  21px 21px no-repeat`
                  }}
                  />
                }
                selectedIcon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${require("../../images/tabbar/mya.svg")}) center center /  21px 21px no-repeat`
                  }}
                  />
                }
                title="我的"
                key="我的"
                selected={this.state.selectedTab === 'yellowTab'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'yellowTab',
                  });
                }}
              >
                <My />
              </TabBar.Item> */}
            </TabBar>
          </div>
        )
    }
    
}


export default Index