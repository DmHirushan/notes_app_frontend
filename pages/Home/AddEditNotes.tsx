import React, { useState } from "react";
import TagInput from "../../components/TagInput";
import { MdClose } from "react-icons/md";
import {NotesModel} from "../../modal/NoteModel.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {saveNote} from "../../slice/NoteSlice.ts";

interface AddEditNotesProps {
    noteData?: {
        title?: string;
        content?: string;
        tags?: string[];
    };
    type: "add" | "edit";
    onClose: () => void;
}

const AddEditNotes: React.FC<AddEditNotesProps> = ({ noteData, type, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [title, setTitle] = useState<string>(noteData?.title || "");
    const [content, setContent] = useState<string>(noteData?.content || "");
    const [tags, setTags] = useState<string[]>(noteData?.tags || []);
    const [error, setError] = useState<string | null>(null);

    // Add Note
    const addNewNote = async () => {
        const note = new NotesModel(
            title,
            content,
            tags,
            "67bb2e5ca28be264bb00a935"

    )
        console.log(note);
        dispatch(saveNote(note))
    };

    // Edit Note
    const editNote = async () => {
        console.log("Editing note...");
    };

    const handleAddNote = () => {
        if (!title || !content) {
            setError("Please enter values to the fields");
            return;
        }
        setError(null);

        if (type === "edit") {
            editNote();
        } else {
            addNewNote();
        }
    };

    return (
        <div className="relative">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                onClick={onClose}
            >
                <MdClose className="text-xl text-slate-400" />
            </button>

            <div className="flex flex-col gap-2">
                <label className="input-label">TITLE</label>
                <input
                    type="text"
                    className="text-2xl text-slate-950 outline-none"
                    placeholder="Go To Gym At 5"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">CONTENT</label>
                <textarea
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Content"
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="mt-3">
                <label className="input-label">TAGS</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

            <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>
                {type === "edit" ? "EDIT" : "ADD"}
            </button>
        </div>
    );
};

export default AddEditNotes;
