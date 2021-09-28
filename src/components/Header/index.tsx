import {
  Center,
  Flex,
  Heading,
  IconButton,
  Skeleton,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import * as React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

import { RouteComponentProps, useHistory, withRouter } from "react-router";

import { color, ColorProps, space, SpaceProps } from "styled-system";
import { Clock } from "..";
import { useAppContext } from "../../context/AppProvider";
import { images } from "../../theme";

import SideBarButton from "../SideBar/SideBarButton";

type HeaderProps = RouteComponentProps &
  ColorProps & {
    color?: string;
    size?: number;
    id?: string;
    open?: boolean;
    getLoggedInUser?: () => { name?: string; id: string };
  };

type HeaderContProps = SpaceProps &
  ColorProps & {
    color?: string;
    open?: boolean;
  };

const HeaderCont = styled(motion.div)<HeaderContProps>`
  ${space};
  ${color};
  top: 0;
  right: 0;
  height: 64px;
  z-index: 1290;
  display: flex;
  position: fixed;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;

  justify-content: space-between;
  left: ${(props) => (props.open ? "250px" : "64px")};
  @media screen and (max-width: 40em) {
    left: 0;
  }
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const Header: React.FC<HeaderProps> = ({ ...rest }) => {
  const [isTabletOrMobile] = useMediaQuery("(max-width: 40em)");
  const { drawerOpen, toggleDrawer } = useAppContext();
  const { toggleColorMode, colorMode } = useColorMode();
  const themeColor = useColorModeValue("white", "gray.800");
  const history = useHistory();
  return (
    <HeaderCont
      pr={4}
      backgroundColor={themeColor}
      pl={drawerOpen ? "calc(186px + 1rem)" : "1rem"}
      {...rest}
    >
      {isTabletOrMobile && (
        <SideBarButton color="black" open={drawerOpen} onClick={toggleDrawer} />
      )}
      <Flex
        flexDirection="row"
        align="center"
        justify="space-between"
        width="100%"
      >
        <Center onClick={() => history.push("/")} cursor="pointer">
          {!drawerOpen && (
            <motion.img
              width="64px"
              height="54rem"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={images.logo}
              style={{ alignSelf: "flex-start" }}
            />
          )}

          {!isTabletOrMobile && (
            <Heading
              as="h1"
              mx={!drawerOpen ? 4 : 0}
              fontWeight="medium"
              fontSize="sm"
            >
              SPAN Digital Innovation
            </Heading>
          )}
        </Center>
        <Center>
          {!isTabletOrMobile && (
            // TODO:: Make this dynamic
            <Skeleton isLoaded={true}>
              <Clock />
            </Skeleton>
          )}
          <IconButton
            onClick={toggleColorMode}
            size="xs"
            mx={4}
            aria-label="Change Theme"
            icon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
          />
        </Center>
      </Flex>
    </HeaderCont>
  );
};

export default withRouter(Header);
