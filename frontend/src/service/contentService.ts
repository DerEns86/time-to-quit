import axios from "axios";
import {Tip} from "../model/tip.ts";
import {Progress} from "../model/progress.ts";
import {Motivations} from "../model/motivation.ts";

export async function getTips() : Promise<Tip | null> {
   try{
    const response = await axios.get("/api/content");

    if(response.data){
        for (const item of response.data) {
            const tipsContent = item.content.find((contentItem: any) => contentItem.type === 'tips');
            console.log(tipsContent);
            if (tipsContent) {
                return {
                    type: tipsContent.type,
                    data: tipsContent.data
                };
            }
        }
    }
    return null;
    } catch (error) {
        console.error("Error fetching tips", error);
        return null;
   }
}

export async function getProgress(): Promise<Progress | null> {
    try {
        const response = await axios.get('/api/content');

        if (response.data) {
            for (const item of response.data) {
                const progressContent = item.content.find((contentItem: any) => contentItem.type === 'progress');
                if (progressContent) {
                    return {
                        type: progressContent.type,
                        data: progressContent.data,
                    };
                }
            }
        }
        return null;
    } catch (error) {
        console.error('Error fetching progress', error);
        return null;
    }
}

export async function getMotivations(): Promise<Motivations | null> {
    try {
        const response = await axios.get('/api/content');

        if (response.data) {
            for (const item of response.data) {
                const motivationsContent = item.content.find((contentItem: any) => contentItem.type === 'motivations');
                if (motivationsContent) {
                    return {
                        type: motivationsContent.type,
                        data: motivationsContent.data,
                    };
                }
            }
        }
        return null;
    } catch (error) {
        console.error('Error fetching motivations', error);
        return null;
    }
}