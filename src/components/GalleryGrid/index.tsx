import {
  Avatar,
  Box,
  Center,
  Flex,
  Grid,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { Photo } from "../../types";
import Card from "../Card";
import { SlideArrow } from "..";
import { VscChevronLeft, VscChevronRight, VscHeart } from "react-icons/vsc";

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
const width = 302;
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

      <Flex flex={1} mx={8} overflow="hidden">
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
              minW="300px"
              isLoaded={isLoaded}
            >
              <Card
                shouldAnimate
                h="100%"
                bg={cardTheme}
                justify="space-between"
              >
                <Box
                  bgImage={item.thumb}
                  bgRepeat="no-repeat"
                  bgPosition="center"
                  bgSize="cover"
                  flex={1}
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
