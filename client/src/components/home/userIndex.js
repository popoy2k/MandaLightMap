import Loader from "react-loader-spinner";
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

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ButtonGroup from "antd/lib/button/button-group";

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

const getMonthInt = name => {
  const months = [
    {
      month: "January",
      number: 1
    },
    {
      month: "February",
      number: 2
    },
    {
      month: "March",
      number: 3
    },
    {
      month: "April",
      number: 4
    },
    {
      month: "May",
      number: 5
    },
    {
      month: "June",
      number: 6
    },
    {
      month: "July",
      number: 7
    },
    {
      month: "August",
      number: 8
    },
    {
      month: "September",
      number: 9
    },
    {
      month: "October",
      number: 10
    },
    {
      month: "November",
      number: 11
    },
    {
      month: "December",
      number: 12
    }
  ];

  return months.filter(feVal => feVal.month === name)[0].number || null;
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
    downloading: false,
    singleDownload: false
  };

  static propTypes = {
    verifyToken: PropTypes.func.isRequired,
    getTableData: PropTypes.func.isRequired,
    getSingleLipoData: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    requestDownloadURL: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    downloadUrl: PropTypes.node,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(null)])
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

  downloadRequest = type => {
    if (!type) {
      return;
    }
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
      console.log(selectedData);
      this.props.requestDownloadURL({ selectedData, type });
      this.setState({ downloading: true, downloadDisable: true });
    }
  };

  downloadFile = e => {
    this.downloadRequest("excel");
  };

  componentDidUpdate(prevProps) {
    const { lipoSingleData, lipoTable } = this.props.home;
    const { downloadUrl } = this.props;
    if (lipoSingleData !== prevProps.home.lipoSingleData) {
      this.setState({
        currentSingleSelected: lipoSingleData,
        selectedTableLoading: false
      });
    }

    if (prevProps.downloadUrl !== downloadUrl) {
      setTimeout(() => {
        window.open(downloadUrl);
      }, 100);

      this.setState({
        downloading: false,
        singleDownload: false,
        downloadDisable: false
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

  MenuDLChange = e => {
    const type = parseInt(e.key) === 1 ? "csv" : "json";
    this.downloadRequest(type);
  };

  singleDownloadRequest = e => {
    const { type } = e.target.dataset;
    if (isNaN(parseInt(type)) || parseInt(type) > 3 || parseInt(type) < 1) {
      return;
    }

    const { selectedYear, selectedMonth } = this.state;

    let finalMonth = getMonthInt(selectedMonth);

    if (!finalMonth) {
      return;
    }

    let finalType;
    switch (parseInt(type)) {
      case 1:
        finalType = "excel";
        break;
      case 2:
        finalType = "csv";
        break;
      case 3:
        finalType = "json";
        break;
      default:
        return;
    }

    this.props.requestDownloadURL({
      selectedData: [
        {
          year: selectedYear,
          months: [finalMonth < 10 ? `0${finalMonth}` : `${finalMonth}`]
        }
      ],
      type: finalType
    });
    this.setState({ singleDownload: true, downloading: true });
  };
  userClick = e => {
    const { key } = e;
    if (key === "1") {
      this.logout();
    }
  };

  render() {
    const { isAuthenticated, token } = this.props.auth;
    const { user } = this.props;
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
      downloadDisable,
      downloading,
      singleDownload
    } = this.state;

    if (!isAuthenticated && !token) {
      return <Redirect to="/auth/login" />;
    }

    if (!user) {
      return <div></div>;
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
      <Menu onClick={this.MenuDLChange}>
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
                  {downloading ? (
                    <Loader
                      type="Triangle"
                      color="#FFF"
                      height={20}
                      width={20}
                    />
                  ) : (
                    "Download"
                  )}
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
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
              <Dropdown
                className="nav-name"
                overlay={
                  <Menu onClick={this.userClick}>
                    <Menu.Item key="1">Logout</Menu.Item>
                  </Menu>
                }
              >
                <p>
                  {`${user.lastName}, ${user.firstName}`} <Icon type="down" />
                </p>
              </Dropdown>
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
                <div style={{ marginBottom: "10px" }}>
                  <h2>
                    {selectedMonth}, {selectedYear}
                  </h2>
                  <ButtonGroup onClick={this.singleDownloadRequest}>
                    <Button
                      type="primary"
                      disabled={singleDownload}
                      data-type="1"
                      size="small"
                    >
                      Excel
                    </Button>

                    <Button
                      type="primary"
                      disabled={singleDownload}
                      data-type="2"
                      size="small"
                    >
                      CSV
                    </Button>

                    <Button
                      type="primary"
                      disabled={singleDownload}
                      data-type="3"
                      size="small"
                    >
                      JSON
                    </Button>
                  </ButtonGroup>
                </div>

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
  home: state.home,
  downloadUrl: state.home.lipoDownloadUrl,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  verifyToken,
  getTableData,
  getSingleLipoData,
  logout,
  requestDownloadURL
})(userIndex);
