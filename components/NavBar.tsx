import React, { useState } from "react";
import ProfileInfo from "./cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const navigate = useNavigate();

    const onLogout = () => {
        navigate("/login");
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
            <h2 className="text-xl font-medium text-black py-2">Notes</h2>

            <SearchBar value={searchQuery} onChange={handleSearch} />

            <ProfileInfo onLogout={onLogout} />
        </div>
    );
};

export default Navbar;
