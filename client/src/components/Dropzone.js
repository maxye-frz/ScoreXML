import React, { useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
}

const activeStyle = {
    borderColor: '#2196f3'
}

const acceptStyle = {
    borderColor: '#00e676'
}

const rejectStyle = {
    borderColor: '#ff1744'
}

function musicXMLValidator(file) {
    if (file.name.slice(-8) !== 'musicxml') {
        return {
            code: "illegal-file",
            message: `must upload musicxml files`
        };
    }
    return null
}

function Dropzone(props) {

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = function (e) {
                const name = file.name.split('.');
                name.splice(name.length - 1);
                props.onFileChange(e.target.result, name);
            }
            reader.readAsText(file);
        })
    }, [props])

    const {
        fileRejections,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        validator: musicXMLValidator,
        maxFiles: 1,
        onDrop
    });

    const fileRejection = fileRejections.map(({ file, errors }) => {
        return (
            <li key={file.path}>
                {file.path} - {file.size} bytes
                <ul>
                    {errors.map(e => (
                        <li key={e.code}>{e.message}</li>
                    ))}
                </ul>
            </li>
        )
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (
        <section className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop musicxml file here, or click to select files</p>
            </div>
            <aside>
                <ul>{fileRejection}</ul>
            </aside>
        </section>
    );

}

export default Dropzone;