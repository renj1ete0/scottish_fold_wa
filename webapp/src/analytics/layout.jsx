import { useState } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { House, Grid, Bag, People, Gear, List } from "react-bootstrap-icons";
import App from "../components/keplergl.jsx"

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);


const rowData = [
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ];

const colDefs = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
];

const menuItems = [
  { icon: <List />, label: "Toggle" },
  { icon: <House />, label: "Home" },
  { icon: <Grid />, label: "Dashboard" },
  { icon: <Bag />, label: "Orders" },
  { icon: <People />, label: "Customers" },
  { icon: <Gear />, label: "Settings" },
];

const DashboardLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="d-flex vh-100 flex-column">
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3 flex-shrink-0">
        <Navbar.Brand href="/">A</Navbar.Brand>
        <Nav className="ms-auto">
          <Dropdown align="end">
            <Dropdown.Toggle variant="dark">something</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">New project...</Dropdown.Item>
              <Dropdown.Item href="#">Settings</Dropdown.Item>
              <Dropdown.Item href="#">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>

      {/* Sidebar + Main */}
      <div className="d-flex flex-grow-1 ">
        {/* Sidebar */}
        <Nav
          className="d-flex flex-column bg-dark text-white flex-shrink-0 "
          style={{
            width: sidebarCollapsed ? "50px" : "13vw",
            minWidth: sidebarCollapsed ? "50px" : "13vw",
            transition: "width 0.2s",
          }}
        >
          {menuItems.map((item, idx) => (
            <Nav.Item key={idx} className="d-flex py-1 bg-info">
              <Nav.Link
                onClick={() => {
                  if (item.label === "Toggle") {
                    setSidebarCollapsed(!sidebarCollapsed);
                  }
                }}
                className="d-flex align-items-center text-white"
              >
                <span>{item.icon}</span>
                {!sidebarCollapsed && <span className="ms-3">{item.label}</span>}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        {/* Main content */}
        <div className="flex-grow-1 flex-column py-0 ">
            <div className="p-0 h-75 overflow-hidden w-100"><App /></div>
          <div className="p-2 overflow-auto h-25">
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
           />
          </div>
          <div className="p-0 ">{children}</div>
            
          </div>


      </div>
    </div>
  );
};

export default DashboardLayout;
