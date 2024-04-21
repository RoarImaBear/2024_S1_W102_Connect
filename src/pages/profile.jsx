import React, {useRef} from 'react'
import { firestore } from "../firebase"
import { addDoc, collection} from "@firebase/firestore"

export default function Home(){


    return(
        <body>
            <section className="main-container">
                {/* name age gender and photo */}
                <div> 
                    <form action="">
                    {/* <form onSubmit ={handleSave}> */}
                    <label>Please Enter Name</label>
                    {/* <input type ="text" ref={Name}/> */}
                    <label>Please Enter Age</label>
                    {/* <input type ="integer" ref={Name}/> */}
                    <button type='submit'>Save</button>
                    </form>
                </div>
                {/* location */}
                <div>

                </div>

                {/* Description */}
                <div>
                <label>Please Enter a Description</label>
                    {/* <input type ="String" ref={Description}/> */}
                </div>

                {/* Interests */}
                <div>
                    {/* Pick from interests list */}
                    <div>
                    <label for ="interests">Pick your interests</label>
                    {/* pick your interests this will be dynamically polulated  */}
                    <select name="interests" id="interests">
                        <option value ="interest1">interest1</option>
                    </select>
                    </div>

                    {/* current interests  */}
                    <div>

                    </div>
                </div>
             
            </section>
        </body>
    )
}