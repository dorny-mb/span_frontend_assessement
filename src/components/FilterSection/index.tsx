import { Heading, List, ListItem, Text } from "@chakra-ui/layout";
import {
  Avatar,
  Flex,
  Skeleton,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { Variants } from "framer-motion";
import React from "react";
import { MotionFlex } from "..";
import { Topic } from "../../types";

type FilterSectionProps = {
  data: Topic[] | null;
  selectedItem: Topic | null;
  isLoaded?: boolean;
  setSelectedTopic: React.Dispatch<React.SetStateAction<Topic | null>>;
};

const variants: Variants = {
  show: {
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
};
const FilterSection: React.FC<FilterSectionProps> = ({
  data,
  selectedItem,
  setSelectedTopic,
  isLoaded,
}) => {
  const [isTabletOrMobile] = useMediaQuery("(max-width: 40em)");
  const hoverColor = useColorModeValue("orange.50", "orange.900");
  const currentBg = useColorModeValue("orange.100", "orange.700");
  return (
    <MotionFlex
      animate="show"
      initial="hide"
      variants={variants}
      height="fit-content"
      minW={isTabletOrMobile ? "100%" : 200}
    >
      {/* TODO:: Make this dynamic */}
      <Skeleton w="100%" isLoaded={isLoaded}>
        <Heading as="h4" px={2} mb={4} size="lg">
          Topics
        </Heading>
        <List>
          {data?.map((item) => {
            const isCurrent = item?.id === selectedItem?.id;
            return (
              <ListItem
                cursor="pointer"
                borderLeft={isCurrent ? "4px solid" : "none"}
                borderLeftColor="orange.300"
                bg={isCurrent ? currentBg : "transparent"}
                transition="background .2s ease-in-out 0s"
                _hover={{ bg: hoverColor }}
                p={2}
                borderRadius="1px"
                key={item?.id}
                onClick={() => setSelectedTopic(item)}
              >
                <Flex align="center">
                  <Avatar
                    name={item?.title}
                    src={item.cover_photo.urls?.small}
                    size="sm"
                  />
                  <Text mx={2} fontSize="sm">
                    {item?.title}
                  </Text>
                </Flex>
              </ListItem>
            );
          })}
        </List>
      </Skeleton>
    </MotionFlex>
  );
};
FilterSection.defaultProps = {
  isLoaded: true,
};
export default FilterSection;
