import { Center, CenterProps, useColorModeValue } from "@chakra-ui/react";
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
  padding: 1.5rem;
  cursor: pointer;
  z-index: 374940;
`;

const SlideArrow: React.FC<SlideArrowProps> = ({ Icon, left, ...rest }) => {
  const theme = useColorModeValue("white", "#1A202C");
  return (
    <CustomContainer
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
