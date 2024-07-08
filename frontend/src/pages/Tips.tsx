import {useEffect, useState} from "react";
import {Tip} from "../model/tip.ts";
import {getMotivations, getTips} from "../service/contentService.ts";
import {Motivations} from "../model/motivation.ts";
import {Box, Typography} from "@mui/material";

import 'swiper/css';
import 'swiper/css/bundle';

import 'swiper/css/effect-flip';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, EffectFlip} from 'swiper/modules';


export default function Tips() {
    const [tips, setTips] = useState<Tip>({type: "tips", data: []});
    const [motivations, setMotivations] = useState<Motivations>({type: "motivations", data: []});

    useEffect(() => {
        async function fetchData() {
            const fetchedTips = await getTips();
            if (fetchedTips) {
                setTips(fetchedTips);

            }
            const fetchedMotivations = await getMotivations();
            if (fetchedMotivations) {
                setMotivations(fetchedMotivations);

            }
        }

        fetchData();
        console.log("tips: ", tips)
        console.log("motivations: ", motivations)
    }, []);

    return (
        <section style={{marginTop: "calc(50% - 80px)"}}>
            <Typography variant={"h6"} fontWeight={"bold"} textAlign={"center"} className={"text-gray"} my={0.9}>Tipps</Typography>


            <Swiper
                modules={[Navigation, Pagination, EffectFlip]}
                effect={"flip"}
                grabCursor={true}
                centeredSlides={true}
                spaceBetween={50}
                slidesPerView={1}
                navigation={true}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination'
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >

                {tips?.data.map((tip, index) => (
                    <SwiperSlide key={`tip-${index}`} className={"slide"}>
                        <Box className={"card"}>
                            {tip}
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>


            <Typography variant={"h6"} fontWeight={"bold"} textAlign={"center"} className={"text-gray"} my={0.9}>Motivationen</Typography>

            <Swiper
                modules={[Navigation, Pagination, EffectFlip]}
                effect={"flip"}
                grabCursor={true}
                centeredSlides={true}
                spaceBetween={50}
                slidesPerView={1}
                navigation={true}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination'
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >

                {motivations?.data.map((motivation, index) => (
                    <SwiperSlide key={`motivation-${index}`} className={"slide"}>
                        <Box className={"card"}>
                            {motivation}
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}