import {useEffect, useState} from "react";
import {Tip} from "../model/tip.ts";
import {getMotivations, getTips} from "../service/contentService.ts";
import {Motivations} from "../model/motivation.ts";
import {Box, List, ListItemText, Typography} from "@mui/material";
import {StyledListItem} from "../components/styles.ts";

export default function Tips(){
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

    return(
        <section>
            {tips && (
                <Box >
                    <Typography variant={"h6"} fontWeight={"bold"} className={"text-gray"} textAlign={"center"} my={0.9}>Tipps</Typography>
                    <List sx={{
                        height: "35vh",
                        overflowY: "scroll",
                    }}>
                        {tips.data.map((tip) => (
                            <StyledListItem key={tip}>
                                <ListItemText primary={tip} />
                            </StyledListItem>
                        ))}
                    </List>
                </Box>
            )}

            {motivations && (
                <Box >
                    <Typography variant={"h6"} fontWeight={"bold"} className={"text-gray"} textAlign={"center"} my={0.9}>Motivationen</Typography>
                    <List sx={{
                        height: "35vh",
                        overflowY: "scroll",
                    }}>
                        {motivations.data.map((motivation) => (
                            <StyledListItem key={motivation}>
                                <ListItemText primary={motivation} />
                            </StyledListItem>
                        ))}
                    </List>
                </Box>
            )}
        </section>
    )
}