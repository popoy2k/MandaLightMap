import React, { Component, Fragment } from "react";
import {
  Layout,
  Menu,
  Icon,
  Avatar,
  Table,
  Tooltip,
  Button,
  Drawer,
  Row,
  Col,
  Dropdown
} from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  verifyToken,
  getTableData,
  getSingleLipoData,
  logout,
  requestDownloadURL
} from "../../actions/auth";
import { Redirect } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const getMonth = num => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return months[parseInt(num) - 1];
};

export class userIndex extends Component {
  state = {
    collapsed: false,
    drawerLipo: false,
    size: 60,
    opacity: 1,
    tab: "1",
    lipoTableLoading: true,
    lipoTableData: null,
    lipoSelectedRowKeys: [],
    lipoSelectedRowData: [],
    selectedYear: "",
    selectedMonth: "",
    selectedTableLoading: true,
    currentSingleSelected: "",
    downloadDisable: true,
    downloading: false
  };

  static propTypes = {
    verifyToken: PropTypes.func.isRequired,
    getTableData: PropTypes.func.isRequired,
    getSingleLipoData: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    requestDownloadURL: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired
  };

  showLipoDrawer = e => {
    const { year, month } = e.target.dataset;
    this.props.getSingleLipoData({ year, month });
    this.setState({
      selectedTableLoading: true,
      drawerLipo: true,
      selectedYear: year,
      selectedMonth: getMonth(month)
    });
  };

  closeLipoDrawer = () => {
    this.setState({
      drawerLipo: false,
      selectedYear: "",
      selectedMonth: "",
      currentSingleSelected: ""
    });
  };

  logout = () => {
    this.props.logout();
    return <Redirect to="/" />;
  };

  downloadFile = e => {
    const { lipoSelectedRowData, downloading } = this.state;
    if (!downloading && lipoSelectedRowData.length) {
      let selectedData = [];
      [...new Set(lipoSelectedRowData.map(mVal => JSON.parse(mVal).year))].map(
        m2Val =>
          selectedData.push({
            year: m2Val,
            months: lipoSelectedRowData
              .filter(fVal => JSON.parse(fVal).year === m2Val)
              .map(m3Val => JSON.parse(m3Val).month)
          })
      );
      this.props.requestDownloadURL(selectedData);
    }
  };

  componentDidUpdate(prevProps) {
    const { lipoSingleData, lipoTable } = this.props.home;
    if (lipoSingleData !== prevProps.home.lipoSingleData) {
      this.setState({
        currentSingleSelected: lipoSingleData,
        selectedTableLoading: false
      });
    }

    if (lipoTable !== prevProps.home.lipoTable) {
      this.setState({ lipoTableLoading: false, lipoTableData: lipoTable });
    }
  }

  componentDidMount() {
    document.title = "Skótos - User";
    const { token, isAuthenticated } = this.props.auth;
    const { lipoTableData } = this.state;

    if (token && !isAuthenticated) {
      this.props.verifyToken();
    }
    if (lipoTableData === null) {
      this.props.getTableData();
    }

    if (lipoTableData) {
      this.setState({ lipoTableLoading: false });
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
    const { isAuthenticated, token } = this.props.auth;

    const {
      tab,
      lipoSelectedRowKeys,
      drawerLipo,
      selectedMonth,
      selectedYear,
      selectedTableLoading,
      currentSingleSelected,
      lipoTableLoading,
      lipoTableData,
      downloadDisable
    } = this.state;

    if (!isAuthenticated && !token) {
      return <Redirect to="/auth/login" />;
    }

    const lipoColumn = [
      {
        title: "Year",
        dataIndex: "year",
        key: "year",
        filters: [
          { text: "2019", value: "2019" },
          { text: "2018", value: "2018" },
          { text: "2017", value: "2017" },
          { text: "2016", value: "2016" },
          { text: "2015", value: "2015" },
          { text: "2014", value: "2014" },
          { text: "2013", value: "2013" },
          { text: "2012", value: "2012" }
        ],
        onFilter: (value, record) => record.year.indexOf(value) === 0,
        sorter: (a, b) => parseInt(a.year) - parseInt(b.year),
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Month",
        dataIndex: "month",
        key: "month",
        render: month => getMonth(month),
        filters: [
          { text: "January", value: 1 },
          { text: "February", value: 2 },
          { text: "March", value: 3 },
          { text: "April", value: 4 },
          { text: "May", value: 5 },
          { text: "June", value: 6 },
          { text: "July", value: 7 },
          { text: "August", value: 8 },
          { text: "September", value: 9 },
          { text: "October", value: 10 },
          { text: "November", value: 11 },
          { text: "December", value: 12 }
        ],
        onFilter: (value, record) => parseInt(record.month) === parseInt(value),
        sorter: (a, b) => parseInt(a.month) - parseInt(b.month),
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Data Type",
        dataIndex: "dataType",
        key: "dataType",
        render: type => (
          <Tooltip
            placement="top"
            title="VIIRS Cloud Mask"
            className="tableTooltip"
          >
            {type}
          </Tooltip>
        )
      },
      {
        title: "Detailed Information",
        dataIndex: "drawerData",
        key: "drawerData",
        render: type => {
          let newType = JSON.parse(type);
          return (
            <Button
              size="small"
              type="dashed"
              data-year={newType.year}
              data-month={newType.month}
              onClick={this.showLipoDrawer}
            >
              Info
            </Button>
          );
        },
        width: 100
      }
    ];

    const lipoTableSelect = {
      selectedRowKeys: lipoSelectedRowKeys,
      onChange: (selectedRowKeys, selectedRowData) => {
        this.setState({
          lipoSelectedRowKeys: selectedRowKeys,
          lipoSelectedRowData: selectedRowData.length
            ? selectedRowData.map(mVal => mVal.drawerData)
            : [],
          downloadDisable: !selectedRowKeys.length ? true : false
        });
      },
      hideDefaultSelections: true,
      selections: [
        {
          key: "select-all-data",
          text: "Select All ",
          onSelect: () => {
            this.setState({
              lipoSelectedRowKeys: [...Array(lipoTableData.length).keys()],
              lipoSelectedRowData: lipoTableData.length
                ? lipoTableData.map(mVal => mVal.drawerData)
                : [],
              downloadDisable: false
            });
          }
        },
        {
          key: "unselect-all-data",
          text: "Unselect All ",
          onSelect: () =>
            this.setState({
              lipoSelectedRowKeys: [],
              lipoSelectedRowData: [],
              downloadDisable: true
            })
        }
      ]
    };

    const singleSelectedColumn = [
      {
        title: "G.I.S Id",
        dataIndex: "id",
        key: "id",
        sorter: (a, b) => a.id - b.id
      },
      {
        title: "Area Name",
        dataIndex: "loc_name",
        key: "loc_name"
      },
      {
        title: "District",
        dataIndex: "district",
        key: "district",
        render: data => <span>District {data}</span>,
        filters: [
          { text: "District 1", value: 1 },
          { text: "District 2", value: 2 }
        ],
        onFilter: (value, record) => record.district === value,
        sorter: (a, b) => a.district - b.district
      },
      {
        title: "Population",
        dataIndex: "loc_pop",
        key: "loc_pop",
        sorter: (a, b) =>
          parseInt(a.loc_pop.split(",").join("")) -
          parseInt(b.loc_pop.split(",").join(""))
      },
      {
        title: "Land Area",
        dataIndex: "loc_area",
        key: "loc_area",
        sorter: (a, b) => a.loc_area - b.loc_area
      },
      {
        title: "Radiance - Mean",
        dataIndex: "mean",
        key: "mean",
        render: val => val.toFixed(2),
        sorter: (a, b) => a.mean - b.mean
      },
      {
        title: "Radiance - Max",
        dataIndex: "max",
        key: "max",
        render: val => val.toFixed(2),
        sorter: (a, b) => a.max - b.max
      },
      {
        title: "Radiance - Min",
        dataIndex: "min",
        key: "min",
        render: val => val.toFixed(2),
        sorter: (a, b) => a.min - b.min
      }
    ];

    const downloadOverlay = (
      <Menu>
        <Menu.Item key="1">CSV</Menu.Item>
        <Menu.Item key="2">JSON</Menu.Item>
      </Menu>
    );

    let content = "";
    switch (tab) {
      case "1":
        content = (
          <div>
            <Row style={{ marginBottom: "15px" }}>
              <Col span={12}>
                <h3>Light Pollution Statistical Data</h3>
              </Col>
              <Col span={12} push={9}>
                <Dropdown.Button
                  type="primary"
                  disabled={downloadDisable}
                  overlay={downloadOverlay}
                  placement="bottomRight"
                  icon={<Icon type="download" />}
                  size="large"
                  onClick={this.downloadFile}
                  title="Download Excel"
                >
                  Download
                </Dropdown.Button>
              </Col>
            </Row>

            <Table
              scroll={{ x: "max-content" }}
              loading={lipoTableLoading}
              rowSelection={lipoTableSelect}
              columns={lipoColumn}
              dataSource={lipoTableData}
              pagination={{ pageSize: 10 }}
              size={"small"}
            />
          </div>
        );
        break;
      case "2":
        break;
      default:
    }

    return (
      <Fragment>
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
              <Tooltip placement="left" title="Logout">
                <Icon
                  type="close-circle"
                  className="user-cogs"
                  onClick={this.logout}
                />
              </Tooltip>
            </Header>
            <Content className="user-content-main">
              {content}
              <Drawer
                width={640}
                visible={drawerLipo}
                placement="right"
                closable={false}
                onClose={this.closeLipoDrawer}
              >
                <h2>
                  {selectedMonth}, {selectedYear}
                </h2>
                <Table
                  columns={singleSelectedColumn}
                  size="small"
                  loading={selectedTableLoading}
                  dataSource={
                    currentSingleSelected ? currentSingleSelected : null
                  }
                  scroll={{ x: "max-content" }}
                />
              </Drawer>
            </Content>
          </Layout>
        </Layout>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  home: state.home
});

export default connect(
  mapStateToProps,
  { verifyToken, getTableData, getSingleLipoData, logout, requestDownloadURL }
)(userIndex);
