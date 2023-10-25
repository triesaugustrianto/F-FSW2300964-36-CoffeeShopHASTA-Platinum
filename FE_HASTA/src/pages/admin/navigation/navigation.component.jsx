import {
  CoffeeOutlined,
  DollarOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Flex, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Icon from "@ant-design/icons/lib/components/Icon";

const HastaSvg = () => (
  <svg
    width="19"
    height="22"
    viewBox="0 0 19 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.997"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.12444 0.00295511C8.73562 -0.0355477 10.2411 0.302196 11.6405 1.01619C13.1588 1.81932 14.4599 2.84808 15.5432 4.10246C18.2181 7.32885 19.3406 10.947 18.9107 14.9568C18.6977 16.5601 18.0887 18.0275 17.0834 19.3592C15.3448 21.4453 13.0259 22.2954 10.1265 21.9097C8.721 21.6514 7.44187 21.1466 6.28909 20.3957C4.71056 19.3368 3.41838 18.0517 2.41254 16.5408C0.414753 13.5097 -0.342283 10.2487 0.141437 6.75783C0.397002 5.17204 1.04962 3.73568 2.09929 2.44869C3.37051 0.978848 5.04556 0.163605 7.12444 0.00295511Z"
      fill="#3F2522"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.78483 3.03047C7.52098 3.0079 8.00392 3.31071 8.23364 3.93889C8.28846 4.17843 8.26236 4.41135 8.15533 4.63767C7.44006 5.75185 7.14416 6.94753 7.26777 8.22474C7.3265 8.59966 7.44841 8.95683 7.63323 9.2962C7.82432 9.53914 8.08093 9.70615 8.40332 9.79699C11.3456 10.3805 13.1773 11.976 13.8984 14.5836C14.1586 15.8151 14.0456 17.0187 13.559 18.194C13.3627 18.6002 13.0145 18.8019 12.5148 18.7996C11.8779 18.7591 11.4774 18.464 11.314 17.9145C11.2965 17.8057 11.2965 17.6972 11.314 17.5884C11.5526 17.0133 11.6873 16.4193 11.7186 15.8065C11.6904 14.3815 11.0117 13.2867 9.68245 12.5222C9.47988 12.4242 9.27104 12.3387 9.05594 12.266C8.47615 12.1013 7.90185 11.9227 7.33303 11.7303C6.05954 11.2146 5.28945 10.3411 5.02277 9.10986C4.71729 7.07811 5.12624 5.16811 6.24969 3.37986C6.33236 3.30609 6.41501 3.23235 6.49768 3.15858C6.59581 3.11481 6.69151 3.0721 6.78483 3.03047Z"
      fill="#FEFEFE"
    />
  </svg>
);

const HastaIcon = (props) => <Icon component={HastaSvg} {...props} />;

const menuData = [
  { label: "Hasta", icon: <HastaIcon /> },
  {
    label: "Product",
    key: "sub1",
    icon: <CoffeeOutlined />,
    route: "/dsb/product",
  },
  { label: "User", key: "sub4", icon: <UserOutlined />, route: "/dsb/user" },
  {
    label: "Order",
    key: "sub2",
    icon: <DollarOutlined />,
    route: "/dsb/order",
  },
  { label: "Logout", key: "sub3", icon: <LogoutOutlined /> },
];

const Navigation = () => {
  const navigate = useNavigate();
  const handleClick = (route) => {
    navigate(route);
  };
  return (
    <Flex>
      <Flex
        style={{
          flexDirection: "column",
        }}
      >
        <Menu
          onClick={({ key }) =>
            handleClick(menuData.find((item) => item.key === key)?.route)
          }
          style={{
            width: 256,
          }}
          defaultSelectedKeys={["sub1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          {menuData.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Flex>
      <Flex>
        <Outlet />
      </Flex>
    </Flex>
  );
};
export default Navigation;
