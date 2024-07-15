import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";

export function ImportantLinks () {
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>

            <div className="space-y-5">
                <div className="flex itesm-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block text-zinc-100 font-medium">Reversa</span>
                        {/*  truncate aplica: [tex...] */}
                        <a  href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-300">
                            https://google.com/aksndganorgnarngaoerngkankrglnxfgjfj
                        </a>
                    </div>
                    {/* shrink-0 aplica: não quero que o elemento mude de tamanho */}
                    <Link2 className="size-5 text-zinc-400 shrink-0"/>
                </div>
                <div className="flex itesm-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block text-zinc-100 font-medium">Reversa</span>
                        {/*  truncate aplica: [tex...] */}
                        <a  href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-300">
                            https://google.com/aksndganorgnarngaoerngkankrglnxfgjfj
                        </a>
                    </div>
                    {/* shrink-0 aplica: não quero que o elemento mude de tamanho */}
                    <Link2 className="size-5 text-zinc-400 shrink-0"/>
                </div>
            </div>

            <Button variant="secondary" size="full">
                <Plus className='size-5'/>
                Cadastrar novo link
            </Button>
        </div>
    );
}