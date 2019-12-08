import Loader from "react-loader-spinner";
import moment from "moment";
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
  Descriptions,
  Row,
  Col,
  Dropdown,
  Typography,
  Upload,
  Tag,
  Radio,
  message,
  notification,
  Badge,
  Spin
} from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  verifyToken,
  getTableData,
  getSingleLipoData,
  logout,
  requestDownloadURL,
  uploadValidate,
  getUserTableData,
  getDownloadTableData,
  getUserDetails,
  changeUserRole
} from "../../actions/auth";

import { Redirect } from "react-router-dom";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ButtonGroup from "antd/lib/button/button-group";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { Dragger } = Upload;

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

export class adminIndex extends Component {
  state = {
    collapsed: false,
    drawerLipo: false,
    size: 60,
    opacity: 1,
    tab: "3",
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
    singleDownload: false,
    uploadFileList: [],
    uploading: false,
    userTableList: [],
    userTableLoading: true,
    userDrawer: false,
    userDetailsList: [],
    userDetailLoading: true,
    downloadTableList: [],
    downloadtableLoading: true,
    changingRole: false
  };

  static propTypes = {
    verifyToken: PropTypes.func.isRequired,
    getTableData: PropTypes.func.isRequired,
    getSingleLipoData: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    requestDownloadURL: PropTypes.func.isRequired,
    uploadValidate: PropTypes.func.isRequired,
    getUserTableData: PropTypes.func.isRequired,
    getDownloadTableData: PropTypes.func.isRequired,
    getUserDetails: PropTypes.func.isRequired,
    changeUserRole: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    downloadUrl: PropTypes.node,
    uploadStat: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(null)
    ]),
    userTable: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.instanceOf(null)
    ]),
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(null)]),
    notif: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(null)])
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
      currentSingleSelected: ""
    });
  };

  closeUserDrawer = () => {
    this.setState({ userDrawer: false, userDetailsList: [] });
  };

  userDetailsClick = e => {
    const { id } = e.target.dataset;
    this.props.getUserDetails({ id });

    this.setState({ userDrawer: true, userDetailLoading: true });
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
      this.props.requestDownloadURL({ selectedData, type });
      this.setState({ downloading: true, downloadDisable: true });
    }
  };

  downloadFile = e => {
    this.downloadRequest("excel");
  };

  componentDidUpdate(prevProps, prevState) {
    const { lipoSingleData, lipoTable } = this.props.home;
    const {
      downloadUrl,
      uploadStat,
      userTable,
      downloadTable,
      userDetails,
      notif
    } = this.props;
    const { uploadFileList } = this.state;

    if (notif !== prevProps.notif) {
      message[notif.status](notif.msg || notif.data);
      this.setState({ changingRole: false });
    }

    if (prevProps.userDetails !== userDetails) {
      this.setState({ userDetailsList: userDetails, userDetailLoading: false });
    }

    if (prevProps.userTable !== userTable) {
      this.setState({ userTableList: userTable, userTableLoading: false });
    }

    if (prevProps.downloadTable !== downloadTable) {
      this.setState({
        downloadTableList: downloadTable,
        downloadTableLoading: false
      });
    }

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

    if (prevState.uploadFileList !== uploadFileList && uploadFileList.length) {
      const formData = new FormData();
      formData.append("file", uploadFileList[0]);
      this.props.uploadValidate(formData);
    }

    if (prevProps.uploadStat !== uploadStat) {
      message.destroy();
      const { status, msg } = uploadStat;
      notification[status]({
        message: "Server Notification",
        description: `${msg}`,
        duration: 10,
        icon: (
          <Icon
            type={status === "success" ? "smile" : "frown"}
            style={{ color: status === "success" ? "#3285fa" : "#ff2626" }}
          />
        )
      });
      this.setState({ uploadFileList: [], uploading: false });
    }
  }

  componentDidMount() {
    document.title = "Skótos - User";
    const { token, isAuthenticated } = this.props.auth;
    const { lipoTableData, userTableList, downloadTableList } = this.state;

    if (token && !isAuthenticated) {
      this.props.verifyToken();
    }
    if (lipoTableData === null) {
      this.props.getTableData();
    }

    if (!userTableList.length) {
      this.props.getUserTableData();
    }

    if (!downloadTableList.length) {
      this.props.getDownloadTableData();
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

  roleChange = e => {
    const { value: role, name: _id } = e.target;
    this.props.changeUserRole({ role, _id });
    this.setState({ changingRole: true });
    // Show notif for return status
    // Add disabled in radio button while processing
    // Tagal matapos ng taon na to tang ina!!
  };

  render() {
    const { isAuthenticated, token } = this.props.auth;
    const { user } = this.props;
    if (!isAuthenticated && !token) {
      return <Redirect to="/auth/login" />;
    }
    if (!user) {
      return <div></div>;
    }
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
      singleDownload,
      uploadFileList,
      uploading,
      userTableList,
      userTableLoading,
      userDetailLoading,
      userDrawer,
      userDetailsList,
      downloadTableList,
      downloadTableLoading,
      changingRole
    } = this.state;

    let RoleRadio =
      Object.entries(userDetailsList).length > 0 ? (
        <div>
          <Radio.Group
            defaultValue={userDetailsList ? userDetailsList.role : "Admin"}
            onChange={this.roleChange}
            name={userDetailsList._id}
            disabled={changingRole ? true : false}
          >
            <Radio value="Admin">Admin</Radio>
            <Radio value="User">User</Radio>
          </Radio.Group>
        </div>
      ) : (
        ""
      );
    const uploadProps = {
      name: "file",
      accept: ".json",
      fileList: uploadFileList,
      beforeUpload: (file, fileList) => {
        this.setState({ uploadFileList: [...fileList], uploading: true });
        message.loading("File is being process...", 0);
        return false;
      }
    };

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

    const userTableColumn = [
      {
        title: "Fullname",
        dataIndex: "fullname",
        key: "fullname"
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: text => {
          let newText = text.charAt(0).toUpperCase() + text.slice(1);
          return (
            <Tag color={text === "admin" ? "green" : "cyan"}>{newText}</Tag>
          );
        }
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Account Type",
        dataIndex: "creationType",
        key: "creationType",
        render: type => {
          return (
            <span>
              <Icon
                type={type === "Google" ? "google" : "global"}
                style={{ color: type === "Google" ? "#f65314" : "#00A1F1" }}
              />{" "}
              &nbsp;
              {type}
            </span>
          );
        }
      },
      {
        title: "Action",
        dataIndex: "_id",
        key: "_id",
        render: id => (
          <Button
            type="primary"
            onClick={this.userDetailsClick}
            shape="round"
            size="small"
            icon="file"
            data-id={id}
            ghost
          >
            Details
          </Button>
        )
      }
    ];

    const downloadTableColumn = [
      {
        title: "Fullname",
        dataIndex: "fullname",
        key: "fullname"
      },
      {
        title: "File Name",
        dataIndex: "fileName",
        key: "fileName"
      },
      {
        title: "Download Date",
        dataIndex: "requestedDate",
        key: "requestedDate",
        render: date => (
          <span style={{ cursor: "pointer" }}>
            <Tooltip title={moment(date).fromNow()} placement="top">
              {moment(date).format("MMM Do, YYYY h:mm a")}
            </Tooltip>
          </span>
        )
      },
      {
        title: "Action",
        dataIndex: "fileURL",
        key: "fileURL",
        render: url => (
          <Button
            icon="download"
            href={url}
            target="_blank"
            type="primary"
            shape="round"
            size="small"
            ghost
          >
            Download
          </Button>
        )
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
            <Row>
              <h2>Upload Light Pollution Data</h2>
              <small>
                <Text type="secondary">
                  Please be mindful when uploading file. <br />
                  Skotos only allows JSON file for uploading new Light Pollution
                  Data. See here what format to upload new Light Pollution Data
                </Text>

                <Dragger {...uploadProps} disabled={uploading}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single upload. Strictly prohibit from
                    uploading non-JSON format file.
                  </p>
                </Dragger>
              </small>
            </Row>
          </div>
        );
        break;
      case "2":
        break;
      case "3":
        content = (
          <div>
            <Row>
              <h3>User Management</h3>
            </Row>
            <Row>
              <Table
                scroll={{ x: "max-content" }}
                pagination={{ pageSize: 10 }}
                loading={userTableLoading}
                size={"small"}
                columns={userTableColumn}
                dataSource={userTableList}
              ></Table>
            </Row>
          </div>
        );
        break;
      case "4":
        content = (
          <div>
            <Row>
              <h3>Download Records</h3>
            </Row>
            <Row>
              <Table
                scroll={{ x: "max-content" }}
                pagination={{ pageSize: 10 }}
                loading={downloadTableLoading}
                size={"small"}
                columns={downloadTableColumn}
                dataSource={downloadTableList}
              ></Table>
            </Row>
          </div>
        );
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
              defaultSelectedKeys={["3"]}
              onClick={this.menuClicked}
            >
              <Menu.Item key="3">
                <Icon type="team" />
                <span>User Management </span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="solution" />
                <span>Download Records</span>
              </Menu.Item>
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
              <Drawer
                width={500}
                placement="right"
                visible={userDrawer}
                closable={false}
                onClose={this.closeUserDrawer}
              >
                <div>
                  <Spin spinning={userDetailLoading} tip="Fetching data...">
                    <h2>{userDetailsList ? userDetailsList.fullName : ""}</h2>
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="First Name">
                        {userDetailsList ? userDetailsList.firstName : ""}
                      </Descriptions.Item>
                      <Descriptions.Item label="Last Name">
                        {userDetailsList ? userDetailsList.lastName : ""}
                      </Descriptions.Item>
                      <Descriptions.Item label="Email">
                        {userDetailsList ? userDetailsList.email : ""}
                      </Descriptions.Item>
                      <Descriptions.Item label="Date Created">
                        {userDetailsList ? (
                          <Tooltip
                            placement="top"
                            title={moment(
                              userDetailsList.dateCreated
                            ).fromNow()}
                          >
                            {moment(userDetailsList.dateCreated).format("L")}
                          </Tooltip>
                        ) : (
                          ""
                        )}
                      </Descriptions.Item>
                      <Descriptions.Item label="Account Type">
                        {userDetailsList ? userDetailsList.creationType : ""}
                      </Descriptions.Item>
                      <Descriptions.Item label="Role">
                        {userDetailsList ? RoleRadio : ""}
                      </Descriptions.Item>
                      <Descriptions.Item label="Status">
                        <Badge
                          status="processing"
                          text={
                            userDetailsList
                              ? userDetailsList.isActivated
                                ? "Active"
                                : "Inactive"
                              : ""
                          }
                          color={
                            userDetailsList
                              ? userDetailsList.isActivated
                                ? "green"
                                : "red"
                              : ""
                          }
                        />
                      </Descriptions.Item>
                    </Descriptions>
                  </Spin>
                </div>
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
  uploadStat: state.home.lipoUpload,
  userTable: state.home.userTable,
  downloadTable: state.home.downloadTable,
  userDetails: state.home.userDetails,
  user: state.auth.user,
  notif: state.notif.notif
});

export default connect(mapStateToProps, {
  verifyToken,
  getTableData,
  getSingleLipoData,
  logout,
  requestDownloadURL,
  uploadValidate,
  getUserTableData,
  getDownloadTableData,
  getUserDetails,
  changeUserRole
})(adminIndex);
