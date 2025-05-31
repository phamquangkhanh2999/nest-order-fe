/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, DatePicker, Divider, Form, Input, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Filter, RefreshCw, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import ErrorState from './components/ErrorState';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import LoadingState from './components/LoadingState';
import { useByOrder } from './services/api';
import { UserSubmission } from './types';

dayjs.extend(utc);
dayjs.extend(timezone);

const { RangePicker } = DatePicker;
const { Title } = Typography;

function App() {
  const [form] = Form.useForm();

  const columns: ColumnsType<UserSubmission> = [
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 160,
      render: (text) => (
        <div className="text-gray-600 font-mono text-sm">
          {dayjs(text).format('DD/MM/YYYY HH:mm')}
        </div>
      ),
      sorter: (a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
    },
    {
      title: 'Ghi chú sản phẩm',
      dataIndex: 'product_note',
      key: 'product_note',
      width: 200,
      ellipsis: true,
      render: (text) => (
        <div className="text-gray-700" title={text}>
          {text}
        </div>
      ),
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      width: 180,
      fixed: 'left',
      render: (text) => <div className="font-medium text-gray-900">{text}</div>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      render: (text) => <div className="text-blue-600 font-mono">{text}</div>,
    },
    {
      title: 'Tin nhắn',
      dataIndex: 'message',
      key: 'message',
      width: 250,
      ellipsis: true,
      render: (text) => (
        <div className="text-gray-700" title={text}>
          {text}
        </div>
      ),
    },
    {
      title: 'Tỉnh/Thành phố',
      dataIndex: 'state',
      key: 'state',
      width: 150,
      responsive: ['md'],
      render: (text) => <div className="text-gray-600">{text}</div>,
    },
    {
      title: 'Quận/Huyện',
      dataIndex: 'district',
      key: 'district',
      width: 150,
      responsive: ['lg'],
      render: (text) => <div className="text-gray-600">{text}</div>,
    },
    {
      title: 'Phường/Xã',
      dataIndex: 'ward',
      key: 'ward',
      width: 150,
      responsive: ['lg'],
      render: (text) => <div className="text-gray-600">{text}</div>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 200,
      ellipsis: true,
      responsive: ['md'],
      render: (text) => (
        <div className="text-gray-700" title={text}>
          {text}
        </div>
      ),
    },
  ];

  const [params, setParams] = useState<any>({
    page: 0,
    pageSize: 20,
  });
  const [searchEnabled, setSearchEnabled] = useState(true);
  const [valueSearch, setValueSearch] = useState<any>();
  const { data, isLoading, isError, refetch } = useByOrder({
    params: { userId: '123', status: 'approved' },
  });

  console.log('data', data);

  useEffect(() => {
    if (searchEnabled) {
      setSearchEnabled(false);
    }
  }, [searchEnabled]);

  //* Search
  const handleSearch = (data: any) => {
    setSearchEnabled(true);
    setParams({
      ...params,
      page: 20,
    });
    setValueSearch(data);
  };

  //* Handle change page
  const onChangePage = (page: number) => {
    setSearchEnabled(true);
    setParams((prev: any) => ({
      ...prev,
      page,
    }));
  };

  const handleRefresh = () => {
    refetch();
    form.resetFields();
    handleSearch({ name: '', phone: '', dateRange: [null, null] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <main className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {!isLoading && !isError && (
            <>
              {/* Header Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <Title level={2} className="!mb-2 !text-gray-800">
                      📋 Danh sách order hàng
                    </Title>
                    <p className="text-gray-500 text-sm">
                      Quản lý và theo dõi các đơn hàng được phê duyệt
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Cập nhật theo thời gian thực
                  </div>
                </div>
              </div>

              {/* Search Filter Section */}
              <Card
                className="shadow-sm border-0"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  borderRadius: '12px',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-5 w-5 text-blue-600" />
                  <Title level={4} className="!mb-0 !text-gray-700">
                    Bộ lọc tìm kiếm
                  </Title>
                </div>
                <Divider className="!mt-2 !mb-4" />

                <Form
                  form={form}
                  onFinish={handleSearch}
                  layout="vertical"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  <Form.Item name="name" label="Họ và tên" className="!mb-4">
                    <Input
                      prefix={<Search className="h-4 w-4 text-gray-400" />}
                      placeholder="Nhập họ tên để tìm kiếm..."
                      className="!rounded-lg !border-gray-200 hover:!border-blue-400 focus:!border-blue-500"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item name="phone" label="Số điện thoại" className="!mb-4">
                    <Input
                      prefix={<Search className="h-4 w-4 text-gray-400" />}
                      placeholder="Nhập số điện thoại..."
                      className="!rounded-lg !border-gray-200 hover:!border-blue-400 focus:!border-blue-500"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item name="dateRange" label="Khoảng thời gian" className="!mb-4">
                    <RangePicker
                      className="w-full !rounded-lg !border-gray-200 hover:!border-blue-400 focus:!border-blue-500"
                      placeholder={['Từ ngày', 'Đến ngày']}
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item className="lg:col-span-3 !mb-0">
                    <div className="flex justify-end">
                      <Space className="w-full sm:w-auto">
                        <Button
                          icon={<RefreshCw className="h-4 w-4" />}
                          onClick={handleRefresh}
                          className="!rounded-lg !border-gray-300 hover:!border-gray-400 !text-gray-600 hover:!text-gray-700"
                          size="large"
                        >
                          Làm mới
                        </Button>
                        <Button
                          type="primary"
                          htmlType="submit"
                          icon={<Search className="h-4 w-4" />}
                          className="!rounded-lg !bg-gradient-to-r !from-blue-600 !to-blue-700 hover:!from-blue-700 hover:!to-blue-800 !border-0 !shadow-lg hover:!shadow-xl transition-all duration-200"
                          size="large"
                        >
                          Tìm kiếm
                        </Button>
                      </Space>
                    </div>
                  </Form.Item>
                </Form>
              </Card>
            </>
          )}

          {/* Content Section */}
          {isLoading ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <LoadingState />
            </div>
          ) : isError ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <ErrorState
                message="Không thể tải dữ liệu. Vui lòng thử lại."
                onRetry={() => refetch()}
              />
            </div>
          ) : (
            <Card className="shadow-sm border-0 overflow-hidden" style={{ borderRadius: '12px' }}>
              <div className="mb-4 flex justify-between items-center">
                <Title level={4} className="!mb-0 !text-gray-700">
                  Kết quả tìm kiếm
                </Title>
                <div className="text-sm text-gray-500">
                  Tổng số:{' '}
                  <span className="font-semibold text-blue-600">{data?.data?.length || 0}</span> đơn
                  hàng
                </div>
              </div>

              <Table
                columns={columns}
                dataSource={data?.data || []}
                rowKey="phone"
                onChange={(pagination) => onChangePage(pagination.current || 1)}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} đơn hàng`,
                  className: 'px-4 !mt-6',
                  size: 'default',
                }}
                scroll={{ x: 'max-content' }}
                className="custom-table"
                rowClassName={(record, index) => (index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white')}
                // style={{
                //   // '--table-border-radius': '8px',
                //   '--table-header-bg': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                // }}
              />
            </Card>
          )}
        </div>
      </main>

      <Footer />

      {/* <style jsx global>{`
        .custom-table .ant-table-thead > tr > th {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%) !important;
          border-bottom: 2px solid #e2e8f0 !important;
          font-weight: 600 !important;
          color: #374151 !important;
          font-size: 14px !important;
        }

        .custom-table .ant-table-tbody > tr:hover > td {
          background: #f0f9ff !important;
        }

        .custom-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f1f5f9 !important;
          padding: 12px 16px !important;
        }

        .custom-table .ant-table {
          border-radius: 8px !important;
          overflow: hidden !important;
        }

        .ant-pagination-item-active {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
          border-color: #3b82f6 !important;
        }

        .ant-pagination-item-active a {
          color: white !important;
        }

        .ant-card {
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
        }

        .ant-card:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          transition: box-shadow 0.3s ease !important;
        }
      `}</style> */}
    </div>
  );
}

export default App;
