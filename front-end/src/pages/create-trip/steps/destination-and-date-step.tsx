import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  closeGuestsInput: () => void
  openGuestsInput: () => void
  setDestination: (destination: string) => void
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
  eventStartAndEndDates: DateRange | undefined
}

export function DestinationAndDateStep(props: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate = props.eventStartAndEndDates && props.eventStartAndEndDates.from && props.eventStartAndEndDates.to 
    ? format(props.eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(props.eventStartAndEndDates.to, "d' de 'LLL"))
    : null;


  return (
      <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
          <div className='flex items-center gap-2 flex-1'>
            <MapPin className='size-5 text-zinc-400'/>
            <input type="text" onChange={(e) => props.setDestination(e.target.value)}
                  disabled={props.isGuestsInputOpen} 
                  placeholder="Para onde você vai ?" 
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
          </div>
          <button onClick={openDatePicker} className='flex items-center gap-2 text-left' disabled={props.isGuestsInputOpen}>
            <Calendar className='size-5 text-zinc-400'/>
            
            <span className="text-lg text-zinc-400 flex-1">
             { displayedDate || "Quando?" }
            </span>
          </button>

          { isDatePickerOpen  && 

            (
              <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                <div className=' bg-zinc-900 rounded-xl py-5 px-6 shadow-shape space-y-4'>
              
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <h2 className='text-lg font-semibold'>Selecione a data</h2>
                      <button onClick={closeDatePicker} type='button' >
                        <X className='size-5 text-zinc-400'/>
                      </button>
                    </div>
                  </div>
                  <DayPicker mode="range" selected={props.eventStartAndEndDates} onSelect={props.setEventStartAndEndDates}/>
                </div>
              </div>
            )            
          }

          <div className='w-px h-6 bg-zinc-800'></div>

          { 
            props.isGuestsInputOpen  ?

            <Button onClick={props.closeGuestsInput} variant="secondary" size="default">
              Alterar local/data
              <Settings2 className='size-5'/>
            </Button>
            : 
            <Button onClick={props.openGuestsInput} variant="primary" size="default">
              Continuar
              <ArrowRight className='text-lime-950 size-5 hover:text-lime-50'/>
            </Button>
          }            
        
      </div>

  );
}