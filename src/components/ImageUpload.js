import React, { useEffect, useRef, useState } from "react";

import classes from "../css/ImageUpload.module.css"
const ImageUpload = props => {
    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const filePickerRef = useRef()

    useEffect(() => {
        if (!file) {
            return
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }, [file])
    const pickedHandler = event => {
        let pickedFile
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0]
            setFile(pickedFile)
        }
        props.onInput(pickedFile)
    }
    const pickImageHandler = () => {
        filePickerRef.current.click()
    }
    return <div className="form-control">
        <input id={props.id} ref={filePickerRef} style={{ display: "none" }} type="file" accept=".jpg,.png,.jpeg" onChange={pickedHandler}></input>
        <div className={classes.image}>
            <div className={classes.preview}>
                {previewUrl && <img src={previewUrl} alt="Preview"></img>}
                {!previewUrl && <p>Please pick an image</p>}
            </div>
            <button type="button" onClick={pickImageHandler}>Pick Image</button>
        </div>
    </div>
}
export default ImageUpload