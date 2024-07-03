import {Progress} from "../model/progress.ts";
import {useEffect, useState} from "react";
import {getProgress} from "../service/contentService.ts";

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
        <>
            <h6>Health</h6>
            <p>Health state</p>

            {progress && (
                <div>
                    <h2>Fortschritt</h2>
                    <ul>
                        {progress.data.map((item) => (
                            <li key={item.timeframe}>
                                <strong>{item.timeframe}:</strong> {item.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </>
    )
}