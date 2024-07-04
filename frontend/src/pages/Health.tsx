import {Progress} from "../model/progress.ts";
import {useEffect, useState} from "react";
import {getProgress} from "../service/contentService.ts";
import {Box, Typography} from "@mui/material";
import {StyledHealthPaper} from "../components/styles.ts";

export default function Health(){
    const [progress, setProgress] = useState<Progress | null>({type: "progress", data: []});

    useEffect(() => {
        async function fetchData() {
            const fetchedProgress = await getProgress();
            if (fetchedProgress) {
                setProgress(fetchedProgress);
            }
        }
        fetchData();
    }, []);

    return(
        <section>
            <Typography variant={"h5"} className={"text-gray"} py={2}>Was verbessert sich?</Typography>
                    {progress && (
                        <Box >
                            {progress.data.map((item) => (
                                <StyledHealthPaper key={item.timeframe} elevation={3} sx={{  width: '60vw'}}>
                                    <Typography variant="body1" className={"text-gray"}><strong>{item.timeframe}:</strong> {item.description}</Typography>
                                </StyledHealthPaper>
                            ))}
                        </Box>
                    )}
        </section>
    )
}