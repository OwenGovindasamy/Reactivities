import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  openCreateForm: () => void;
}
// step 1 above
const NavBar: React.FC<IProps> = ({ openCreateForm }) => {
  //step 2 above
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px", width: "140px" }}
          />
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" onClick={openCreateForm} />
          {/* step3 */}
        </Menu.Item>
      </Container>
    </Menu>
  );
};
export default NavBar;