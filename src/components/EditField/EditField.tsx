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
                <div className="flex">
                    <h1 className={`bg-lime-300 text-center ${className}`}>
                        {title}
                    </h1>
                </div>
                <div className="flex">
                    <RiEdit2Fill
                        className={'text-lime-600 cursor-pointer text-2xl '}
                        onClick={handleTitleClick}
                    />
                </div>
            </div>
        </>
    );
};

export default EditField;
