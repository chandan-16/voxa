import Image from "next/image"
import { assets } from '@/assets/assets';

const PromptBox = () => {
  return (
    <form action="" className={`w-full ${false ? 'max-w-3xl' : 'max-w-2xl'} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
        <textarea rows={2} placeholder="Message Voxa-AI" className="outline-none w-full resize-none overflow-hidden break-words bg-transparent" required />

        <div>
            <div>
                <p className="flex">
                    <Image src={assets.deepthink_icon} alt='' className="h-5" />
                    DeepThink (R1)
                </p>
            </div>
        </div>
    </form>
  )
}

export default PromptBox