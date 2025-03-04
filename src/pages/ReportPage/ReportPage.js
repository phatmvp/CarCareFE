import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { FaChartBar, FaCalendarAlt, FaChartLine, FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import { fetchStatisticsByDay, fetchStatisticsByMonth, fetchStatisticsByYear } from '../../apis';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReportPage.css';

const ReportPage = () => {
    const [date, setDate] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [viewMode, setViewMode] = useState('day');
    const garageId = "65dbe7f2f1a2c8b4e9e4d1a1";

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            let response;
            if (viewMode === 'day' && date) {
                response = await fetchStatisticsByDay(garageId, date);
            } else if (viewMode === 'month' && month && year) {
                response = await fetchStatisticsByMonth(garageId, year, month);
            } else if (viewMode === 'year' && year) {
                response = await fetchStatisticsByYear(garageId, year);
            }
            setData(response);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        } finally {
            setLoading(false);
        }
    }, [garageId, viewMode, date, month, year]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const chartData = {
        labels: ['Thống kê'],
        datasets: [
            {
                label: 'Tổng khách hàng',
                data: data ? [data.totalCustomers || 0] : [0],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Tổng doanh thu (Triệu VND)',
                data: data ? [data.totalRevenue / 1000000 || 0] : [0],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value;
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.dataset.label === 'Tổng doanh thu (Triệu VND)') {
                            label += (context.raw * 1000000).toLocaleString('vi-VN') + ' VND';
                        } else {
                            label += context.raw;
                        }
                        return label;
                    }
                }
            }
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <Container fluid className="report-container">
            <Row className="header-row">
                <Col>
                    <h4 className="page-title">
                        <FaChartBar className="icon-margin" /> Báo Cáo Thống Kê
                    </h4>
                </Col>
            </Row>

            <Card className="filter-card">
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="filter-label">Chọn chế độ xem</Form.Label>
                            <Form.Select 
                                value={viewMode} 
                                onChange={(e) => setViewMode(e.target.value)}
                                className="form-select-custom"
                            >
                                <option value="day">Thống kê theo ngày</option>
                                <option value="month">Thống kê theo tháng</option>
                                <option value="year">Thống kê theo năm</option>
                            </Form.Select>
                        </Form.Group>

                        {viewMode === 'day' && (
                            <Form.Group className="mb-3">
                                <Form.Label className="filter-label">
                                    <FaCalendarAlt className="icon-margin" /> Chọn ngày
                                </Form.Label>
                                <Form.Control 
                                    type="date" 
                                    value={date} 
                                    onChange={(e) => setDate(e.target.value)} 
                                    className="form-control-custom"
                                />
                            </Form.Group>
                        )}

                        {viewMode === 'month' && (
                            <Row>
                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label className="filter-label">
                                            <FaCalendarAlt className="icon-margin" /> Chọn năm
                                        </Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            value={year} 
                                            onChange={(e) => setYear(e.target.value)} 
                                            className="form-control-custom"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label className="filter-label">Chọn tháng</Form.Label>
                                        <Form.Select 
                                            value={month} 
                                            onChange={(e) => setMonth(e.target.value)}
                                            className="form-select-custom"
                                        >
                                            <option value="">Chọn tháng</option>
                                            {[...Array(12)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>{`Tháng ${i + 1}`}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}

                        {viewMode === 'year' && (
                            <Form.Group className="mb-3">
                                <Form.Label className="filter-label">
                                    <FaCalendarAlt className="icon-margin" /> Chọn năm
                                </Form.Label>
                                <Form.Control 
                                    type="number" 
                                    value={year} 
                                    onChange={(e) => setYear(e.target.value)} 
                                    className="form-control-custom"
                                />
                            </Form.Group>
                        )}

                        <Button 
                            variant="primary" 
                            onClick={fetchData} 
                            disabled={loading}
                            className="search-button"
                        >
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="spinner-margin"
                                    />
                                    Đang tải...
                                </>
                            ) : (
                                'Tìm kiếm'
                            )}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            {loading ? (
                <div className="loading-container">
                    <Spinner animation="border" role="status" variant="primary">
                        <span className="visually-hidden">Đang tải...</span>
                    </Spinner>
                </div>
            ) : (
                data && (
                    <Row className="mt-4">
                        <Col xs={12} md={6} className="mb-4">
                            <Card className="stat-card customers-card">
                                <Card.Body>
                                    <div className="stat-icon">
                                        <FaUsers />
                                    </div>
                                    <div className="stat-content">
                                        <Card.Title className="stat-title">Tổng khách hàng</Card.Title>
                                        <Card.Text className="stat-value">
                                            {data.totalCustomers || 0}
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={6} className="mb-4">
                            <Card className="stat-card revenue-card">
                                <Card.Body>
                                    <div className="stat-icon">
                                        <FaMoneyBillWave />
                                    </div>
                                    <div className="stat-content">
                                        <Card.Title className="stat-title">Tổng doanh thu</Card.Title>
                                        <Card.Text className="stat-value">
                                            {formatCurrency(data.totalRevenue || 0)}
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12}>
                            <Card className="chart-card">
                                <Card.Body>
                                    <Card.Title className="chart-title">
                                        <FaChartLine className="icon-margin" /> Biểu đồ thống kê
                                    </Card.Title>
                                    <div className="chart-container">
                                        <Bar data={chartData} options={options} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )
            )}
        </Container>
    );
};

export default ReportPage;