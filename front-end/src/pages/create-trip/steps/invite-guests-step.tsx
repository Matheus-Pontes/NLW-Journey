import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepProps {
    openGuestModal: () => void 
    emailsToInvite: string[]
    openConfirmTripModal: () => void
}

export function InviteGuestsStep(props: InviteGuestsStepProps) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <button onClick={props.openGuestModal} className='flex items-center gap-2 flex-1'>
                <UserRoundPlus className='size-5 text-zinc-400'/>
                {
                props.emailsToInvite.length > 0 ? (
                <span className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-left">
                {props.emailsToInvite.length} pessoa(s) convidada(s)
                </span> ) : 
                (
                <span className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-left">
                Quem estará na viagem ?  
                </span>
                )
                }
            </button>
            
            <div className='w-px h-6 bg-zinc-800'></div>

            <Button onClick={props.openConfirmTripModal} variant="primary" size="default">
                Confirmar viagem
                <ArrowRight className='text-lime-950 size-5 hover:text-lime-50'/>
            </Button>
        </div>
    );
}