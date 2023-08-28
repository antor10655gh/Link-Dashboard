import React from "react";
import "./SingleProfile.css";
import { Tabs } from "antd";
import * as timeago from "timeago.js";
import { AndroidOutlined, RightOutlined } from "@ant-design/icons";

const SingleProfile = ({ profile }) => {
  const journeyTime = timeago.format(`${profile.createdAt}`, "en_US");

  const journey = journeyTime.replace(" ago", "");

  const email = `${profile.email}`;

  const parts = email.split("@");

  const age = new Date().getFullYear() - new Date(profile.dob).getFullYear()

  return (
    <div>
      <div className="profile">
        <div className="profile-left">
          <div>
            <div className="profile-img">
              <img src={profile.profilePic} alt="" />
            </div>
            <div className="profile-info-container">
              <h1>{profile.userName}</h1>
              <p id="emailContainer">
                <span className="username">{parts[0]}</span>
                <span className="at-symbol">@</span>
                <span className="domain">{parts[1]}</span>
              </p>
              <p>{profile.bio}</p>
              <div className="profile-info">
                <div>
                  <h3>Follower</h3>
                  <p>{profile?.followers?.length}</p>
                </div>
                <div>
                  <h3>Following</h3>
                  <p>{profile?.following?.length}</p>
                </div>
                <div>
                  <h3>Linked</h3>
                  <p>{profile?.linked?.length}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-left-container">
            <div className="profile-list">
              <h1>ID:</h1>
              <p>{profile.uid}</p>
            </div>
            <div className="profile-list">
              <h1>Join Date:</h1>
              <p>{profile.createdAt}</p>
            </div>
            <div className="profile-list">
              <h1>Update Date:</h1>
              <p>{profile.updatedAt}</p>
            </div>
            <div className="profile-list">
              <h1>Last Online:</h1>
              <p>{profile.createdAt}</p>
            </div>
          </div>
        </div>
        <div className="profile-right">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Overview" key="1">
              <div className="profile-overview">
                <div className="profile-overview-title">
                  <h1>User Properties</h1>
                </div>
                <div className="profile-overview-content">
                  <div className="profile-list">
                    <h1>Name:</h1>
                    <p>{profile.userName}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Email:</h1>
                    <p>{profile.email}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Phone:</h1>
                    <p>{profile.userPhone}</p>
                  </div>
                  <div className="profile-list">
                    <h1>DOB:</h1>
                    <p>{profile.dob}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Age:</h1>
                    <p>{age}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Gender:</h1>
                    <p>{profile.gender}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Relationship:</h1>
                    <p>{profile.relationshipStatus}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Country:</h1>
                    <p>{profile.country}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Avatar URL:</h1>
                    <p>{profile.profilePic}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Join Date:</h1>
                    <p>{profile.createdAt}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Journey:</h1>
                    <p>{journey}</p>
                  </div>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Login Activity" key="2">
              <p>{profile?.userName} * <span style={{ color: "#AB1A93", fontWeight: "bold"}}>Link</span> </p>
              <h1>Account login activity</h1>
              <p>You're currently logged in on these devices:</p>
              <div className="account-login-activity-top">
                <div>
                <AndroidOutlined style={{ fontSize: "30px",  }} />
                </div>
                <div className="account-login-activity-top-location">
                  <h3>Realme 8 Pro</h3>
                  <p>Dhaka, Bangladesh</p>
                </div>
                <div>
                <RightOutlined />
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="User Activity" key="3">
              Content of Tab Pane 2
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SingleProfile;
