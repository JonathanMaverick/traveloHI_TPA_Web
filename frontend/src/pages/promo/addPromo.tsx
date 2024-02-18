import { useState } from "react";
import TextField from "../../component/text-field";
import { IPromo } from "../../interfaces/promo/promo-interface";
import Button from "../../component/button";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../settings/firebase";
import add_promo from "../../api/promo/add_promo";

export default function AddPromo(){
    const INITIAL_PROMO_STATE : IPromo= {
        promoID : 0,
        promoCode : '',
        promoDiscount : 0,
        promoPicture : ''
    }
    const [promo, setPromo] = useState<IPromo>(INITIAL_PROMO_STATE);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [promoPicture, setPromoPicture] = useState<File | null>(null);
    const handleAddPromo = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if(!promoPicture){
            alert("Please upload a promo picture");
            setIsLoading(false);
            return;
        }

        const imageRef = ref(storage, `promo/${promoPicture.name}`);
        await uploadBytes(imageRef, promoPicture);
        promo.promoPicture = await getDownloadURL(imageRef);
        console.log(promo);
        const response = await add_promo(promo)
        if(response != -1){
            alert("Promo added successfully");
            window.location.reload();
            setIsLoading(false);
            return;
        }
        else{
            setIsLoading(false);
            return;
        }
    }

    return(
        <form action="" onSubmit={handleAddPromo}>
            <h2>Add Promo</h2>
            <TextField
                name="promoCode"
                label="Promo Code"
                placeholder="Enter promo code"
                value={promo.promoCode}
                onChange={(e:string) => setPromo({...promo, promoCode : e})}
            />
            <TextField
                name="discount"
                label="Discount"
                type="number"
                placeholder="Enter discount"
                value={promo.promoDiscount.toString()}
                onChange={(e:string) => setPromo({...promo, promoDiscount : parseInt(e)})}
            />
            <div className="text-field">
                <label htmlFor="promoPicture">Promo Picture</label>
                <input 
                    type="file"
                    id="promoPicture"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => {
                        setPromoPicture(e.target.files![0]);
                    }} 
                />
            </div>
            <Button
                content="Add Promo"
                isLoading={isLoading}
            />
        </form>
    )
}