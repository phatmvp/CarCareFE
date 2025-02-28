import React from 'react'

import {
    FaTwitter,
    FaFacebook,
    FaInstagram,
} from "react-icons/fa";
import {
    Box,
    Typography,
    Button,
    Container,
    IconButton,
    Stack,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const handelLogin = () => {
        navigate("/car-care/login");
    };

    const handleRegister = () => {
        navigate("/car-care/login");
    };
    const primaryColor = "#fff";
    const accentColor = "#004d40";
    const menuItems = ["DỊCH VỤ", "TÌM GARA", "CỨU HỘ", "LIÊN HỆ"];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <div>
            {/* Top Bar */}
            <Box sx={{ backgroundColor: accentColor }}>
                <Container
                    sx={{
                        color: primaryColor,
                        py: 1,
                        px: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="body2">support@autobook.vn</Typography>
                    <Stack direction="row" spacing={1}>
                        <IconButton sx={{ color: primaryColor, "&:hover": { color: "#E6C774" } }}>
                            <FaFacebook />
                        </IconButton>
                        <IconButton sx={{ color: primaryColor, "&:hover": { color: "#E6C774" } }}>
                            <FaTwitter />
                        </IconButton>
                        <IconButton sx={{ color: primaryColor, "&:hover": { color: "#E6C774" } }}>
                            <FaInstagram />
                        </IconButton>
                    </Stack>
                </Container>
            </Box>

            {/* Navigation */}
            <Box
                component="nav"
                sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: primaryColor,
                    zIndex: 10,
                    py: 2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
            >
                <Container>
                    <Stack
                        direction={isMobile ? "column" : "row"}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={isMobile ? 2 : 0}
                    >
                        <Typography
                            variant="h5"
                            component="a"
                            href="#"
                            sx={{
                                fontWeight: 900,
                                color: accentColor,
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src="/logo/Car Care@4x.png"
                                alt="logo"
                                loading="lazy"
                                width="120px"
                                style={{ marginRight: "10px" }}
                            />
                        </Typography>
                        <Stack direction={isMobile ? "column" : "row"} spacing={isMobile ? 1 : 4}>
                            {menuItems.map((item) => (
                                <Typography
                                    key={item}
                                    component="a"
                                    href="#"
                                    sx={{
                                        color: "#000",
                                        fontWeight: 700,
                                        px: 1,
                                        textDecoration: "none",
                                        position: "relative",
                                        paddingBottom: "4px",
                                        "&:hover": {
                                            color: "#004d40",
                                        },
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            width: "0",
                                            height: "2px",
                                            backgroundColor: "#004d40",
                                            transition: "width 0.3s ease",
                                        },
                                        "&:hover::after": {
                                            width: "100%",
                                        },
                                        transition: "color 0.3s ease",
                                    }}
                                >
                                    {item}
                                </Typography>
                            ))}
                        </Stack>
                        <Stack direction={isMobile ? "column" : "row"} spacing={isMobile ? 1 : 2}>
                            <Button
                                onClick={() => handelLogin()}
                                variant="outlined"
                                sx={{
                                    color: accentColor,
                                    borderColor: accentColor,
                                    borderRadius: "25px",
                                    "&:hover": { backgroundColor: `${accentColor}20` },
                                }}
                            >
                                Đăng Nhập
                            </Button>
                            <Button
                                onClick={() => handleRegister()}
                                variant="contained"
                                sx={{
                                    backgroundColor: accentColor,
                                    color: primaryColor,
                                    borderRadius: "25px",
                                    "&:hover": {
                                        backgroundColor: "#003630",
                                        transform: "scale(1.05)",
                                    },
                                    transition: "all 0.3s ease",
                                }}
                            >
                                Đăng Ký
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </div>
    )
}
