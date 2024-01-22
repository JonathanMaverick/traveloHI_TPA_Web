import { FormEvent, useState } from "react";
import TextField from "../../component/text-field";
import Button from "../../component/button";
import { IPlane } from "../../interfaces/flight/plane-interface";
import { useParams } from "react-router-dom";
import add_plane from "../../api/flight/add_plane";

export default function AddPlane(){

    const INITIAL_PLANE_STATE: IPlane = {
        planeCode: "",
        airlineID : 0,
        economySeats : 0,
        businessSeats : 0,
    }
    const { id } = useParams();

    const handleAddPlane = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        plane.airlineID = Number(id) ?? 0;
        const response = await add_plane(plane);
        if(response == -1){
            return;
        }
        else{
            alert("Plane added successfully!")
        }
        window.location.reload();
    }

    const [plane, setPlane] = useState<IPlane>(INITIAL_PLANE_STATE);

    return(
        <form className="airline-form" onSubmit={handleAddPlane}>
            <h2>Add Plane</h2>
            <TextField
                label="Plane Code"
                name="planeCode"
                value={plane.planeCode}
                onChange={(e:string) => setPlane({ ...plane, planeCode: e })}
            />
            <TextField
                label="Business Seats"
                name="businessSeats"
                type="number"
                value={plane?.businessSeats.toString()}
                onChange={(e:string) => setPlane({ ...plane, businessSeats: parseInt(e) })}
              />
            <TextField
                label="Economy Seats"
                name="economySeats"
                type="number"
                value={plane?.economySeats.toString()}
                onChange={(e:string) => setPlane({ ...plane, economySeats: parseInt(e) })}
              />
            <Button content="Add Airline"/>
        </form>
    )
}