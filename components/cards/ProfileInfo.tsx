import {getInitials} from "../../util/util";


interface ProfileInfoProps {
    onLogout: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ onLogout }) => {
    return (
        <div className='flex items-center gap-3'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
                {getInitials("John William")}
            </div>
            <p className='text-sm font-medium'>John William</p>
            <button className='text-sm text-slate-700 underline' onClick={onLogout}>
                Logout
            </button>
        </div>
    );
};

export default ProfileInfo;
