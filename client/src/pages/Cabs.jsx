import {useState} from 'react';

export default function Cabs() {

    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try{
            const res = await fetch('/api/cab/create',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json();
            console.log(data)
        }catch(error){
            console.log("handleSubmit" + error);
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="cab number"
                id="cab_number"
                onChange={handleChange}/>

                <input
                type="text"
                placeholder="car type"
                id="type"
                onChange={handleChange}/>
                
                <input
                type="number"
                placeholder="charge per minute"
                id="price_per_minute"
                onChange={handleChange}/>
                <button type="submit">
                    submit
                </button>
            </form>
        </div>
    )
}