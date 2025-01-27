import { useState, useEffect } from 'react';
import { RiEdit2Fill } from 'react-icons/ri';

interface EditFieldProps {
    text?: string;
    className?: string;
}
const EditField = ({ text = 'Your title', className }: EditFieldProps) => {
    const [title, setTitle] = useState<string>(() => {
        const storedTitle = localStorage.getItem('storedTitle');
        return storedTitle !== null ? JSON.parse(storedTitle) : text;
    });

    const handleTitleClick = () => {
        const newTitle = prompt('Enter your title');
        if (newTitle) {
            setTitle(newTitle);
        } else {
            return;
        }
    };

    useEffect(() => {
        localStorage.setItem('storedTitle', JSON.stringify(title));
    }, [title]);

    return (
        <>
            <div className="flex gap-4 items-center align-middle">
                <div className="flex items-center w-full">
                    <h1
                        style={{ wordBreak: 'break-all' }}
                        className={`ext-center break-words w-full break-all${className}`}
                    >
                        {title}
                    </h1>
                </div>
                <div className="flex">
                    <RiEdit2Fill
                        className={'cursor-pointer text-2xl '}
                        onClick={handleTitleClick}
                    />
                </div>
            </div>
        </>
    );
};

export default EditField;
