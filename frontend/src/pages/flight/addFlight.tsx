import { useEffect } from "react"
import TextField from "../../component/text-field"

export default function AddFlight(){
    useEffect(() => {
        document.title = "Add Flight"
    },[])

    return(
        <div>
            <h1>Add Flight</h1>
            <TextField
                label="Flight Name"
                name="flightName"
                // value={flightData?.flightName}
                // onChange={(e:string) => setFlightData({ ...flightData, flightName: e })}
            />
        </div>
    )
}