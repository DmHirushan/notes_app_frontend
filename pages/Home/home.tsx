import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {deleteNote, getAllNotes} from "../../slice/NoteSlice.ts";


interface NoteData {
    title?: string;
    date?: string;
    content?: string;
    tags?: string;
}

const Home: React.FC = () => {
    const notes = useSelector((state:RootState) => state.note);

    const dispatch = useDispatch<AppDispatch>();



    console.log(notes);

    const removeNote = async () => {
        dispatch(deleteNote("67be8b4e821edc36ca7b3642"))
    };

    const [openAddEditModal, setOpenAddEditModal] = useState<{
        isShown: boolean;
        type: "add" | "edit";
        data: NoteData | null;
    }>({
        isShown: false,
        type: "add",
        data: null,
    });

    useEffect(() => {
        dispatch(getAllNotes());
    }, [openAddEditModal])

    return (
        <>
            <Navbar />
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4 mt-8">
                    {
                        notes.map((note, key) => (
                            <NoteCard
                                title={note.title}
                                date= "2025"
                                content= {note.content}
                                tags= {note.tags}
                                isPinned={() => {}}
                                onEdit={() => {}}
                                onDelete={() => {removeNote()}}
                                onPinNote={() => {}}
                            />
                        ))
                    }
                </div>
            </div>

            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10"
                onClick={() => {
                    setOpenAddEditModal({ isShown: true, type: "add", data: null });
                }}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                }}
                contentLabel="Add/Edit Note"
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddEditNotes
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type: "add", data: null });
                    }}
                />
            </Modal>
        </>
    );
};

export default Home;
