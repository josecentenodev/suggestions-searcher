import axios from "axios";
import { useState, useEffect } from "react";

function App() {
    const [users, setUsers] = useState([]);
    const [text, setText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
        const loadUsers = async () => {
            const response = await axios.get(
                "https://reqres.in/api/users?page=1"
            );
            const apiUsers = response.data.data;
            setUsers(apiUsers);
        };
        loadUsers();
    }, []);

    const onChangeHandler = (text) => {
        let matches = [];
        if (text.length > 0) {
            matches = users.filter((user) => {
                const regex = new RegExp(`${text}`, "gi");
                return user.email.match(regex);
            });
        }
        // console.log(matches)
        setSuggestions(matches);
        setText(text);
    };

    const onSuggestion = (text) => {
      setSuggestions([]);
      setText(text);
    };

    return (
        <div className='flex justify-center'>
            <div className='mt-10 flex flex-col justify-center items-start w-96'>
                <label
                    htmlFor='email-address'
                    className='block text-sm font-medium text-gray-700'
                >
                    Email
                </label>
                <input
                    type='text'
                    name='email-address'
                    id='email-address'
                    autoComplete='email'
                    className='mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 outline-none'
                    onChange={(e) => onChangeHandler(e.target.value)}
                    onBlur={()=>{
                      setTimeout(()=>{
                        setSuggestions([])
                      },100)
                    }}
                    value={text}
                />
                {suggestions &&
                    suggestions.map((suggestion, i) => (
                        <div
                            key={i}
                            className='hover:cursor-pointer hover:bg-blue-300 w-full sm:text-sm p-2 border-x last:border-b last:rounded-b-md'
                            onClick={()=>onSuggestion(suggestion.email)}
                        >
                            {suggestion.email}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default App;
