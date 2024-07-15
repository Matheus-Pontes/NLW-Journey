import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateActivityModalProps {
    closeCreateActivityModal: () => void
}

export function CreateActivityModal(props: CreateActivityModalProps) {

  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get('title')?.toString();
    const occurs_at = data.get('occurs_at')?.toString();

    await api.post(`/trips/${tripId}/activities`, {
      title, 
      occurs_at
    });

    window.document.location.reload();
  }
  
  return (
      <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
        <div className='w-[640px] bg-zinc-900 rounded-xl py-5 px-6 shadow-shape space-y-4'>
          
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Cadastrar atividade</h2>
              <button onClick={props.closeCreateActivityModal} type='button' >
                <X className='size-5 text-zinc-400'/>
              </button>
            </div>
          
            <p className='text-sm text-zinc-400'>Todos convidados podem visualizar as atividades.<span className='font-bold'>Florianópolis, Brasil</span> nas datas de <span className='font-bold'>16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:</p>
          </div>
          
          <form onSubmit={createActivity} className='space-y-3'>
          
              <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                  <Tag className='text-zinc-400 size-5 px'/>
                  <input name="title" placeholder="Qual a atividade?" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none" />
              </div>
    
              
              <div className='h-14 flex-1 px-4 bg-zinc-950 border  border-zinc-800 rounded-lg flex items-center gap-2'>
                  <Calendar className='text-zinc-400 size-5 px'/>
                  {/* [color-sheme:dark] - mudar cor do icone padrao do input=datetime-local */}
                  <input type="datetime-local" name="occurs_at" placeholder="Data e horário da atividade" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none [color-scheme:dark]" />
              </div>
                  
              <Button type="submit" variant="primary" size="full">
                  Salvar atividade
              </Button>
          </form>
        </div>
      </div> 
  );
}