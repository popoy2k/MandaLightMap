import React, { Component } from "react";
import { Layout, Menu, Icon, Avatar } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { verifyToken } from "../../actions/auth";
import { Redirect } from "react-router-dom";

const { Header, Sider, Content } = Layout;
export class userIndex extends Component {
  state = {
    collapsed: false,
    size: 60,
    opacity: 1,
    tab: "1"
  };

  propTypes = {
    verifyToken: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    document.title = "Skótos - User";

    const { token, isAuthenticated } = this.props.auth;

    if (token && !isAuthenticated) {
      this.props.verifyToken();
    }
  }

  toggle = () => {
    const { size, opacity } = this.state;
    this.setState({
      collapsed: !this.state.collapsed,
      size: size === 60 ? 42 : 60,
      opacity: opacity === 1 ? 0 : 1
    });
  };

  menuClicked = value => {
    this.setState({ tab: value.key });
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    const { tab } = this.state;

    if (!isAuthenticated) {
      return <Redirect to="/auth/login" />;
    }

    let content = "";
    switch (tab) {
      case "1":
        content = (
          <div>
            <h3>Light Pollution Statistical Data</h3>
          </div>
        );
        break;
      case "2":
        break;
      default:
    }

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          theme="light"
        >
          <div className="logo sidebar-logo">
            <Avatar
              size={this.state.size}
              src="https://image.flaticon.com/icons/svg/139/139706.svg"
            />
            <span
              className="sidebar-logo-label"
              style={{ opacity: this.state.opacity }}
            >
              Skótos
            </span>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={this.menuClicked}
          >
            <Menu.Item key="1">
              <Icon type="bulb" />
              <span>Light Pollution Data</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="reconciliation" />
              <span>Health Records</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
            <Icon type="setting" className="user-cogs" />
          </Header>
          <Content className="user-content-main">{content}</Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { verifyToken }
)(userIndex);
