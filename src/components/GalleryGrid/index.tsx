import {
  Avatar,
  Box,
  Center,
  Flex,
  Grid,
  Skeleton,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { Photo } from "../../types";
import Card from "../Card";
import { SlideArrow } from "..";
import { VscChevronLeft, VscChevronRight, VscHeart } from "react-icons/vsc";
import { theme } from "../../theme";

type GalleryGridProps = {
  data: Photo[];
  isLoaded?: boolean;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setXPosition: React.Dispatch<React.SetStateAction<number>>;
  xPosition: number;
};

const CustomGrid = styled(Grid)`
  transition: transform 0.4s ease-in-out 0s;

  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;
const width = 312;
const GalleryGrid: React.FC<GalleryGridProps> = ({
  data,
  isLoaded,
  index,
  setIndex,
  setXPosition,
  xPosition,
}) => {
  const handleClickPrev = () => {
    if (index === 0) return;
    setIndex(index - 1);
    setXPosition((prev) => prev + width);
  };
  const handleClicknext = () => {
    if (index === data.length / 2 - 1) return;
    else {
      setIndex(index + 1);
      setXPosition((prev) => prev - width);
    }
  };
  const cardTheme = useColorModeValue("white", "gray.700");
  const [isTabletOrMobile] = useMediaQuery("(max-width: 40em)");

  return (
    <Flex position="relative" flex={1} overflow="hidden">
      {!(index === data.length / 2 - 1) && (
        <SlideArrow
          Icon={VscChevronRight}
          onClick={handleClicknext}
          right={0}
        />
      )}

      {xPosition !== 0 && (
        <SlideArrow Icon={VscChevronLeft} onClick={handleClickPrev} left={0} />
      )}

      <Flex flex={1} mx={isTabletOrMobile ? 4 : 8} overflow="hidden">
        <CustomGrid
          autoFlow="column"
          templateRows="repeat(2, 1fr)"
          transform={`translateX(${xPosition}px)`}
        >
          {data.map((item, index) => (
            <Skeleton
              p={2}
              m={!isLoaded ? 2 : 0}
              key={index}
              minW="310px"
              isLoaded={isLoaded}
            >
              <Card
                shouldAnimate
                h="100%"
                style={{
                  transition: "box-shadow .2s ease-in-out 0s",
                }}
                _hover={{
                  boxShadow: theme.boxShadow,
                  cursor: "pointer",
                }}
                bg={cardTheme}
                justify="space-between"
              >
                <Box
                  bgImage={item.thumb}
                  bgRepeat="no-repeat"
                  bgPosition="center"
                  bgSize="cover"
                  flex={1}
                  minH={250}
                />
                <Flex p={2} align="center" justify="space-between">
                  <Center>
                    <Avatar
                      size="sm"
                      name={item.user.name}
                      src={item.user.profile_image.small}
                    />
                    <Text mx={2} fontSize="sm">
                      {item.user.username}
                    </Text>
                  </Center>
                  <Center>
                    <VscHeart />
                    <Text mx={1} fontSize="sm">
                      {item.likes}
                    </Text>
                  </Center>
                </Flex>
              </Card>
            </Skeleton>
          ))}
        </CustomGrid>
      </Flex>
    </Flex>
  );
};

GalleryGrid.defaultProps = {
  isLoaded: true,
};

export default GalleryGrid;
