import { Mail, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void
    createTrip: (event: FormEvent<HTMLFormElement>) => void
    setOwnerName: (name:  string) => void
    seOwnerEmail: (email: string) => void
}

export function ConfirmTripModal (props: ConfirmTripModalProps) {
    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] bg-zinc-900 rounded-xl py-5 px-6 shadow-shape space-y-4'>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Confirmar criação da viagem</h2>
                <button onClick={props.closeConfirmTripModal} type='button' >
                  <X className='size-5 text-zinc-400'/>
                </button>
              </div>

              <p className='text-sm text-zinc-400'>Para concluir a criação da viagem para <span className='font-bold'>Florianópolis, Brasil</span> nas datas de <span className='font-bold'>16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:</p>
            </div>

            <form onSubmit={props.createTrip} className='space-y-3'>

              <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <User className='text-zinc-400 size-5 px'/>
                <input name="name" onChange={(e) => props.setOwnerName(e.target.value)} placeholder="Seu nome completo" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none" />
              </div>

              <div className='h-14 px-4 bg-zinc-950 border  border-zinc-800 rounded-lg flex items-center gap-2'>
                <Mail className='text-zinc-400 size-5 px'/>
                <input type="email" onChange={(e) => props.seOwnerEmail(e.target.value)} name="email" placeholder="Seu e-mail pessoal" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none" />
              </ div>

              <Button type='submit' variant="primary" size="full">
                Confirmar criação da viagem
              </Button>
            </form>

          </div>
        </div>
    );
}