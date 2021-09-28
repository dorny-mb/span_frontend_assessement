import { Center, Text } from "@chakra-ui/layout";
import moment from "moment";
import React from "react";
import { Version } from "..";
import { useAppContext } from "../../context/AppProvider";

type CopyrightProps = {};

const Copyright: React.FC<CopyrightProps> = () => {
  const { drawerOpen } = useAppContext();
  return (
    <Center color="gray.500" width="100%" fontSize="xs" textAlign="center">
      {drawerOpen ? (
        <Text>
          Copyright © {moment().format("YYYY")} <br /> Designed by Dorny Muba
          <br /> <Version />
        </Text>
      ) : (
        <Text>© {moment().format("YYYY")}</Text>
      )}
    </Center>
  );
};

export default Copyright;
