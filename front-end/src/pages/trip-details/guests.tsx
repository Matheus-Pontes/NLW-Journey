import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface Participant {
    id:  string
    name: string | null
    email: string | null
    is_confirmed: boolean
}

export function Guests() {
    const { tripId } = useParams();

    const [participants, setParticipants] = useState<Participant[]>([]);

    useEffect(() => {   
        api.get(`/trips/${tripId}/participants`)
            .then(response => setParticipants(response.data.participants));
    }, [tripId]);

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>

            <div className="space-y-5">
                
                {
                    participants.map((participant, i) => {
                        return (
                            <div key={participant.id} className="flex itesm-center justify-between gap-4">
                                <div className="space-y-1.5">
                                    <span className="block text-zinc-100 font-medium">{participant.name ?? `Convidado ${i}`}</span>
                                    {/*  truncate aplica: [tex...] */}
                                    <span className="block text-xs text-zinc-400 truncate">
                                        {participant.email}
                                    </span>
                                </div>
                                
                                {
                                    participant.is_confirmed ? (
                                        <CheckCircle2 className="size-5 text-green-400 shrink-0"/> 
                                    ) : (
                                        // {/* shrink-0 aplica: não quero que o elemento mude de tamanho */}
                                        <CircleDashed className="size-5 text-zinc-400 shrink-0"/>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>

            <Button variant="secondary" size="full">
                <UserCog className='size-5'/>
                Gerenciar convidados
            </Button>
        </div>
    );
}