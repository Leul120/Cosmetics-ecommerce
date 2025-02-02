import React from 'react';
import { Table, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ProductTable = ({ products, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Product Image',
      dataIndex: 'name',
      key: 'images',
      render: (record) => (
        <Tooltip title="Product Image">
          <img
            src={`https://ui-avatars.com/api/?name=${record}&background=random`}
            className="w-16 h-16 rounded-full object-cover border border-gray-200"
            alt="Product"
          />
        </Tooltip>
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-semibold text-gray-800">{text}</span>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'sizes',
      key: 'price',
      render: (sizes)=>(<p>${sizes[0]?.price}</p>),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div className="flex gap-3">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            className="bg-blue-500 hover:bg-blue-600 text-white border-none"
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record._id)}
            className="hover:bg-red-600 text-red-400 border-none"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={products}
      columns={columns}
      rowKey="_id"
      pagination={{ pageSize: 5 }}
      className="shadow-md rounded-lg overflow-auto [&::-webkit-scrollbar]:hidden"
    />
  );
};

export default ProductTable;
