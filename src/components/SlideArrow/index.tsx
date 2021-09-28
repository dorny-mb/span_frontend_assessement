import {
  Center,
  CenterProps,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { IconType } from "react-icons";

type SlideArrowProps = {
  Icon: IconType;
} & CenterProps;

const CustomContainer = styled(Center)`
  position: absolute;
  top: 0;
  bottom: 0;
  cursor: pointer;
  z-index: 374940;
`;

const SlideArrow: React.FC<SlideArrowProps> = ({ Icon, left, ...rest }) => {
  const theme = useColorModeValue("white", "#1A202C");
  const [isTabletOrMobile] = useMediaQuery("(max-width: 40em)");

  return (
    <CustomContainer
      p={isTabletOrMobile ? 0 : 4}
      background={`linear-gradient(to ${
        left !== undefined ? "right" : "left"
      }, ${theme} 50%, transparent )`}
      {...rest}
    >
      <Icon size={24} />
    </CustomContainer>
  );
};

export default SlideArrow;
