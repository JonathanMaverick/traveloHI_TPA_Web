import { FormEvent, useState } from "react";
import TextField from "../../component/text-field";
import { IAirline } from "../../interfaces/flight/airline-interface";
import Button from "../../component/button";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../settings/firebase";
import add_airline from "../../api/flight/add_airline";

export default function AddAirline(){

    const INITIAL_AIRLINE_STATE: IAirline = {
        airlineName: "",
        airlineLogo: "",
        logoImage: null
    }

    const handleAddAirline = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const imageRef = ref(storage, `airline/${airline.airlineName}/${airline.logoImage}`);
        await uploadBytes(imageRef, airline.logoImage!);
        airline.airlineLogo = await getDownloadURL(imageRef);

        const response = await add_airline(airline);
        if(response == -1){
            alert("Error occured!")
            return;
        }
        else{
            alert("Airline added successfully!")
        }
        setAirline(INITIAL_AIRLINE_STATE);
        window.location.reload();
    }

    const [airline, setAirline] = useState<IAirline>(INITIAL_AIRLINE_STATE);

    return(
        <form className="airline-form" onSubmit={handleAddAirline}>
            <h2>Add Airline</h2>
            <TextField 
                label="Airline Name" 
                name="airlineName"
                value={airline.airlineName} 
                onChange={(e:string) => setAirline({ ...airline, airlineName: e })}
            />
            <div className="text-field">
                <label htmlFor="">Airline Logo</label>
                <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => {setAirline({ ...airline, logoImage: e.target.files![0] })}}
                />
            </div>
            <Button content="Add Airline"/>
        </form>
    )
}