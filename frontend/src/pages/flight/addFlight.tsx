import { useEffect } from "react"

export default function AddFlight(){
    useEffect(() => {
        document.title = "Add Flight"
    },[])

    return(
        <div>
            <h1>Add Flight</h1>
        </div>
    )
}