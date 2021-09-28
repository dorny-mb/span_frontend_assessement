import { Flex, useMediaQuery } from "@chakra-ui/react";
import axios, { Canceler } from "axios";
import React, { useState, useMemo, useEffect, useRef } from "react";

import { EmptyHandler, FilterSection } from "../../components";
import GalleryGrid from "../../components/GalleryGrid";
import { UNSPLASH_API_KEY } from "../../constants";
import { useFetch } from "../../hooks";
import { PageWrap } from "../../layouts";
import { Topic } from "../../types";

type ParamsTypes = {
  client_id: string;
};
const Home: React.FC = () => {
  const error = useRef(false);
  const loading = useRef(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [topics, setTopics] = useState(() => []);
  const [photos, setPhotos] = useState([]);
  const [photosLoading, setPhotosLoading] = useState(false);
  const params = useMemo<ParamsTypes>(
    () => ({ client_id: UNSPLASH_API_KEY }),
    []
  );
  const { data: topicsData, state: topicsState } = useFetch(
    `https://api.unsplash.com/topics`,
    "GET",
    params
  );
  console.log(topicsData);
  loading.current = topicsState === "loading";
  error.current = topicsState === "network-error";

  const [index, setIndex] = useState(0);
  const [xPosition, setXPosition] = useState(0);

  useEffect(() => {
    setIndex(0);
    setXPosition(0);
  }, [selectedTopic]);
  useEffect(() => {
    setSelectedTopic(topics?.[0]);
  }, [topicsData, topics]);

  useEffect(() => {
    if (topicsState === "loaded") {
      setTopics(
        topicsData.map(
          ({
            id,
            title,
            slug,
            cover_photo: {
              urls: { full, raw, regular, thumb, small },
            },
          }: Topic) => ({
            id,
            title,
            slug,
            cover_photo: {
              urls: { full, raw, regular, thumb, small },
            },
          })
        )
      );
    }
  }, [topicsState, topicsData]);

  useEffect(() => {
    let cancel: Canceler;
    setPhotosLoading(true);
    if (selectedTopic?.slug) {
      (async () => {
        try {
          const { data } = await axios({
            method: "GET",
            url: `https://api.unsplash.com/topics/${selectedTopic.slug}/photos`,
            params,
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          });
          setPhotos(
            data.map(
              ({
                urls: { thumb, regular, raw, full },
                likes,
                user: {
                  profile_image: { large, medium, small },
                  username,
                  name,
                },
              }: any) => ({
                thumb,
                regular,
                raw,
                full,
                likes,
                user: {
                  profile_image: { large, medium, small },
                  username,
                  name,
                },
              })
            )
          );
        } catch (e) {
          error.current = true;
          console.log(e);
        }
        setPhotosLoading(false);
      })();
    }
    return () => {
      if (cancel) cancel();
    };
  }, [selectedTopic, params]);

  const [isTabletOrMobile] = useMediaQuery("(max-width: 40em)");

  if (error.current) return <EmptyHandler subTitle={topicsState} />;
  return (
    <PageWrap title="Home">
      <Flex flex={1} w="100%" direction={isTabletOrMobile ? "column" : "row"}>
        <FilterSection
          selectedItem={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          data={topics}
          isLoaded={!loading.current}
        />
        <GalleryGrid
          index={index}
          xPosition={xPosition}
          setIndex={setIndex}
          setXPosition={setXPosition}
          data={photos}
          isLoaded={!(loading.current || photosLoading)}
        />
      </Flex>
    </PageWrap>
  );
};

export default Home;
