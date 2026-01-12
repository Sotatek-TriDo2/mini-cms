'use client';

import React from 'react';
import { Input, Button, Space, Divider } from 'antd';
import {
  MenuOutlined,
  SearchOutlined,
  HeartOutlined,
  UserOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';

const Navbar = () => {
  return (
    <div style={{
      backgroundColor: '#1a1a1b',
      color: '#ffffff',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      fontSize: '12px',
      fontWeight: 'bold',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Left Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <MenuOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
        <Divider type="vertical" style={{ borderColor: '#333', height: '16px' }} />
        <Space size={15}>
          <span style={{ cursor: 'pointer' }}>MUSINSA</span>
          <span style={{ cursor: 'pointer' }}>BEAUTY</span>
          <span style={{ cursor: 'pointer' }}>PLAYER</span>
          <span style={{ cursor: 'pointer' }}>OUTLET</span>
          <span style={{ cursor: 'pointer' }}>BOUTIQUE</span>
          <span style={{ cursor: 'pointer' }}>SHOES</span>
          <span style={{ cursor: 'pointer' }}>KIDS</span>
          <span style={{ cursor: 'pointer' }}>USED</span>
        </Space>
        <Divider type="vertical" style={{ borderColor: '#333', height: '16px' }} />
        <span style={{ cursor: 'pointer' }}>(S) SNAP</span>
      </div>

      {/* Right Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ cursor: 'pointer', fontSize: '11px' }}>오프라인 스토어</span>
        <Divider type="vertical" style={{ borderColor: '#333', height: '16px' }} />
        <Space size={15}>
          <SearchOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
          <HeartOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
          <UserOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
          <ShoppingOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
        </Space>
        <Button 
          ghost 
          size="small" 
          style={{ 
            fontSize: '10px', 
            borderRadius: '4px',
            borderColor: '#555',
            color: '#fff',
            marginLeft: '5px'
          }}
        >
          로그인 / 회원가입
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
