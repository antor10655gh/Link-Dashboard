import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Space,
  Input,
  Avatar,
} from "antd";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";
import {
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  CloudDownloadOutlined,
  PlayCircleOutlined,
  AudioOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/shared/loader/Loader";
const { confirm } = Modal;
const { Column } = Table;

function CallRecords() {
  const [users, setUsers] = useState([]);
  const [userUpdate, setUserUpdate] = useState(false);

  // user search functionality
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    // Replace 'your-bearer-token' with the actual Bearer token you have
    const token = JSON.parse(localStorage.getItem("token"));

    const getAllUsers = async () => {
      try {
        const response = await fetch("http://31.172.83.135:1212/api/v1/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data.reverse());
        } else {
          console.error("Error while fetching data:", response);
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    getAllUsers();
  }, []);

  const showConfirm = (id) => {
    confirm({
      title: "Do you want to listen to the call record?",
      icon: <AudioOutlined />,
      content:
        "After click on delete then your item will be delete permanently.",
      okText: "Ok",
      okType: "Primary",

      onOk() {
        fetch(`http://31.172.83.135:1212/api/v1/user/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success("User Deleted Successfully", {
              autoClose: 1000,
            });
          });
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(true);
  //   }, 1500);
  // });

  return (
    <>
      {users.length > 0 ? (
        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Call Records Table"
              >
                <div className="table-responsive">
                  <Table dataSource={users} className="ant-border-space">
                    <Column
                      title="Avatar"
                      key="profilePic"
                      render={(_, record) => <Avatar src={record.profilePic} />}
                    />
                    <Column
                      title="UID"
                      dataIndex="uid"
                      key="uid"
                      {...getColumnSearchProps("uid")}
                    />
                    <Column title="Name" dataIndex="userName" key="userName" />
                    <Column
                      title="Email"
                      dataIndex="email"
                      key="email"
                      {...getColumnSearchProps("email")}
                    />
                    <Column title="Country" dataIndex="country" key="country" />
                    <Column
                      title="Action"
                      key="Action"
                      render={(_, record) => (
                        <Space size="middle">
                          <Button
                            style={{
                              lineHeight: 0,
                              background: "#AB1A93",
                              border: "none",
                            }}
                            type="primary"
                          >
                            <Link to={`/call_history/${record._id}`}>
                              <EyeOutlined style={{ fontSize: "18px" }} />
                            </Link>
                          </Button>
                        </Space>
                      )}
                    />
                  </Table>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default CallRecords;
