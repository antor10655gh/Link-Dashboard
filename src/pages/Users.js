import {
    Row,
    Col,
    Card,
    Table,
    Button,
    Modal,
    Space,
  } from "antd";
  import { toast } from 'react-toastify';
  import { EyeOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  const { confirm } = Modal;
  const { Column } = Table;
  
  function Users() {
    const [users, setUsers] = useState([]);
    const [userUpdate, setUserUpdate] = useState(false);
   
    useEffect(() => {
      // Replace 'your-bearer-token' with the actual Bearer token you have
      const token = JSON.parse(localStorage.getItem("token"));

      const getAllUsers = async () => {
        try {
          const response = await fetch('https://chat.linkfy.org/api/v1/user', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUsers(data.reverse());
            console.log(data);
          } else {
            console.error('Error while fetching data:', response);
          }
        } catch (error) {
          console.error('Error while fetching data:', error);
        }
      };

      getAllUsers();
    }, []);
  
    const showConfirm = (id) => {
      confirm({
        title: 'Do you Want to delete these items?',
        icon: <ExclamationCircleOutlined />,
        content:
          'After click on delete then your item will be delete permanently.',
        okText: 'Delete',
        okType: 'danger',
  
        onOk() {
          fetch(`https://chat.linkfy.org/api/v1/user/${id}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            }
          })
            .then((res) => res.json())
            .then((data) => {
              toast.success('User Deleted Successfully', {
                autoClose: 1000
              });
              
            });
        },
  
        onCancel() {
          console.log('Cancel');
        }
      });
    };
    
    return (
      <>
        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="User Table"
              >
                <div className="table-responsive">
                  <Table dataSource={users} className="ant-border-space">
                    <Column title="U. Id" dataIndex="uid" key="uid" />
                    <Column title="Name" dataIndex="userName" key="userName" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Phone" dataIndex="userPhone" key="userPhone" />
                    <Column title="Gender" dataIndex="gender" key="gender" />
                    <Column title="DOB" dataIndex="dob" key="dob" />
                    <Column title="Age" key="age" render={(_, record) => (
                      <Space size="middle">
                        {new Date().getFullYear() - new Date(record.dob).getFullYear()}
                      </Space>
                    )} />
                    <Column
                      title="Action"
                      key="action"
                      render={(_, record) => (
                        <Space size="middle">
                          <Button style={{lineHeight: 0}} type="primary">
                            <Link to={`/profile/${record._id}`}>
                              <EyeOutlined style={{fontSize: '18px'}} />
                            </Link>
                          </Button>
                          {/* <Button style={{lineHeight: 0}} type="danger" onClick={() => showConfirm(record._id)}>
                            <DeleteOutlined style={{fontSize: '18px'}} />
                          </Button> */}
                        </Space>
                      )}
                    />
                  </Table>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
  
  export default Users;