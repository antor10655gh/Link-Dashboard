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
    // const [users, setUsers] = useState([]);
    const [userUpdate, setUserUpdate] = useState(false);
  
    const getAllUsers = async () => {
      try {
        fetch('https://massage-user.up.railway.app/api/v1/users')
          .then((res) => res.json())
          .then((json) => {
            console.log(json.data);
            // setUsers(json.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
    //   getAllUsers();
    },[userUpdate]);
  
    const showConfirm = (id) => {
      confirm({
        title: 'Do you Want to delete these items?',
        icon: <ExclamationCircleOutlined />,
        content:
          'After click on delete then your item will be delete permanently.',
        okText: 'Delete',
        okType: 'danger',
  
        onOk() {
          fetch(`https://massage-user.up.railway.app/api/v1/users/${id}`, {
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
              getAllUsers();
            });
        },
  
        onCancel() {
          console.log('Cancel');
        }
      });
    };

    const users = [
        {
            "serialNumber": 1,
            "name": "John Doe",
            "email": "johndoe@example.com",
            "userId": "johndoe123",
            "gender": "Male",
            "country": "United States",
            "phoneNumber": "+1 555-123-4567",
            "age": 30,
            "dob": "1993-05-15"
          },
          {
            "serialNumber": 2,
            "name": "Jane Smith",
            "email": "janesmith@example.com",
            "userId": "janesmith456",
            "gender": "Female",
            "country": "Canada",
            "phoneNumber": "+1 888-987-6543",
            "age": 28,
            "dob": "1995-09-22"
          },
          {
            "serialNumber": 3,
            "name": "Alex Johnson",
            "email": "alexjohnson@example.com",
            "userId": "alexj123",
            "gender": "Non-binary",
            "country": "Australia",
            "phoneNumber": "+61 2 9876 5432",
            "age": 35,
            "dob": "1988-11-10"
          },
          {
            "serialNumber": 4,
            "name": "Emily Davis",
            "email": "emilydavis@example.com",
            "userId": "emilyd456",
            "gender": "Female",
            "country": "United Kingdom",
            "phoneNumber": "+44 20 1234 5678",
            "age": 32,
            "dob": "1989-07-03"
          },
          {
            "serialNumber": 5,
            "name": "Michael Lee",
            "email": "michaellee@example.com",
            "userId": "michael567",
            "gender": "Male",
            "country": "Germany",
            "phoneNumber": "+49 30 9876 5432",
            "age": 29,
            "dob": "1994-02-18"
          },
          {
            "serialNumber": 6,
            "name": "Sophia Garcia",
            "email": "sophiagarcia@example.com",
            "userId": "sophia321",
            "gender": "Female",
            "country": "Spain",
            "phoneNumber": "+34 123 456 789",
            "age": 27,
            "dob": "1996-12-07"
          },
          {
            "serialNumber": 7,
            "name": "David Nguyen",
            "email": "davidnguyen@example.com",
            "userId": "davidn789",
            "gender": "Male",
            "country": "France",
            "phoneNumber": "+33 1 2345 6789",
            "age": 31,
            "dob": "1990-03-25"
          },
          {
            "serialNumber": 8,
            "name": "Isabella Kim",
            "email": "isabellakim@example.com",
            "userId": "isabella567",
            "gender": "Female",
            "country": "South Korea",
            "phoneNumber": "+82 2-1234-5678",
            "age": 33,
            "dob": "1988-08-14"
          },
      ]
  
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
                    <Column title="SL" dataIndex="serialNumber" key="serialNumber" />
                    <Column title="U. Id" dataIndex="userId" key="userId" />
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Phone" dataIndex="phoneNumber" key="phoneNumber" />
                    <Column title="Gender" dataIndex="gender" key="gender" />
                    <Column title="Age" dataIndex="age" key="age" />
                    <Column title="User Date" dataIndex="dob" key="dob" />
                    <Column
                      title="Action"
                      key="action"
                      render={(_, record) => (
                        <Space size="middle">
                          <Button style={{lineHeight: 0}} type="primary">
                            <Link to={`/user_details/${record._id}`}>
                              <EyeOutlined style={{fontSize: '18px'}} />
                            </Link>
                          </Button>
                          <Button style={{lineHeight: 0}} type="danger" onClick={() => showConfirm(record._id)}>
                            <DeleteOutlined style={{fontSize: '18px'}} />
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
      </>
    );
  }
  
  export default Users;