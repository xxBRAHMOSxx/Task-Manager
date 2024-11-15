import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const NotesList = () => {
    const [filterCompleted, setFilterCompleted] = useState('all'); // 'all', 'completed', 'pending'
    const [sortDirection, setSortDirection] = useState('asc'); // 'asc' for ascending, 'desc' for descending
    const [searchInput, setSearchInput] = useState('');
    useTitle('TaskManager: Notes List');
    
    const { currentUserId, isManager, isAdmin } = useAuth();

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content;

    if (isLoading) content = <PulseLoader color={"#FFF"} />;

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const { ids, entities } = notes;

        let filteredIds;
        if (isManager || isAdmin) {
            filteredIds = [...ids];
        } else {
            filteredIds = ids.filter(noteId => entities[noteId].user._id === currentUserId);
        }

        // Filter by completion status
        let filteredByStatus = filteredIds.filter(noteId => {
            const note = entities[noteId];
            if (filterCompleted === 'completed') {
                return note.completed;
            } else if (filterCompleted === 'pending') {
                return !note.completed;
            }
            return true; // 'all'
        });

        // Sort by created date
        filteredByStatus.sort((a, b) => {
            const dateA = new Date(entities[a].createdAt);
            const dateB = new Date(entities[b].createdAt);
            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        });

        // Apply search filter
        const searchFilteredIds = filteredByStatus.filter(noteId => {
            const note = entities[noteId];
            return note.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                   note.user.username.toLowerCase().includes(searchInput.toLowerCase());
        });

        const tableContent = searchFilteredIds.map(noteId => <Note key={noteId} noteId={noteId} />);

        content = (
            <>
                
                <table className="table table--notes">
                    <thead className="table__thead">
                        <tr>
                            <th scope="col" className="table__th note__status">Status</th>
                            <th scope="col" className="table__th note__created">Created</th>
                            <th scope="col" className="table__th note__updated">Updated</th>
                            <th scope="col" className="table__th note__title">Title</th>
                            <th scope="col" className="table__th note__username">Assigned to</th>
                            <th scope="col" className="table__th note__edit">Read/Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent.length ? tableContent : <tr><td colSpan="6">No notes found</td></tr>}
                    </tbody>
                </table>
            </>
        );
        if (!tableContent.length) {
            content = (
                <p>
                    <h1>No task found</h1>
            
                    {console.log(filteredIds)}
                    <Link to="/dash/notes/new" className="addNotebutton">
                    <h3>Create a new task <FontAwesomeIcon icon={faPenToSquare} /></h3></Link>
                    
                </p>
            );
        }
    }

    return<> 
 <input
     onChange={(e) => setSearchInput(e.target.value)}
     type="text"
     className="table table--notes SearchInput"
     placeholder="Search tasks"
 />
 <select className="table--notes sort" onChange={(e) => setFilterCompleted(e.target.value)} value={filterCompleted}>
     <option value="all">All Notes</option>
     <option value="completed">Completed</option>
     <option value="pending">Pending</option>
 </select>
 <select className="table--notes sort" onChange={(e) => setSortDirection(e.target.value)} value={sortDirection}>
     <option value="asc">Sort by Date (Oldest)</option>
     <option value="desc">Sort by Date (Newest)</option>
 </select>
    {content}</>
};

export default NotesList;
