import {
  MapPin,
  Calendar,
  ArrowRight,
  Settings2,
  UserRoundPlus,
  X,
  AtSign,
  Plus,
} from "lucide-react";
import { FormEvent, useState } from "react";

function App() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailInvites, setEmailInvites] = useState<string[]>([]);

  const openGuestInput = () => {
    setIsGuestInputOpen(!isGuestInputOpen);
  };
  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const addEmailInvite = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data);
    const email = data.get("email")?.toString();
    if (!email) return;

    if (emailInvites.includes(email)) {
      alert("Email já adicionado");
      return;
    }
    setEmailInvites([...emailInvites, email]);
    e.currentTarget.reset();
  };
  const removeEmailInvite = (emailRemove: string) => {
    setEmailInvites(emailInvites.filter((email) => email !== emailRemove));
  };
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center ">
      <div className="max-w-3xl w-full px-6 space-y-10 text-center ">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>
        <div className="space-y-4">
          {" "}
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400 " />
              <input
                type="text"
                placeholder="Para onde você vai? "
                disabled={isGuestInputOpen}
                className=" bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>
            <div className="flex items-center gap-2 ">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="text"
                disabled={isGuestInputOpen}
                placeholder="Quando?"
                className=" bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
              />
            </div>
            <div className="w-px h-6 bg-zinc-800" />
            {!isGuestInputOpen ? (
              <button
                className="px-5 bg-lime-300 text-lime-950  py-2 font-medium rounded-lg flex items-center gap-2  hover:bg-lime-400 "
                onClick={openGuestInput}
              >
                Continuar
                <ArrowRight className="size-5 text-lime-950" />
              </button>
            ) : (
              <button
                className=" bg-zinc-800 hover:bg-zinc-950 text-zinc-200 px-5 py-2 font-medium rounded-lg flex items-center gap-2"
                onClick={openGuestInput}
              >
                Alterar local/data
                <Settings2 className="size-5" />
              </button>
            )}
          </div>
          {isGuestInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button
                className="flex items-center gap-2 flex-1"
                onClick={openModal}
              >
                <UserRoundPlus className="size-5 text-zinc-400 " />
                <span className="text-lg placeholder-zinc-400">
                  Quem estará na viagem?
                </span>
              </button>

              <div className="w-px h-6 bg-zinc-800" />
              <button
                className="bg-lime-300 text-lime-950 px-5 py-2 font-medium rounded-lg flex items-center gap-2 hover:bg-lime-400"
                onClick={openGuestInput}
              >
                Confirma viagem
                <ArrowRight className="size-5 text-lime-950" />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500 ">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br /> com nossos{" "}
          <a href="#" className=" text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="#" className=" text-zinc-300 underline">
            políticas de privacidade
          </a>
        </p>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-950">
            <div className="flex items-center justify-between">
              <h2>Selecionar convidados</h2>
              <X
                className="size-5 text-zinc-400 cursor-pointer"
                onClick={openModal}
              />
            </div>
            <p className="text-zinc-400 text-sm mt-2">
              Os convidados irão receber e-mails para confirmar a participação
              na viagem.
            </p>
            <div className="flex w-full flex-wrap gap-2 mt-5">
              {emailInvites.map((email, index) => (
                <div key={index}>
                  <div className="bg-zinc-800 rounded-md px-[10px] py-[6px] flex items-center text-zinc-300">
                    <span>{email}</span>
                    <X
                      className="size-4 text-zinc-400 cursor-pointer"
                      onClick={() => {
                        removeEmailInvite(email);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full bg-zinc-800 h-px my-5" />
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <form
                onSubmit={addEmailInvite}
                className="flex items-center gap-2 flex-1"
              >
                <AtSign className="size-5 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Digite o e-mail do convidado "
                  className=" bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
                <button
                  type="submit"
                  className="bg-lime-300 text-lime-950 px-5 py-2 font-medium rounded-lg flex items-center gap-2 hover:bg-lime-400"
                >
                  Convidar
                  <Plus className="size-5 text-lime-950" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
