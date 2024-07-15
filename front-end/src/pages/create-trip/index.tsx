import { FormEvent, useState } from 'react';
import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { useNavigate } from 'react-router-dom';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/invite-guests-step';
import { DateRange } from 'react-day-picker';
import { api } from '../../lib/axios';

export function CreateTipPage() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState(['']);

  const [destination, setDestination] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();

  function openGuestsInput () {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput () {
    setIsGuestsInputOpen(false);
  }

  function openGuestModal() {
    setGuestModalOpen(true);
  }

  function closeGuestModal() {
    setGuestModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(e: FormEvent<HTMLFormElement>)  {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const email = data.get('email')?.toString();

    if(!email)
      return;

    if(emailsToInvite.includes(email))
      return;

    setEmailsToInvite([
      ...emailsToInvite, email
    ]);

    e.currentTarget.reset(); 
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(invited => invited !== emailToRemove);

    setEmailsToInvite(newEmailList);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if(!destination 
      || !eventStartAndEndDates
      || emailsToInvite.length === 0
      || !ownerName
      || !ownerEmail 
    ) {
      return;
    }

    const response = await api.post('/trips', {
      destination, 
      starts_at: eventStartAndEndDates?.from,
      ends_at: eventStartAndEndDates?.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })

    const { tripId } = response.data;
    navigate(`/trips/${tripId}`);
  }

  return ( 

    <div className="w-full h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">

      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep 
            closeGuestsInput={closeGuestsInput} 
            isGuestsInputOpen={isGuestsInputOpen} 
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
            />

          {
            isGuestsInputOpen && 
            (
              <InviteGuestsStep 
                emailsToInvite={emailsToInvite} 
                openConfirmTripModal={openConfirmTripModal} 
                openGuestModal={openGuestModal} 
              />
            )
          }

        </div>

        <p className="text-zinc-500 text-sm">
            Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
            com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>
      </div>

      {
        guestModalOpen && (
          <InviteGuestsModal addNewEmailToInvite={addNewEmailToInvite} 
                             emailsToInvite={emailsToInvite}
                             closeGuestsModal={closeGuestModal}
                             removeEmailFromInvites={removeEmailFromInvites}/>
        )
      }

      {isConfirmTripModalOpen && (
        <ConfirmTripModal closeConfirmTripModal={closeConfirmTripModal}
                          createTrip={createTrip}
                          setOwnerName={setOwnerName}
                          seOwnerEmail={setOwnerEmail}
                          />
      )}

      
    </div>
  )
}
