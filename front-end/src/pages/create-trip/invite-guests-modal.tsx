import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";


interface InviteGuestsModal {
    closeGuestsModal: () => void
    emailsToInvite: string[]
    addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
    removeEmailFromInvites: (email: string) => void
}

export function InviteGuestsModal(props: InviteGuestsModal) {
    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] bg-zinc-900 rounded-xl py-5 px-6 shadow-shape space-y-4'>
              
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-lg font-semibold'>Selecionar convidados</h2>
                  <button onClick={props.closeGuestsModal} type='button' >
                    <X className='size-5 text-zinc-400'/>
                  </button>
                </div>

                <p className='text-sm text-zinc-400'>Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
              </div>
              
              <div className='flex flex-wrap gap-4'>

                {
                  props.emailsToInvite.map((email) => {
                    return (
                      <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                        <span className='text-zinc-300'>{email}</span>
                        <button type="button" onClick={() => props.removeEmailFromInvites(email)}>
                          <X  className='size-4 text-zinc-400'/>
                        </button>
                      </div>
                    )
                  })
                }
                
              </div>

              <div className='w-full h-px bg-zinc-800'></div>

              <form onSubmit={props.addNewEmailToInvite} className='p-2.5 bg-zinc-950 border  border-zinc-800 rounded-lg flex items-center gap-2'>

                <AtSign className='text-zinc-400 size-5 px'/>
                <input type="email" name="email" placeholder="Digite o e-mail do convidado" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none" />

                <Button type='submit' variant="primary" size="default">
                  Convidar
                  <Plus className='text-lime-950 size-5 hover:text-lime-50'/>
                </Button>

              </form>

            </div>
          </div>
    );
}