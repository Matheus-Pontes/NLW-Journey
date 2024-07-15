import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";

interface Activity {
    date: string
    activities: {
        id: string
        title: string
        occurs_at: string
    }[]
}

export function Activities() {
    const { tripId } = useParams();

    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {   
        api.get(`/trips/${tripId}/activities`).then(response => {
            console.log(response.data);
            setActivities(response.data.activities);
        });
            
    }, [tripId]);

    return (
        <div className="space-y-8">

            {
                activities.map((activity) => {
                    return (
                        <div key={activity.date} className="space-y-2.5">
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl text-zinc-300 font-semibold">Dia {format(activity.date, 'd')}</span>
                                <span className="text-xs text-zinc-500">{format(activity.date, 'EEEE')}</span>
                            </div>

                            {
                                activity.activities.length > 0 ? (
                                    activity.activities.map((act) => {
                                        return (
                                            <div key={act.id} className="space-y-2.5">
                                                <div className="flex items-center gap-3 px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape">
                                                    <CircleCheck className="size-5 text-lime-300 "/>
                                                    <span className="text-zinc-100">{act.title}</span>
                                                    <span className="text-zinc-400 text-sm ml-auto">{format(act.occurs_at, 'HH:mm')}h</span>
                                                </div>
                                            </div>
                                        );
                                    })
                                    
                                ) :
                                (
                                    <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
                                )
                            }

                        </div>
                    );
                })
            }

        </div>
    );
}