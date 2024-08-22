import {useIsMobile} from "@/hooks";
import {useModalStore} from "@/stores";
import {Nullable} from "@/types";
import {
  Box,
  Flex,
  Highlight,
  Icon,
  IconButton, Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";
import "swiper/css";
import {Swiper, SwiperSlide} from "swiper/react";
import {Swiper as SwiperType} from "swiper/types";

const Viewer = () => {
  const {viewer, closeViewer} = useModalStore(["viewer", "closeViewer"]);
  const swiperRef = useRef<Nullable<SwiperType>>(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!viewer) return;
    setSelected(viewer.index);
  }, [viewer]);

  useEffect(() => {
    if (!swiperRef.current || !viewer) return;
    swiperRef.current.slideTo(selected, 0, false);
  }, [selected, viewer]);

  const isMobile = useIsMobile();

  return (
    <Modal
      isOpen={!!viewer}
      onClose={closeViewer}
      size={{base: "md", lg: "5xl"}}
    >
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>사진 더 보기</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Flex direction={"column"} align={"center"} w={"full"} gap={"4"}>
            <Swiper
              direction={"horizontal"}
              spaceBetween={"24px"}
              slidesPerView={1}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onRealIndexChange={(e) => setSelected(e.realIndex)}
              style={{
                width: "100%",
                height: isMobile ? "300px" : "500px",
              }}
            >
              {viewer?.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    sizes={"100%"}
                    style={{objectFit: "contain"}}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <Text>
              <Highlight
                query={`${selected + 1}`}
              >{`${selected + 1} / ${viewer?.images?.length}`}</Highlight>
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent={"center"} gap={"12px"}>
          <IconButton
            aria-label={"prev"}
            onClick={() =>
              setSelected((prev) => {
                if (!viewer) return prev;
                return (prev - 1 + viewer.images.length) % viewer.images.length;
              })
            }
            variant={"outline"}
            borderRadius={"full"}
          >
            <Icon as={MdKeyboardArrowLeft} w={"6"} h={"6"}/>
          </IconButton>
          {viewer?.images?.map((image, index) => (
            <Box
              key={index}
              pos={"relative"}
              overflow={"hidden"}
              w={"86px"}
              h={{base: "40px", lg: "86px"}}
              outline={index === selected ? "4px solid" : "0px"}
              outlineColor={"oceanLighter"}
              borderRadius={"lg"}
            >
              <Image
                src={image.src}
                alt={image.alt}
                sizes={"86px"}
                onClick={() => setSelected(index)}
              />
            </Box>
          ))}
          <IconButton
            aria-label={"next"}
            onClick={() =>
              setSelected((prev) => {
                if (!viewer) return prev;
                return (prev + 1) % viewer.images.length;
              })
            }
            variant={"outline"}
            borderRadius={"full"}
          >
            <Icon as={MdKeyboardArrowRight} w={"6"} h={"6"}/>
          </IconButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Viewer;
