import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import httpClient from '../httpClient';


export default function TextEditor(props) {

    const [value, setValue] = useState('')

    // setValue(props.note.content)

    const submitEdit = async (e) => {
        e.preventDefault()

        try {
          const response = await httpClient.put(`http://localhost:5000/note/${props.note._id['$oid']}/content`, {edit: value})
            if (response.status === 200) {
                console.log(response.data.message)
                window.location.reload()
            }
        } catch (error){
            if (error.response.status === 401) {
                console.error(error)
                throw "An error occured whilst trying to create new note"
            }
        }
    } 

  return (
    <div>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <button onClick={submitEdit}>Confirm</button>
    </div>
  )
  
}
