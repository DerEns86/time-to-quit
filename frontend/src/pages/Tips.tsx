import {useEffect, useState} from "react";
import {Tip} from "../model/tip.ts";
import {getMotivations, getTips} from "../service/contentService.ts";
import {Motivations} from "../model/motivation.ts";

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
        <>
            <h6>Tips</h6>
            <p>Tips</p>
            <ul>
                {tips.data.map((tip) => {
                    return <li key={tip}>{tip}</li>
                })}
            </ul>

            <p>Motivation</p>
            <ul>
                {motivations.data.map((motivation) => {
                    return <li key={motivation}>{motivation}</li>
                })}
            </ul>
        </>
    )
}